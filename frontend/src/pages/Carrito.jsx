import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Carrito() {
  const { items, removeItem, updateQty, totalItems, clearCart } = useCart();
  const navigate = useNavigate();

  const total = items.reduce((sum, i) => {
    const price = parseFloat(i.price.replace(/[^0-9]/g, ''));
    return sum + price * i.qty;
  }, 0);

  if (items.length === 0) {
    return (
      <section style={{
        minHeight: '100vh', background: '#202020',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 48px',
      }}>
        <p style={{ fontSize: '4rem', marginBottom: 24 }}>🛍</p>
        <p style={{
          fontFamily: 'Montserrat', fontWeight: 700,
          fontSize: '0.7rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: '#f0493f', marginBottom: 16,
        }}>✦ Carrito vacío</p>
        <h2 style={{
          fontFamily: 'Montserrat', fontWeight: 900,
          fontSize: '2.5rem', letterSpacing: '-0.03em',
          color: '#eeeeee', marginBottom: 16, textAlign: 'center',
        }}>Tu carrito está vacío</h2>
        <p style={{
          fontFamily: 'Poppins', fontWeight: 300,
          color: 'rgba(238,238,238,0.5)', marginBottom: 40, textAlign: 'center',
        }}>
          Explorá nuestros productos y añadí los que te gusten.
        </p>
        <button onClick={() => navigate('/productos')} style={{
          background: '#f0493f', color: '#fff', border: 'none',
          padding: '14px 32px', borderRadius: 2,
          fontFamily: 'Montserrat', fontWeight: 700,
          fontSize: '0.85rem', letterSpacing: '0.1em',
          textTransform: 'uppercase', cursor: 'pointer',
        }}>
          Ver productos →
        </button>
      </section>
    );
  }

  return (
    <section style={{
      minHeight: '100vh', background: '#202020',
      paddingTop: 120, paddingBottom: 100,
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 48px' }} className="carrito-wrapper">

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{
            fontFamily: 'Montserrat', fontWeight: 700,
            fontSize: '0.7rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#f0493f', marginBottom: 16,
          }}>✦ Tu pedido</p>
          <h1 style={{
            fontFamily: 'Montserrat', fontWeight: 900,
            fontSize: 'clamp(2.5rem, 4vw, 4rem)',
            letterSpacing: '-0.04em', color: '#eeeeee', lineHeight: 0.95,
          }}>
            CARRITO<br /><span style={{ color: '#f0493f' }}>DE COMPRAS</span>
          </h1>
        </div>

        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }} className="carrito-layout">

          {/* Items */}
          <div style={{ flex: 1 }}>
            {items.map((item) => (
              <div key={item.name} style={{
                display: 'flex', alignItems: 'center', gap: 20,
                background: '#272727', borderRadius: 6,
                border: '1px solid rgba(238,238,238,0.05)',
                padding: '20px 24px', marginBottom: 12,
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(240,73,63,0.2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(238,238,238,0.05)'}
              >
                {/* Imagen */}
                <div style={{
                  width: 72, height: 72, flexShrink: 0,
                  background: 'linear-gradient(135deg, #2a2a2a, #1e1e1e)',
                  borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img src={item.photo} alt={item.name}
                    style={{ width: 56, height: 56, objectFit: 'contain' }} />
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontFamily: 'Montserrat', fontWeight: 700,
                    fontSize: '0.95rem', color: '#eeeeee', marginBottom: 4,
                  }}>{item.name}</h3>
                  <span style={{
                    fontFamily: 'Montserrat', fontSize: '0.7rem',
                    color: 'rgba(238,238,238,0.35)', letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>{item.weight}</span>
                </div>

                {/* Cantidad */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button onClick={() => updateQty(item.name, item.qty - 1)} style={{
                    width: 28, height: 28, borderRadius: 2,
                    background: 'transparent', border: '1px solid rgba(238,238,238,0.2)',
                    color: '#eeeeee', cursor: 'pointer', fontSize: '1rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.target.style.borderColor = '#f0493f'; e.target.style.color = '#f0493f'; }}
                    onMouseLeave={e => { e.target.style.borderColor = 'rgba(238,238,238,0.2)'; e.target.style.color = '#eeeeee'; }}
                  >−</button>
                  <span style={{
                    fontFamily: 'Montserrat', fontWeight: 700,
                    fontSize: '1rem', color: '#eeeeee', minWidth: 20, textAlign: 'center',
                  }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.name, item.qty + 1)} style={{
                    width: 28, height: 28, borderRadius: 2,
                    background: 'transparent', border: '1px solid rgba(238,238,238,0.2)',
                    color: '#eeeeee', cursor: 'pointer', fontSize: '1rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.target.style.borderColor = '#f0493f'; e.target.style.color = '#f0493f'; }}
                    onMouseLeave={e => { e.target.style.borderColor = 'rgba(238,238,238,0.2)'; e.target.style.color = '#eeeeee'; }}
                  >+</button>
                </div>

                {/* Subtotal */}
                <span style={{
                  fontFamily: 'Montserrat', fontWeight: 800,
                  fontSize: '1rem', color: '#f0493f',
                  minWidth: 60, textAlign: 'right',
                }}>
                  {item.price}
                </span>

                {/* Eliminar */}
                <button onClick={() => removeItem(item.name)} style={{
                  background: 'transparent', border: 'none',
                  color: 'rgba(238,238,238,0.2)', cursor: 'pointer',
                  fontSize: '1rem', padding: 4, transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = '#f0493f'}
                  onMouseLeave={e => e.target.style.color = 'rgba(238,238,238,0.2)'}
                >✕</button>
              </div>
            ))}

            {/* Vaciar carrito */}
            <button onClick={clearCart} style={{
              background: 'transparent', border: 'none',
              color: 'rgba(238,238,238,0.3)', cursor: 'pointer',
              fontFamily: 'Montserrat', fontSize: '0.75rem',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              marginTop: 8, transition: 'color 0.2s', padding: 0,
            }}
              onMouseEnter={e => e.target.style.color = '#f0493f'}
              onMouseLeave={e => e.target.style.color = 'rgba(238,238,238,0.3)'}
            >
              Vaciar carrito
            </button>
          </div>

          {/* Resumen */}
          <div style={{
            width: 280, flexShrink: 0,
            background: '#272727', borderRadius: 6,
            border: '1px solid rgba(238,238,238,0.05)',
            padding: 28, position: 'sticky', top: 100,
          }} className="carrito-resumen">
            <h3 style={{
              fontFamily: 'Montserrat', fontWeight: 800,
              fontSize: '0.8rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#eeeeee', marginBottom: 24,
            }}>Resumen</h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontFamily: 'Poppins', fontSize: '0.9rem', color: 'rgba(238,238,238,0.5)' }}>
                Productos ({totalItems})
              </span>
              <span style={{ fontFamily: 'Montserrat', fontWeight: 600, color: '#eeeeee', fontSize: '0.9rem' }}>
                {items.length} items
              </span>
            </div>

            <div style={{ height: 1, background: 'rgba(238,238,238,0.07)', margin: '20px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
              <span style={{ fontFamily: 'Montserrat', fontWeight: 700, color: '#eeeeee' }}>Total</span>
              <span style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '1.3rem', color: '#f0493f' }}>
                ₡{total.toLocaleString()}
              </span>
            </div>

            <button onClick={() => navigate('/checkout')} style={{
              width: '100%', background: '#f0493f', color: '#fff',
              border: 'none', padding: '14px', borderRadius: 2,
              fontFamily: 'Montserrat', fontWeight: 700,
              fontSize: '0.85rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', cursor: 'pointer',
              transition: 'all 0.2s', marginBottom: 12,
            }}
              onMouseEnter={e => { e.target.style.background = '#eeeeee'; e.target.style.color = '#272727'; }}
              onMouseLeave={e => { e.target.style.background = '#f0493f'; e.target.style.color = '#fff'; }}
            >
              Proceder al pago →
            </button>

            <button onClick={() => navigate('/productos')} style={{
              width: '100%', background: 'transparent', color: 'rgba(238,238,238,0.4)',
              border: '1px solid rgba(238,238,238,0.1)', padding: '12px', borderRadius: 2,
              fontFamily: 'Montserrat', fontWeight: 500,
              fontSize: '0.8rem', letterSpacing: '0.08em',
              textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(238,238,238,0.3)'; e.currentTarget.style.color = '#eeeeee'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(238,238,238,0.1)'; e.currentTarget.style.color = 'rgba(238,238,238,0.4)'; }}
            >
              Seguir comprando
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .carrito-wrapper { padding: 0 24px !important; }
          .carrito-layout { flex-direction: column !important; }
          .carrito-resumen { width: 100% !important; position: static !important; }
        }
      `}</style>
    </section>
  );
}