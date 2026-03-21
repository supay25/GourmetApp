import { useState, useEffect } from "react";
import ProductModal from "../components/ProductModal";

const API = import.meta.env.VITE_API_URL;

// Un producto aparece en el catálogo público si está activo
// y cumple la condición de su tipo
const esVisibleEnPublico = (p) => {
  if (!p.activo) return false;
  if (p.tipo === 'tiempo_limitado') {
    if (!p.fechaInicio || !p.fechaFin) return false;
    const ahora = new Date();
    return ahora >= new Date(p.fechaInicio) && ahora <= new Date(p.fechaFin);
  }
  return true;
};

// Producto por stock agotado — se muestra pero bloqueado
const estaAgotado = (p) => p.tipo === 'stock' && p.stock === 0;

export default function Productos() {
  const [selected, setSelected] = useState(null);
  const [productos, setProductos] = useState([]);

  useEffect(() => { listaProductos(); }, []);

  const listaProductos = async () => {
    try {
      const res = await fetch(`${API}/api/productos`);
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const visibles = productos.filter(esVisibleEnPublico);

  // Separar en dos grupos
  const limitados = visibles.filter(p => p.tipo === 'tiempo_limitado');
  const normales = visibles.filter(p => p.tipo === 'stock');

  return (
    <section style={{
      minHeight: "100vh", background: "#202020",
      paddingTop: 120, paddingBottom: 100,
    }}>

      {/* Header */}
      <div className="productos-header-inner">
        <div>
          <p style={{
            fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.7rem",
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#f0493f", marginBottom: 16,
          }}>✦ Catálogo</p>
          <h1 style={{
            fontFamily: "Montserrat", fontWeight: 900,
            fontSize: "clamp(2.8rem, 5vw, 5rem)",
            letterSpacing: "-0.04em", lineHeight: 0.95, color: "#eeeeee",
          }}>
            NUESTROS<br /><span style={{ color: "#f0493f" }}>PRODUCTOS</span>
          </h1>
        </div>
        <p className="productos-subtitle">
          Elaborados artesanalmente con ingredientes seleccionados.
        </p>
      </div>

      {/* ── SECCIÓN TIEMPO LIMITADO ── */}
      {limitados.length > 0 && (
        <div className="section-limitados">
          <div className="limitados-inner">

            {/* Header sección */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{
                  background: 'rgba(63,169,240,0.15)',
                  border: '1px solid rgba(63,169,240,0.3)',
                  color: '#3fa9f0', fontFamily: 'Montserrat', fontWeight: 700,
                  fontSize: '0.65rem', letterSpacing: '0.15em',
                  textTransform: 'uppercase', padding: '5px 12px', borderRadius: 3,
                }}>⏰ Tiempo limitado</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(63,169,240,0.15)' }} />
              </div>
              <p style={{
                fontFamily: 'Poppins', fontSize: '0.88rem',
                color: 'rgba(238,238,238,0.4)',
              }}>Disponibles por tiempo limitado — no te los pierdas</p>
            </div>

            {/* Cards anchas */}
            <div className="limitados-grid">
              {limitados.map((p) => (
                <div key={p._id} className="product-card-limitado"
                  onClick={() => setSelected(p)}>

                  {/* Imagen */}
                  <div className="limitado-image-area">
                    <div style={{
                      position: 'absolute', width: 140, height: 140, borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(63,169,240,0.2), transparent 70%)',
                      pointerEvents: 'none',
                    }} />
                    <img src={p.imagen} alt={p.nombre}
                      style={{ height: '80%', objectFit: 'contain', position: 'relative', zIndex: 1 }} />

                    {/* Cuenta regresiva */}
                    <CountdownBadge fechaFin={p.fechaFin} />
                  </div>

                  {/* Info */}
                  <div className="limitado-info-area">
                    <div style={{ flex: 1 }}>
                      <span style={{
                        fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem',
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        color: '#3fa9f0', display: 'block', marginBottom: 8,
                      }}>✦ Edición limitada</span>
                      <h2 style={{
                        fontFamily: 'Montserrat', fontWeight: 900,
                        fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                        letterSpacing: '-0.02em', color: '#eeeeee',
                        lineHeight: 1.1, marginBottom: 6,
                      }}>{p.nombre}</h2>
                      {/* Peso si existe */}
                      {p.peso && (
                        <span style={{
                          fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.72rem',
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          color: 'rgba(63,169,240,0.7)', display: 'block', marginBottom: 10,
                        }}>{p.peso}</span>
                      )}
                      <p style={{
                        fontFamily: 'Poppins', fontWeight: 300, fontSize: '0.92rem',
                        color: 'rgba(238,238,238,0.55)', lineHeight: 1.7,
                      }}>{p.descripcion}</p>
                    </div>
                    <div style={{ height: 1, background: 'rgba(238,238,238,0.08)', margin: '16px 0' }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                      <span style={{
                        fontFamily: 'Montserrat', fontWeight: 900,
                        fontSize: '1.5rem', color: '#3fa9f0',
                      }}>₡{p.precio.toLocaleString()}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelected(p); }}
                        style={{
                          background: '#3fa9f0', color: '#fff', border: 'none',
                          padding: '12px 24px', borderRadius: 2,
                          fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.8rem',
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          cursor: 'pointer', transition: 'all 0.2s',
                          display: 'flex', alignItems: 'center', gap: 8,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#eeeeee'; e.currentTarget.style.color = '#272727'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#3fa9f0'; e.currentTarget.style.color = '#fff'; }}
                      >
                        <i className="fa-solid fa-cart-shopping" />
                        Pedir ahora
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CATÁLOGO NORMAL ── */}
      {normales.length > 0 && (
        <>
          {limitados.length > 0 && (
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: 'rgba(238,238,238,0.4)',
                }}>📦 Catálogo permanente</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(238,238,238,0.07)' }} />
              </div>
            </div>
          )}

          <div className="products-grid">
            {normales.map((p) => {
              const agotado = estaAgotado(p);
              return (
                <div key={p._id} className="product-card-new"
                  onClick={() => !agotado && setSelected(p)}
                  style={{ cursor: agotado ? 'default' : 'pointer' }}>

                  <div className="product-image-area" style={{ position: 'relative' }}>
                    <div className="product-glow" />
                    <img src={p.imagen} alt={p.nombre} className="product-img"
                      style={{ opacity: agotado ? 0.4 : 1 }} />

                    {/* Overlay agotado */}
                    {agotado && (
                      <div style={{
                        position: 'absolute', inset: 0, zIndex: 2,
                        background: 'rgba(32,32,32,0.6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span style={{
                          background: '#272727', color: 'rgba(238,238,238,0.7)',
                          fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.72rem',
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          padding: '8px 16px', borderRadius: 3,
                          border: '1px solid rgba(238,238,238,0.15)',
                        }}>Agotado temporalmente</span>
                      </div>
                    )}
                  </div>

                  <div className="product-info-area">
                    <div style={{ flex: 1 }}>
                      <h2 className="product-name">{p.nombre}</h2>
                      {/* Peso si existe */}
                      {p.peso && (
                        <span className="product-weight">{p.peso}</span>
                      )}
                      {/* Estado de stock */}
                      {p.tipo === 'stock' && (
                        <span className="product-weight" style={{
                          color: agotado ? '#f0493f' : 'rgba(32,32,32,0.4)',
                          fontSize: '0.75rem',
                        }}>
                          {agotado ? 'Sin stock' : `Stock: ${p.stock}`}
                        </span>
                      )}
                      <p className="product-desc">{p.descripcion}</p>
                    </div>
                    <div style={{ height: 1, background: "rgba(32,32,32,0.15)", margin: "12px 0" }} />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <span className="product-price">₡{p.precio.toLocaleString()}</span>
                      <button className="product-btn" disabled={agotado}
                        onClick={(e) => { e.stopPropagation(); if (!agotado) setSelected(p); }}
                        style={{ opacity: agotado ? 0.35 : 1, cursor: agotado ? 'not-allowed' : 'pointer' }}>
                        <i className="fa-solid fa-cart-shopping"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Estado vacío */}
      {visibles.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 40px' }}>
          <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '1.1rem', color: 'rgba(238,238,238,0.3)' }}>
            No hay productos disponibles por el momento.
          </p>
        </div>
      )}

      <ProductModal product={selected} onClose={() => setSelected(null)} />

      <style>{`
        .productos-header-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 0 48px 72px;
          border-bottom: 1px solid rgba(238,238,238,0.07);
          display: flex; align-items: flex-end; justify-content: space-between;
        }
        .productos-subtitle {
          font-family: Poppins; font-weight: 300; font-size: 0.95rem;
          color: rgba(238,238,238,0.45); max-width: 260px;
          text-align: right; line-height: 1.7;
        }

        /* Sección tiempo limitado */
        .section-limitados {
          background: linear-gradient(180deg, rgba(63,169,240,0.04) 0%, transparent 100%);
          border-bottom: 1px solid rgba(63,169,240,0.1);
          padding: 56px 0;
        }
        .limitados-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 48px;
        }
        .limitados-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;
        }
        .product-card-limitado {
          display: flex; flex-direction: row;
          background: #272727; border-radius: 8px; overflow: hidden;
          border: 1px solid rgba(63,169,240,0.15);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          cursor: pointer; min-height: 200px;
        }
        .product-card-limitado:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.4);
          border-color: rgba(63,169,240,0.4);
        }
        .limitado-image-area {
          width: 220px; flex-shrink: 0;
          background: linear-gradient(160deg, #2a2a2a, #1e1e1e);
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }
        .limitado-info-area {
          padding: 24px 28px; display: flex; flex-direction: column; flex: 1;
        }

        /* Grid catálogo normal */
        .products-grid {
          max-width: 1200px; margin: 0 auto; padding: 40px 48px 0;
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
        }
        .product-card-new {
          display: flex; flex-direction: column;
          background: #eeeeee; border-radius: 6px; overflow: hidden;
          border: 1px solid rgba(0,0,0,0.06);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .product-card-new:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.4);
          border-color: rgba(240,73,63,0.4);
        }
        .product-image-area {
          background: linear-gradient(160deg, #e0e0e0, #d4d4d4);
          display: flex; align-items: center; justify-content: center;
          padding: 24px; position: relative; overflow: hidden; aspect-ratio: 4/3;
        }
        .product-glow {
          position: absolute; width: 100px; height: 100px; border-radius: 50%;
          background: radial-gradient(circle, rgba(240,73,63,0.2), transparent 70%);
          pointer-events: none;
        }
        .product-img {
          width: 80%; height: 80%; object-fit: contain;
          position: relative; z-index: 1; transition: transform 0.3s ease;
        }
        .product-card-new:hover .product-img { transform: scale(1.06); }
        .product-info-area {
          padding: 20px; display: flex; flex-direction: column; flex: 1;
          background: #eeeeee;
        }
        .product-name {
          font-family: Montserrat; font-weight: 700; font-size: 1.4rem;
          color: #202020; line-height: 1.3; margin-bottom: 6px;
        }
        .product-weight {
          font-family: Montserrat; font-weight: 700; font-size: 0.85rem;
          letter-spacing: 0.1em; color: rgba(32,32,32,0.55);
          text-transform: uppercase; display: block; margin-bottom: 6px;
        }
        .product-desc {
          font-family: Poppins; font-weight: 300; font-size: 1rem;
          color: rgba(32,32,32,0.65); line-height: 1.6;
        }
        .product-price {
          font-family: Montserrat; font-weight: 800;
          font-size: 1.2rem; color: #f0493f;
        }
        .product-btn {
          background: #f0493f; color: #fff; border: none;
          width: 36px; height: 36px; border-radius: 2px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; cursor: pointer; transition: all 0.2s; flex-shrink: 0;
        }
        .product-btn:not(:disabled):hover { background: #272727; color: #fff; }

        @media (max-width: 1100px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); }
          .limitados-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; padding: 32px 20px 0; }
          .limitados-inner { padding: 0 20px; }
          .productos-header-inner { flex-direction: column; gap: 16px; padding: 0 20px 40px; }
          .productos-subtitle { text-align: left; max-width: 100%; }
          .product-card-limitado { flex-direction: column; }
          .limitado-image-area { width: 100%; height: 180px; }
          .limitado-info-area { padding: 16px 18px; }
          .product-image-area { padding: 20px; }
          .product-info-area { padding: 14px; }
          .product-name { font-size: 0.9rem; }
          .product-desc { font-size: 0.8rem; }
          .product-price { font-size: 1.05rem; }
          .productos-header-inner > div { text-align: left; width: 100%; }
        }
        @media (max-width: 380px) {
          .products-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

// Componente de cuenta regresiva — actualiza cada minuto
function CountdownBadge({ fechaFin }) {
  const [texto, setTexto] = useState('');

  useEffect(() => {
    const calcular = () => {
      const ahora = new Date();
      const fin = new Date(fechaFin);
      const diff = fin - ahora;
      if (diff <= 0) { setTexto('Finalizado'); return; }
      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      if (dias > 0) setTexto(`${dias}d ${horas}h restantes`);
      else if (horas > 0) setTexto(`${horas}h ${mins}m restantes`);
      else setTexto(`${mins}m restantes`);
    };
    calcular();
    const interval = setInterval(calcular, 60000);
    return () => clearInterval(interval);
  }, [fechaFin]);

  return (
    <div style={{
      position: 'absolute', bottom: 10, left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
      color: '#3fa9f0', fontFamily: 'Montserrat', fontWeight: 700,
      fontSize: '0.65rem', letterSpacing: '0.08em',
      padding: '4px 10px', borderRadius: 3, whiteSpace: 'nowrap',
      border: '1px solid rgba(63,169,240,0.3)',
    }}>⏱ {texto}</div>
  );
}