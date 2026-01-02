export default function handler(req, res) {
  // 1. CAPTURA O IP (ESSA É A PARTE IMPORTANTE!)
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 'IP não detectado';
  
  console.log('✅ IP CAPTURADO:', ip);
  console.log('📅 Data:', new Date().toLocaleString('pt-BR'));
  console.log('🌐 User Agent:', req.headers['user-agent']?.substring(0, 100) || 'N/A');
  
  // 2. (OPCIONAL) Envia para Discord
  // const webhook = 'https://discord.com/api/webhooks/...';
  // fetch(webhook, {method: 'POST', body: JSON.stringify({content: `IP: ${ip}`})});
  
  // 3. CRIA UMA IMAGEM PNG PARA MOSTRAR (tipo a bandeira)
  const { createCanvas } = require('canvas');
  const canvas = createCanvas(320, 240);
  const ctx = canvas.getContext('2d');
  
  // Desenha uma imagem tipo "bandeira" colorida
  // Parte verde (como Brasil)
  ctx.fillStyle = '#009B3A';
  ctx.fillRect(0, 0, 320, 240);
  
  // Losango amarelo
  ctx.fillStyle = '#FEDF00';
  ctx.beginPath();
  ctx.moveTo(160, 30);
  ctx.lineTo(250, 120);
  ctx.lineTo(160, 210);
  ctx.lineTo(70, 120);
  ctx.closePath();
  ctx.fill();
  
  // Círculo azul
  ctx.fillStyle = '#002776';
  ctx.beginPath();
  ctx.arc(160, 120, 50, 0, Math.PI * 2);
  ctx.fill();
  
  // Texto (opcional)
  ctx.fillStyle = 'white';
  ctx.font = 'bold 16px Arial';
  ctx.fillText('IP Capturado: ' + ip.substring(0, 15), 80, 40);
  
  // 4. CONVERTE PARA PNG E ENVIA
  const buffer = canvas.toBuffer('image/png');
  
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'no-cache');
  res.send(buffer);
}
