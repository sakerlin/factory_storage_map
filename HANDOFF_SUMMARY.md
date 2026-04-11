# Handoff Summary

## 專案定位

`factory_storage_map` 是舊版 `factory_map` 的重寫版，已從：
- PHP + 舊前端頁面
- 遠端 MySQL

轉成：
- React + Vite
- Express API
- SQLite + Prisma
- 手動 JSON / SQLite / cache 同步

## 目前可直接使用的頁面

- 主地圖: `http://127.0.0.1:5174/maps/main`
- 分區頁:
  - `A / BC / D / E / F / G / H / I / J`
- 儲位管理:
  - `http://127.0.0.1:5174/admin/storage`
- API:
  - `http://127.0.0.1:3002`

## 目前已完成

### 地圖

- 大地圖 hover 預覽已可用
- 分區頁 hover 白框已可用
- `F` 區詳細頁已手工補建
- 左上角浮動庫存列表已可用
- 浮動庫存列表支援左右拖曳與位置記憶
- 區域 / 子區塊切換已改成地圖右上角下拉選單

### 資料層

- 已移除遠端 MySQL 依賴
- 使用 SQLite + Prisma
- `storage-manual.json` 可手動維護
- `db:sync-manual` 可同步到 SQLite
- `cache:export` 可從 SQLite 匯出 cache

### Storage Admin

- 支援 CRUD
- 左側區域篩選與子區塊篩選連動
- Create Record 的子區塊會跟左側區域篩選連動
- `zone / area` 由子區塊自動帶出
- `pdnum` 自動產生
- `lastModify` 由後端自動更新

## 現在的資料狀態

SQLite 已同步的示例資料包含：
- `A0`
- `B2`
- `C3`
- `D4`
- `F0-F9`
- `H0`
- `J2`

## 重要檔案

### 後端

- [server.js](D:/develop/factory_storage_map/backend/src/server.js)
- [legacyMapParser.js](D:/develop/factory_storage_map/backend/src/lib/legacyMapParser.js)
- [storageRepository.js](D:/develop/factory_storage_map/backend/src/lib/storageRepository.js)
- [storage.js](D:/develop/factory_storage_map/backend/src/routes/storage.js)
- [schema.prisma](D:/develop/factory_storage_map/backend/prisma/schema.prisma)
- [storage-manual.json](D:/develop/factory_storage_map/backend/data/storage-manual.json)
- [storage-cache.json](D:/develop/factory_storage_map/backend/data/storage-cache.json)

### 前端

- [FactoryMapPage.jsx](D:/develop/factory_storage_map/frontend/src/pages/FactoryMapPage.jsx)
- [StorageAdminPage.jsx](D:/develop/factory_storage_map/frontend/src/pages/StorageAdminPage.jsx)
- [MapCanvas.jsx](D:/develop/factory_storage_map/frontend/src/components/MapCanvas.jsx)
- [AppShell.jsx](D:/develop/factory_storage_map/frontend/src/components/AppShell.jsx)
- [client.js](D:/develop/factory_storage_map/frontend/src/api/client.js)

## 常用操作

### 一鍵啟動

```powershell
D:\develop\factory_storage_map\start-dev.ps1
```

### 手動啟動

```powershell
cd D:\develop\factory_storage_map\backend
npm install
npm run db:generate
npm run db:push
npm run db:sync-manual
npm run dev
```

```powershell
cd D:\develop\factory_storage_map\frontend
npm install
npm run dev -- --host 127.0.0.1
```

### 手動資料同步

```powershell
cd D:\develop\factory_storage_map\backend
npm run db:sync-manual
npm run cache:export
```

## 接手時注意

- `F` 區不是舊 PHP 解析出來的，而是手工模板
- 目前很多儲位內容仍是示例資料
- 浮動庫存面板雖然已可拖曳，但若要再優化手感，建議抽成獨立 component
- 若未來要大量維護資料，建議下一步做 JSON 匯入 / 匯出或批次編輯

## 建議下一步

- 將示例資料替換成正式倉儲資料
- 為 Storage Admin 補排序 / 分頁 / 批次刪除
- 為地圖頁補更完整的 UI 驗證
- 規劃資料匯入 / 匯出流程
