/**
 * Script para actualizar/crear productos en Strapi - PRODUCCIÓN (SIN GuiaTalles)
 * Ejecutar con: node populate-productos-sin-guiatalles.js
 * 
 * IMPORTANTE: Crea productos con sus campos (Nombre, Descripcion, Precio)
 * y sus variantes (Color, Talla, Stock, Nombre)
 * Las imágenes y categorías deben asignarse manualmente en el admin de Strapi
 * 
 * URL de producción: https://admin.inmove.com.ar
 */

const https = require('https');
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

    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.request(reqOptions, (res) => {
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

// Productos reales con variantes (SIN GuiaTalles)
const productos = [
  // Calzas largas (ID: 28)
  {
    Nombre: "Calza Power lycra",
    Precio: 27000,
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "calza larga con bolsillo" }] }],
    CategoriaProducto: 28,
    variantes: [
      { Color: "negra", Talles: "1S" },
      { Color: "bordó", Talles: "3S" }
    ]
  },
  {
    Nombre: "Calza Morley chocolate",
    Precio: 26000,
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Calza de tela morley" }] }],
    CategoriaProducto: 28,
    variantes: [
      { Color: "chocolate", Talles: "2S-1M" }
    ]
  },
  {
    Nombre: "Calza Glossy",
    Precio: 38000,
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "calza lycra premiun con brillo" }] }],
    CategoriaProducto: 28,
    variantes: [
      { Color: "verde", Talles: "2S-2M" },
      { Color: "negra", Talles: "1S" }
    ]
  },
  {
    Nombre: "Calza Pampa cruzada",
    Precio: 25000,
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Tela morley calce al cuerpo" }] }],
    CategoriaProducto: 28,
    variantes: [
      { Color: "negra", Talles: "1S-1M" },
      { Color: "petroleo", Talles: "1M" }
    ]
  },

  // Tops (ID: 5)
  {
    Nombre: "Top Morley chocolate",
    Precio: 17000,
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Top deportivo de tela morley" }] }],
    CategoriaProducto: 5,
    variantes: [
      { Color: "chocolate", Talles: "1S-2M" }
    ]
  },
  {
    Nombre: "Top One hombro",
    Precio: 18000,
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "lycra reforzada" }] }],
    CategoriaProducto: 5,
    variantes: [
      { Color: "Negro", Talles: "2S-1M" },
      { Color: "Chocolate", Talles: "1S-1M" }
    ]
  },

  // Remeras (ID: 3)
  {
    Nombre: "Remera Gigi",
    Precio: 25000,
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "cuello en v , corte holgado" }] }],
    CategoriaProducto: 3,
    variantes: [
      { Color: "Greige", Talles: "1S-1M" },
      { Color: "Chocolate", Talles: "1S-1M" }
    ]
  },
  {
    Nombre: "Remera Cropped Mora",
    Precio: 22000,
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "manga corta algodón" }] }],
    CategoriaProducto: 3,
    variantes: [
      { Color: "Negra", Talles: "1S-1M" },
      { Color: "Chocolate", Talles: "1S" }
    ]
  },

  // Shorts (ID: 31)
  {
    Nombre: "Short Urban",
    Precio: 23000,
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "tiro alto viscosa elastizada" }] }],
    CategoriaProducto: 31,
    variantes: [
      { Color: "Negro", Talles: "1M" },
      { Color: "Chocolate", Talles: "1M" },
      { Color: "Greige", Talles: "1M" }
    ]
  },
  {
    Nombre: "Short Lycra",
    Precio: 21000,
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "cintura alta con diferentes cortes" }] }],
    CategoriaProducto: 31,
    variantes: [
      { Color: "Negro", Talles: "2S-1M" },
      { Color: "Bordó", Talles: "1S-1M" },
      { Color: "Petroleo", Talles: "1M" },
      { Color: "Negro corte cintura 2", Talles: "M" }
    ]
  }
];

