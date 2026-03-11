import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import products from '../data/products';

const banners = [
  '/images/headers/home-banner - 1.png',
  '/images/headers/home-banner - 2.png',
  '/images/headers/home-banner - 3.png',
];

const testimonios = [
  { nombre: 'Andrea M.', texto: 'El pesto tradicional es increíble, lo uso en todo. Ya pedí tres veces y no me decepciona.', estrellas: 5 },
  { nombre: 'Carlos V.', texto: 'Las mermeladas son pura artesanía. Se nota que usan ingredientes de verdad. Totalmente recomendado.', estrellas: 5 },
  { nombre: 'Sofía R.', texto: 'Los ajos confitados se convirtieron en mi ingrediente secreto. Un producto diferente y delicioso.', estrellas: 5 },
];

const pilares = [
  { icon: '🫙', titulo: '100% Artesanal', desc: 'Elaborado en pequeños lotes con procesos manuales que garantizan calidad en cada frasco.' },
  { icon: '🥬', titulo: 'Ingredientes frescos', desc: 'Seleccionamos los mejores insumos locales para asegurar el mejor sabor en cada producto.' },
  { icon: '🇨🇷', titulo: 'Hecho en Costa Rica', desc: 'Un emprendimiento tico que apoya la gastronomía local y lleva sabor auténtico a tu mesa.' },
];

