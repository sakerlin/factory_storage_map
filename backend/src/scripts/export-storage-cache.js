import dotenv from 'dotenv';
import { loadLegacyTemplates } from '../lib/legacyMapParser.js';
import { createStorageRepository } from '../lib/storageRepository.js';
import { createStorageCache } from '../lib/storageCache.js';

dotenv.config();

const legacyRootDir = process.env.LEGACY_FACTORY_MAP_DIR || 'D:\\develop\\factory_map';
const templates = loadLegacyTemplates(legacyRootDir);
const cache = createStorageCache(process.env.STORAGE_CACHE_FILE || 'D:\\develop\\factory_storage_map\\backend\\data\\storage-cache.json');
const storageRepository = createStorageRepository();

const zones = Object.keys(templates).filter(page => page !== 'main');
const subAreas = zones.flatMap(page => templates[page].areas.map(area => area.name));

storageRepository.exportCache({ zones, subAreas, cache })
  .then(result => {
    console.log(`Storage cache exported to ${result.path}`);
    console.log(`Zones: ${result.zones}, Sub-areas: ${result.subAreas}`);
  })
  .catch(error => {
    console.error('Failed to export storage cache:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await storageRepository.disconnect();
  });
