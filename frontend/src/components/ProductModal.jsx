import { useState } from 'react';
import { useCart } from '../context/CartContext';

function ProductModal({ product, onClose }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem(product);
    }
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%', zIndex: 101,
        transform: 'translate(-50%, -50%)',
        width: '90%', maxWidth: 780,
        background: '#272727',
        borderRadius: 8,
        border: '1px solid rgba(240,73,63,0.2)',
        display: 'flex', overflow: 'hidden',
        animation: 'slideUp 0.25s ease',
        maxHeight: '90vh',
      }} className="product-modal">

        {/* Image side */}
        <div style={{
          width: '45%', flexShrink: 0,
          background: 'linear-gradient(160deg, #2a2a2a, #1e1e1e)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 48, position: 'relative',
        }}>
          <div style={{
            position: 'absolute', width: 200, height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(240,73,63,0.15), transparent 70%)',
            pointerEvents: 'none',
          }} />
          <img
            src={product.photo}
            alt={product.name}
            style={{ width: '90%', objectFit: 'contain', position: 'relative', zIndex: 1 }}
          />
        </div>

        {/* Info side */}
        <div style={{
          padding: '44px 40px',
          display: 'flex', flexDirection: 'column',
          flex: 1, overflowY: 'auto', position: 'relative',
        }}>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'transparent', border: 'none',
              color: 'rgba(238,238,238,0.4)', fontSize: '1.4rem',
              cursor: 'pointer', lineHeight: 1, padding: 4,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = '#f0493f'}
            onMouseLeave={e => e.target.style.color = 'rgba(238,238,238,0.4)'}
          >
            ✕
          </button>

          {/* Tag */}
          <p style={{
            fontFamily: 'Montserrat', fontWeight: 700,
            fontSize: '0.65rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#f0493f', marginBottom: 12,
          }}>✦ Producto artesanal</p>

          {/* Nombre */}
          <h2 style={{
            fontFamily: 'Montserrat', fontWeight: 900,
            fontSize: '1.7rem', letterSpacing: '-0.02em',
            color: '#eeeeee', lineHeight: 1.1, marginBottom: 20,
          }}>
            {product.name}
          </h2>

          {/* Badges */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <span style={{
              background: 'rgba(240,73,63,0.1)', border: '1px solid rgba(240,73,63,0.2)',
              color: '#f0493f', borderRadius: 4,
              padding: '5px 14px', fontFamily: 'Montserrat',
              fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em',
            }}>
              {product.weight}
            </span>
            <span style={{
              background: 'rgba(238,238,238,0.05)', border: '1px solid rgba(238,238,238,0.1)',
              color: 'rgba(238,238,238,0.5)', borderRadius: 4,
              padding: '5px 14px', fontFamily: 'Montserrat',
              fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em',
            }}>
              Artesanal
            </span>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(238,238,238,0.07)', marginBottom: 24 }} />

          {/* Descripción */}
          <p style={{
            fontFamily: 'Poppins', fontWeight: 300,
            fontSize: '0.95rem', color: 'rgba(238,238,238,0.65)',
            lineHeight: 1.8, marginBottom: 32, flex: 1,
          }}>
            {product.description}
          </p>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(238,238,238,0.07)', marginBottom: 24 }} />

          {/* Precio */}
          <span style={{
            fontFamily: 'Montserrat', fontWeight: 900,
            fontSize: '2.2rem', color: '#f0493f',
            lineHeight: 1, marginBottom: 20, display: 'block',
          }}>
            {product.price}
          </span>

          {/* Cantidad + botón */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {/* Selector de cantidad */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: '#1e1e1e', borderRadius: 2,
              border: '1px solid rgba(238,238,238,0.1)',
              padding: '0 4px',
            }}>
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                style={{
                  background: 'transparent', border: 'none',
                  color: 'rgba(238,238,238,0.5)', fontSize: '1.1rem',
                  cursor: 'pointer', padding: '10px 10px',
                  transition: 'color 0.2s', lineHeight: 1,
                }}
                onMouseEnter={e => e.target.style.color = '#f0493f'}
                onMouseLeave={e => e.target.style.color = 'rgba(238,238,238,0.5)'}
              >−</button>
              <span style={{
                fontFamily: 'Montserrat', fontWeight: 700,
                fontSize: '1rem', color: '#eeeeee',
                minWidth: 24, textAlign: 'center',
              }}>{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                style={{
                  background: 'transparent', border: 'none',
                  color: 'rgba(238,238,238,0.5)', fontSize: '1.1rem',
                  cursor: 'pointer', padding: '10px 10px',
                  transition: 'color 0.2s', lineHeight: 1,
                }}
                onMouseEnter={e => e.target.style.color = '#f0493f'}
                onMouseLeave={e => e.target.style.color = 'rgba(238,238,238,0.5)'}
              >+</button>
            </div>

            {/* Botón añadir */}
            <button
              onClick={handleAddToCart}
              style={{
                flex: 1,
                background: '#f0493f', color: '#fff',
                border: 'none', padding: '14px',
                borderRadius: 2, fontFamily: 'Montserrat',
                fontWeight: 700, fontSize: '0.85rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.target.style.background = '#eeeeee'; e.target.style.color = '#272727'; }}
              onMouseLeave={e => { e.target.style.background = '#f0493f'; e.target.style.color = '#fff'; }}
            >
              <i className="fa-solid fa-cart-shopping" style={{ marginRight: 8 }}></i>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { 
          from { opacity: 0; transform: translate(-50%, -46%) } 
          to { opacity: 1; transform: translate(-50%, -50%) } 
        }
        @media (max-width: 600px) {
          .product-modal { flex-direction: column !important; }
          .product-modal > div:first-child { width: 100% !important; height: 240px; }
        }
      `}</style>
    </>
  );
}

export default ProductModal;