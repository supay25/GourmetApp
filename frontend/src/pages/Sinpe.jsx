import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Datos hardcodeados — reemplazar por GET /api/config cuando el backend esté listo
const CONFIG = {
  telefono: "6381-8443",
  nombreNegocio: "Gourmetto",
};

export default function Sinpe() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const pedido = state?.pedido;

  // Si alguien llega sin pedido, redirigir
  useEffect(() => {
    if (!pedido) navigate("/productos");
  }, [pedido, navigate]);

  if (!pedido) return null;

  const fecha = new Date()
    .toLocaleDateString("es-CR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  const referencia = `${CONFIG.nombreNegocio} ${fecha} ${pedido.numeroPedido}`;

  const pasos = [
    { num: "01", texto: "Abrí tu app bancaria o billetera digital." },
    {
      num: "02",
      texto: `Seleccioná la opción "Sinpe Móvil" y buscá el número ${CONFIG.telefono}.`,
    },
    {
      num: "03",
      texto: `Ingresá el monto exacto: ₡${pedido.total.toLocaleString()}.`,
    },
    {
      num: "04",
      texto: `En el campo de referencia escribí exactamente: "${referencia}".`,
    },
    { num: "05", texto: "Confirmá el pago y guardá el comprobante." },
  ];

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#202020",
        paddingTop: 120,
        paddingBottom: 100,
      }}
    >
      <div
        style={{ maxWidth: 720, margin: "0 auto", padding: "0 48px" }}
        className="sinpe-wrapper"
      >
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
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
            ✦ Último paso
          </p>
          <h1
            style={{
              fontFamily: "Montserrat",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 4vw, 4rem)",
              letterSpacing: "-0.04em",
              color: "#eeeeee",
              lineHeight: 0.95,
            }}
          >
            PAGO POR
            <br />
            <span style={{ color: "#f0493f" }}>SINPE MÓVIL</span>
          </h1>
        </div>

        {/* Datos de pago */}
        <div
          style={{
            background: "#272727",
            borderRadius: 6,
            border: "1px solid rgba(240,73,63,0.25)",
            padding: 36,
            marginBottom: 32,
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
              marginBottom: 24,
            }}
          >
            Datos para tu transferencia
          </p>

          {/* Número */}
          <div style={{ marginBottom: 24 }}>
            <p
              style={{
                fontFamily: "Montserrat",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(238,238,238,0.35)",
                marginBottom: 8,
              }}
            >
              Número Sinpe Móvil
            </p>
            <p
              style={{
                fontFamily: "Montserrat",
                fontWeight: 900,
                fontSize: "2.4rem",
                color: "#eeeeee",
                letterSpacing: "0.05em",
                lineHeight: 1,
              }}
            >
              {CONFIG.telefono}
            </p>
          </div>

          <div
            style={{
              height: 1,
              background: "rgba(238,238,238,0.07)",
              marginBottom: 24,
            }}
          />

          {/* Monto */}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }} className="sinpe-datos-row">
            <div>
              <p
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(238,238,238,0.35)",
                  marginBottom: 8,
                }}
              >
                Monto exacto
              </p>
              <p
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 900,
                  fontSize: "2rem",
                  color: "#f0493f",
                  lineHeight: 1,
                }}
              >
                ₡{pedido.total.toLocaleString()}
              </p>
            </div>

            <div style={{ flex: 1, minWidth: 200 }}>
              <p
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(238,238,238,0.35)",
                  marginBottom: 8,
                }}
              >
                Referencia
              </p>
              <p
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#eeeeee",
                  lineHeight: 1.4,
                  background: "rgba(240,73,63,0.08)",
                  border: "1px dashed rgba(240,73,63,0.3)",
                  borderRadius: 4,
                  padding: "10px 14px",
                  letterSpacing: "0.02em",
                }}
              >
                {referencia}
              </p>
            </div>
          </div>
        </div>

        {/* Pasos */}
        <div
          style={{
            background: "#272727",
            borderRadius: 6,
            border: "1px solid rgba(238,238,238,0.05)",
            padding: 36,
            marginBottom: 32,
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
              marginBottom: 28,
            }}
          >
            Instrucciones paso a paso
          </p>

          {pasos.map((paso, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
                marginBottom: i < pasos.length - 1 ? 24 : 0,
              }}
            >
              <span
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  color: "#f0493f",
                  flexShrink: 0,
                  lineHeight: 1.4,
                }}
              >
                {paso.num}
              </span>
              <p
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 300,
                  fontSize: "0.95rem",
                  color: "rgba(238,238,238,0.7)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {paso.texto}
              </p>
            </div>
          ))}
        </div>

        {/* Aviso */}
        <div
          style={{
            background: "rgba(240,73,63,0.06)",
            border: "1px solid rgba(240,73,63,0.15)",
            borderRadius: 6,
            padding: "16px 20px",
            marginBottom: 40,
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: "1rem", flexShrink: 0 }}>⚠️</span>
          <p
            style={{
              fontFamily: "Poppins",
              fontSize: "0.85rem",
              color: "rgba(238,238,238,0.55)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Una vez realizado el pago, nuestro equipo lo confirmará y se pondrá
            en contacto con vos para coordinar la entrega. Esto puede tardar
            hasta 24 horas hábiles.
          </p>
        </div>

        {/* Botón confirmación */}
        <button
          onClick={() => navigate("/confirmacion", { state: { pedido } })}
          style={{
            width: "100%",
            background: "#f0493f",
            color: "#fff",
            border: "none",
            padding: "18px",
            borderRadius: 2,
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "0.9rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#eeeeee";
            e.target.style.color = "#272727";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#f0493f";
            e.target.style.color = "#fff";
          }}
        >
          Ya realicé el pago →
        </button>
      </div>

      <style>{`
  @media (max-width: 600px) {
    .sinpe-wrapper { padding: 0 20px !important; }
    .sinpe-datos-row { flex-direction: column !important; gap: 24px !important; }
  }
`}</style>
    </section>
  );
}
