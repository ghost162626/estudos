export default async function handler(req, res) {
  // 1. CAPTURA O IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 'IP não detectado';
  console.log(`📸 IP capturado: ${ip}`);
  
  // 2. ENVIA PARA DISCORD (opcional)
  const DISCORD_WEBHOOK = 'COLE_SEU_WEBHOOK_AQUI';
  if (DISCORD_WEBHOOK.includes('discord.com')) {
    await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🖼️ PNG acessado! IP: ${ip}`,
      })
    });
  }
  
  // 3. RETORNA UMA IMAGEM PNG REAL (não base64)
  // Cabeçalho PNG simples (pixel 1x1 transparente)
  const pngData = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
    0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // Width: 1, Height: 1
    0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, // Bit depth, color type
    0x89, 0x00, 0x00, 0x00, 0x00, 0x49, 0x44, 0x41, // IDAT chunk
    0x54, 0x78, 0x9C, 0x63, 0x00, 0x00, 0x00, 0x02, // Compressed data
    0x00, 0x01, 0xE5, 0x27, 0xDC, 0x00, 0x00, 0x00, // CRC
    0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, // IEND chunk
    0x82
  ]);
  
  // Configura como PNG
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Length', pngData.length);
  res.setHeader('Cache-Control', 'no-cache');
  
  // Envia o PNG
  res.status(200).send(pngData);
}
