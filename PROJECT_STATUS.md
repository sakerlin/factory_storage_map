# Project Status

## Summary

`factory_storage_map` 已完成從舊 PHP `factory_map` 到現代前後端分離架構的重寫，並已具備可日常操作的地圖瀏覽與儲位管理能力。

目前主線能力：
- 地圖瀏覽
- 區域 / 子區塊切換
- SQLite + Prisma 本地資料庫
- Storage Admin CRUD
- 手動 JSON / SQLite / cache 三者同步

## Current Routes

Frontend:
- `http://127.0.0.1:5174/maps/main`
- `http://127.0.0.1:5174/maps/A`
- `http://127.0.0.1:5174/maps/BC`
- `http://127.0.0.1:5174/maps/D`
- `http://127.0.0.1:5174/maps/E`
- `http://127.0.0.1:5174/maps/F`
- `http://127.0.0.1:5174/maps/G`
- `http://127.0.0.1:5174/maps/H`
- `http://127.0.0.1:5174/maps/I`
- `http://127.0.0.1:5174/maps/J`
- `http://127.0.0.1:5174/admin/storage`

Backend:
- `GET /api/health`
- `GET /api/maps`
- `GET /api/maps/:page`
- `GET /api/storage/meta`
- `GET /api/storage/zone/:zone`
- `GET /api/storage/sub-area/:subArea`
- `GET /api/storage/records`
- `POST /api/storage/records`
- `PUT /api/storage/records/:id`
- `DELETE /api/storage/records/:id`
- `POST /api/storage/cache/refresh`

## Implemented Details

### Map UI

- 大地圖 `main` 已支援 hover 預覽圖層
- 分區頁已支援白框 hover 標示
- 庫存列表已改為浮動面板
- 浮動面板支援左右拖曳與位置記憶
- 區域切換清單已改為地圖右上角下拉選單

### Data Layer

- 遠端 MySQL 已移除
- 改用 SQLite + Prisma
- `storage-manual.json` 可做人工維護
- `db:sync-manual` 可同步 JSON 到 SQLite
- `cache:export` 可由 SQLite 匯出 cache

### Storage Admin

- 區域篩選與子區塊篩選已連動
- Create Record 子區塊與左側區域篩選連動
- `pdnum` 自動產生：`子區塊-儲位型態-序號`
- `lastModify` 由後端自動更新

## Manual / Demo Data

目前示例資料已覆蓋：
- A0
- B2
- C3
- D4
- F0-F9
- H0
- J2

## Next Suggestions

- 將示例資料換成真實倉儲資料
- 將浮動庫存面板抽成獨立 component
- 為 Storage Admin 補排序 / 分頁 / 批次操作
- 規劃 JSON 匯入 / 匯出
