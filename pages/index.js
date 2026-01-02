import { useEffect, useState } from 'react';

export default function Home() {
  const [ip, setIp] = useState('');
  const [status, setStatus] = useState('Capturando informações...');
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetch('/api/capturar-ip')
      .then(res => res.json())
      .then(data => {
        if (data.ip) {
          setIp(data.ip);
          setStatus('✅ Informações capturadas com sucesso!');
          
          // Opcional: Tentar obter localização aproximada
          fetch(`https://ipapi.co/${data.ip}/json/`)
            .then(res => res.json())
            .then(loc => {
              if (loc && !loc.error) {
                setLocation({
                  country: loc.country_name,
                  city: loc.city,
                  region: loc.region,
                  isp: loc.org
                });
              }
            })
            .catch(() => {});
        } else {
          setStatus('⚠️ IP não detectado');
        }
      })
      .catch(() => {
        setStatus('❌ Erro na conexão');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌐 Site Educacional - Monitor de IP</h1>
        <p style={styles.subtitle}>Demonstração técnica para fins educacionais</p>
        
        <div style={styles.statusBox}>
          <div style={styles.statusIcon}>
            {loading ? '🔄' : status.includes('✅') ? '✅' : '⚠️'}
          </div>
          <div>
            <p style={styles.statusText}>{status}</p>
            {!loading && (
              <p style={styles.timestamp}>
                {new Date().toLocaleTimeString('pt-BR')}
              </p>
            )}
          </div>
        </div>
        
        <div style={styles.infoCard}>
          <h3 style={styles.infoTitle}>📊 Suas Informações Públicas:</h3>
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Endereço IP:</span>
              <code style={styles.infoValue}>{ip || 'Carregando...'}</code>
            </div>
            
            {location && (
              <>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Localização:</span>
                  <span style={styles.infoValue}>
                    {location.city}, {location.region}, {location.country}
                  </span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Provedor:</span>
                  <span style={styles.infoValue}>{location.isp}</span>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div style={styles.alertBox}>
          <h3>📚 Finalidade Educacional</h3>
          <p>Este site demonstra como informações públicas podem ser coletadas por websites.</p>
          <p>Todas as visitas são registradas em um canal do Discord para análise educacional.</p>
          <p><strong>Este site é apenas para demonstração técnica e aprendizado.</strong></p>
        </div>
        
        <div style={styles.techInfo}>
          <h4>⚙️ Tecnologias utilizadas:</h4>
          <ul>
            <li>Next.js (Vercel)</li>
            <li>API Routes</li>
            <li>Discord Webhooks</li>
            <li>IP Geolocation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '40px',
    maxWidth: '800px',
    width: '100%',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  },
  title: {
    color: '#2c3e50',
    marginBottom: '10px',
    textAlign: 'center'
  },
  subtitle: {
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: '40px'
  },
  statusBox: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '30px'
  },
  statusIcon: {
    fontSize: '2em'
  },
  statusText: {
    margin: 0,
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  timestamp: {
    margin: '5px 0 0 0',
    color: '#7f8c8d',
    fontSize: '0.9em'
  },
  infoCard: {
    backgroundColor: '#e8f4fc',
    padding: '25px',
    borderRadius: '10px',
    marginBottom: '30px'
  },
  infoTitle: {
    color: '#2980b9',
    marginTop: 0
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  infoValue: {
    backgroundColor: 'white',
    padding: '10px 15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontFamily: 'monospace',
    wordBreak: 'break-all'
  },
  alertBox: {
    backgroundColor: '#fff3cd',
    borderLeft: '5px solid #ffc107',
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '30px'
  },
  techInfo: {
    color: '#6c757d',
    fontSize: '0.9em'
  }
};
