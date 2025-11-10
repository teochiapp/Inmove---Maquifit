/**
 * Script para actualizar/crear productos en Strapi - PRODUCCIÓN
 * Ejecutar con: node populate-productos.js
 * 
 * IMPORTANTE: Crea productos con sus campos (Nombre, Descripcion, Precio, GuiaTalles)
 * y sus variantes (Nombre, Color, Talla, Stock)
 * Las imágenes y categorías deben asignarse manualmente en el admin de Strapi
 * 
 * URL de producción: https://admin.inmove.com.ar
 * 
 * Productos actualizados:
 * - 4 Calzas largas (Power lycra, Morley, Glossy Forest, Pampa cruzada)
 * - 2 Tops (Morley, Ross)
 * - 1 Remera (Gigi)
 * - 6 Shorts (Lycra, Batik, doble frunce, frunce rayas, frunce prelavado, negro sin frunce)
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

// Productos reales con variantes
// Nota: Los productos con el mismo nombre pero diferente color se manejan con variantes
const productos = [
    // --- CALZAS LARGAS ---
    {
        Nombre: "Calza Power lycra",
        Precio: 27000,
        Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Calza larga con bolsillo." }] }],
        GuiaTalles: "S: corresponde a 36-38 de jeans",
        variantes: [
            { Nombre: "Calza Power lycra - negra", Color: "negra", Talles: "1S" }, 
            { Nombre: "Calza Power lycra - bordó", Color: "bordó", Talles: "3S" }
        ]
    },
    {
        Nombre: "Calza Morley",
        Precio: 26000,
        Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Calza de tela morley." }] }],
        GuiaTalles: "S: corresponde a 36-38 de jeans / M: 40-42 / L: 44-46",
        variantes: [
            { Nombre: "Calza Morley - chocolate", Color: "chocolate", Talles: "2S-1M" }
        ]
    },
    {
        Nombre: "Calza Glossy Forest",
        Precio: 38000,
        Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Calza lycra premium con brillo." }] }],
        GuiaTalles: "M: 38-40 / L: 40-42",
        variantes: [
            { Nombre: "Calza Glossy Forest - verde", Color: "verde", Talles: "1M-1L" }
        ]
    },
    {
        Nombre: "Calza Pampa cruzada", 
        Precio: 25000,
        Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Tela morley calce al cuerpo." }] }],
        GuiaTalles: "S: corresponde a 36-38 / M: 40-42",
        variantes: [
            { Nombre: "Calza Pampa cruzada - negra", Color: "negra", Talles: "1S-1M" }, 
            { Nombre: "Calza Pampa cruzada - petroleo", Color: "petroleo", Talles: "1M" } 
        ]
    },


    // --- TOPS ---
    {
        Nombre: "Top Morley",
        Precio: 17000,
        Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Top deportivo de tela morley." }] }],
        GuiaTalles: "",
        variantes: [
            { Nombre: "Top Morley - chocolate", Color: "chocolate", Talles: "1S-2M" }
        ]
    },
    {
        Nombre: "Top Ross",
        Precio: 18000, 
        Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Tela lycra pesada negra, super elastizado, se adapta bien a tu cuerpo, frente doble tela apertura para tasas desmontables, tiras regulables." }] }],
        GuiaTalles: "",
        variantes: [
            { Nombre: "Top Ross - negro", Color: "negro", Talles: "0S" } 
        ]
    },


    // --- REMERAS ---
    {
        Nombre: "Remera Gigi",
        Precio: 25000,
        Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Cuello en V, corte holgado." }] }],
        GuiaTalles: "",
        variantes: [
            { Nombre: "Remera Gigi - Greige", Color: "Greige", Talles: "2M" },
            { Nombre: "Remera Gigi - Chocolate", Color: "Chocolate", Talles: "2M" }
        ]
    },
    
    // --- SHORTS ---
    {
        Nombre: "Short Lycra",
        Precio: 21000,
        Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Cintura alta con diferentes cortes. Largo entrepierna 13 cm." }] }],
        GuiaTalles: "S: 36-38 / M: 40-42", 
        variantes: [
            { Nombre: "Short Lycra - Vison", Color: "Vison", Talles: "2S-3M-4L-3XL-3XXL" }, 
            { Nombre: "Short Lycra - Azul noche", Color: "Azul noche", Talles: "0S-3XL" }, 
            { Nombre: "Short Lycra - Bordó", Color: "Bordó", Talles: "2S-2M-2L-2XL-2XXL" }
        ]
    },
    {
        Nombre: "Short Batik",
        Precio: 23000, 
        Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Short con estampado Batik." }] }],
        GuiaTalles: "",
        variantes: [
            { Nombre: "Short Batik - Único", Color: "Único", Talles: "3S/M-3L/XL" }
        ]
    },
    {
        Nombre: "Short con doble frunce",
        Precio: 23000, 
        Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Short con detalle de doble frunce." }] }],
        GuiaTalles: "",
        variantes: [
            { Nombre: "Short con doble frunce - Único", Color: "Único", Talles: "4S/M-6L/XL" }
        ]
    },
    {
        Nombre: "Short frunce rayas",
        Precio: 23000, 
        Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Short con frunce y patrón de rayas." }] }],
        GuiaTalles: "",
        variantes: [
            { Nombre: "Short frunce rayas - Único", Color: "Único", Talles: "3S/M-5L/XL" }
        ]
    },
    {
        Nombre: "Short frunce prelavado",
        Precio: 23000, 
        Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Short con frunce y acabado prelavado." }] }],
        GuiaTalles: "",
        variantes: [
            { Nombre: "Short frunce prelavado - Único", Color: "Único", Talles: "3S/M-1L/XL" }
        ]
    },
    {
        Nombre: "Short negro sin frunce",
        Precio: 23000, 
        Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Short negro básico, tiro alto, sin frunce." }] }],
        GuiaTalles: "",
        variantes: [
            { Nombre: "Short negro sin frunce - negro", Color: "negro", Talles: "2S-0M-1L-1XL" }
        ]
    }
];

async function actualizarOCrearProductos() {
  console.log('🚀 Iniciando actualización/creación de productos con variantes...');
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
        const { variantes, ...productoData } = producto;
        
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
          for (const variante of variantes) {
            // Parsear talles de la variante
            const tallesMatch = variante.Talles.match(/(\d+)?([A-Z]+)/g);
            let tallesArray = [];
            
            if (tallesMatch) {
              tallesMatch.forEach(t => {
                const talle = t.replace(/\d+/, ''); // Remover números
                tallesArray.push(talle);
              });
            } else {
              tallesArray = [variante.Talles];
            }
            
            // Crear una variante por cada talle
            for (const talla of tallesArray) {
              try {
                const nombreConTalle = `${variante.Nombre} - Talle ${talla}`;

                const varianteResponse = await makeRequest(`${STRAPI_URL}/api/variantes`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ 
                    data: {
                      Nombre: nombreConTalle,
                      Color: variante.Color,
                      Talla: talla,
                      Stock: 10, // Stock por defecto
                      producto: productoId // Vincular con el producto
                    }
                  })
                });
                
                if (varianteResponse.ok) {
                  variantesCreadas++;
                  console.log(`      ✓ Variante creada: ${nombreConTalle}`);
                } else {
                  const error = await varianteResponse.json();
                  console.error(`      ✗ Error creando variante ${variante.Nombre}:`, error.error?.message || 'Error desconocido');
                }
              } catch (error) {
                console.error(`      ✗ Error creando variante ${variante.Nombre}:`, error.message);
              }
            }
          }
        }
        
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
    console.log('  • Calzas largas - 4 productos');
    console.log('  • Tops - 2 productos');
    console.log('  • Remeras - 1 producto');
    console.log('  • Shorts - 6 productos');
    console.log('\n🔗 Verifica los productos en producción:');
    console.log('   https://admin.inmove.com.ar/api/productos?populate=*');
    console.log('\n⚠️  IMPORTANTE - Pasos siguientes:');
    console.log('   1. Ve a https://admin.inmove.com.ar/admin');
    console.log('   2. Asigna las categorías manualmente a cada producto');
    console.log('   3. Verifica que las variantes estén vinculadas correctamente');
    console.log('   4. Sube las imágenes de portada y galería');
    console.log('   5. Publica los productos\n');
    
  } catch (error) {
    console.error('\n❌ Error fatal al obtener productos existentes:', error.message);
    console.error('   Asegúrate de que Strapi esté corriendo en https://admin.inmove.com.ar\n');
  }
}

actualizarOCrearProductos();