export default function Home() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const destacados = products.slice(0, 4);
  const [heroBg, setHeroBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroBg(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', position: 'relative',
        display: 'flex', alignItems: 'center',
        overflow: 'hidden', background: '#202020',
      }}>
        {banners.map((banner, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `url(${banner})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: heroBg === i ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
          }} />
        ))}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'rgba(20,20,20,0.78)',
        }} />

        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1100, margin: '0 auto',
          padding: '120px 48px 80px', width: '100%',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 40,
        }} className="hero-inner">
          <div style={{ maxWidth: 580 }}>
            <p style={{
              fontFamily: 'Montserrat', fontWeight: 700,
              fontSize: '0.7rem', letterSpacing: '0.25em',
              textTransform: 'uppercase', color: '#f0493f', marginBottom: 24,
            }}>✦ Gastronomía artesanal</p>
            <h1 style={{
              fontFamily: 'Montserrat', fontWeight: 900,
              fontSize: 'clamp(3rem, 6vw, 6rem)',
              letterSpacing: '-0.04em', lineHeight: 0.9,
              color: '#eeeeee', textTransform: 'uppercase', marginBottom: 28,
            }}>
              SABOR<br />QUE SE<br /><span style={{ color: '#f0493f' }}>SIENTE</span>
            </h1>
            <p style={{
              fontFamily: 'Poppins', fontWeight: 300,
              fontSize: '1.1rem', color: 'rgba(238,238,238,0.6)',
              lineHeight: 1.8, marginBottom: 40, maxWidth: 420,
            }}>
              Productos artesanales elaborados con ingredientes frescos, pensados para elevar cada plato.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/productos')} style={{
                background: '#f0493f', color: '#fff', border: 'none',
                padding: '16px 36px', borderRadius: 2,
                fontFamily: 'Montserrat', fontWeight: 700,
                fontSize: '0.85rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.target.style.background = '#eeeeee'; e.target.style.color = '#272727'; }}
                onMouseLeave={e => { e.target.style.background = '#f0493f'; e.target.style.color = '#fff'; }}
              >Ver productos →</button>
              <button onClick={() => document.getElementById('pilares')?.scrollIntoView({ behavior: 'smooth' })} style={{
                background: 'transparent', color: 'rgba(238,238,238,0.6)',
                border: '1px solid rgba(238,238,238,0.2)',
                padding: '16px 36px', borderRadius: 2,
                fontFamily: 'Montserrat', fontWeight: 600,
                fontSize: '0.85rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(238,238,238,0.5)'; e.currentTarget.style.color = '#eeeeee'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(238,238,238,0.2)'; e.currentTarget.style.color = 'rgba(238,238,238,0.6)'; }}
              >Conócenos</button>
            </div>
          </div>

          <div style={{
            flexShrink: 0, width: 340,
            animation: 'floatBowl 4s ease-in-out infinite',
          }} className="hero-bowl">
            <img src="/images/bowl.png" alt="Bowl Gourmetto"
              style={{ width: '100%', filter: 'drop-shadow(0 20px 60px rgba(240,73,63,0.3))' }} />
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: 32, left: '50%',
          transform: 'translateX(-50%)', zIndex: 2,
          display: 'flex', gap: 8,
        }}>
          {banners.map((_, i) => (
            <button key={i} onClick={() => setHeroBg(i)} style={{
              width: heroBg === i ? 24 : 8, height: 8,
              borderRadius: 4, border: 'none', cursor: 'pointer',
              background: heroBg === i ? '#f0493f' : 'rgba(238,238,238,0.3)',
              transition: 'all 0.3s ease', padding: 0,
            }} />
          ))}
        </div>
      </section>

      {/* ── PILARES — fondo accent ── */}
      <section id="pilares" style={{ background: '#f0493f', padding: '100px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{
              fontFamily: 'Montserrat', fontWeight: 700,
              fontSize: '0.7rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 16,
            }}>✦ Por qué Gourmetto</p>
            <h2 style={{
              fontFamily: 'Montserrat', fontWeight: 900,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              letterSpacing: '-0.03em', color: '#fff', lineHeight: 1,
            }}>
              HECHO CON <span style={{ color: '#272727' }}>INTENCIÓN</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="pilares-grid">
            {pilares.map((p, i) => (
              <div key={i} style={{
                background: 'rgba(0,0,0,0.15)', borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '36px 32px', transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.25)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.15)'}
              >
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: 20 }}>{p.icon}</span>
                <h3 style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '1.1rem', color: '#fff', marginBottom: 12 }}>{p.titulo}</h3>
                <p style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTOS DESTACADOS ── */}
      <section style={{ background: '#202020', padding: '100px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{
                fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.7rem',
                letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f0493f', marginBottom: 12,
              }}>✦ Lo más pedido</p>
              <h2 style={{
                fontFamily: 'Montserrat', fontWeight: 900,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                letterSpacing: '-0.03em', color: '#eeeeee', lineHeight: 1,
              }}>PRODUCTOS<br /><span style={{ color: '#f0493f' }}>DESTACADOS</span></h2>
            </div>
            <button onClick={() => navigate('/productos')} style={{
              background: 'transparent', color: 'rgba(238,238,238,0.5)',
              border: '1px solid rgba(238,238,238,0.15)', padding: '12px 28px', borderRadius: 2,
              fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.8rem',
              letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#f0493f'; e.currentTarget.style.color = '#f0493f'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(238,238,238,0.15)'; e.currentTarget.style.color = 'rgba(238,238,238,0.5)'; }}
            >Ver todos →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="destacados-grid">
            {destacados.map((product, i) => (
              <div key={i} style={{
                background: '#272727', borderRadius: 6,
                border: '1px solid rgba(238,238,238,0.05)',
                overflow: 'hidden', transition: 'border-color 0.2s, transform 0.2s', cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(240,73,63,0.25)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(238,238,238,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{
                  background: 'linear-gradient(135deg, #2a2a2a, #1e1e1e)',
                  padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 180,
                }}>
                  <img src={product.photo} alt={product.name} style={{ height: 130, objectFit: 'contain' }} />
                </div>
                <div style={{ padding: '20px 20px 24px' }}>
                  <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.95rem', color: '#eeeeee', marginBottom: 6 }}>{product.name}</p>
                  <p style={{ fontFamily: 'Montserrat', fontSize: '0.72rem', color: 'rgba(238,238,238,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>{product.weight}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '1.1rem', color: '#f0493f' }}>{product.price}</span>
                    <button onClick={() => addItem(product)} style={{
                      background: '#f0493f', color: '#fff', border: 'none',
                      padding: '8px 14px', borderRadius: 2, fontFamily: 'Montserrat',
                      fontWeight: 700, fontSize: '0.72rem', cursor: 'pointer', transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => { e.target.style.background = '#eeeeee'; e.target.style.color = '#272727'; }}
                      onMouseLeave={e => { e.target.style.background = '#f0493f'; e.target.style.color = '#fff'; }}
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section style={{ background: '#272727', padding: '100px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{
              fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.7rem',
              letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f0493f', marginBottom: 16,
            }}>✦ Lo que dicen</p>
            <h2 style={{
              fontFamily: 'Montserrat', fontWeight: 900,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              letterSpacing: '-0.03em', color: '#eeeeee', lineHeight: 1,
            }}>CLIENTES QUE<br /><span style={{ color: '#f0493f' }}>NOS ELIGEN</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="testimonios-grid">
            {testimonios.map((t, i) => (
              <div key={i} style={{
                background: '#202020', borderRadius: 6,
                border: '1px solid rgba(238,238,238,0.05)', padding: '32px 28px',
              }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
                  {Array.from({ length: t.estrellas }).map((_, j) => (
                    <span key={j} style={{ color: '#f0493f', fontSize: '0.9rem' }}>★</span>
                  ))}
                </div>
                <p style={{
                  fontFamily: 'Poppins', fontWeight: 300, fontSize: '0.95rem',
                  color: 'rgba(238,238,238,0.6)', lineHeight: 1.8, marginBottom: 24, fontStyle: 'italic',
                }}>"{t.texto}"</p>
                <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.85rem', color: '#eeeeee' }}>— {t.nombre}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL — con banner negro de fondo ── */}
      <section style={{
        padding: '120px 48px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Banner negro de fondo */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url(/images/headers/home-banner-negro.png)',
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        {/* Overlay para legibilidad */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'rgba(20,20,20,0.72)',
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <p style={{
            fontFamily: 'Montserrat', fontWeight: 700,
            fontSize: '0.7rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#f0493f', marginBottom: 20,
          }}>✦ ¿Listo para probar?</p>
          <h2 style={{
            fontFamily: 'Montserrat', fontWeight: 900,
            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
            letterSpacing: '-0.04em', color: '#eeeeee',
            lineHeight: 0.95, marginBottom: 28,
          }}>
            LLEVÁ EL SABOR<br /><span style={{ color: '#f0493f' }}>A TU MESA</span>
          </h2>
          <p style={{
            fontFamily: 'Poppins', fontWeight: 300,
            fontSize: '1rem', color: 'rgba(238,238,238,0.45)',
            maxWidth: 460, margin: '0 auto 44px',
          }}>
            Explorá nuestra selección de productos artesanales y pedí hoy directo por nuestra tienda.
          </p>
          <button onClick={() => navigate('/productos')} style={{
            background: '#f0493f', color: '#fff', border: 'none',
            padding: '18px 48px', borderRadius: 2,
            fontFamily: 'Montserrat', fontWeight: 700,
            fontSize: '0.9rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.target.style.background = '#eeeeee'; e.target.style.color = '#272727'; }}
            onMouseLeave={e => { e.target.style.background = '#f0493f'; e.target.style.color = '#fff'; }}
          >
            Ver productos →
          </button>
        </div>
      </section>

      <style>{`
        @keyframes floatBowl {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @media (max-width: 900px) {
          .hero-bowl { display: none !important; }
          .pilares-grid { grid-template-columns: 1fr !important; }
          .destacados-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .testimonios-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .destacados-grid { grid-template-columns: 1fr !important; }
          .hero-inner { padding: 120px 24px 60px !important; }
        }
      `}</style>
    </>
  );
}