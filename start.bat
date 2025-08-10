@echo off
echo ========================================
echo URL Shortener - Starting Application
echo ========================================
echo.

echo Starting backend server...
start "Backend Server" cmd /k "cd backend && npm start"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo Starting frontend server...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo Application starting...
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Opening frontend in browser...
timeout /t 5 /nobreak > nul
start http://localhost:3000
echo.
echo Both servers are now running!
echo Close the terminal windows to stop the servers.
echo.
pause 