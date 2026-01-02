import { useState, useEffect } from 'react';

export default function HomePage() {
  const [downloadCount, setDownloadCount] = useState(1247);
  const [showNotification, setShowNotification] = useState(false);
  
  // URLs das "imagens" PNG que capturam IP
  const pngUrls = [
    '/api/imagem.png',
    '/api/imagem.png?type=premium',
    '/api/imagem.png?type=wallpaper',
    '/api/imagem.png?type=art'
  ];

  useEffect(() => {
    // Simula incremento de downloads
    const interval = setInterval(() => {
      setDownloadCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleDownload = (url) => {
    setShowNotification(true);
    setDownloadCount(prev => prev + 1);
    
    // Abre a imagem em nova aba (irá capturar IP)
    window.open(url, '_blank');
    
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🖼️ FreeStock PNG</h1>
        <p style={styles.subtitle}>Baixe imagens PNG de alta qualidade gratuitamente</p>
        <div style={styles.stats}>
          <span style={styles.stat}>📥 {downloadCount.toLocaleString()} downloads hoje</span>
          <span style={styles.stat}>⭐ 4.8/5 Avaliação</span>
          <span style={styles.stat}>🔒 Sem watermark</span>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.alertBox}>
          <p><strong>⚠️ ATENÇÃO:</strong> Este site é uma demonstração educacional sobre como pixels de rastreamento funcionam.</p>
          <p>Todas as "imagens PNG" neste site são trackers que registram acesso.</p>
        </div>

        <div style={styles.featuredSection}>
          <h2 style={styles.sectionTitle}>⭐ Imagem em Destaque</h2>
          <div style={styles.featuredImageCard}>
            <div style={styles.imageContainer}>
              {/* Esta é nossa imagem fake PNG */}
              <img 
                src="/api/imagem.png" 
                alt="PNG Premium Gratuito" 
                style={styles.previewImage}
                crossOrigin="anonymous"
              />
              <div style={styles.imageOverlay}>
                <span style={styles.badge}>MAIS BAIXADA</span>
              </div>
            </div>
            <div style={styles.imageInfo}>
              <h3>Abstract Art v4</h3>
              <p><strong>Resolução:</strong> 3840×2160 (4K)</p>
              <p><strong>Tamanho:</strong> 4.2 MB</p>
              <p><strong>Formato:</strong> PNG com transparência</p>
              <button 
                style={styles.downloadButton}
                onClick={() => handleDownload('/api/imagem.png?premium=true')}
              >
                ⬇️ Download PNG Gratuito
              </button>
              <small style={styles.note}>
                Ao baixar, você concorda com nossos termos. Seu IP será registrado para estatísticas.
              </small>
            </div>
          </div>
        </div>

        <div style={styles.gallerySection}>
          <h2 style={styles.sectionTitle}>📁 Galeria de PNGs</h2>
          <div style={styles.galleryGrid}>
            {[
              { name: 'Nature Landscape', downloads: '1.2k' },
              { name: 'Tech Background', downloads: '890' },
              { name: 'Abstract Design', downloads: '2.1k' },
              { name: 'Gradient Art', downloads: '756' },
              { name: 'Minimal Pattern', downloads: '1.5k' },
              { name: 'Geometric Shape', downloads: '943' }
            ].map((img, index) => (
              <div key={index} style={styles.galleryItem}>
                <div style={styles.galleryImagePlaceholder}>
                  <img 
                    src={`/api/imagem.png?img=${index}`}
                    alt={img.name}
                    style={styles.galleryImage}
                    loading="lazy"
                  />
                </div>
                <div style={styles.galleryInfo}>
                  <h4>{img.name}</h4>
                  <p>📥 {img.downloads} downloads</p>
                  <button 
                    style={styles.smallDownloadBtn}
                    onClick={() => handleDownload(`/api/imagem.png?img=${index}`)}
                  >
                    Baixar PNG
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.techInfo}>
          <h3 style={styles.sectionTitle}>🔍 Como funciona esta demonstração?</h3>
          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <h4>1. 📸 Imagens Fake</h4>
              <p>Todos os PNGs são na verdade endpoints de API que geram pixels transparentes.</p>
            </div>
            <div style={styles.infoCard}>
              <h4>2. 🌐 Captura de IP</h4>
              <p>Cada acesso a uma "imagem" registra o IP, user agent e referência.</p>
            </div>
            <div style={styles.infoCard}>
              <h4>3. 📨 Webhook Discord</h4>
              <p>Os dados são enviados em tempo real para um canal do Discord configurado.</p>
            </div>
            <div style={styles.infoCard}>
              <h4>4. 🎯 Fins Educacionais</h4>
              <p>Esta demonstração mostra como trackers/pixels de analytics funcionam.</p>
            </div>
          </div>
        </div>

        {/* Pixels de rastreamento "invisíveis" */}
        <div style={{ display: 'none' }}>
          <img src="/api/imagem.png?tracker=1" alt="" />
          <img src="/api/imagem.png?tracker=2" alt="" />
          <img src="/api/imagem.png?tracker=3" alt="" />
        </div>
      </main>

      <footer style={styles.footer}>
        <p><strong>FreeStock PNG</strong> - Demonstração Técnica Educacional</p>
        <p>© 2024 - Este site demonstra conceitos de web tracking para fins educacionais.</p>
        <p style={styles.warning}>
          ⚠️ <strong>AVISO:</strong> Todas as imagens PNG neste site são trackers que capturam dados de acesso.
          Não use estas técnicas sem consentimento explícito e conformidade com LGPD/GDPR.
        </p>
        <div style={styles.footerLinks}>
          <a href="#" style={styles.link}>Política de Privacidade</a>
          <a href="#" style={styles.link}>Termos de Uso</a>
          <a href="#" style={styles.link}>Sobre este Projeto</a>
        </div>
      </footer>

      {showNotification && (
        <div style={styles.notification}>
          ✅ Download iniciado! (IP capturado para análise)
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  },
  header: {
    textAlign: 'center',
    padding: '40px 20px',
    backgroundColor: 'white',
    borderRadius: '15px',
    marginBottom: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: '3em',
    color: '#2c3e50',
    marginBottom: '10px'
  },
  subtitle: {
    fontSize: '1.2em',
    color: '#7f8c8d',
    marginBottom: '30px'
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap'
  },
  stat: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    borderRadius: '25px',
    fontWeight: 'bold'
  },
  alertBox: {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '30px',
    textAlign: 'center'
  },
  featuredSection: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '15px',
    marginBottom: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '1.8em'
  },
  featuredImageCard: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap'
  },
  imageContainer: {
    flex: '1',
    minWidth: '300px',
    position: 'relative'
  },
  previewImage: {
    width: '100%',
    height: '300px',
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    objectFit: 'cover'
  },
  imageOverlay: {
    position: 'absolute',
    top: '10px',
    right: '10px'
  },
  badge: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '5px 15px',
    borderRadius: '20px',
    fontWeight: 'bold'
  },
  imageInfo: {
    flex: '1',
    minWidth: '300px'
  },
  downloadButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    fontSize: '1.1em',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%',
    fontWeight: 'bold'
  },
  note: {
    display: 'block',
    marginTop: '10px',
    color: '#7f8c8d',
    fontSize: '0.9em'
  },
  gallerySection: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '15px',
    marginBottom: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px'
  },
  galleryItem: {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  galleryImagePlaceholder: {
    width: '100%',
    height: '200px',
    backgroundColor: '#f0f0f0'
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  galleryInfo: {
    padding: '15px'
  },
  smallDownloadBtn: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px'
  },
  techInfo: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '15px',
    marginBottom: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  },
  infoCard: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px'
  },
  footer: {
    textAlign: 'center',
    padding: '30px',
    backgroundColor: '#2c3e50',
    color: 'white',
    borderRadius: '15px',
    marginTop: '30px'
  },
  warning: {
    backgroundColor: '#c0392b',
    padding: '15px',
    borderRadius: '8px',
    margin: '20px 0'
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px'
  },
  link: {
    color: '#3498db',
    textDecoration: 'none'
  },
  notification: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#27ae60',
    color: 'white',
    padding: '15px 25px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    animation: 'fadeInOut 3s'
  }
};
