import fs from 'fs';
import path from 'path';

function normalizeItem(subArea, item = {}) {
  const normalizedSubArea = String(subArea || '').toUpperCase();
  const zone = normalizedSubArea.startsWith('C') || normalizedSubArea.startsWith('B')
    ? normalizedSubArea.slice(0, 1)
    : normalizedSubArea.slice(0, 1);
  const area = normalizedSubArea.slice(1);

  return {
    fgId: item.fgId ?? null,
    pdnum: item.pdnum ?? '',
    pdName: item.pdName ?? '',
    zone: item.zone ?? zone,
    area: item.area ?? area,
    code: item.code ?? '',
    storageType: item.storageType ?? 'MANUAL',
    unit: item.unit ?? 'PCS',
    storageNum: item.storageNum ?? 0,
    lastModify: item.lastModify ?? null,
    operator: item.operator ?? 'offline',
    extype: item.extype ?? '',
    stockChange: item.stockChange ?? null,
  };
}

function getZoneKey(subArea) {
  const first = String(subArea || '').toUpperCase().slice(0, 1);
  return first === 'B' || first === 'C' ? 'BC' : first;
}

function ensureManualShape(raw) {
  return {
    updatedAt: raw?.updatedAt ?? null,
    notes: Array.isArray(raw?.notes) ? raw.notes : [],
    subAreas: raw?.subAreas ?? {},
  };
}

export function createManualStorageSource(filePath, templates) {
  const absolutePath = path.resolve(filePath);
  const zoneIds = Object.keys(templates).filter(page => page !== 'main');
  const subAreaIds = zoneIds.flatMap(page => templates[page].areas.map(area => area.name));

  function read() {
    try {
      const raw = fs.readFileSync(absolutePath, 'utf8');
      return ensureManualShape(JSON.parse(raw));
    } catch {
      return ensureManualShape(null);
    }
  }

  function getMeta() {
    const manual = read();
    const subAreaCount = Object.keys(manual.subAreas).length;
    const recordCount = Object.values(manual.subAreas).reduce((total, items) => total + (items?.length ?? 0), 0);

    return {
      path: absolutePath,
      updatedAt: manual.updatedAt,
      noteCount: manual.notes.length,
      subAreaCount,
      recordCount,
      isEmpty: recordCount === 0,
    };
  }

  function write(manual) {
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
    fs.writeFileSync(absolutePath, JSON.stringify(ensureManualShape(manual), null, 2), 'utf8');
  }

  function buildCachePayload() {
    const records = toRecords();
    const subAreas = {};
    const zones = Object.fromEntries(zoneIds.map(zoneId => [zoneId, []]));

    for (const subAreaId of subAreaIds) {
      const normalizedItems = records.filter(item => item.subArea === subAreaId);
      subAreas[subAreaId] = normalizedItems;
      const zoneKey = getZoneKey(subAreaId);
      zones[zoneKey] = [...(zones[zoneKey] ?? []), ...normalizedItems];
    }

    return {
      generatedAt: read().updatedAt || new Date().toISOString(),
      zones,
      subAreas,
    };
  }

  function toRecords() {
    const manual = read();

    return Object.entries(manual.subAreas).flatMap(([subAreaId, items]) =>
      (items ?? []).map(item => {
        const normalized = normalizeItem(subAreaId, item);
        return {
          ...normalized,
          subArea: String(subAreaId).toUpperCase(),
          source: 'manual',
        };
      })
    );
  }

  function buildIntoCache(storageCache) {
    const payload = buildCachePayload();
    storageCache.write(payload);
    return {
      source: 'manual',
      path: absolutePath,
      generatedAt: payload.generatedAt,
      zoneCount: Object.keys(payload.zones).length,
      subAreaCount: Object.keys(payload.subAreas).length,
    };
  }

  function saveRecords(records) {
    const existing = read();
    const grouped = Object.fromEntries(subAreaIds.map(subAreaId => [subAreaId, []]));

    for (const record of records) {
      const subAreaId = String(record.subArea || `${record.zone || ''}${record.area || ''}`).toUpperCase();
      if (!grouped[subAreaId]) {
        grouped[subAreaId] = [];
      }
      grouped[subAreaId].push({
        fgId: record.fgId ?? null,
        pdnum: record.pdnum ?? '',
        pdName: record.pdName ?? '',
        zone: String(record.zone ?? subAreaId.slice(0, 1)).toUpperCase(),
        area: String(record.area ?? subAreaId.slice(1)).toUpperCase(),
        code: record.code ?? '',
        storageType: record.storageType ?? 'MANUAL',
        unit: record.unit ?? 'PCS',
        storageNum: Number(record.storageNum ?? 0),
        lastModify: record.lastModify ?? null,
        operator: record.operator ?? 'offline',
        extype: record.extype ?? '',
        stockChange: record.stockChange ?? null,
      });
    }

    write({
      updatedAt: new Date().toISOString(),
      notes: existing.notes,
      subAreas: grouped,
    });

    return getMeta();
  }

  return {
    path: absolutePath,
    read,
    write,
    getMeta,
    toRecords,
    buildCachePayload,
    buildIntoCache,
    saveRecords,
  };
}
