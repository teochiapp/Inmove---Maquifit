const https = require('https');

// Función para hacer peticiones HTTPS
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            json: () => Promise.resolve(JSON.parse(data))
          });
        } catch (e) {
          reject(new Error('Error parsing JSON: ' + e.message));
        }
      });
    });
    
    req.on('error', reject);
    req.end();
  });
}

async function testSchema() {
  const STRAPI_URL = 'https://admin.inmove.com.ar';
  
  console.log('🔍 Verificando schema de productos en producción...');
  console.log('📍 URL:', STRAPI_URL);
  console.log('============================================================\n');
  
  try {
    // Obtener un producto existente para ver su estructura
    console.log('📋 Obteniendo estructura de productos existentes...');
    const response = await makeRequest(`${STRAPI_URL}/api/productos?populate=*`);
    
    if (response.statusCode === 200) {
      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        const primerProducto = data.data[0];
        console.log('✅ Productos encontrados:', data.data.length);
        console.log('\n📊 Campos del primer producto:');
        
        Object.keys(primerProducto).forEach(key => {
          console.log(`   • ${key}: ${typeof primerProducto[key]}`);
        });
        
        if (primerProducto.attributes) {
          console.log('\n📊 Campos en attributes:');
          Object.keys(primerProducto.attributes).forEach(key => {
            const value = primerProducto.attributes[key];
            const type = typeof value;
            console.log(`   • ${key}: ${type} ${Array.isArray(value) ? '(array)' : ''}`);
          });
        }
        
        console.log('\n🔍 ¿Tiene GuiaTalles?');
        console.log(`   • En objeto raíz: ${primerProducto.hasOwnProperty('GuiaTalles') ? '✅ Sí' : '❌ No'}`);
        console.log(`   • En attributes: ${primerProducto.attributes && primerProducto.attributes.hasOwnProperty('GuiaTalles') ? '✅ Sí' : '❌ No'}`);
        
      } else {
        console.log('❌ No hay productos en producción');
      }
    } else {
      console.log(`❌ Error al obtener productos: ${response.statusCode}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

console.log('🚀 Test Schema - Producción Inmove\n');
testSchema();
