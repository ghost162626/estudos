import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // CAPTURA O IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 'IP não detectado';
  console.log('📸 Tentando acessar foto - IP:', ip);
  
  // Tenta vários caminhos possíveis
  const caminhosPossiveis = [
    path.join(process.cwd(), 'public', 'foto.png'),
    path.join(process.cwd(), 'public', 'imagem.png'),
    path.join(process.cwd(), 'public', 'minha-foto.png'),
    path.join(process.cwd(), 'public', 'imagens', 'foto.png'),
    path.join(process.cwd(), 'public', 'images', 'foto.png'),
    path.join(process.cwd(), 'foto.png'), // direto na raiz
  ];
  
  let fotoBuffer = null;
  let caminhoEncontrado = null;
  
  // Procura a foto
  for (const caminho of caminhosPossiveis) {
    console.log('🔍 Procurando em:', caminho);
    if (fs.existsSync(caminho)) {
      console.log('✅ Foto encontrada em:', caminho);
      caminhoEncontrado = caminho;
      try {
        fotoBuffer = fs.readFileSync(caminho);
        break;
      } catch (err) {
        console.log('❌ Erro ao ler:', err.message);
      }
    }
  }
  
  // Se não encontrou foto
  if (!fotoBuffer) {
    console.log('❌ Nenhuma foto encontrada! Criando imagem de erro...');
    
    // Cria uma imagem de erro simples (SEM canvas)
    const erroPng = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
      'B3RJTUUH5gQHBTAlHt4BywAAAIpJREFUOMtjYBgFo2AU0A38////HwMDAwMqHwTAADQYDjAxMTGg' +
      '8hH5////h0swoopjU4iLDwNwEwweA+AmYDOIWD5WJzCQ4gR0TVj5qIYxYTOEGD5WA4hxAtwLyIYQ' +
      'y8dqAANOABpCsHysBjDgBGAhhJeP1QlwL4AMIYYP0w8A9UJvb1UqH/QAAAAASUVORK5CYII=',
      'base64'
    );
    
    res.setHeader('Content-Type', 'image/png');
    res.send(erroPng);
    return;
  }
  
  // Se encontrou, envia a foto
  console.log('📤 Enviando foto de:', caminhoEncontrado);
  console.log('👤 IP do visitante:', ip);
  
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'no-cache');
  res.send(fotoBuffer);
}
