import dotenv from 'dotenv';
import { loadLegacyTemplates } from '../lib/legacyMapParser.js';
import { createManualStorageSource } from '../lib/manualStorageSource.js';
import { createStorageRepository } from '../lib/storageRepository.js';

dotenv.config();

const legacyRootDir = process.env.LEGACY_FACTORY_MAP_DIR || 'D:\\develop\\factory_map';
const templates = loadLegacyTemplates(legacyRootDir);
const manualStorageSource = createManualStorageSource(
  process.env.MANUAL_STORAGE_FILE || 'D:\\develop\\factory_storage_map\\backend\\data\\storage-manual.json',
  templates
);
const storageRepository = createStorageRepository();

async function main() {
  const result = await storageRepository.replaceAll(manualStorageSource.toRecords());
  console.log(`Manual storage synced to SQLite (${result.count} records).`);
}

main()
  .catch(error => {
    console.error('Failed to sync manual storage to SQLite:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await storageRepository.disconnect();
  });
