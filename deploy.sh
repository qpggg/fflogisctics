#!/bin/bash

# Deploy script for logistics app on VDS server
# Usage: ./deploy.sh

set -e

echo "🚀 Starting deployment..."

# Build the application
echo "📦 Building application..."
npm run build

# Install production dependencies
echo "📥 Installing production dependencies..."
npm ci --only=production

# Create logs directory if it doesn't exist
mkdir -p logs

# Restart PM2 process
echo "🔄 Restarting PM2 process..."
pm2 restart ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Check PM2 status
echo "📊 PM2 Status:"
pm2 status

echo "✅ Deployment completed successfully!"
echo "🌐 Your app should be running on port 3000"
echo "🔒 Make sure Nginx is configured and SSL certificates are set up"
