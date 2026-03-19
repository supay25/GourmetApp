import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import products from '../data/products';

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
  const destacados = products.slice(0, 3);

  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', position: 'relative',
        display: 'flex', alignItems: 'center',
        overflow: 'hidden', background: '#202020',
      }}>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url(/images/headers/home-banner - 1.png)',
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'rgba(20,20,20,0.75)',
        }} />

        <div className="hero-inner">
          <div className="hero-text">
            <p style={{
              fontFamily: 'Montserrat', fontWeight: 700,
              fontSize: '0.7rem', letterSpacing: '0.25em',
              textTransform: 'uppercase', color: '#f0493f', marginBottom: 20,
            }}>✦ Gastronomía artesanal</p>
            <h1 style={{
              fontFamily: 'Montserrat', fontWeight: 900,
              fontSize: 'clamp(2.8rem, 6vw, 6rem)',
              letterSpacing: '-0.04em', lineHeight: 0.9,
              color: '#eeeeee', textTransform: 'uppercase', marginBottom: 24,
            }}>
              SABOR<br />QUE SE<br /><span style={{ color: '#f0493f' }}>SIENTE</span>
            </h1>
            <p style={{
              fontFamily: 'Poppins', fontWeight: 300,
              fontSize: '1rem', color: 'rgba(238,238,238,0.6)',
              lineHeight: 1.8, marginBottom: 36, maxWidth: 400,
            }}>
              Productos artesanales elaborados con ingredientes frescos, pensados para elevar cada plato.
            </p>
            <div className="hero-buttons">
              <button onClick={() => navigate('/productos')} style={{
                background: '#f0493f', color: '#fff', border: 'none',
                padding: '15px 32px', borderRadius: 2,
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
                padding: '15px 32px', borderRadius: 2,
                fontFamily: 'Montserrat', fontWeight: 600,
                fontSize: '0.85rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(238,238,238,0.5)'; e.currentTarget.style.color = '#eeeeee'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(238,238,238,0.2)'; e.currentTarget.style.color = 'rgba(238,238,238,0.6)'; }}
              >Conócenos</button>
            </div>
          </div>

          <div className="hero-bowl">
            <img src="/images/bowl.png" alt="Bowl Gourmetto"
              style={{ width: '100%', filter: 'drop-shadow(0 20px 60px rgba(240,73,63,0.3))' }} />
          </div>
        </div>
      </section>

      {/* ── PILARES ── */}
      <section id="pilares" className="section-pilares">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{
              fontFamily: 'Montserrat', fontWeight: 700,
              fontSize: '0.7rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 16,
            }}>✦ Por qué Gourmetto</p>
            <h2 style={{
              fontFamily: 'Montserrat', fontWeight: 900,
              fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
              letterSpacing: '-0.03em', color: '#fff', lineHeight: 1,
            }}>
              HECHO CON <span style={{ color: '#272727' }}>INTENCIÓN</span>
            </h2>
          </div>
          <div className="pilares-grid">
            {pilares.map((p, i) => (
              <div key={i} style={{
                background: 'rgba(0,0,0,0.15)', borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '32px 28px', transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.25)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.15)'}
              >
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: 16 }}>{p.icon}</span>
                <h3 style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '1.05rem', color: '#fff', marginBottom: 10 }}>{p.titulo}</h3>
                <p style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTOS DESTACADOS ── */}
      <section className="section-destacados">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="destacados-header">
            <div>
              <p style={{
                fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.7rem',
                letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f0493f', marginBottom: 12,
              }}>✦ Lo más pedido</p>
              <h2 style={{
                fontFamily: 'Montserrat', fontWeight: 900,
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                letterSpacing: '-0.03em', color: '#eeeeee', lineHeight: 1,
              }}>PRODUCTOS<br /><span style={{ color: '#f0493f' }}>DESTACADOS</span></h2>
            </div>
            <button onClick={() => navigate('/productos')} style={{
              background: 'transparent', color: 'rgba(238,238,238,0.5)',
              border: '1px solid rgba(238,238,238,0.15)', padding: '12px 28px', borderRadius: 2,
              fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.8rem',
              letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
              transition: 'all 0.2s', alignSelf: 'flex-end',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#f0493f'; e.currentTarget.style.color = '#f0493f'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(238,238,238,0.15)'; e.currentTarget.style.color = 'rgba(238,238,238,0.5)'; }}
            >Ver todos →</button>
          </div>

          <div className="destacados-grid">
            {destacados.map((product, i) => (
              <div key={i} style={{
                background: '#eeeeee', borderRadius: 6,
                border: '1px solid rgba(0,0,0,0.06)',
                overflow: 'hidden', transition: 'border-color 0.2s, transform 0.2s', cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(240,73,63,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{
                  background: 'linear-gradient(135deg, #e8e8e8, #d8d8d8)',
                  padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 180,
                }}>
                  <img src={product.photo} alt={product.name} style={{ height: 140, objectFit: 'contain' }} />
                </div>
                <div style={{ padding: '18px 20px 22px' }}>
                  <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '1.4rem', color: '#202020', marginBottom: 4 }}>{product.name}</p>
                  <p style={{ fontFamily: 'Montserrat', fontSize: '0.9rem', color: 'rgba(32,32,32,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14, fontWeight: '600' }}>{product.weight}</p>
                  <div style={{ height: 1, background: 'rgba(32,32,32,0.15)', marginBottom: 14 }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '1.1rem', color: '#f0493f' }}>{product.price}</span>
                    <button onClick={(e) => { e.stopPropagation(); addItem(product); }} style={{
                      background: '#f0493f', color: '#fff', border: 'none',
                      padding: '9px 14px', borderRadius: 2, fontFamily: 'Montserrat',
                      fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => { e.target.style.background = '#272727'; e.target.style.color = '#fff'; }}
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
      <section className="section-testimonios">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{
              fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.7rem',
              letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f0493f', marginBottom: 16,
            }}>✦ Lo que dicen</p>
            <h2 style={{
              fontFamily: 'Montserrat', fontWeight: 900,
              fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
              letterSpacing: '-0.03em', color: '#eeeeee', lineHeight: 1,
            }}>CLIENTES QUE<br /><span style={{ color: '#f0493f' }}>NOS ELIGEN</span></h2>
          </div>
          <div className="testimonios-grid">
            {testimonios.map((t, i) => (
              <div key={i} style={{
                background: '#202020', borderRadius: 6,
                border: '1px solid rgba(238,238,238,0.05)', padding: '28px 24px',
              }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                  {Array.from({ length: t.estrellas }).map((_, j) => (
                    <span key={j} style={{ color: '#f0493f', fontSize: '0.9rem' }}>★</span>
                  ))}
                </div>
                <p style={{
                  fontFamily: 'Poppins', fontWeight: 300, fontSize: '0.9rem',
                  color: 'rgba(238,238,238,0.6)', lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic',
                }}>"{t.texto}"</p>
                <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.82rem', color: '#eeeeee' }}>— {t.nombre}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="section-cta">
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url(/images/headers/home-banner-negro.png)',
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(20,20,20,0.72)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p style={{
            fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.7rem',
            letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f0493f', marginBottom: 20,
          }}>✦ ¿Listo para probar?</p>
          <h2 style={{
            fontFamily: 'Montserrat', fontWeight: 900,
            fontSize: 'clamp(2rem, 5vw, 5rem)',
            letterSpacing: '-0.04em', color: '#eeeeee',
            lineHeight: 0.95, marginBottom: 24,
          }}>
            LLEVÁ EL SABOR<br /><span style={{ color: '#f0493f' }}>A TU MESA</span>
          </h2>
          <p style={{
            fontFamily: 'Poppins', fontWeight: 300, fontSize: '0.95rem',
            color: 'rgba(238,238,238,0.45)', maxWidth: 440, margin: '0 auto 40px',
          }}>
            Explorá nuestra selección de productos artesanales y pedí hoy directo por nuestra tienda.
          </p>
          <button onClick={() => navigate('/productos')} style={{
            background: '#f0493f', color: '#fff', border: 'none',
            padding: '16px 44px', borderRadius: 2, fontFamily: 'Montserrat',
            fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.12em',
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
        .hero-inner {
          position: relative; z-index: 2;
          max-width: 1100px; margin: 0 auto;
          padding: 120px 48px 80px; width: 100%;
          display: flex; align-items: center;
          justify-content: space-between; gap: 40px;
        }
        .hero-text { max-width: 560px; }
        .hero-bowl { flex-shrink: 0; width: 320px; animation: floatBowl 4s ease-in-out infinite; }
        .hero-buttons { display: flex; gap: 14px; flex-wrap: wrap; }

        .section-pilares   { background: #f0493f; padding: 100px 48px; }
        .section-destacados { background: #202020; padding: 100px 48px; }
        .section-testimonios { background: #272727; padding: 100px 48px; }
        .section-cta { padding: 120px 48px; text-align: center; position: relative; overflow: hidden; }

        .pilares-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .destacados-header {
          display: flex; justify-content: space-between;
          align-items: flex-end; margin-bottom: 40px; flex-wrap: wrap; gap: 16px;
        }
        .destacados-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .testimonios-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

        @media (max-width: 900px) {
          .hero-bowl { width: 240px; }
          .pilares-grid { grid-template-columns: 1fr 1fr; }
          .destacados-grid { grid-template-columns: repeat(2, 1fr); }
          .testimonios-grid { grid-template-columns: 1fr 1fr; }
          .section-pilares, .section-destacados, .section-testimonios { padding: 72px 32px; }
          .section-cta { padding: 90px 32px; }
          .hero-inner { padding: 100px 32px 60px; }
        }
        @media (max-width: 600px) {
          .hero-inner { padding: 100px 20px 60px; flex-direction: column; align-items: flex-start; gap: 0; }
          .hero-text { max-width: 100%; }
          .hero-bowl { width: 180px; position: absolute; top: 130px; right: 20px; animation: floatBowl 4s ease-in-out infinite; }
          .hero-buttons { flex-direction: column; }
          .hero-buttons button { width: 100%; text-align: center; }
          .pilares-grid { grid-template-columns: 1fr; gap: 14px; }
          .destacados-grid { grid-template-columns: 1fr; gap: 16px; }
          .testimonios-grid { grid-template-columns: 1fr; gap: 14px; }
          .destacados-header { flex-direction: column; align-items: flex-start; }
          .section-pilares, .section-destacados, .section-testimonios { padding: 56px 20px; }
          .section-cta { padding: 64px 20px; }
        }
        @media (max-width: 380px) {
          .hero-bowl { width: 140px; top: 90px; right: 12px; }
        }
      `}</style>
    </>
  );
}