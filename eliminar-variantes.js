const fetch = require('node-fetch');

const STRAPI_URL = 'http://127.0.0.1:1337';

async function eliminarTodasLasVariantes() {
  try {
    console.log('🗑️  Obteniendo todas las variantes...');
    
    // Obtener todas las variantes
    const response = await fetch(`${STRAPI_URL}/api/variantes?pagination[pageSize]=1000`);
    const data = await response.json();
    
    const variantes = data.data || [];
    console.log(`📦 Total de variantes encontradas: ${variantes.length}`);
    
    if (variantes.length === 0) {
      console.log('✅ No hay variantes para eliminar');
      return;
    }
    
    console.log('🔄 Eliminando variantes...\n');
    
    // Eliminar cada variante
    let eliminadas = 0;
    let errores = 0;
    
    for (const variante of variantes) {
      try {
        const deleteResponse = await fetch(
          `${STRAPI_URL}/api/variantes/${variante.documentId}`,
          { method: 'DELETE' }
        );
        
        if (deleteResponse.ok) {
          eliminadas++;
          const nombre = variante.Nombre || `${variante.Color}-${variante.Talla}`;
          console.log(`   ✓ Eliminada [${eliminadas}/${variantes.length}]: ${nombre}`);
        } else {
          errores++;
          console.error(`   ✗ Error eliminando variante ${variante.documentId}`);
        }
      } catch (error) {
        errores++;
        console.error(`   ✗ Error: ${error.message}`);
      }
    }
    
    console.log(`\n============================================================`);
    console.log(`🎉 Proceso completado!`);
    console.log(`============================================================`);
    console.log(`✅ Eliminadas: ${eliminadas}`);
    console.log(`❌ Errores: ${errores}`);
    console.log(`📊 Total: ${variantes.length}`);
    console.log(`\n📝 Ahora ejecuta: node populate-productos.js`);
    console.log(`============================================================\n`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('⚠️  Asegúrate de que Strapi esté corriendo en http://localhost:1337');
  }
}

eliminarTodasLasVariantes();
