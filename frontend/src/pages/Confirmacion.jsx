import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Confirmacion() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const pedido = state?.pedido;

  useEffect(() => {
    if (!pedido) navigate("/productos");
  }, [pedido, navigate]);

  if (!pedido) return null;

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#202020",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 48px",
      }}
    >
      <div
        style={{ maxWidth: 600, width: "100%", textAlign: "center" }}
        className="confirm-wrapper"
      >
        {/* Check animado */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(240,73,63,0.1)",
            border: "2px solid rgba(240,73,63,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 32px",
            fontSize: "2rem",
          }}
        >
          ✓
        </div>

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
          ✦ Pedido recibido
        </p>

        <h1
          style={{
            fontFamily: "Montserrat",
            fontWeight: 900,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            letterSpacing: "-0.04em",
            color: "#eeeeee",
            lineHeight: 0.95,
            marginBottom: 24,
          }}
        >
          ¡GRACIAS POR
          <br />
          <span style={{ color: "#f0493f" }}>TU PEDIDO!</span>
        </h1>

        <p
          style={{
            fontFamily: "Poppins",
            fontWeight: 300,
            fontSize: "1rem",
            color: "rgba(238,238,238,0.55)",
            lineHeight: 1.8,
            marginBottom: 40,
          }}
        >
          Hemos recibido tu pedido y estamos esperando la confirmación del pago.
          Nos pondremos en contacto con vos a la brevedad para coordinar la
          entrega.
        </p>

        {/* Número de pedido */}
        <div className="confirm-numero"
          style={{
            background: "#272727",
            border: "1px solid rgba(238,238,238,0.07)",
            borderRadius: 6,
            padding: "24px 32px",
            marginBottom: 32,
            display: "inline-block",
          }}
        >
          <p
            style={{
              fontFamily: "Montserrat",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(238,238,238,0.35)",
              marginBottom: 8,
            }}
          >
            Número de pedido
          </p>
          <p
            style={{
              fontFamily: "Montserrat",
              fontWeight: 900,
              fontSize: "1.5rem",
              color: "#f0493f",
              letterSpacing: "0.05em",
            }}
          >
            {pedido.numeroPedido}
          </p>
        </div>

        {/* Resumen */}
        <div className="confirm-resumen"
          style={{
            background: "#272727",
            border: "1px solid rgba(238,238,238,0.05)",
            borderRadius: 6,
            padding: "24px 32px",
            marginBottom: 40,
            textAlign: "left",
          }}
        >
          <p
            style={{
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(238,238,238,0.4)",
              marginBottom: 16,
            }}
          >
            Resumen
          </p>

          {pedido.items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  fontFamily: "Poppins",
                  fontSize: "0.9rem",
                  color: "rgba(238,238,238,0.7)",
                }}
              >
                {item.nombre}{" "}
                <span style={{ color: "rgba(238,238,238,0.35)" }}>
                  x{item.cantidad}
                </span>
              </span>
              <span
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: "#eeeeee",
                }}
              >
                {item.precio}
              </span>
            </div>
          ))}

          <div
            style={{
              height: 1,
              background: "rgba(238,238,238,0.07)",
              margin: "16px 0",
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              style={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                color: "#eeeeee",
              }}
            >
              Total
            </span>
            <span
              style={{
                fontFamily: "Montserrat",
                fontWeight: 900,
                fontSize: "1.2rem",
                color: "#f0493f",
              }}
            >
              ₡{pedido.total.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          style={{
            background: "transparent",
            color: "rgba(238,238,238,0.4)",
            border: "1px solid rgba(238,238,238,0.1)",
            padding: "14px 32px",
            borderRadius: 2,
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "0.8rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(238,238,238,0.3)";
            e.currentTarget.style.color = "#eeeeee";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(238,238,238,0.1)";
            e.currentTarget.style.color = "rgba(238,238,238,0.4)";
          }}
        >
          Volver al inicio
        </button>
      </div>

      <style>{`
  @media (max-width: 600px) {
    .confirm-wrapper { padding: 0 !important; }
    .confirm-wrapper h1 { font-size: 2rem !important; }
    .confirm-numero { padding: 20px !important; display: block !important; width: 100% !important; box-sizing: border-box !important; }
    .confirm-resumen { padding: 20px !important; }
  }
`}</style>
    </section>
  );
}
