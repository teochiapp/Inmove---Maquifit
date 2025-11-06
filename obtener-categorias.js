/**
 * Script para obtener las categorías existentes en Strapi
 * Ejecutar con: node obtener-categorias.js
 * 
 * Este script te ayudará a identificar los IDs correctos de las categorías
 * para usarlos en el populate-productos.js
 */

const http = require('http');

// Función helper para hacer peticiones HTTP
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const reqOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            statusCode: res.statusCode,
            json: () => Promise.resolve(JSON.parse(data))
          });
        } catch (e) {
          reject(new Error('Error parsing response: ' + e.message));
        }
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function obtenerCategorias() {
  console.log('🔍 Obteniendo categorías de Strapi...\n');
  
  try {
    const response = await makeRequest('http://127.0.0.1:1337/api/categorias?populate=*');
    
    if (!response.ok) {
      console.error('❌ Error al obtener categorías. Código:', response.statusCode);
      return;
    }
    
    const data = await response.json();
    const categorias = data.data || [];
    
    console.log(`📦 Total de categorías encontradas: ${categorias.length}\n`);
    console.log('='.repeat(60));
    
    if (categorias.length === 0) {
      console.log('⚠️  No hay categorías creadas en Strapi.');
      console.log('   Crea las categorías primero en el admin de Strapi:\n');
      console.log('   1. Ve a http://localhost:1337/admin');
      console.log('   2. Content Manager → Categorias');
      console.log('   3. Crea las siguientes categorías:');
      console.log('      - Calzas largas');
      console.log('      - Tops');
      console.log('      - Remeras');
      console.log('      - Shorts');
      console.log('='.repeat(60));
      return;
    }
    
    // Mostrar categorías con formato
    categorias.forEach((cat, index) => {
      console.log(`\n${index + 1}. ${cat.Nombre || 'Sin nombre'}`);
      console.log(`   ID: ${cat.id}`);
      console.log(`   Document ID: ${cat.documentId}`);
      console.log(`   Slug: ${cat.Slug || 'N/A'}`);
      console.log(`   Orden: ${cat.Orden || 'N/A'}`);
    });
    
    console.log('\n' + '='.repeat(60));
    console.log('\n📝 Mapeo para populate-productos.js:\n');
    
    // Crear un mapeo sugerido
    const mapeo = {
      'Calzas largas': null,
      'Tops': null,
      'Remeras': null,
      'Shorts': null
    };
    
    categorias.forEach(cat => {
      const nombre = cat.Nombre || '';
      if (nombre.toLowerCase().includes('calza') && nombre.toLowerCase().includes('larga')) {
        mapeo['Calzas largas'] = cat.id;
      } else if (nombre.toLowerCase().includes('top')) {
        mapeo['Tops'] = cat.id;
      } else if (nombre.toLowerCase().includes('remera')) {
        mapeo['Remeras'] = cat.id;
      } else if (nombre.toLowerCase().includes('short')) {
        mapeo['Shorts'] = cat.id;
      }
    });
    
    console.log('Actualiza estos IDs en populate-productos.js:\n');
    Object.entries(mapeo).forEach(([nombre, id]) => {
      if (id) {
        console.log(`✓ ${nombre}: ID ${id}`);
      } else {
        console.log(`✗ ${nombre}: NO ENCONTRADA - Crear en Strapi`);
      }
    });
    
    console.log('\n' + '='.repeat(60));
    console.log('\n💡 Tip: Copia estos IDs y reemplázalos en el array de productos');
    console.log('   en el archivo populate-productos.js\n');
    
  } catch (error) {
    console.error('\n❌ Error al conectar con Strapi:', error.message);
    console.error('   Asegúrate de que Strapi esté corriendo en http://localhost:1337\n');
  }
}

obtenerCategorias();
