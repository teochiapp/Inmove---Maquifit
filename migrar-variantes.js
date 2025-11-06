const fetch = require('node-fetch');

// ⚠️ CAMBIAR ESTA URL POR TU URL DE PRODUCCIÓN
const STRAPI_URL = 'http://127.0.0.1:1337'; // Para local
// const STRAPI_URL = 'https://tu-dominio.com'; // Para producción

async function migrarVariantes() {
  try {
    console.log('🔄 Obteniendo variantes desde:', STRAPI_URL);
    console.log('============================================================\n');
    
    const response = await fetch(`${STRAPI_URL}/api/variantes?pagination[pageSize]=1000`);
    
    if (!response.ok) {
      throw new Error(`Error al obtener variantes: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    const variantes = data.data || [];
    
    console.log(`📦 Total de variantes encontradas: ${variantes.length}\n`);
    
    if (variantes.length === 0) {
      console.log('✅ No hay variantes para migrar');
      return;
    }
    
    let actualizadas = 0;
    let yaConNombre = 0;
    let errores = 0;
    
    for (const variante of variantes) {
      const attrs = variante.attributes || variante;
      
      // Si ya tiene Nombre, saltar
      if (attrs.Nombre) {
        yaConNombre++;
        console.log(`   ⏭️  [${yaConNombre}] Ya tiene nombre: ${attrs.Nombre}`);
        continue;
      }
      
      // Generar nombre: Color/Talla
      const color = attrs.Color || 'Sin color';
      const talla = attrs.Talla || 'Sin talla';
      const nombre = `${color}/${talla}`;
      
      try {
        const updateResponse = await fetch(
          `${STRAPI_URL}/api/variantes/${variante.documentId}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              data: { Nombre: nombre }
            })
          }
        );
        
        if (updateResponse.ok) {
          actualizadas++;
          console.log(`   ✓ [${actualizadas}] Actualizada: ${nombre}`);
        } else {
          errores++;
          const errorData = await updateResponse.json();
          console.error(`   ✗ Error actualizando ${variante.documentId}:`, errorData.error?.message || 'Error desconocido');
        }
      } catch (error) {
        errores++;
        console.error(`   ✗ Error: ${error.message}`);
      }
    }
    
    console.log('\n============================================================');
    console.log('🎉 Proceso completado!');
    console.log('============================================================');
    console.log(`✅ Actualizadas: ${actualizadas}`);
    console.log(`⏭️  Ya tenían nombre: ${yaConNombre}`);
    console.log(`❌ Errores: ${errores}`);
    console.log(`📊 Total: ${variantes.length}`);
    console.log('============================================================\n');
    
    if (actualizadas > 0) {
      console.log('🔍 Verifica en:');
      console.log(`   ${STRAPI_URL}/api/variantes`);
      console.log(`   ${STRAPI_URL}/admin\n`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\n⚠️  Verifica que:');
    console.error('   1. Strapi esté corriendo');
    console.error('   2. La URL sea correcta');
    console.error('   3. Los permisos estén configurados\n');
  }
}

console.log('🚀 Iniciando migración de variantes...\n');
migrarVariantes();
