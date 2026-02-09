@echo off
REM Create directory structure for MERN Auth Project

echo Creating backend directories...
mkdir backend
mkdir backend\controllers
mkdir backend\models
mkdir backend\routes
mkdir backend\middlewares
mkdir backend\utils
mkdir backend\config

echo Creating frontend directories...
mkdir frontend
mkdir frontend\src
mkdir frontend\src\components
mkdir frontend\src\pages
mkdir frontend\src\context
mkdir frontend\src\services
mkdir frontend\src\hooks
mkdir frontend\public

echo.
echo ✓ Directory structure created successfully!
echo.
echo Next steps:
echo 1. Run: npm install (in root to install all dependencies)
echo 2. See README.md for complete setup instructions
