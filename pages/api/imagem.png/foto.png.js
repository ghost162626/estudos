import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // 1. CAPTURA O IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 'IP não detectado';
  console.log('📍 IP CAPTURADO:', ip);
  
  // 2. LÊ SUA FOTO da pasta public/
  const fotoPath = path.join(process.cwd(), 'public', 'minha-foto.png');
  
  try {
    const fotoBuffer = fs.readFileSync(fotoPath);
    
    // 3. ENVIA SUA FOTO
    res.setHeader('Content-Type', 'image/png');
    res.send(fotoBuffer);
    
  } catch (error) {
    console.log('❌ Foto não encontrada:', fotoPath);
    console.log('📁 Arquivos em public/:');
    
    // Debug: lista arquivos da pasta public
    try {
      const publicPath = path.join(process.cwd(), 'public');
      const files = fs.readdirSync(publicPath);
      console.log(files);
    } catch (e) {}
    
    // Retorna pixel vermelho se erro
    const pixel = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    
    res.setHeader('Content-Type', 'image/png');
    res.send(pixel);
  }
}
