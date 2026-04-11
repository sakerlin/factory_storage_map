@echo off
if not exist "D:\develop\factory_storage_map\backend\node_modules" (
  echo Installing backend dependencies...
  cd /d D:\develop\factory_storage_map\backend
  call npm install
)

if not exist "D:\develop\factory_storage_map\frontend\node_modules" (
  echo Installing frontend dependencies...
  cd /d D:\develop\factory_storage_map\frontend
  call npm install
)

cd /d D:\develop\factory_storage_map\backend
call npm run db:generate
call npm run db:push
call npm run db:sync-manual

start powershell -NoExit -Command "cd /d D:\develop\factory_storage_map\backend; npm run dev"
start powershell -NoExit -Command "cd /d D:\develop\factory_storage_map\frontend; npm run dev -- --host 127.0.0.1"
start http://127.0.0.1:5174
echo Backend: http://127.0.0.1:3002
echo Frontend: http://127.0.0.1:5174
