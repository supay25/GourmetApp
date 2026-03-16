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
        padding: "100px 20px 80px",
      }}
    >
      <div className="confirm-wrapper">
        {/* Check */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "rgba(240,73,63,0.1)",
            border: "2px solid rgba(240,73,63,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 28px",
            fontSize: "1.8rem",
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
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            letterSpacing: "-0.04em",
            color: "#eeeeee",
            lineHeight: 0.95,
            marginBottom: 20,
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
            fontSize: "0.95rem",
            color: "rgba(238,238,238,0.55)",
            lineHeight: 1.8,
            marginBottom: 32,
          }}
        >
          Hemos recibido tu pedido y estamos esperando la confirmación del pago.
          Nos pondremos en contacto con vos a la brevedad para coordinar la
          entrega.
        </p>

        {/* Número de pedido */}
        <div className="confirm-numero">
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
              fontSize: "1.4rem",
              color: "#f0493f",
              letterSpacing: "0.05em",
            }}
          >
            {pedido.numeroPedido}
          </p>
        </div>

        {/* Resumen */}
        <div className="confirm-resumen">
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
                  fontSize: "0.88rem",
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
                  fontSize: "0.88rem",
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
              margin: "14px 0",
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
            width: "100%",
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
  .confirm-wrapper {
    max-width: 560px;
    width: 100%;
    text-align: center;
  }
  .confirm-numero {
    background: #272727;
    border: 1px solid rgba(238,238,238,0.07);
    border-radius: 6px;
    padding: 20px 28px;
    margin-bottom: 20px;
    display: block;
    width: 100%;
    box-sizing: border-box;
    text-align: left;
  }
  .confirm-resumen {
    background: #272727;
    border: 1px solid rgba(238,238,238,0.05);
    border-radius: 6px;
    padding: 20px 28px;
    margin-bottom: 32px;
    text-align: left;
    box-sizing: border-box;
  }
  @media (max-width: 600px) {
    .confirm-numero { padding: 16px 20px; }
    .confirm-resumen { padding: 16px 20px; }
  }
`}</style>
    </section>
  );
}
