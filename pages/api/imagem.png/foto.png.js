import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // 1. CAPTURA O IP (PARTE IMPORTANTE!)
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 'IP não detectado';
  
  console.log('📸 FOTO ACESSADA!');
  console.log('🌐 IP:', ip);
  console.log('📅 Data:', new Date().toLocaleString('pt-BR'));
  console.log('👤 Navegador:', req.headers['user-agent']?.substring(0, 80) || 'N/A');
  
  // 2. ENVIA PARA DISCORD (se quiser)
  // fetch('webhook-discord', {method: 'POST', body: JSON.stringify({ip})});
  
  try {
    // 3. LÊ SUA FOTO REAL da pasta public/
    const fotoPath = path.join(process.cwd(), 'public', 'minha-foto.png');
    
    // Verifica se foto existe
    if (!fs.existsSync(fotoPath)) {
      console.log('❌ Foto não encontrada:', fotoPath);
      return res.status(404).send('Foto não encontrada');
    }
    
    const fotoBuffer = fs.readFileSync(fotoPath);
    
    // 4. ENVIA SUA FOTO REAL para o navegador
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', fotoBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    
    res.send(fotoBuffer);
    
  } catch (error) {
    console.error('❌ Erro ao carregar foto:', error);
    res.status(500).send('Erro');
  }
}
