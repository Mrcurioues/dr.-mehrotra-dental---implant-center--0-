#!/bin/bash

# Dr. Mehrotra Dental - Production Deployment Script
# This script prepares the application for production deployment

set -e  # Exit on error

echo "========================================"
echo "🚀 Dr. Mehrotra Dental - Deploy Script"
echo "========================================"
echo ""

# Check Node.js version
echo "✓ Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "  Using: $NODE_VERSION"
echo ""

# Check if .env.local or .env exists
echo "✓ Checking environment configuration..."
if [ ! -f ".env.local" ] && [ ! -f ".env" ]; then
    echo "  ⚠️  Warning: No .env.local or .env file found"
    echo "  Please create .env.local with required environment variables"
    echo "  See ENVIRONMENT_SETUP.md for details"
    exit 1
fi
echo "  ✓ Environment file found"
echo ""

# Install dependencies
echo "✓ Installing dependencies..."
npm install
echo "  ✓ Dependencies installed"
echo ""

# Run linting
echo "✓ Running linting checks..."
npm run lint || echo "  ⚠️  Lint warnings found (non-blocking)"
echo "  ✓ Linting complete"
echo ""

# Clean previous build
echo "✓ Cleaning previous builds..."
npm run clean
echo "  ✓ Build cleaned"
echo ""

# Build for production
echo "✓ Building for production..."
npm run build
echo "  ✓ Build successful"
echo ""

# Verify dist folder
if [ ! -d "dist" ]; then
    echo "  ✗ Error: dist folder not created"
    exit 1
fi
echo "  ✓ Build output verified"
echo ""

# Display build stats
echo "Build Statistics:"
DIST_SIZE=$(du -sh dist | cut -f1)
echo "  - Build size: $DIST_SIZE"
FILE_COUNT=$(find dist -type f | wc -l)
echo "  - Files: $FILE_COUNT"
echo ""

# Test production server (optional)
echo "✓ Production build ready!"
echo ""
echo "Next steps:"
echo "  1. Test locally: npm start"
echo "  2. Deploy to your hosting platform"
echo "  3. Run DEPLOYMENT_CHECKLIST.md"
echo ""
echo "========================================"
echo "✨ Ready for deployment!"
echo "========================================"
