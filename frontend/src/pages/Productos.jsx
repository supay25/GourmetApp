import { useState, useEffect } from "react";
import ProductModal from "../components/ProductModal";

export default function Productos() {
  const [selected, setSelected] = useState(null)
  const [productos, setProductos] = useState([])



  useEffect(() => {
    listaProductos()
  }, [])



  const listaProductos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/productos", {
        method: "GET"
      });
      const data = await respuesta.json();
      setProductos(data)
      console.log(data)

    } catch (error) {
      console.error("Error:", error)
    }
  }



  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#202020",
        paddingTop: 120,
        paddingBottom: 100,
      }}
    >
      {/* Header */}
      <div className="productos-header-inner">
        <div>
          <p
            style={{
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#f0493f",
              marginBottom: 16,
            }}
          >
            ✦ Catálogo
          </p>
          <h1
            style={{
              fontFamily: "Montserrat",
              fontWeight: 900,
              fontSize: "clamp(2.8rem, 5vw, 5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "#eeeeee",
            }}
          >
            NUESTROS
            <br />
            <span style={{ color: "#f0493f" }}>PRODUCTOS</span>
          </h1>
        </div>
        <p className="productos-subtitle">
          Elaborados artesanalmente con ingredientes seleccionados.
        </p>
      </div>

      {/* Grid */}
      <div className="products-grid">
        {productos.map((p) => (
          <div
            key={p._id}         
            className="product-card-new"
            onClick={() => setSelected(p)}
          >
            <div className="product-image-area">
              <div className="product-glow" />
              <img
                src={p.imagen}   
                alt={p.nombre}   
                className="product-img"
              />
            </div>
            <div className="product-info-area">
              <div style={{ flex: 1 }}>
                <h2 className="product-name">{p.nombre}</h2>
                <span className="product-weight">Stock: {p.stock}</span>
                <p className="product-desc">{p.descripcion}</p>
              </div>
              <div style={{ height: 1, background: "rgba(238,238,238,0.07)", margin: "12px 0" }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <span className="product-price">₡{p.precio.toLocaleString()}</span>
                <button
                  className="product-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(p);
                  }}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
        .products-grid {
          max-width: 1200px; margin: 0 auto; padding: 72px 48px;
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
        }
        .product-card-new {
          display: flex; flex-direction: column; background: #272727;
          border-radius: 6px; overflow: hidden;
          border: 1px solid rgba(238,238,238,0.05);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          cursor: pointer;
        }
        .product-card-new:hover {
          transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,0.5);
          border-color: rgba(240,73,63,0.3);
        }
        .product-image-area {
          background: linear-gradient(160deg, #2a2a2a, #1e1e1e);
          display: flex; align-items: center; justify-content: center;
          padding: 32px 24px; position: relative; overflow: hidden; aspect-ratio: 1;
        }
        .product-glow {
          position: absolute; width: 100px; height: 100px; border-radius: 50%;
          background: radial-gradient(circle, rgba(240,73,63,0.15), transparent 70%);
          pointer-events: none;
        }
        .product-img {
          width: 75%; height: 75%; object-fit: contain;
          position: relative; z-index: 1; transition: transform 0.3s ease;
        }
        .product-card-new:hover .product-img { transform: scale(1.06); }
        .product-info-area { padding: 16px; display: flex; flex-direction: column; flex: 1; }
        .product-name {
          font-family: Montserrat; font-weight: 700; font-size: 0.95rem;
          color: #eeeeee; line-height: 1.3; margin-bottom: 4px;
        }
        .product-weight {
          font-family: Montserrat; font-weight: 700; font-size: 0.62rem;
          letter-spacing: 0.1em; color: rgba(238,238,238,0.3);
          text-transform: uppercase; display: block; margin-bottom: 8px;
        }
        .product-desc {
          font-family: Poppins; font-weight: 300; font-size: 0.82rem;
          color: rgba(238,238,238,0.45); line-height: 1.6;
        }
        .product-price {
          font-family: Montserrat; font-weight: 800;
          font-size: 1.1rem; color: #f0493f;
        }
        .product-btn {
          background: #f0493f; color: #fff; border: none;
          width: 34px; height: 34px; border-radius: 2px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; cursor: pointer; transition: all 0.2s;
          flex-shrink: 0;
        }
        .product-btn:hover { background: #eeeeee; color: #272727; }

        @media (max-width: 1100px) { .products-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; padding: 40px 20px; }
          .productos-header-inner { flex-direction: column; gap: 16px; padding: 0 20px 40px; }
          .productos-subtitle { text-align: left; max-width: 100%; }
          .product-image-area { padding: 20px; }
          .product-info-area { padding: 12px; }
          .product-name { font-size: 0.82rem; }
          .product-desc { font-size: 0.75rem; }
          .product-price { font-size: 1rem; }
          .productos-header-inner > div { text-align: left; width: 100%; }
        }
        @media (max-width: 380px) {
          .products-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
