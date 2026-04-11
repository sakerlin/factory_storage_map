import dotenv from 'dotenv';
import { loadLegacyTemplates } from '../lib/legacyMapParser.js';
import { createStorageCache } from '../lib/storageCache.js';
import { createManualStorageSource } from '../lib/manualStorageSource.js';

dotenv.config();

const legacyRootDir = process.env.LEGACY_FACTORY_MAP_DIR || 'D:\\develop\\factory_map';
const templates = loadLegacyTemplates(legacyRootDir);
const cache = createStorageCache(process.env.STORAGE_CACHE_FILE || 'D:\\develop\\factory_storage_map\\backend\\data\\storage-cache.json');
const manualSource = createManualStorageSource(
  process.env.MANUAL_STORAGE_FILE || 'D:\\develop\\factory_storage_map\\backend\\data\\storage-manual.json',
  templates
);

try {
  const result = manualSource.buildIntoCache(cache);
  console.log(`Manual storage cache built from ${result.path}`);
  console.log(`Zones: ${result.zoneCount}, Sub-areas: ${result.subAreaCount}`);
} catch (error) {
  console.error('Failed to build manual storage cache:', error.message);
  process.exitCode = 1;
}
