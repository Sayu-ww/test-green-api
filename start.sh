#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

echo "========================================"
echo "      Starting project"
echo "========================================"
echo

# Check Node.js
if ! command -v node &> /dev/null
then
    echo "[ERROR] Node.js is not installed."
    echo
    echo "Install Node.js 22 LTS:"
    echo "https://nodejs.org/"
    echo
    exit 1
fi

NODE_VERSION=$(node -v)

echo "[OK] Node.js found: $NODE_VERSION"

# Check npm
if ! command -v npm &> /dev/null
then
    echo "[ERROR] npm was not found."
    echo
    echo "Try reinstalling Node.js."
    echo
    exit 1
fi

echo "[OK] npm found."
echo

# Check package.json
if [ ! -f "package.json" ]; then
    echo "[ERROR] package.json was not found."
    echo
    echo "package.json was not found next to this script."
    echo
    exit 1
fi

echo "[OK] Project found."
echo

# Install dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    echo

    npm install

    if [ $? -ne 0 ]; then
        echo
        echo "[ERROR] Failed to install dependencies."
        echo
        exit 1
    fi

    echo
    echo "[OK] Dependencies installed."
else
    echo "[OK] Dependencies are already installed."
fi

echo
echo "========================================"
echo "      Building project"
echo "========================================"
echo

npm run build
if [ $? -ne 0 ]; then
    echo
    echo "[ERROR] Build failed."
    exit 1
fi

echo
echo "========================================"
echo "      Starting production build"
echo "========================================"
echo

npm start