async function actualizarOCrearProductos() {
  console.log('🚀 Iniciando actualización/creación de productos con variantes (SIN GuiaTalles)...');
  console.log('📥 Obteniendo productos y variantes existentes...\n');
  
  try {
    // URL de la API de Strapi
    const STRAPI_URL = 'https://admin.inmove.com.ar'; // Producción
    
    // Obtener todos los productos existentes
    const response = await makeRequest(`${STRAPI_URL}/api/productos?populate=*`);
    const data = await response.json();
    const productosExistentes = data.data || [];
    
    console.log(`📦 Productos existentes: ${productosExistentes.length}`);
    console.log(`📦 Productos en el script: ${productos.length}\n`);
    
    let actualizados = 0;
    let creados = 0;
    let fallidos = 0;
    let variantesCreadas = 0;
    
    for (const producto of productos) {
      try {
        // Buscar si el producto ya existe por Nombre
        const productoExistente = productosExistentes.find(p => p.Nombre === producto.Nombre);
        
        // Separar variantes del resto de datos
        const { CategoriaProducto, variantes, ...productoData } = producto;
        const categoriaId = CategoriaProducto;
        
        let productoId = null;
        
        if (productoExistente) {
          // ACTUALIZAR producto existente
          const updateResponse = await makeRequest(`${STRAPI_URL}/api/productos/${productoExistente.documentId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: productoData })
          });
          
          if (updateResponse.ok) {
            actualizados++;
            productoId = productoExistente.documentId;
            console.log(`🔄 [${actualizados + creados}/${productos.length}] Actualizado: ${producto.Nombre}`);
          } else {
            fallidos++;
            const error = await updateResponse.json();
            console.error(`❌ Error actualizando ${producto.Nombre}:`, error.error?.message || 'Error desconocido');
            continue;
          }
        } else {
          // CREAR nuevo producto
          const createResponse = await makeRequest(`${STRAPI_URL}/api/productos`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: productoData })
          });
          
          if (createResponse.ok) {
            const result = await createResponse.json();
            creados++;
            productoId = result.data.documentId;
            console.log(`✅ [${actualizados + creados}/${productos.length}] Creado: ${producto.Nombre}`);
          } else {
            fallidos++;
            const error = await createResponse.json();
            console.error(`❌ Error creando ${producto.Nombre}:`, error.error?.message || 'Error desconocido');
            continue;
          }
        }
        
        // Crear variantes para este producto
        if (variantes && variantes.length > 0 && productoId) {
          console.log(`   📝 Creando ${variantes.length} variante(s) para ${producto.Nombre}...`);
          
          // Separar talles y colores
          const tallasSet = new Set();
          const coloresSet = new Set();
          
          variantes.forEach(v => {
            coloresSet.add(v.Color);
            // Parsear talles (ej: "2S-1M" -> ["S", "M"])
            const tallesMatch = v.Talles.match(/(\d+)?([A-Z]+)/g);
            if (tallesMatch) {
              tallesMatch.forEach(t => {
                const talle = t.replace(/\d+/, ''); // Remover números
                tallasSet.add(talle);
              });
            } else {
              // Si no tiene formato especial, agregar tal cual
              tallasSet.add(v.Talles);
            }
          });
          
          const colores = Array.from(coloresSet);
          const talles = Array.from(tallasSet);
          
          // Crear una variante por cada combinación de color y talle
          for (const color of colores) {
            for (const talla of talles) {
              try {
                // Generar nombre descriptivo: Color/Talla
                const nombreVariante = `${color}/${talla}`;
                
                const varianteResponse = await makeRequest(`${STRAPI_URL}/api/variantes`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ 
                    data: {
                      Nombre: nombreVariante,
                      Color: color,
                      Talla: talla,
                      Stock: 10, // Stock por defecto
                      producto: productoId // Vincular con el producto
                    }
                  })
                });
                
                if (varianteResponse.ok) {
                  variantesCreadas++;
                  console.log(`      ✓ Variante creada: ${nombreVariante}`);
                } else {
                  const error = await varianteResponse.json();
                  console.error(`      ✗ Error creando variante ${nombreVariante}:`, error.error?.message || 'Error desconocido');
                }
              } catch (error) {
                console.error(`      ✗ Error creando variante ${nombreVariante}:`, error.message);
              }
            }
          }
        }
        
        // Nota sobre asignación de categoría
        console.log(`   ⚠️  Asignar manualmente Categoría ID: ${categoriaId}\n`);
        
      } catch (error) {
        fallidos++;
        console.error(`❌ Error procesando ${producto.Nombre}:`, error.message);
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('🎉 Proceso completado!');
    console.log('='.repeat(60));
    console.log(`🔄 Actualizados: ${actualizados}`);
    console.log(`✅ Creados: ${creados}`);
    console.log(`❌ Fallidos: ${fallidos}`);
    console.log(`🎨 Variantes creadas: ${variantesCreadas}`);
    console.log(`📊 Total procesados: ${actualizados + creados} de ${productos.length}`);
    console.log('\n📋 Distribución por categoría:');
    console.log('  • Calzas largas (ID: 28) - 4 productos');
    console.log('  • Tops (ID: 5) - 2 productos');
    console.log('  • Remeras (ID: 3) - 2 productos');
    console.log('  • Shorts (ID: 31) - 2 productos');
    console.log('\n🔗 Verifica los productos en producción:');
    console.log('   https://admin.inmove.com.ar/api/productos?populate=*');
    console.log('\n⚠️  IMPORTANTE - Pasos siguientes:');
    console.log('   1. Ve a https://admin.inmove.com.ar/admin');
    console.log('   2. Asigna las categorías manualmente a cada producto');
    console.log('   3. Vincula las variantes a sus productos correspondientes');
    console.log('   4. Sube las imágenes de portada y galería');
    console.log('   5. Publica los productos\n');
    
  } catch (error) {
    console.error('\n❌ Error fatal al obtener productos existentes:', error.message);
    console.error('   Asegúrate de que Strapi esté corriendo en https://admin.inmove.com.ar\n');
  }
}

actualizarOCrearProductos();
