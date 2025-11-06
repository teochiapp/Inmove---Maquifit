const https = require('https');
const http = require('http');

// Función para hacer peticiones HTTP/HTTPS
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.request(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });
    
    req.on('error', reject);
    req.end();
  });
}

async function testAPI() {
  const STRAPI_URL = 'https://admin.inmove.com.ar';
  
  console.log('🔍 Probando conexión a producción...');
  console.log('📍 URL:', STRAPI_URL);
  console.log('============================================================\n');
  
  try {
    // Test 1: URL base
    console.log('1️⃣  Probando URL base...');
    const baseResponse = await makeRequest(STRAPI_URL);
    console.log(`   Status: ${baseResponse.statusCode}`);
    console.log(`   Content-Type: ${baseResponse.headers['content-type'] || 'No especificado'}`);
    console.log(`   Primeros 200 caracteres: ${baseResponse.data.substring(0, 200)}...\n`);
    
    // Test 2: API productos
    console.log('2️⃣  Probando API de productos...');
    const apiResponse = await makeRequest(`${STRAPI_URL}/api/productos`);
    console.log(`   Status: ${apiResponse.statusCode}`);
    console.log(`   Content-Type: ${apiResponse.headers['content-type'] || 'No especificado'}`);
    console.log(`   Primeros 200 caracteres: ${apiResponse.data.substring(0, 200)}...\n`);
    
    // Test 3: API con parámetros
    console.log('3️⃣  Probando API con parámetros...');
    const apiPopulateResponse = await makeRequest(`${STRAPI_URL}/api/productos?populate=*`);
    console.log(`   Status: ${apiPopulateResponse.statusCode}`);
    console.log(`   Content-Type: ${apiPopulateResponse.headers['content-type'] || 'No especificado'}`);
    console.log(`   Primeros 200 caracteres: ${apiPopulateResponse.data.substring(0, 200)}...\n`);
    
    // Test 4: API variantes
    console.log('4️⃣  Probando API de variantes...');
    const variantesResponse = await makeRequest(`${STRAPI_URL}/api/variantes`);
    console.log(`   Status: ${variantesResponse.statusCode}`);
    console.log(`   Content-Type: ${variantesResponse.headers['content-type'] || 'No especificado'}`);
    console.log(`   Primeros 200 caracteres: ${variantesResponse.data.substring(0, 200)}...\n`);
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.error('\n⚠️  Posibles causas:');
    console.error('   1. El dominio no existe o no es accesible');
    console.error('   2. No hay conexión a internet');
    console.error('   3. El servidor Strapi está caído');
    console.error('   4. Problemas de DNS o firewall');
  }
}

console.log('🚀 Test de API - Producción Inmove\n');
testAPI();
