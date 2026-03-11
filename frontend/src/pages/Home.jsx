import { useNavigate } from 'react-router-dom';

const galleryImages = [
  'pizza_1.jpg','taco_camaron.jpg','tostadas_francesas.jpg',
  'galletas_chocochips.JPG','tomates.jpg','bowl_completo.jpg',
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
        background: '#202020',
      }}>
        {/* Background image with overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/images/headers/desktop/home-banner - 3.png')",
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.35,
        }} />
        {/* Red diagonal accent */}
        <div style={{
          position: 'absolute', right: 0, top: 0,
          width: '45%', height: '100%',
          background: 'linear-gradient(135deg, transparent 40%, rgba(240,73,63,0.12) 100%)',
          pointerEvents: 'none',
        }} />
        {/* Vertical red line accent */}
        <div style={{
          position: 'absolute', left: '48%', top: '10%',
          width: 2, height: '80%',
          background: 'linear-gradient(180deg, transparent, #f0493f, transparent)',
          opacity: 0.4,
        }} />

        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1200, margin: '0 auto',
          padding: '120px 48px 80px',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 64, alignItems: 'center',
        }} className="hero-grid">
          <div>
            <p style={{
              fontFamily: 'Montserrat', fontWeight: 700,
              fontSize: '0.75rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#f0493f',
              marginBottom: 24,
            }}>
              ✦ Emprendimiento costarricense desde 2023
            </p>
            <h1 style={{
              fontFamily: 'Montserrat', fontWeight: 900,
              fontSize: 'clamp(3rem, 5vw, 5rem)',
              lineHeight: 1.0, letterSpacing: '-0.04em',
              color: '#eeeeee', marginBottom: 0,
            }}>
              DONDE LO
            </h1>
            <h1 style={{
              fontFamily: 'Montserrat', fontWeight: 900,
              fontSize: 'clamp(3rem, 5vw, 5rem)',
              lineHeight: 1.0, letterSpacing: '-0.04em',
              color: '#f0493f', marginBottom: 0,
            }}>
              ARTESANAL
            </h1>
            <h1 style={{
              fontFamily: 'Montserrat', fontWeight: 900,
              fontSize: 'clamp(3rem, 5vw, 5rem)',
              lineHeight: 1.0, letterSpacing: '-0.04em',
              color: '#eeeeee', marginBottom: 32,
            }}>
              ES GOURMET
            </h1>
            <p style={{
              fontFamily: 'Poppins', fontWeight: 300,
              fontSize: '1.1rem', lineHeight: 1.8,
              color: 'rgba(238,238,238,0.65)',
              maxWidth: 420, marginBottom: 48,
            }}>
              Productos artesanales de la más alta calidad, hechos con amor 
              y tradición para llevarte una experiencia única.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              <button onClick={() => navigate('/productos')} style={{
                background: '#f0493f', color: '#fff',
                border: 'none', padding: '16px 36px',
                fontFamily: 'Montserrat', fontWeight: 700,
                fontSize: '0.85rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', cursor: 'pointer',
                borderRadius: 2, transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.target.style.background = '#eeeeee'; e.target.style.color = '#272727'; }}
                onMouseLeave={e => { e.target.style.background = '#f0493f'; e.target.style.color = '#fff'; }}
              >
                Ver productos
              </button>
              <button onClick={() => navigate('/contacto')} style={{
                background: 'transparent', color: '#eeeeee',
                border: '1px solid rgba(238,238,238,0.3)',
                padding: '16px 36px',
                fontFamily: 'Montserrat', fontWeight: 500,
                fontSize: '0.85rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', cursor: 'pointer',
                borderRadius: 2, transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.target.style.borderColor = '#f0493f'; e.target.style.color = '#f0493f'; }}
                onMouseLeave={e => { e.target.style.borderColor = 'rgba(238,238,238,0.3)'; e.target.style.color = '#eeeeee'; }}
              >
                Contáctanos
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="/images/bowl.png" alt="Bowl Gourmetto" style={{
              width: '80%', maxWidth: 400,
              filter: 'drop-shadow(0 30px 60px rgba(240,73,63,0.25))',
              animation: 'floatBowl 4s ease-in-out infinite',
            }} />
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%',
          transform: 'translateX(-50%)', textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'Montserrat', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(238,238,238,0.4)', textTransform: 'uppercase' }}>Scroll</p>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, rgba(240,73,63,0.6), transparent)', margin: '8px auto 0' }} />
        </div>
      </section>

      {/* ── CONOCÉNOS ────────────────────────────────────── */}
      <section style={{ background: '#272727', padding: '120px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="section-grid">
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', top: -20, left: -20,
              width: '100%', height: '100%',
              border: '1px solid rgba(240,73,63,0.2)',
              borderRadius: 4, pointerEvents: 'none',
            }} />
            <div style={{
              background: '#202020', borderRadius: 4,
              padding: 48, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              aspectRatio: '1',
            }}>
              <img src="/images/isotipo-blanco.png" alt="Gourmetto" style={{ width: '70%', opacity: 0.9 }} />
            </div>
          </div>

          <div>
            <p style={{
              fontFamily: 'Montserrat', fontWeight: 700,
              fontSize: '0.7rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#f0493f', marginBottom: 20,
            }}>✦ Nuestra historia</p>
            <h2 style={{
              fontFamily: 'Montserrat', fontWeight: 900,
              fontSize: 'clamp(2.5rem, 3.5vw, 3.5rem)',
              letterSpacing: '-0.03em', lineHeight: 1.0,
              color: '#eeeeee', marginBottom: 32,
            }}>
              CONOCÉNOS
            </h2>
            <div style={{ width: 48, height: 2, background: '#f0493f', marginBottom: 32 }} />
            <p style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '1rem', lineHeight: 1.9, color: 'rgba(238,238,238,0.7)', marginBottom: 20 }}>
              Somos un emprendimiento familiar, enfocado en productos Artesanales Gourmet.
              Nuestra misión es llevar los mejores productos artesanales a nuestros clientes
              y transmitirles una experiencia de calidad.
            </p>
            <p style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '1rem', lineHeight: 1.9, color: 'rgba(238,238,238,0.7)', marginBottom: 40 }}>
              Desde el año 2023 estamos creciendo como negocio, innovando cada vez más
              con nuevos productos.
            </p>
            <button onClick={() => navigate('/productos')} style={{
              background: 'transparent', color: '#f0493f',
              border: '1px solid #f0493f',
              padding: '14px 32px',
              fontFamily: 'Montserrat', fontWeight: 700,
              fontSize: '0.8rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', cursor: 'pointer',
              borderRadius: 2, transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f0493f'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#f0493f'; }}
            >
              Ver productos →
            </button>
          </div>
        </div>
      </section>

      {/* ── GALERÍA ──────────────────────────────────────── */}
      <section style={{ background: '#202020', padding: '100px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 56 }}>
            <div>
              <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f0493f', marginBottom: 12 }}>✦ Galería</p>
              <h3 style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '2.5rem', letterSpacing: '-0.03em', color: '#eeeeee', lineHeight: 1 }}>
                SÍGUENOS EN<br /><span style={{ color: '#f0493f' }}>INSTAGRAM</span>
              </h3>
            </div>
            <a href="https://instagram.com/gourmetto.cr" target="_blank" rel="noreferrer" style={{
              color: 'rgba(238,238,238,0.5)', fontFamily: 'Montserrat',
              fontSize: '0.75rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', textDecoration: 'none',
              borderBottom: '1px solid rgba(238,238,238,0.2)',
              paddingBottom: 2, transition: 'color 0.2s',
            }}>
              @gourmetto.cr →
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
            {galleryImages.map((img, i) => (
              <div key={img} style={{
                aspectRatio: '1', overflow: 'hidden',
                borderRadius: 4,
                gridColumn: i === 0 ? 'span 2' : 'span 1',
                gridRow: i === 0 ? 'span 2' : 'span 1',
              }}>
                <img
                  src={`/images/comida/${img}`} alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', display: 'block' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes floatBowl {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; padding: 100px 24px 60px !important; }
          .section-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}
