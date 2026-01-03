import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded
    ? forwarded.split(',')[0]
    : req.socket.remoteAddress;

  console.log('IP capturado:', ip);

  const fotoPath = path.join(process.cwd(), 'public', 'foto-discord2.png');

  try {
    const buffer = fs.readFileSync(fotoPath);
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-store');
    res.end(buffer);
  } catch {
    res.status(404).end();
  }
}
