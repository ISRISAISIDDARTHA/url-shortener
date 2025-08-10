#!/bin/bash
set -e

echo "🔧 Installing dependencies..."
npm install

echo "🚀 Building React app..."
npx react-scripts build

echo "✅ Build completed successfully!" 