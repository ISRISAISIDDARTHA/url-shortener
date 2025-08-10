import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000';

async function testEndpoints() {
  console.log('🧪 Testing URL Shortener Backend Endpoints...\n');

  try {
    // Test root endpoint
    console.log('1. Testing GET /');
    const rootResponse = await fetch(`${BASE_URL}/`);
    const rootData = await rootResponse.json();
    console.log(`   Status: ${rootResponse.status}`);
    console.log(`   Response:`, rootData);
    console.log('');

    // Test health endpoint
    console.log('2. Testing GET /health');
    const healthResponse = await fetch(`${BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log(`   Status: ${healthResponse.status}`);
    console.log(`   Response:`, healthData);
    console.log('');

    // Test non-existent endpoint
    console.log('3. Testing GET /nonexistent (should return 404)');
    const notFoundResponse = await fetch(`${BASE_URL}/nonexistent`);
    const notFoundData = await notFoundResponse.json();
    console.log(`   Status: ${notFoundResponse.status}`);
    console.log(`   Response:`, notFoundData);
    console.log('');

    console.log('✅ All tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure the server is running on port 5000');
    console.log('   Run: npm start');
  }
}

testEndpoints(); 