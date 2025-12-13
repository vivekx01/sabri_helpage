const http = require('http');

const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}`;

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Test configuration
const tests = [
  {
    name: 'Health Check',
    method: 'GET',
    path: '/',
    expectedStatus: 200,
    public: true,
  },
  {
    name: 'Get Blogs (Public)',
    method: 'GET',
    path: '/api/blogs',
    expectedStatus: 200,
    public: true,
  },
  {
    name: 'Get Events (Public)',
    method: 'GET',
    path: '/api/events',
    expectedStatus: 200,
    public: true,
  },
  {
    name: 'Get Stories (Public)',
    method: 'GET',
    path: '/api/stories',
    expectedStatus: 200,
    public: true,
  },
  {
    name: 'Get Teachers (Public)',
    method: 'GET',
    path: '/api/teachers',
    expectedStatus: 200,
    public: true,
  },
  {
    name: 'Get Contacts (Protected - Should Fail)',
    method: 'GET',
    path: '/api/contacts',
    expectedStatus: 401,
    public: true,
    shouldFail: true,
  },
  {
    name: 'Get Donors (Protected - Should Fail)',
    method: 'GET',
    path: '/api/donors',
    expectedStatus: 401,
    public: true,
    shouldFail: true,
  },
  {
    name: 'Get Volunteers (Protected - Should Fail)',
    method: 'GET',
    path: '/api/volunteers',
    expectedStatus: 401,
    public: true,
    shouldFail: true,
  },
  {
    name: 'Create Contact (Public Submission)',
    method: 'POST',
    path: '/api/contacts',
    body: JSON.stringify({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message from route test',
    }),
    expectedStatus: 201,
    public: true,
  },
  {
    name: 'Create Donor (Public Submission)',
    method: 'POST',
    path: '/api/donors',
    body: JSON.stringify({
      name: 'Test Donor',
      email: 'donor@example.com',
      phone: '1234567890',
      amount: 100,
    }),
    expectedStatus: 201,
    public: true,
  },
  {
    name: 'Create Blog (Protected - Should Fail)',
    method: 'POST',
    path: '/api/blogs',
    body: JSON.stringify({
      title: 'Test Blog',
      content: 'Test content',
      author: 'Test Author',
    }),
    expectedStatus: 401,
    public: true,
    shouldFail: true,
  },
  {
    name: 'Create Event (Protected - Should Fail)',
    method: 'POST',
    path: '/api/events',
    body: JSON.stringify({
      title: 'Test Event',
      description: 'Test description',
      year: 2024,
      month: 1,
    }),
    expectedStatus: 401,
    public: true,
    shouldFail: true,
  },
  {
    name: 'Register User (Protected - Requires Super-Admin)',
    method: 'POST',
    path: '/api/auth/register',
    body: JSON.stringify({
      name: `Test User ${Date.now()}`,
      email: `test${Date.now()}@example.com`,
      password: 'test123456',
      role: 'editor',
    }),
    expectedStatus: 401,
    public: true,
    shouldFail: true,
  },
  {
    name: '404 Test',
    method: 'GET',
    path: '/api/nonexistent',
    expectedStatus: 404,
    public: true,
  },
];

function makeRequest(test) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + test.path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: test.method,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    };

    if (test.body) {
      options.headers['Content-Length'] = Buffer.byteLength(test.body);
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data,
          headers: res.headers,
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (test.body) {
      req.write(test.body);
    }

    req.end();
  });
}

async function runTests() {
  log('\n🧪 Testing Backend Routes\n', 'cyan');
  log('='.repeat(60), 'cyan');

  let passed = 0;
  let failed = 0;
  let skipped = 0;

  for (const test of tests) {
    try {
      const result = await makeRequest(test);
      const success = result.status === test.expectedStatus;
      
      if (success) {
        if (test.shouldFail) {
          log(`✅ ${test.name}`, 'green');
          log(`   Status: ${result.status} (Correctly rejected)`, 'green');
        } else {
          log(`✅ ${test.name}`, 'green');
          log(`   Status: ${result.status}`, 'green');
          try {
            const json = JSON.parse(result.data);
            if (json.data && Array.isArray(json.data)) {
              log(`   Items: ${json.data.length}`, 'blue');
            } else if (json.data && json.data._id) {
              log(`   Created: ${json.data.name || json.data.title || 'Success'}`, 'blue');
            } else if (json.message) {
              log(`   Message: ${json.message}`, 'blue');
            }
          } catch (e) {
            // Not JSON, skip
          }
        }
        passed++;
      } else {
        log(`❌ ${test.name}`, 'red');
        log(`   Expected: ${test.expectedStatus}, Got: ${result.status}`, 'red');
        try {
          const json = JSON.parse(result.data);
          if (json.error) {
            log(`   Error: ${json.error}`, 'yellow');
          }
        } catch (e) {
          // Not JSON
        }
        failed++;
      }
    } catch (error) {
      if (error.message.includes('ECONNREFUSED')) {
        log(`⚠️  ${test.name}`, 'yellow');
        log(`   Server not running. Start server with: node server.js`, 'yellow');
        skipped++;
      } else {
        log(`❌ ${test.name}`, 'red');
        log(`   Error: ${error.message}`, 'red');
        failed++;
      }
    }
    log('');
  }

  log('='.repeat(60), 'cyan');
  log(`\n📊 Results:`, 'cyan');
  log(`   ✅ Passed: ${passed}`, 'green');
  log(`   ❌ Failed: ${failed}`, failed > 0 ? 'red' : 'green');
  log(`   ⚠️  Skipped: ${skipped}`, skipped > 0 ? 'yellow' : 'green');
  
  if (failed === 0 && skipped === 0) {
    log('\n🎉 All tests passed!', 'green');
  } else if (skipped > 0) {
    log('\n⚠️  Some tests skipped. Make sure server is running.', 'yellow');
  } else {
    log('\n⚠️  Some tests failed. Check the errors above.', 'yellow');
  }
  log('');
}

// Wait a bit for server to start, then run tests
setTimeout(() => {
  runTests().catch(console.error);
}, 2000);
