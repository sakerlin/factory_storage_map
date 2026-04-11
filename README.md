# Factory Map 2

`factory_storage_map` 是將舊版 PHP `factory_map` 重寫成前後端分離架構的版本，技術方向比照 `Calories_Coach`。

目前專案已經從「讀舊 PHP + 遠端 MySQL」演進成：
- React / Vite 前端
- Express API
- SQLite + Prisma 本地資料庫
- 手動 JSON 與 cache 同步機制

快速入口：
- Web App: `http://127.0.0.1:5174`
- API: `http://127.0.0.1:3002`
- Storage Admin: `http://127.0.0.1:5174/admin/storage`

## Tech Stack

- Frontend: React 19, Vite, styled-components, React Router
- Backend: Node.js, Express
- Database: SQLite
- ORM: Prisma
- Legacy assets: 舊版 `factory_map` 圖片 / CSS / map template

## 目前已完成

- 工廠總覽與分區地圖頁
  - 已支援 `main / A / BC / D / E / F / G / H / I / J`
  - `F` 區為手工補建模板，使用舊圖 `factory_f_all.png`
- 大地圖 hover 預覽
  - 會顯示舊版區域預覽圖層
  - 已修正 `E` 區與其他大圖 hover 缺圖問題
- 分區子區塊 hover / click
  - 滑過會顯示白框
  - 點擊會固定選取區塊並載入資料
- 地圖上的浮動庫存列表
  - 固定浮在左上角
  - 可拖曳標題列左右移動
  - 位置會記住在瀏覽器 localStorage
- Storage Admin 管理頁
  - 列表、篩選、Create / Edit / Delete
  - 左側區域 / 子區塊篩選為下拉選單
  - Create Record 的子區塊會跟左側區域篩選連動
  - 子區塊選定後自動帶出 zone / area
  - 品號自動產生，格式：`子區塊-儲位型態-序號`
  - `lastModify` 改由後端自動寫入，前端只顯示
- 本地資料機制
  - `storage-manual.json` 作為可維護來源
  - SQLite 作為正式查詢來源
  - `storage-cache.json` 作為 cache / fallback

## 目前資料狀態

- SQLite 已啟用並由 Prisma 管理
- `storage-manual.json` 已同步進 SQLite
- 目前示例資料已包含：
  - `A0`
  - `B2`
  - `C3`
  - `D4`
  - `F0-F9`
  - `H0`
  - `J2`

## 專案結構

```text
factory_storage_map/
├─ backend/
│  ├─ data/
│  │  ├─ storage-cache.json
│  │  └─ storage-manual.json
│  ├─ prisma/
│  │  ├─ dev.db
│  │  └─ schema.prisma
│  ├─ src/
│  │  ├─ db/
│  │  ├─ lib/
│  │  ├─ routes/
│  │  └─ scripts/
│  └─ package.json
├─ frontend/
│  ├─ public/legacy/
│  ├─ src/
│  │  ├─ api/
│  │  ├─ components/
│  │  ├─ pages/
│  │  └─ styles/
│  └─ package.json
├─ PROJECT_STATUS.md
├─ start-dev.bat
└─ start-dev.ps1
```

## 啟動方式

### 一鍵啟動

PowerShell:

```powershell
D:\develop\factory_storage_map\start-dev.ps1
```

Batch:

```bat
D:\develop\factory_storage_map\start-dev.bat
```

腳本會：
- 檢查並安裝 backend / frontend 依賴
- 初始化 Prisma Client 與 SQLite schema
- 將手動 JSON 同步進 SQLite
- 分別開兩個開發視窗
- 自動打開瀏覽器到 `http://127.0.0.1:5174`

### 手動啟動

Backend:

```powershell
cd D:\develop\factory_storage_map\backend
npm install
npm run db:generate
npm run db:push
npm run db:sync-manual
npm run dev
```

Frontend:

```powershell
cd D:\develop\factory_storage_map\frontend
npm install
npm run dev -- --host 127.0.0.1
```

## 常用指令

Backend:

```powershell
cd D:\develop\factory_storage_map\backend
npm run db:generate
npm run db:push
npm run db:sync-manual
npm run cache:export
npm run cache:build-manual
npm run dev
```

Frontend:

```powershell
cd D:\develop\factory_storage_map\frontend
npm run dev -- --host 127.0.0.1
npm run build
```

## Storage Admin 說明

頁面：
- `http://127.0.0.1:5174/admin/storage`

目前行為：
- 左側 `區域篩選` 與 `子區塊` 會連動
- `Create Record` 的 `子區塊` 會跟著左側 `區域篩選` 變化
- `zone / area` 由 `子區塊` 自動帶出，不可手改
- `pdnum` 自動產生，不可手改
- `lastModify` 由後端寫入，不可手改

## API 摘要

地圖：
- `GET /api/maps`
- `GET /api/maps/:page`

儲位資料：
- `GET /api/storage/meta`
- `GET /api/storage/zone/:zone`
- `GET /api/storage/sub-area/:subArea`
- `GET /api/storage/records`
- `POST /api/storage/records`
- `PUT /api/storage/records/:id`
- `DELETE /api/storage/records/:id`
- `POST /api/storage/cache/refresh`

健康檢查：
- `GET /api/health`

## Storage Cache / Manual Data

檔案：
- cache file: `D:\develop\factory_storage_map\backend\data\storage-cache.json`
- manual source file: `D:\develop\factory_storage_map\backend\data\storage-manual.json`

如需從目前的 SQLite 資料庫重新匯出最新 cache：

```powershell
cd D:\develop\factory_storage_map\backend
npm run cache:export
```

如需手動編輯 `storage-manual.json` 後重建：

```powershell
cd D:\develop\factory_storage_map\backend
npm run db:sync-manual
npm run cache:build-manual
```

## 已知限制

- `F` 區詳細頁為手工補建，不是從舊 PHP 直接解析出來
- 目前多數資料仍是示例資料，不是正式倉儲資料
- 浮動庫存面板已支援拖曳，但若之後還要更進一步優化拖曳手感，建議獨立抽成 component 再處理
