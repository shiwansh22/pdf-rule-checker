# Setup script for NIYAMR PDF Rule Checker

set -e

echo "🚀 NIYAMR PDF Rule Checker - Setup"
echo "=================================="
echo ""

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker first."
    exit 1
fi

echo "✓ Docker found"

# Check .env
if [ ! -f .env ]; then
    echo "⚠️  .env file not found"
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo ""
    echo "❌ Please edit .env and add your OPENAI_API_KEY"
    echo "Then run: docker-compose up --build"
    exit 1
fi

# Check API key
if grep -q "your_openai_api_key_here" .env; then
    echo "❌ Please update OPENAI_API_KEY in .env file"
    exit 1
fi

echo "✓ .env configured"
echo ""

# Build and start
echo "📦 Building Docker images..."
docker-compose build --quiet

echo "✓ Build complete"
echo ""

echo "🎬 Starting services..."
docker-compose up -d

# Wait for backend
echo "⏳ Waiting for backend to be ready..."
for i in {1..30}; do
    if curl -s http://localhost:5000/api/health > /dev/null; then
        echo "✓ Backend is ready"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Backend failed to start"
        docker-compose logs backend
        exit 1
    fi
    sleep 1
done

echo ""
echo "✅ Setup complete!"
echo ""
echo "Opening http://localhost:3000 in browser..."
echo "If browser doesn't open, visit: http://localhost:3000"
echo ""
echo "To stop: docker-compose down"
echo "To view logs: docker-compose logs -f"
