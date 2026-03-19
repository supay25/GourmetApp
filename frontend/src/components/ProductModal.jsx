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
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.2s ease',
      }} />

      <div className="product-modal" style={{
        position: 'fixed', top: '50%', left: '50%', zIndex: 101,
        transform: 'translate(-50%, -50%)',
        width: '92%', maxWidth: 780,
        background: '#eeeeee', borderRadius: 8,
        border: '1px solid rgba(0,0,0,0.08)',
        display: 'flex', overflow: 'hidden',
        animation: 'slideUp 0.25s ease',
        maxHeight: '90vh',
      }}>

        {/* Image side */}
        <div className="modal-image-side">
          <div
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(240,73,63,0.15), transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <img
            src={product.imagen}
            alt={product.nombre}
            style={{
              width: "85%",
              objectFit: "contain",
              position: "relative",
              zIndex: 1,
            }}
          />
        </div>

        {/* Info side */}
        <div className="modal-info-side">
          {/* Close */}
          <button onClick={onClose} style={{
            position: 'absolute', top: 14, right: 14,
            background: 'transparent', border: 'none',
            color: 'rgba(32,32,32,0.4)', fontSize: '1.3rem',
            cursor: 'pointer', lineHeight: 1, padding: 4, transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = '#f0493f'}
            onMouseLeave={e => e.target.style.color = 'rgba(32,32,32,0.4)'}
          >✕</button>

          <p style={{
            fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#f0493f', marginBottom: 10,
          }}>✦ Producto artesanal</p>

          <h2
            style={{
              fontFamily: "Montserrat",
              fontWeight: 900,
              fontSize: "clamp(1.2rem, 3vw, 1.7rem)",
              letterSpacing: "-0.02em",
              color: "#eeeeee",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            {product.nombre}
          </h2>

          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 20,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background: "rgba(238,238,238,0.05)",
                border: "1px solid rgba(238,238,238,0.1)",
                color: "rgba(238,238,238,0.5)",
                borderRadius: 4,
                padding: "4px 12px",
                fontFamily: "Montserrat",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              Artesanal
            </span>
          </div>

          <div style={{ height: 1, background: 'rgba(32,32,32,0.15)', marginBottom: 16 }} />

          <p
            style={{
              fontFamily: "Poppins",
              fontWeight: 300,
              fontSize: "0.9rem",
              color: "rgba(238,238,238,0.65)",
              lineHeight: 1.8,
              marginBottom: 20,
              flex: 1,
            }}
          >
            {product.descripcion}
          </p>

          <div style={{ height: 1, background: 'rgba(32,32,32,0.15)', marginBottom: 16 }} />

          <span
            style={{
              fontFamily: "Montserrat",
              fontWeight: 900,
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              color: "#f0493f",
              lineHeight: 1,
              marginBottom: 16,
              display: "block",
            }}
          >
            ₡{product.precio.toLocaleString()}
          </span>

          {/* Cantidad + botón */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: '#e0e0e0', borderRadius: 2,
              border: '1px solid rgba(32,32,32,0.15)',
              padding: '0 4px', flexShrink: 0,
            }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{
                background: 'transparent', border: 'none',
                color: 'rgba(32,32,32,0.55)', fontSize: '1.1rem',
                cursor: 'pointer', padding: '10px 8px',
                transition: 'color 0.2s', lineHeight: 1,
              }}
                onMouseEnter={e => e.target.style.color = '#f0493f'}
                onMouseLeave={e => e.target.style.color = 'rgba(32,32,32,0.55)'}
              >−</button>
              <span style={{
                fontFamily: 'Montserrat', fontWeight: 700, fontSize: '1rem',
                color: '#202020', minWidth: 22, textAlign: 'center',
              }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{
                background: 'transparent', border: 'none',
                color: 'rgba(32,32,32,0.55)', fontSize: '1.1rem',
                cursor: 'pointer', padding: '10px 8px',
                transition: 'color 0.2s', lineHeight: 1,
              }}
                onMouseEnter={e => e.target.style.color = '#f0493f'}
                onMouseLeave={e => e.target.style.color = 'rgba(32,32,32,0.55)'}
              >+</button>
            </div>

            <button onClick={handleAddToCart} style={{
              flex: 1, background: '#f0493f', color: '#fff',
              border: 'none', padding: '13px', borderRadius: 2,
              fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.82rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.target.style.background = '#272727'; e.target.style.color = '#fff'; }}
              onMouseLeave={e => { e.target.style.background = '#f0493f'; e.target.style.color = '#fff'; }}
            >
              <i className="fa-solid fa-cart-shopping" style={{ marginRight: 8 }}></i>
              Añadir
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp {
          from { opacity: 0; transform: translate(-50%, -46%) }
          to   { opacity: 1; transform: translate(-50%, -50%) }
        }
        .modal-image-side {
          width: 45%; flex-shrink: 0;
          background: linear-gradient(160deg, #e8e8e8, #d8d8d8);
          display: flex; align-items: center; justify-content: center;
          padding: 40px; position: relative;
        }
        .modal-info-side {
          padding: 40px 36px; display: flex; flex-direction: column;
          flex: 1; overflow-y: auto; position: relative;
          background: #eeeeee;
        }
        @media (max-width: 600px) {
          .product-modal { flex-direction: column; max-height: 95vh; }
          .modal-image-side {
            width: 100% !important; height: 200px;
            padding: 24px; flex-shrink: 0;
          }
          .modal-image-side img {
            width: auto !important; height: 100% !important;
            max-height: 160px; object-fit: contain;
          }
          .modal-info-side { padding: 24px 20px; overflow-y: auto; }
        }
        @media (max-width: 380px) {
          .modal-image-side { height: 160px; }
          .modal-info-side { padding: 20px 16px; }
        }
      `}</style>
    </>
  );
}

export default ProductModal;