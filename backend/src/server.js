import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { loadLegacyTemplates } from './lib/legacyMapParser.js';
import { createStorageRepository } from './lib/storageRepository.js';
import { createStorageCache } from './lib/storageCache.js';
import { createManualStorageSource } from './lib/manualStorageSource.js';
import { createMapsRouter } from './routes/maps.js';
import { createStorageRouter } from './routes/storage.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3002);
const legacyRootDir = process.env.LEGACY_FACTORY_MAP_DIR || 'D:\\develop\\factory_map';
const storageCache = createStorageCache(
  process.env.STORAGE_CACHE_FILE || 'D:\\develop\\factory_storage_map\\backend\\data\\storage-cache.json'
);

const templates = loadLegacyTemplates(legacyRootDir);
const manualStorageSource = createManualStorageSource(
  process.env.MANUAL_STORAGE_FILE || 'D:\\develop\\factory_storage_map\\backend\\data\\storage-manual.json',
  templates
);
const storageRepository = createStorageRepository();

app.use(cors());
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await storageRepository.healthcheck();
    const totalRecords = await storageRepository.count();
    res.json({
      ok: true,
      service: 'factory-map-backend',
      database: 'connected',
      provider: 'sqlite',
      orm: 'prisma',
      totalRecords,
      cache: storageCache.path,
    });
  } catch (error) {
    res.json({
      ok: true,
      service: 'factory-map-backend',
      database: 'degraded',
      provider: 'sqlite',
      orm: 'prisma',
      cache: storageCache.path,
      detail: error.message,
    });
  }
});

app.use('/api/maps', createMapsRouter(templates));
app.use('/api/storage', createStorageRouter(storageRepository, storageCache, templates, manualStorageSource));

app.listen(port, () => {
  console.log(`Factory Map API listening on http://localhost:${port}`);
});
