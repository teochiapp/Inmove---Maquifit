/**
 * Script para actualizar/crear productos en Strapi
 * Ejecutar con: node populate-productos.js
 * 
 * IMPORTANTE: Solo crea los campos básicos (Nombre, Descripcion, CategoriaProducto)
 * Las imágenes deben subirse manualmente en el admin de Strapi
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

const productos = [
  // Bikinis (ID: 38) - 4 productos
  {
    Nombre: "Bikini Deportivo Coral",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Bikini ideal para deportes acuáticos con excelente soporte. Talle: S/M/L. Color: Coral." }] }],
    CategoriaProducto: 38
  },
  {
    Nombre: "Bikini Clásico Negro",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Diseño elegante y atemporal para playa. Talle: S/M/L/XL. Color: Negro." }] }],
    CategoriaProducto: 38
  },
  {
    Nombre: "Bikini Tropical Print",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Estampado tropical vibrante para verano. Talle: S/M/L. Color: Multicolor." }] }],
    CategoriaProducto: 38
  },
  {
    Nombre: "Bikini High Waist",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Tiro alto retro con soporte adicional. Talle: XS/S/M/L. Color: Blanco." }] }],
    CategoriaProducto: 38
  },
  
  // Calzas cortas/Shorts (ID: 31) - 4 productos
  {
    Nombre: "Short Deportivo Running",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Perfecto para correr y entrenamientos intensos. Talle: S/M/L. Color: Negro." }] }],
    CategoriaProducto: 31
  },
  {
    Nombre: "Short Compresión Pro",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Tecnología de compresión para mejor rendimiento. Talle: XS/S/M/L/XL. Color: Azul Marino." }] }],
    CategoriaProducto: 31
  },
  {
    Nombre: "Short Bike Negro",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Estilo ciclista para máxima comodidad. Talle: S/M/L. Color: Negro." }] }],
    CategoriaProducto: 31
  },
  {
    Nombre: "Short 2 en 1 Training",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Doble capa para mayor versatilidad. Talle: M/L/XL. Color: Gris." }] }],
    CategoriaProducto: 31
  },
  
  // Calzas largas (ID: 28) - 4 productos
  {
    Nombre: "Calza Under Armour Pro",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "La mejor opción para tu entrenamiento. Talle: S/M/L/XL. Color: Negro." }] }],
    CategoriaProducto: 28
  },
  {
    Nombre: "Calza High Waist Negro",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Tiro alto con control de abdomen. Talle: XS/S/M/L. Color: Negro." }] }],
    CategoriaProducto: 28
  },
  {
    Nombre: "Calza Seamless Rosa",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Sin costuras para máxima comodidad. Talle: S/M/L. Color: Rosa." }] }],
    CategoriaProducto: 28
  },
  {
    Nombre: "Calza Estampada Gym",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Diseño único con estampado geométrico. Talle: S/M/L/XL. Color: Multicolor." }] }],
    CategoriaProducto: 28
  },
  
  // Conjuntos (ID: 7) - 4 productos
  {
    Nombre: "Conjunto Training Complete",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Set completo de top y calza a juego. Talle: S/M/L. Color: Negro/Gris." }] }],
    CategoriaProducto: 7
  },
  {
    Nombre: "Conjunto Yoga Flow",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Diseño especial para yoga y pilates. Talle: XS/S/M/L. Color: Lavanda." }] }],
    CategoriaProducto: 7
  },
  {
    Nombre: "Conjunto Deportivo Seamless",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Sin costuras para máximo confort. Talle: S/M/L/XL. Color: Verde Agua." }] }],
    CategoriaProducto: 7
  },
  {
    Nombre: "Conjunto Premium Black",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Elegancia y funcionalidad en negro total. Talle: XS/S/M/L/XL. Color: Negro." }] }],
    CategoriaProducto: 7
  },
  
  // Crops (ID: 36) - 4 productos
  {
    Nombre: "Crop Top Essential",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Básico versátil para cualquier entrenamiento. Talle: S/M/L. Color: Blanco." }] }],
    CategoriaProducto: 36
  },
  {
    Nombre: "Crop Strappy Back",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Espalda con tiras cruzadas para mayor estilo. Talle: XS/S/M/L. Color: Negro." }] }],
    CategoriaProducto: 36
  },
  {
    Nombre: "Crop Top Seamless",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Diseño sin costuras ultra cómodo. Talle: S/M/L. Color: Rosa." }] }],
    CategoriaProducto: 36
  },
  {
    Nombre: "Crop Ribbed Detail",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Textura acanalada con ajuste perfecto. Talle: XS/S/M/L/XL. Color: Verde Militar." }] }],
    CategoriaProducto: 36
  },
  
  // Elementos (ID: 41) - 4 productos
  {
    Nombre: "Banda Elástica Resistencia",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Set de 3 bandas de diferentes resistencias. Color: Multicolor." }] }],
    CategoriaProducto: 41
  },
  {
    Nombre: "Mat Yoga Premium",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Colchoneta antideslizante de 6mm. Color: Morado." }] }],
    CategoriaProducto: 41
  },
  {
    Nombre: "Botella Térmica 750ml",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Mantiene la temperatura por 12 horas. Color: Negro Mate." }] }],
    CategoriaProducto: 41
  },
  {
    Nombre: "Guantes Training Pro",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Protección y agarre para levantamiento. Talle: S/M/L. Color: Negro/Rojo." }] }],
    CategoriaProducto: 41
  },
  
  // Remeras (ID: 3) - 4 productos
  {
    Nombre: "Remera Oversize Blanca",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Estilo relajado para post entrenamiento. Talle: S/M/L/XL. Color: Blanco." }] }],
    CategoriaProducto: 3
  },
  {
    Nombre: "Remera Técnica Dry-Fit",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Tecnología que absorbe el sudor. Talle: XS/S/M/L/XL. Color: Negro." }] }],
    CategoriaProducto: 3
  },
  {
    Nombre: "Remera Muscle Fit",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Corte atlético que resalta la figura. Talle: S/M/L. Color: Gris Melange." }] }],
    CategoriaProducto: 3
  },
  {
    Nombre: "Remera Estampada Training",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Diseño motivacional para tu workout. Talle: M/L/XL. Color: Negro/Blanco." }] }],
    CategoriaProducto: 3
  },
  
  // Tops (ID: 5) - 4 productos
  {
    Nombre: "Top Deportivo Soporte Alto",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Máximo soporte para entrenamientos de alto impacto. Talle: XS/S/M/L. Color: Negro." }] }],
    CategoriaProducto: 5
  },
  {
    Nombre: "Top Racerback Negro",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Diseño clásico con espalda deportiva. Talle: S/M/L/XL. Color: Negro." }] }],
    CategoriaProducto: 5
  },
  {
    Nombre: "Top Mesh Panel",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Paneles de malla para mayor ventilación. Talle: XS/S/M/L. Color: Blanco/Negro." }] }],
    CategoriaProducto: 5
  },
  {
    Nombre: "Top Strappy Soporte Medio",
    Descripcion: [{ type: "paragraph", children: [{ type: "text", text: "Tiras decorativas con soporte moderado. Talle: S/M/L. Color: Rosa." }] }],
    CategoriaProducto: 5
  }
];

// URLs de imágenes de Unsplash para referencia (subir manualmente)
const imagenesReferencia = {
  "Bikini Deportivo Coral": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=750&fit=crop",
  "Bikini Clásico Negro": "https://images.unsplash.com/photo-1582639590011-f5a8416d1101?w=500&h=750&fit=crop",
  "Bikini Tropical Print": "https://images.unsplash.com/photo-1614032695818-5853b4c8f0c4?w=500&h=750&fit=crop",
  "Bikini High Waist": "https://images.unsplash.com/photo-1559284729-8e3d12430eac?w=500&h=750&fit=crop",
  "Short Deportivo Running": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=750&fit=crop",
  "Short Compresión Pro": "https://images.unsplash.com/photo-1574689270687-b9a0c9c7df8e?w=500&h=750&fit=crop",
  "Short Bike Negro": "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=750&fit=crop",
  "Short 2 en 1 Training": "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=500&h=750&fit=crop",
  "Calza Under Armour Pro": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&h=750&fit=crop",
  "Calza High Waist Negro": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=750&fit=crop",
  "Calza Seamless Rosa": "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500&h=750&fit=crop",
  "Calza Estampada Gym": "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&h=750&fit=crop",
  "Conjunto Training Complete": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=750&fit=crop",
  "Conjunto Yoga Flow": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=750&fit=crop",
  "Conjunto Deportivo Seamless": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=750&fit=crop",
  "Conjunto Premium Black": "https://images.unsplash.com/photo-1550927407-50e2bd128b81?w=500&h=750&fit=crop",
  "Crop Top Essential": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=750&fit=crop",
  "Crop Strappy Back": "https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=500&h=750&fit=crop",
  "Crop Top Seamless": "https://images.unsplash.com/photo-1599895872879-c6da61a30e75?w=500&h=750&fit=crop",
  "Crop Ribbed Detail": "https://images.unsplash.com/photo-1598531228433-d1bfa5f6e7f6?w=500&h=750&fit=crop",
  "Banda Elástica Resistencia": "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&h=750&fit=crop",
  "Mat Yoga Premium": "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500&h=750&fit=crop",
  "Botella Térmica 750ml": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=750&fit=crop",
  "Guantes Training Pro": "https://images.unsplash.com/photo-1532084824770-85213eacc3aa?w=500&h=750&fit=crop",
  "Remera Oversize Blanca": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=750&fit=crop",
  "Remera Técnica Dry-Fit": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=750&fit=crop",
  "Remera Muscle Fit": "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=750&fit=crop",
  "Remera Estampada Training": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&h=750&fit=crop",
  "Top Deportivo Soporte Alto": "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&h=750&fit=crop",
  "Top Racerback Negro": "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=500&h=750&fit=crop",
  "Top Mesh Panel": "https://images.unsplash.com/photo-1485218126466-34e6392ec754?w=500&h=750&fit=crop",
  "Top Strappy Soporte Medio": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=750&fit=crop"
};

async function actualizarOCrearProductos() {
  console.log('🚀 Iniciando actualización/creación de productos...');
  console.log('📥 Obteniendo productos existentes...\n');
  
  try {
    // Obtener todos los productos existentes
    const response = await makeRequest('http://127.0.0.1:1337/api/productos?populate=*');
    const data = await response.json();
    const productosExistentes = data.data || [];
    
    console.log(`📦 Productos existentes: ${productosExistentes.length}`);
    console.log(`📦 Productos en el script: ${productos.length}\n`);
    
    let actualizados = 0;
    let creados = 0;
    let fallidos = 0;
    
    for (const producto of productos) {
      try {
        // Buscar si el producto ya existe por Nombre
        const productoExistente = productosExistentes.find(p => p.Nombre === producto.Nombre);
        
        // Preparar datos sin la relación (la asignaremos después)
        const { CategoriaProducto, ...productoData } = producto;
        const categoriaId = CategoriaProducto;
        
        if (productoExistente) {
          // ACTUALIZAR producto existente
          const updateResponse = await makeRequest(`http://127.0.0.1:1337/api/productos/${productoExistente.documentId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: productoData })
          });
          
          if (updateResponse.ok) {
            actualizados++;
            console.log(`🔄 [${actualizados + creados}/${productos.length}] Actualizado: ${producto.Nombre} (Categoría ID: ${categoriaId} - asignar manualmente)`);
          } else {
            fallidos++;
            const error = await updateResponse.json();
            console.error(`❌ [${actualizados + creados + fallidos}/${productos.length}] Error actualizando ${producto.Nombre}:`, error.error?.message || 'Error desconocido');
          }
        } else {
          // CREAR nuevo producto
          const createResponse = await makeRequest('http://127.0.0.1:1337/api/productos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: productoData })
          });
          
          if (createResponse.ok) {
            creados++;
            console.log(`✅ [${actualizados + creados}/${productos.length}] Creado: ${producto.Nombre} (Categoría ID: ${categoriaId} - asignar manualmente)`);
          } else {
            fallidos++;
            const error = await createResponse.json();
            console.error(`❌ [${actualizados + creados + fallidos}/${productos.length}] Error creando ${producto.Nombre}:`, error.error?.message || 'Error desconocido');
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
    console.log(`📊 Total procesados: ${actualizados + creados} de ${productos.length}`);
    console.log('\n📋 Distribución por categoría (4 productos cada una):');
    console.log('  • Bikinis (ID: 38)');
    console.log('  • Calzas cortas/Shorts (ID: 31)');
    console.log('  • Calzas largas (ID: 28)');
    console.log('  • Conjuntos (ID: 7)');
    console.log('  • Crops (ID: 36)');
    console.log('  • Elementos (ID: 41)');
    console.log('  • Remeras (ID: 3)');
    console.log('  • Tops (ID: 5)');
    console.log('\n🔗 Verifica los productos en:');
    console.log('   http://localhost:1337/api/productos?populate=*');
    console.log('\n⚠️  IMPORTANTE - Asignar categorías manualmente:');
    console.log('   Los productos se crearon SIN categoría asociada.');
    console.log('   Debes asignar la categoría manualmente en el admin de Strapi:');
    console.log('   1. Ve a http://localhost:1337/admin');
    console.log('   2. Ve a Content Manager → Productos');
    console.log('   3. Para cada producto, asigna su categoría según el ID mencionado arriba');
    console.log('\n📸 URLs de imágenes de referencia (Unsplash):');
    console.log('   Las URLs están guardadas en el objeto imagenesReferencia del script');
    console.log('   Para subir las imágenes al campo "Portada":');
    console.log('   1. Entra en cada producto en el admin');
    console.log('   2. Descarga la imagen desde la URL correspondiente');
    console.log('   3. Súbela en el campo "Portada"\n');
    
  } catch (error) {
    console.error('\n❌ Error fatal al obtener productos existentes:', error.message);
    console.error('   Asegúrate de que Strapi esté corriendo en http://localhost:1337\n');
  }
}

actualizarOCrearProductos();
