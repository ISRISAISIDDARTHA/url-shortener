#!/bin/bash

echo "🚀 URL Shortener Deployment Script"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Build Frontend
echo "📦 Building Frontend..."
cd frontend
npm install
npm run build
echo "✅ Frontend built successfully"

# Check Backend
echo "🔧 Checking Backend..."
cd ../backend
npm install
echo "✅ Backend dependencies installed"

# Create production .env template
echo "📝 Creating production .env template..."
cat > .env.production << EOF
# Production Environment Variables
PORT=5000
BASE_URL=https://your-backend-url.railway.app
MONGO_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
DEBUG=false
EOF

echo "✅ Production .env template created"

echo ""
echo "🎉 Build completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Push your code to GitHub"
echo "2. Deploy backend to Railway/Render"
echo "3. Deploy frontend to Vercel/Netlify"
echo "4. Update environment variables"
echo "5. Test your deployed app"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions" 