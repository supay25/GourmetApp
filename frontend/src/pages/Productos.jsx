import { useState } from 'react';
import products from '../data/products';
import ProductModal from '../components/ProductModal';

export default function Productos() {
  const [selected, setSelected] = useState(null);

  return (
    <section style={{
      minHeight: '100vh', background: '#202020',
      paddingTop: 120, paddingBottom: 100,
    }}>
      {/* Header */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 48px 72px',
        borderBottom: '1px solid rgba(238,238,238,0.07)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      }} className="productos-header-inner">
        <div>
          <p style={{
            fontFamily: 'Montserrat', fontWeight: 700,
            fontSize: '0.7rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#f0493f', marginBottom: 16,
          }}>✦ Catálogo</p>
          <h1 style={{
            fontFamily: 'Montserrat', fontWeight: 900,
            fontSize: 'clamp(2.8rem, 5vw, 5rem)',
            letterSpacing: '-0.04em', lineHeight: 0.95,
            color: '#eeeeee',
          }}>
            NUESTROS<br /><span style={{ color: '#f0493f' }}>PRODUCTOS</span>
          </h1>
        </div>
        <p style={{
          fontFamily: 'Poppins', fontWeight: 300,
          fontSize: '0.95rem', color: 'rgba(238,238,238,0.45)',
          maxWidth: 260, textAlign: 'right', lineHeight: 1.7,
        }} className="productos-subtitle">
          Elaborados artesanalmente con ingredientes seleccionados.
        </p>
      </div>

      {/* Products grid */}
      <div className="products-grid" style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 48px' }}>
        {products.map((product) => (
          <div
            key={product.name}
            className="product-card-new"
            onClick={() => setSelected(product)}
          >
            <div className="product-image-area">
              <div className="product-glow" />
              <img src={product.photo} alt={product.name} className="product-img" />
            </div>
            <div className="product-info-area">
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                  <h2 style={{
                    fontFamily: 'Montserrat', fontWeight: 700,
                    fontSize: '1rem', color: '#eeeeee',
                    letterSpacing: '0.01em', lineHeight: 1.3,
                  }}>
                    {product.name}
                  </h2>
                  <span style={{
                    fontFamily: 'Montserrat', fontWeight: 700,
                    fontSize: '0.65rem', letterSpacing: '0.1em',
                    color: 'rgba(238,238,238,0.3)',
                    textTransform: 'uppercase', flexShrink: 0, marginLeft: 12,
                  }}>
                    {product.weight}
                  </span>
                </div>
                <p style={{
                  fontFamily: 'Poppins', fontWeight: 300,
                  fontSize: '0.85rem', color: 'rgba(238,238,238,0.45)',
                  lineHeight: 1.7,
                }}>
                  {product.description}
                </p>
              </div>
              <div style={{ height: 1, background: 'rgba(238,238,238,0.07)', margin: '20px 0' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontFamily: 'Montserrat', fontWeight: 800,
                  fontSize: '1.2rem', color: '#f0493f',
                }}>
                  {product.price}
                </span>
                <button
                  className="product-btn"
                  onClick={e => { e.stopPropagation(); setSelected(product); }}
                >
                  + Añadir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <ProductModal product={selected} onClose={() => setSelected(null)} />

      <style>{`
        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        @media (max-width: 1100px) { .products-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) { .products-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; padding: 48px 24px !important; } .productos-header-inner { flex-direction: column !important; gap: 16px; padding: 0 24px 48px !important; } .productos-subtitle { text-align: left !important; } }
        @media (max-width: 480px) { .products-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } }
        .product-card-new { display: flex; flex-direction: column; background: #272727; border-radius: 6px; overflow: hidden; border: 1px solid rgba(238,238,238,0.05); transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; cursor: pointer; }
        .product-card-new:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,0.5); border-color: rgba(240,73,63,0.3); }
        .product-image-area { background: linear-gradient(160deg, #2a2a2a, #1e1e1e); display: flex; align-items: center; justify-content: center; padding: 32px 24px; position: relative; overflow: hidden; aspect-ratio: 1; }
        .product-glow { position: absolute; width: 100px; height: 100px; border-radius: 50%; background: radial-gradient(circle, rgba(240,73,63,0.15), transparent 70%); pointer-events: none; }
        .product-img { width: 75%; height: 75%; object-fit: contain; position: relative; z-index: 1; transition: transform 0.3s ease; }
        .product-card-new:hover .product-img { transform: scale(1.06); }
        .product-info-area { padding: 20px 20px 18px; display: flex; flex-direction: column; flex: 1; }
        .product-btn { background: transparent; color: #f0493f; border: 1px solid rgba(240,73,63,0.4); padding: 7px 16px; border-radius: 2px; font-family: Montserrat; font-weight: 600; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
        .product-btn:hover { background: #f0493f; color: #fff; }
        @media (max-width: 768px) { .product-info-area { padding: 14px 14px 12px; } .product-info-area h2 { font-size: 0.85rem !important; } .product-info-area p { font-size: 0.75rem !important; } }
      `}</style>
    </section>
  );
}