export default async function handler(req, res) {
  // COLOQUE SEU WEBHOOK DO DISCORD AQUI 👇
  const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1456767774368993380/-412QnxkT_spPdRfKW2uuhMevQM23-v7XGR9yjOfz0ymAg7ooyJZ85kBILbzAEiaIZQ-';
  
  try {
    // Captura o IP do cliente
    const forwarded = req.headers['x-forwarded-for'] || '';
    const realIp = req.headers['x-real-ip'] || '';
    const connectionIp = req.connection.remoteAddress || '';
    const socketIp = req.socket?.remoteAddress || '';
    
    // Determina o IP mais provável
    let ip = 'IP não detectado';
    if (forwarded) {
      ip = forwarded.split(',')[0].trim();
    } else if (realIp) {
      ip = realIp;
    } else if (connectionIp) {
      ip = connectionIp;
    } else if (socketIp) {
      ip = socketIp;
    }
    
    const userAgent = req.headers['user-agent'] || 'Não informado';
    const timestamp = new Date().toISOString();
    const referer = req.headers['referer'] || 'Direto';
    
    // Dados para enviar
    const dados = {
      ip: ip,
      userAgent: userAgent,
      timestamp: timestamp,
      referer: referer,
      method: req.method,
      url: req.url
    };
    
    // Envia para o Discord (se webhook configurado)
    if (DISCORD_WEBHOOK_URL && DISCORD_WEBHOOK_URL.includes('discord.com/api/webhooks')) {
      // Formata a mensagem para o Discord
      const discordMessage = {
        content: null,
        embeds: [
          {
            title: "🔍 Novo Acesso Detectado",
            color: 3447003, // Azul
            fields: [
              {
                name: "🌐 IP do Visitante",
                value: `\`\`\`${dados.ip}\`\`\``,
                inline: true
              },
              {
                name: "🕐 Data/Hora",
                value: `<t:${Math.floor(new Date(dados.timestamp).getTime() / 1000)}:F>`,
                inline: true
              },
              {
                name: "🌍 Origem",
                value: dados.referer,
                inline: false
              },
              {
                name: "📱 Navegador/Sistema",
                value: `\`\`\`${dados.userAgent.substring(0, 100)}...\`\`\``,
                inline: false
              }
            ],
            footer: {
              text: "Site de Teste Educacional"
            },
            timestamp: dados.timestamp
          }
        ]
      };
      
      // Envia para o Discord
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordMessage),
      }).catch(error => {
        console.error('Erro ao enviar para Discord:', error);
      });
    }
    
    // Retorna o IP para o frontend
    res.status(200).json({ 
      ip: dados.ip,
      timestamp: dados.timestamp,
      enviadoParaDiscord: DISCORD_WEBHOOK_URL.includes('discord.com/api/webhooks')
    });
    
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro ao processar requisição' });
  }
}
