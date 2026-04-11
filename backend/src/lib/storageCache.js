import fs from 'fs';
import path from 'path';

function ensureShape(cache) {
  return {
    generatedAt: cache?.generatedAt ?? null,
    zones: cache?.zones ?? {},
    subAreas: cache?.subAreas ?? {},
  };
}

export function createStorageCache(filePath) {
  const absolutePath = path.resolve(filePath);

  function read() {
    try {
      const raw = fs.readFileSync(absolutePath, 'utf8');
      return ensureShape(JSON.parse(raw));
    } catch {
      return ensureShape(null);
    }
  }

  function write(cache) {
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
    fs.writeFileSync(absolutePath, JSON.stringify(ensureShape(cache), null, 2), 'utf8');
  }

  function getMeta() {
    const cache = read();
    const zoneKeys = Object.keys(cache.zones);
    const subAreaKeys = Object.keys(cache.subAreas);
    const zoneRecordCount = zoneKeys.reduce((total, key) => total + (cache.zones[key]?.length ?? 0), 0);
    const subAreaRecordCount = subAreaKeys.reduce((total, key) => total + (cache.subAreas[key]?.length ?? 0), 0);

    return {
      path: absolutePath,
      generatedAt: cache.generatedAt,
      zoneCount: zoneKeys.length,
      subAreaCount: subAreaKeys.length,
      zoneRecordCount,
      subAreaRecordCount,
      isEmpty: zoneKeys.length === 0 && subAreaKeys.length === 0,
    };
  }

  return {
    path: absolutePath,
    read,
    write,
    getMeta,
    getZone(zone) {
      const cache = read();
      return cache.zones[String(zone || '').toUpperCase()] ?? [];
    },
    getSubArea(subArea) {
      const cache = read();
      return cache.subAreas[String(subArea || '').toUpperCase()] ?? [];
    },
  };
}
