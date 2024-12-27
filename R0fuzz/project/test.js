import fetch from 'node-fetch';

async function testAnalysis() {
  try {
    const response = await fetch('http://localhost:3000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        extensionPath: './test-extension'
      })
    });
    
    const result = await response.json();
    console.log('Analysis Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testAnalysis();