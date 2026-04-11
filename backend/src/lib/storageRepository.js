import { prisma } from '../db/client.js';

function normalizeRecord(record) {
  return {
    fgId: record.fgId,
    pdnum: record.pdnum,
    pdName: record.pdName,
    zone: record.zone,
    area: record.area,
    code: record.code,
    storageType: record.storageType,
    unit: record.unit,
    storageNum: record.storageNum,
    lastModify: record.lastModify,
    operator: record.operator,
    extype: record.extype,
    stockChange: record.stockChange,
    subArea: record.subArea,
    source: record.source,
  };
}

export function createStorageRepository() {
  return {
    async healthcheck() {
      await prisma.$queryRaw`SELECT 1`;
      return true;
    },
    async getZoneStorage(zone) {
      const normalizedZone = String(zone || '').toUpperCase();
      const where = normalizedZone === 'BC'
        ? { zone: { in: ['B', 'C'] } }
        : { zone: normalizedZone };
      const records = await prisma.storageRecord.findMany({
        where,
        orderBy: [
          { zone: 'asc' },
          { area: 'asc' },
          { pdnum: 'asc' },
        ],
      });
      return records.map(normalizeRecord);
    },
    async getSubAreaStorage(subArea) {
      const records = await prisma.storageRecord.findMany({
        where: { subArea: String(subArea || '').toUpperCase() },
        orderBy: [{ pdnum: 'asc' }],
      });
      return records.map(normalizeRecord);
    },
    async listRecords({ subArea, zone, query } = {}) {
      const filters = [];
      if (subArea) {
        filters.push({ subArea: String(subArea).toUpperCase() });
      } else if (zone) {
        const normalizedZone = String(zone).toUpperCase();
        filters.push(
          normalizedZone === 'BC'
            ? { zone: { in: ['B', 'C'] } }
            : { zone: normalizedZone }
        );
      }
      if (query) {
        filters.push({
          OR: [
            { pdnum: { contains: query } },
            { pdName: { contains: query } },
            { code: { contains: query } },
          ],
        });
      }

      const records = await prisma.storageRecord.findMany({
        where: filters.length > 0 ? { AND: filters } : undefined,
        orderBy: [
          { subArea: 'asc' },
          { pdnum: 'asc' },
        ],
      });
      return records.map(record => ({ id: record.id, ...normalizeRecord(record) }));
    },
    async createRecord(record) {
      const created = await prisma.storageRecord.create({
        data: {
          fgId: record.fgId ?? null,
          pdnum: record.pdnum ?? '',
          pdName: record.pdName ?? '',
          zone: String(record.zone ?? '').toUpperCase(),
          area: String(record.area ?? '').toUpperCase(),
          subArea: String(record.subArea ?? `${record.zone ?? ''}${record.area ?? ''}`).toUpperCase(),
          code: record.code ?? '',
          storageType: record.storageType ?? 'MANUAL',
          unit: record.unit ?? 'PCS',
          storageNum: Number(record.storageNum ?? 0),
          lastModify: record.lastModify ?? null,
          operator: record.operator ?? null,
          extype: record.extype ?? null,
          stockChange: record.stockChange == null ? null : String(record.stockChange),
          source: record.source ?? 'manual',
        },
      });
      return { id: created.id, ...normalizeRecord(created) };
    },
    async updateRecord(id, record) {
      const updated = await prisma.storageRecord.update({
        where: { id: Number(id) },
        data: {
          fgId: record.fgId ?? null,
          pdnum: record.pdnum ?? '',
          pdName: record.pdName ?? '',
          zone: String(record.zone ?? '').toUpperCase(),
          area: String(record.area ?? '').toUpperCase(),
          subArea: String(record.subArea ?? `${record.zone ?? ''}${record.area ?? ''}`).toUpperCase(),
          code: record.code ?? '',
          storageType: record.storageType ?? 'MANUAL',
          unit: record.unit ?? 'PCS',
          storageNum: Number(record.storageNum ?? 0),
          lastModify: record.lastModify ?? null,
          operator: record.operator ?? null,
          extype: record.extype ?? null,
          stockChange: record.stockChange == null ? null : String(record.stockChange),
          source: record.source ?? 'manual',
        },
      });
      return { id: updated.id, ...normalizeRecord(updated) };
    },
    async deleteRecord(id) {
      await prisma.storageRecord.delete({
        where: { id: Number(id) },
      });
      return true;
    },
    async getAllRecords() {
      const records = await prisma.storageRecord.findMany({
        orderBy: [
          { subArea: 'asc' },
          { pdnum: 'asc' },
        ],
      });
      return records.map(record => ({ id: record.id, ...normalizeRecord(record) }));
    },
    async count() {
      return prisma.storageRecord.count();
    },
    async replaceAll(records) {
      const normalizedRecords = records.map(record => ({
        fgId: record.fgId ?? null,
        pdnum: record.pdnum ?? '',
        pdName: record.pdName ?? '',
        zone: String(record.zone ?? '').toUpperCase(),
        area: String(record.area ?? '').toUpperCase(),
        subArea: String(record.subArea ?? `${record.zone ?? ''}${record.area ?? ''}`).toUpperCase(),
        code: record.code ?? '',
        storageType: record.storageType ?? 'MANUAL',
        unit: record.unit ?? 'PCS',
        storageNum: Number(record.storageNum ?? 0),
        lastModify: record.lastModify ?? null,
        operator: record.operator ?? null,
        extype: record.extype ?? null,
        stockChange: record.stockChange == null ? null : String(record.stockChange),
        source: record.source ?? 'manual',
      }));

      await prisma.$transaction(async tx => {
        await tx.storageRecord.deleteMany();
        if (normalizedRecords.length > 0) {
          await tx.storageRecord.createMany({ data: normalizedRecords });
        }
      });

      return { count: normalizedRecords.length };
    },
    async exportCache({ zones, subAreas, cache }) {
      const zoneResults = {};
      const subAreaResults = {};

      for (const zone of zones) {
        zoneResults[zone] = await this.getZoneStorage(zone);
      }

      for (const subArea of subAreas) {
        subAreaResults[subArea] = await this.getSubAreaStorage(subArea);
      }

      cache.write({
        generatedAt: new Date().toISOString(),
        zones: zoneResults,
        subAreas: subAreaResults,
      });

      return {
        zones: Object.keys(zoneResults).length,
        subAreas: Object.keys(subAreaResults).length,
        path: cache.path,
      };
    },
    async disconnect() {
      await prisma.$disconnect();
    },
  };
}
