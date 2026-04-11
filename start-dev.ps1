$backendDir = "D:\develop\factory_storage_map\backend"
$frontendDir = "D:\develop\factory_storage_map\frontend"

if (-not (Test-Path "$backendDir\node_modules")) {
  Write-Output "Installing backend dependencies..."
  Push-Location $backendDir
  npm install
  Pop-Location
}

if (-not (Test-Path "$frontendDir\node_modules")) {
  Write-Output "Installing frontend dependencies..."
  Push-Location $frontendDir
  npm install
  Pop-Location
}

Push-Location $backendDir
npm run db:generate
npm run db:push
npm run db:sync-manual
Pop-Location

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendDir'; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendDir'; npm run dev -- --host 127.0.0.1"

Start-Sleep -Seconds 3
Start-Process "http://127.0.0.1:5174"

Write-Output "Backend: http://127.0.0.1:3002"
Write-Output "Frontend: http://127.0.0.1:5174"
