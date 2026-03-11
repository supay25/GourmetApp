import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const inputStyle = (error) => ({
  width: "100%",
  background: "#1e1e1e",
  border: `1px solid ${error ? "#f0493f" : "rgba(238,238,238,0.1)"}`,
  borderRadius: 2,
  padding: "14px 16px",
  fontFamily: "Poppins",
  fontSize: "0.9rem",
  color: "#eeeeee",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
});

const labelStyle = {
  fontFamily: "Montserrat",
  fontWeight: 700,
  fontSize: "0.7rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(238,238,238,0.5)",
  marginBottom: 8,
  display: "block",
};

const errorStyle = {
  fontFamily: "Poppins",
  fontSize: "0.78rem",
  color: "#f0493f",
  marginTop: 6,
};

export default function Checkout() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const total = items.reduce((sum, i) => {
    const price = parseFloat(i.price.replace(/[^0-9]/g, ""));
    return sum + price * i.qty;
  }, 0);

  // Redirigir si el carrito está vacío
  if (items.length === 0) {
    return (
      <section
        style={{
          minHeight: "100vh",
          background: "#202020",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 48px",
        }}
      >
        <p style={{ fontSize: "3rem", marginBottom: 24 }}>🛒</p>
        <h2
          style={{
            fontFamily: "Montserrat",
            fontWeight: 900,
            fontSize: "2rem",
            color: "#eeeeee",
            marginBottom: 16,
          }}
        >
          No hay productos en tu carrito
        </h2>
        <button
          onClick={() => navigate("/productos")}
          style={{
            background: "#f0493f",
            color: "#fff",
            border: "none",
            padding: "14px 32px",
            borderRadius: 2,
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "0.85rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Ver productos →
        </button>
      </section>
    );
  }

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es requerido";
    if (!form.telefono.trim()) e.telefono = "El teléfono es requerido";
    else if (!/^\d{8}$/.test(form.telefono.replace(/\s/g, "")))
      e.telefono = "Ingresá un teléfono válido (8 dígitos)";
    if (!form.email.trim()) e.email = "El email es requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Ingresá un email válido";
    if (!form.direccion.trim()) e.direccion = "La dirección es requerida";
    return e;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    setLoading(true);

    // Mock del pedido — cuando el backend esté listo, reemplazar por fetch real
    const pedido = {
      cliente: form,
      items: items.map((i) => ({
        nombre: i.name,
        cantidad: i.qty,
        precio: i.price,
      })),
      total,
    };

    console.log("Pedido a enviar:", pedido);

    // Simular delay de red
    await new Promise((r) => setTimeout(r, 1000));

    // Mock: número de pedido generado localmente
    const numeroPedido = `GRM-${Date.now().toString().slice(-6)}`;

    setLoading(false);
    clearCart();
    navigate("/pago", { state: { pedido: { ...pedido, numeroPedido } } });
  };

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
        style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px" }}
        className="checkout-wrapper"
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
            ✦ Casi listo
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
            DATOS DE
            <br />
            <span style={{ color: "#f0493f" }}>ENTREGA</span>
          </h1>
        </div>

        <div
          style={{ display: "flex", gap: 40, alignItems: "flex-start" }}
          className="checkout-layout"
        >
          {/* Formulario */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                background: "#272727",
                borderRadius: 6,
                border: "1px solid rgba(238,238,238,0.05)",
                padding: 32,
              }}
            >
              {/* Nombre */}
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Nombre completo</label>
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej: María García"
                  style={inputStyle(errors.nombre)}
                  onFocus={(e) =>
                    (e.target.style.borderColor = errors.nombre
                      ? "#f0493f"
                      : "rgba(240,73,63,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors.nombre
                      ? "#f0493f"
                      : "rgba(238,238,238,0.1)")
                  }
                />
                {errors.nombre && <p style={errorStyle}>{errors.nombre}</p>}
              </div>

              {/* Teléfono + Email en fila */}
              <div
                style={{ display: "flex", gap: 16, marginBottom: 24 }}
                className="checkout-row"
              >
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Teléfono</label>
                  <input
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="Ej: 88001234"
                    maxLength={8}
                    style={inputStyle(errors.telefono)}
                    onFocus={(e) =>
                      (e.target.style.borderColor = errors.telefono
                        ? "#f0493f"
                        : "rgba(240,73,63,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.telefono
                        ? "#f0493f"
                        : "rgba(238,238,238,0.1)")
                    }
                  />
                  {errors.telefono && (
                    <p style={errorStyle}>{errors.telefono}</p>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Correo electrónico</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Ej: maria@correo.com"
                    style={inputStyle(errors.email)}
                    onFocus={(e) =>
                      (e.target.style.borderColor = errors.email
                        ? "#f0493f"
                        : "rgba(240,73,63,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.email
                        ? "#f0493f"
                        : "rgba(238,238,238,0.1)")
                    }
                  />
                  {errors.email && <p style={errorStyle}>{errors.email}</p>}
                </div>
              </div>

              {/* Dirección */}
              <div style={{ marginBottom: 8 }}>
                <label style={labelStyle}>Dirección de entrega</label>
                <textarea
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  placeholder="Ej: San José, Escazú, de la Iglesia 200m norte, casa azul"
                  rows={3}
                  style={{
                    ...inputStyle(errors.direccion),
                    resize: "none",
                    lineHeight: 1.6,
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = errors.direccion
                      ? "#f0493f"
                      : "rgba(240,73,63,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors.direccion
                      ? "#f0493f"
                      : "rgba(238,238,238,0.1)")
                  }
                />
                {errors.direccion && (
                  <p style={errorStyle}>{errors.direccion}</p>
                )}
              </div>
            </div>

            {/* Volver */}
            <button
              onClick={() => navigate("/carrito")}
              style={{
                marginTop: 16,
                background: "transparent",
                border: "none",
                color: "rgba(238,238,238,0.3)",
                cursor: "pointer",
                fontFamily: "Montserrat",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "color 0.2s",
                padding: 0,
              }}
              onMouseEnter={(e) => (e.target.style.color = "#eeeeee")}
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(238,238,238,0.3)")
              }
            >
              ← Volver al carrito
            </button>
          </div>

          {/* Resumen del pedido */}
          <div
            style={{
              width: 300,
              flexShrink: 0,
              background: "#272727",
              borderRadius: 6,
              border: "1px solid rgba(238,238,238,0.05)",
              padding: 28,
              position: "sticky",
              top: 100,
            }}
            className="checkout-resumen"
          >
            <h3
              style={{
                fontFamily: "Montserrat",
                fontWeight: 800,
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#eeeeee",
                marginBottom: 20,
              }}
            >
              Tu pedido
            </h3>

            {items.map((item) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "0.85rem",
                      color: "#eeeeee",
                      margin: 0,
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "0.7rem",
                      color: "rgba(238,238,238,0.35)",
                      margin: 0,
                    }}
                  >
                    x{item.qty}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    color: "#f0493f",
                  }}
                >
                  {item.price}
                </span>
              </div>
            ))}

            <div
              style={{
                height: 1,
                background: "rgba(238,238,238,0.07)",
                margin: "20px 0",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 28,
              }}
            >
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
                  fontSize: "1.3rem",
                  color: "#f0493f",
                }}
              >
                ₡{total.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%",
                background: loading ? "#555" : "#f0493f",
                color: "#fff",
                border: "none",
                padding: "16px",
                borderRadius: 2,
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.background = "#eeeeee";
                  e.target.style.color = "#272727";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.background = "#f0493f";
                  e.target.style.color = "#fff";
                }
              }}
            >
              {loading ? "Procesando..." : "Confirmar pedido →"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
  @media (max-width: 768px) {
    .checkout-layout { flex-direction: column !important; }
    .checkout-resumen { width: 100% !important; position: static !important; }
    .checkout-row { flex-direction: column !important; }
  }
  @media (max-width: 480px) {
    section { padding-left: 0 !important; padding-right: 0 !important; }
    .checkout-wrapper { padding: 0 20px !important; }
  }
`}</style>
    </section>
  );
}
