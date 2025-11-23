# Render Build Script

echo "🚀 Starting Render build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if all required files are present
echo "✅ Checking required files..."
if [ ! -f "index.html" ]; then
    echo "❌ index.html not found!"
    exit 1
fi

if [ ! -f "js/server.js" ]; then
    echo "❌ js/server.js not found!"
    exit 1
fi

if [ ! -f "package.json" ]; then
    echo "❌ package.json not found!"
    exit 1
fi

# Verify Node.js version
echo "🔍 Node.js version:"
node --version

# Verify npm version
echo "🔍 npm version:"
npm --version

echo "✅ Build completed successfully!"
echo "🌐 Ready to start server with: npm start"