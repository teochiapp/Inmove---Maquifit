# 🧪 INSTRUCCIONES PARA PROBAR MERCADOPAGO SANDBOX

## ✅ Credenciales configuradas
- Public Key: APP_USR-aa175f6d-a673-4dfb-bf21-343de4398007
- Access Token: APP_USR-5567810222384488-092417-88f70a7468a379300aaae5493102c7bf-2712453774

## 💳 Tarjetas de prueba para usar:

### Visa (Aprobada)
- **Número**: 4509 9535 6623 3704
- **CVV**: 123
- **Vencimiento**: Cualquier fecha futura (ej: 12/25)

### Mastercard (Aprobada)
- **Número**: 5031 7557 3453 0604
- **CVV**: 123
- **Vencimiento**: Cualquier fecha futura (ej: 12/25)

### American Express (Aprobada)
- **Número**: 3753 651535 56885
- **CVV**: 123
- **Vencimiento**: Cualquier fecha futura (ej: 12/25)

## 👤 Datos de prueba para el formulario:
- **Nombre**: APRO APRO
- **Email**: test@test.com
- **Teléfono**: 1234567890

## 🎯 Cómo probar:

1. **Inicia tu aplicación**: `npm start`
2. **Ve a la sección de Planes**
3. **Haz click en "Empezá hoy"** en cualquier plan
4. **Completa el formulario** con los datos de prueba
5. **Haz click en "Continuar con el pago"**
6. **Haz click en "Pagar con MercadoPago"**
7. **Serás redirigido a MercadoPago sandbox**
8. **Usa una de las tarjetas de prueba** listadas arriba
9. **Completa el pago** - será aprobado automáticamente

## 🔍 URLs de retorno configuradas:
- **Success**: http://localhost:3000/checkout/success
- **Failure**: http://localhost:3000/checkout/failure  
- **Pending**: http://localhost:3000/checkout/pending

## ⚠️ Notas importantes:
- ✅ **Modo sandbox**: No se realizarán cargos reales
- ✅ **Datos seguros**: Las credenciales están en variables de entorno
- ✅ **Testing completo**: Puedes probar todo el flujo sin riesgo
- ✅ **Logs**: Revisa la consola del navegador para ver los logs

## 🚨 Si hay errores:
1. Verifica que el archivo `.env.local` existe
2. Reinicia el servidor de desarrollo (`npm start`)
3. Revisa la consola del navegador para errores
4. Verifica que las credenciales sean correctas

¡Listo para probar! 🚀

