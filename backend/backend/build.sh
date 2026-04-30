#!/bin/bash

# Build script for Render deployment
# This script builds both frontend and backend

echo "🔨 Building Job Portal Application..."
echo ""

# Build Frontend
echo "📦 Building Frontend..."
cd frontend
npm install
npm run build
cd ..

echo ""
echo "✅ Frontend build complete!"
echo ""

# Backend is already ready (no build needed for Node.js)
echo "✅ Backend is ready!"
echo ""

echo "🎉 Build complete! Application is ready for deployment."
