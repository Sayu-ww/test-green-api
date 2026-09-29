@echo off
setlocal

pushd "%~dp0"
if errorlevel 1 (
    echo [ERROR] Could not open the project folder.
    pause
    exit /b 1
)

echo ========================================
echo       Starting project
echo ========================================
echo.

REM Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed.
    echo.
    echo Install Node.js 22 LTS:
    echo https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Get the Node.js version
for /f "tokens=1" %%v in ('node -v') do set NODE_VERSION=%%v

echo [OK] Node.js found: %NODE_VERSION%

REM Check npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm was not found.
    echo.
    echo Try reinstalling Node.js.
    echo.
    pause
    exit /b 1
)

echo [OK] npm found.
echo.

REM Check package.json
if not exist "package.json" (
    echo [ERROR] package.json was not found.
    echo.
    echo package.json was not found next to this script.
    echo.
    pause
    exit /b 1
)

echo [OK] Project found.
echo.

REM Install dependencies
if not exist "node_modules" (
    echo Installing dependencies...
    echo.

    call npm install

    if errorlevel 1 (
        echo.
        echo [ERROR] Failed to install dependencies.
        echo.
        pause
        exit /b 1
    )

    echo.
    echo [OK] Dependencies installed.
) else (
    echo [OK] Dependencies are already installed.
)

echo.
echo ========================================
echo       Building project
echo ========================================
echo.

call npm run build
if errorlevel 1 (
    echo.
    echo [ERROR] Build failed.
    pause
    exit /b 1
)

echo.
echo ========================================
echo       Starting production build
echo ========================================
echo.

call npm start

popd
pause