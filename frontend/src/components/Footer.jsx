import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="footer-top">

          {/* Logo + tagline + dirección */}
          <div style={{ maxWidth: 280 }}>
            <img src="/images/logo.png" alt="Gourmetto"
              style={{ height: 36, marginBottom: 16, objectFit: "contain" }} />
            <p style={{
              fontFamily: "Poppins", fontWeight: 300, fontSize: "0.88rem",
              color: "rgba(238,238,238,0.4)", lineHeight: 1.7, marginBottom: 12,
            }}>
              Productos artesanales elaborados con ingredientes frescos, hechos con pasión en Costa Rica.
            </p>
            <p style={{
              fontFamily: "Montserrat", fontSize: "0.75rem",
              color: "rgba(238,238,238,0.25)", letterSpacing: "0.05em",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span>📍</span> Nicoya, Costa Rica
            </p>
          </div>

          {/* Navegación */}
          <div>
            <p style={{
              fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.68rem",
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: "rgba(238,238,238,0.3)", marginBottom: 16,
            }}>Navegación</p>
            {[
              { label: "Inicio", to: "/" },
              { label: "Productos", to: "/productos" },
              { label: "Contacto", to: "/contacto" },
            ].map(link => (
              <Link key={link.to} to={link.to} style={{
                display: "block", marginBottom: 12,
                fontFamily: "Montserrat", fontWeight: 500, fontSize: "0.88rem",
                color: "rgba(238,238,238,0.5)", textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = "#eeeeee"}
                onMouseLeave={e => e.target.style.color = "rgba(238,238,238,0.5)"}
              >{link.label}</Link>
            ))}
          </div>

          {/* Contacto + redes */}
          <div>
            <p style={{
              fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.68rem",
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: "rgba(238,238,238,0.3)", marginBottom: 16,
            }}>Contacto</p>

            <a href="mailto:gourmettocr@gmail.com" style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 12,
              fontFamily: "Poppins", fontSize: "0.88rem",
              color: "rgba(238,238,238,0.5)", textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#eeeeee"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(238,238,238,0.5)"}
            >
              <i className="fa-regular fa-envelope"></i>
              gourmettocr@gmail.com
            </a>

            <a href="https://wa.me/50663818443?text=%C2%A1Hola%2C%20Quiero%20informaci%C3%B3n%20acerca%20de%20Gourmetto!"
              target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", gap: 8, marginBottom: 24,
                fontFamily: "Poppins", fontSize: "0.88rem",
                color: "rgba(238,238,238,0.5)", textDecoration: "none", transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#eeeeee"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(238,238,238,0.5)"}
            >
              <i className="fa-brands fa-whatsapp"></i>
              +506 6381-8443
            </a>

            <div style={{ display: "flex", gap: 10 }}>
              {[
                { icon: "fa-instagram", url: "https://instagram.com/gourmetto.cr", label: "Instagram" },
                { icon: "fa-facebook-f", url: "https://www.facebook.com/profile.php?id=61558109290511", label: "Facebook" },
                { icon: "fa-whatsapp", url: "https://wa.me/50663818443?text=%C2%A1Hola%2C%20Quiero%20informaci%C3%B3n%20acerca%20de%20Gourmetto!", label: "WhatsApp" },
              ].map(red => (
                <a key={red.label} href={red.url} target="_blank" rel="noopener noreferrer" title={red.label}
                  style={{
                    width: 38, height: 38, borderRadius: 2,
                    background: "rgba(238,238,238,0.06)", border: "1px solid rgba(238,238,238,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(238,238,238,0.4)", fontSize: "0.9rem",
                    textDecoration: "none", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(240,73,63,0.12)";
                    e.currentTarget.style.borderColor = "rgba(240,73,63,0.3)";
                    e.currentTarget.style.color = "#f0493f";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(238,238,238,0.06)";
                    e.currentTarget.style.borderColor = "rgba(238,238,238,0.08)";
                    e.currentTarget.style.color = "rgba(238,238,238,0.4)";
                  }}
                >
                  <i className={`fa-brands ${red.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(238,238,238,0.06)", marginBottom: 24 }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "Montserrat", fontSize: "0.75rem", color: "rgba(238,238,238,0.2)", letterSpacing: "0.05em" }}>
            © {new Date().getFullYear()} Gourmetto. Todos los derechos reservados.
          </p>
          <p style={{ fontFamily: "Montserrat", fontSize: "0.75rem", color: "rgba(238,238,238,0.15)", letterSpacing: "0.05em" }}>
            Hecho con ♥ en Costa Rica
          </p>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: #161616;
          border-top: 1px solid rgba(238,238,238,0.06);
          padding: 64px 48px 32px;
        }
        .footer-top {
          display: flex;
          gap: 48px;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }
        @media (max-width: 768px) {
          .site-footer { padding: 48px 24px 28px; }
          .footer-top { flex-direction: column; gap: 32px; margin-bottom: 36px; }
        }
        @media (max-width: 480px) {
          .site-footer { padding: 40px 20px 24px; }
        }
      `}</style>
    </footer>
  );
}