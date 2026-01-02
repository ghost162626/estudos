export default function handler(req, res) {
  // Captura IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 'IP não detectado';
  
  // Mostra no console
  console.log('📍 IP CAPTURADO:', ip);
  console.log('🕐 Data:', new Date().toISOString());
  console.log('🔗 URL acessada:', req.url);
  
  // Pixel PNG transparente 1x1
  const pixel = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64'
  );
  
  res.setHeader('Content-Type', 'image/png');
  res.send(pixel);
}
