import { Router } from 'express';

export function createStorageRouter(storageRepository, storageCache, templates, manualStorageSource) {
  const router = Router();
  const zoneIds = Object.keys(templates).filter(page => page !== 'main');
  const subAreaIds = zoneIds.flatMap(page => templates[page].areas.map(area => area.name));

  function formatTimestamp(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  function normalizePayload(body) {
    const subArea = String(body.subArea || `${body.zone || ''}${body.area || ''}`).toUpperCase();
    return {
      fgId: body.fgId ?? null,
      pdnum: String(body.pdnum || '').trim(),
      pdName: String(body.pdName || '').trim(),
      zone: String(body.zone || subArea.slice(0, 1)).toUpperCase(),
      area: String(body.area || subArea.slice(1)).toUpperCase(),
      subArea,
      code: String(body.code || '').trim(),
      storageType: String(body.storageType || 'MANUAL').trim(),
      unit: String(body.unit || 'PCS').trim(),
      storageNum: Number(body.storageNum || 0),
      lastModify: formatTimestamp(),
      operator: body.operator ? String(body.operator) : null,
      extype: body.extype ? String(body.extype) : null,
      stockChange: body.stockChange == null || body.stockChange === '' ? null : String(body.stockChange),
      source: 'manual',
    };
  }

  async function syncManualAndCache() {
    const allRecords = await storageRepository.getAllRecords();
    const manual = manualStorageSource.saveRecords(allRecords);
    const cache = await storageRepository.exportCache({
      zones: zoneIds,
      subAreas: subAreaIds,
      cache: storageCache,
    });
    return { manual, cache };
  }

  async function getDatabaseStatus() {
    try {
      await storageRepository.healthcheck();
      const totalRecords = await storageRepository.count();
      return { state: 'connected', totalRecords };
    } catch (error) {
      return { state: 'degraded', detail: error.message };
    }
  }

  router.get('/meta', async (_req, res) => {
    res.json({
      database: await getDatabaseStatus(),
      cache: storageCache.getMeta(),
      manual: manualStorageSource.getMeta(),
      availableZones: zoneIds,
      availableSubAreas: subAreaIds.length,
    });
  });

  router.post('/cache/refresh', async (_req, res) => {
    try {
      const syncResult = await storageRepository.replaceAll(manualStorageSource.toRecords());
      const cacheResult = await storageRepository.exportCache({
        zones: zoneIds,
        subAreas: subAreaIds,
        cache: storageCache,
      });

      res.json({
        ok: true,
        source: 'sqlite',
        result: {
          syncedRecords: syncResult.count,
          cache: cacheResult,
        },
        cache: storageCache.getMeta(),
        manual: manualStorageSource.getMeta(),
      });
    } catch (error) {
      const result = manualStorageSource.buildIntoCache(storageCache);
      res.json({
        ok: true,
        source: 'manual-cache',
        detail: error.message,
        result,
        cache: storageCache.getMeta(),
        manual: manualStorageSource.getMeta(),
      });
    }
  });

  router.get('/records', async (req, res) => {
    const records = await storageRepository.listRecords({
      subArea: req.query.subArea,
      zone: req.query.zone,
      query: req.query.query,
    });
    res.json({ total: records.length, records });
  });

  router.post('/records', async (req, res) => {
    const payload = normalizePayload(req.body || {});
    if (!payload.pdnum || !payload.pdName || !payload.subArea) {
      return res.status(400).json({ error: 'pdnum, pdName, subArea are required' });
    }

    const record = await storageRepository.createRecord(payload);
    const synced = await syncManualAndCache();
    return res.status(201).json({ ok: true, record, synced });
  });

  router.put('/records/:id', async (req, res) => {
    const payload = normalizePayload(req.body || {});
    if (!payload.pdnum || !payload.pdName || !payload.subArea) {
      return res.status(400).json({ error: 'pdnum, pdName, subArea are required' });
    }

    const record = await storageRepository.updateRecord(req.params.id, payload);
    const synced = await syncManualAndCache();
    return res.json({ ok: true, record, synced });
  });

  router.delete('/records/:id', async (req, res) => {
    await storageRepository.deleteRecord(req.params.id);
    const synced = await syncManualAndCache();
    return res.json({ ok: true, synced });
  });

  router.get('/zone/:zone', async (req, res) => {
    try {
      const results = await storageRepository.getZoneStorage(req.params.zone);
      res.json({ total: results.length, results, source: 'database' });
    } catch (error) {
      const results = storageCache.getZone(req.params.zone);
      res.json({
        total: results.length,
        results,
        source: 'cache',
        error: 'storage_query_failed',
        detail: error.message,
      });
    }
  });

  router.get('/sub-area/:subArea', async (req, res) => {
    try {
      const results = await storageRepository.getSubAreaStorage(req.params.subArea);
      res.json({ total: results.length, results, source: 'database' });
    } catch (error) {
      const results = storageCache.getSubArea(req.params.subArea);
      res.json({
        total: results.length,
        results,
        source: 'cache',
        error: 'storage_query_failed',
        detail: error.message,
      });
    }
  });

  return router;
}
