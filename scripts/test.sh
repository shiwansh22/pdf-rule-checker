# Test script for NIYAMR PDF Rule Checker

set -e

echo "🧪 Testing NIYAMR PDF Rule Checker"
echo "===================================="
echo ""

# Unit tests
echo "Running backend unit tests..."
docker-compose exec -T backend npm test

echo ""
echo "✅ All tests passed!"
