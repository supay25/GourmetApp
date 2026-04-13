import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../context/AuthContext";

const API = import.meta.env.VITE_API_URL;

const toInputDate = (fecha) => {
  if (!fecha) return "";
  return new Date(fecha).toISOString().split("T")[0];
};

export default function AdminProductos() {
  const { token } = useAuth();
  const [productos, setProductos] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({
    codigoProducto: "", nombre: "", descripcion: "", precio: "",
    stock: "", imagen: "", tipo: "stock", activo: true, fechaInicio: "", fechaFin: "",
  });
  const [confirmarEliminar, setConfirmarEliminar] = useState(null);
  const [selectorGaleria, setSelectorGaleria] = useState(false);
  const [carpetas, setCarpetas] = useState([]);
  const [carpetaActual, setCarpetaActual] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [loadingImagenes, setLoadingImagenes] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const abrirCrear = () => {
    setForm({ codigoProducto: "", nombre: "", descripcion: "", precio: "", stock: "", imagen: "", tipo: "stock", activo: true, fechaInicio: "", fechaFin: "" });
    setModal("crear");
  };

  const abrirEditar = (p) => {
    setForm({ ...p, fechaInicio: toInputDate(p.fechaInicio), fechaFin: toInputDate(p.fechaFin) });
    setModal(p);
  };

  useEffect(() => { listaProductos(); }, []);

  const listaProductos = async () => {
    try {
      const respuesta = await fetch(`${API}/api/productos`, { method: "GET" });
      const data = await respuesta.json();
      setProductos(data);
    } catch (error) { console.error("Error:", error); }
  };

  const guardar = async () => {
    if (!form.nombre) return;
    try {
      if (modal === "crear") {
        await fetch(`${API}/api/productos`, { method: "POST", headers, body: JSON.stringify(form) });
      } else {
        await fetch(`${API}/api/productos/${modal._id}`, { method: "PUT", headers, body: JSON.stringify(form) });
      }
      await listaProductos();
      setModal(null);
    } catch (error) { console.error("Error:", error); }
  };

  const eliminar = async (id) => {
    try {
      await fetch(`${API}/api/productos/${id}`, { method: "DELETE" });
      await listaProductos();
      setConfirmarEliminar(null);
    } catch (error) { console.error("Error:", error); }
  };

  const abrirSelectorGaleria = async () => {
    setSelectorGaleria(true); setCarpetaActual(null); setImagenes([]);
    try {
      const res = await fetch(`${API}/api/media/folders`, { headers });
      const data = await res.json();
      setCarpetas(data.folders || []);
    } catch (e) { console.error(e); }
  };

  const seleccionarCarpeta = async (carpeta) => {
    setCarpetaActual(carpeta); setLoadingImagenes(true); setImagenes([]);
    try {
      const res = await fetch(`${API}/api/media/images?folder=${carpeta}`, { headers });
      const data = await res.json();
      setImagenes(data.images || []);
    } catch (e) { console.error(e); }
    finally { setLoadingImagenes(false); }
  };

  const seleccionarImagen = (url) => {
    setForm((p) => ({ ...p, imagen: url }));
    setSelectorGaleria(false); setCarpetaActual(null); setImagenes([]);
  };

  const getBadge = (p) => {
    if (!p.activo) return { label: "Inactivo", color: "#888", bg: "rgba(136,136,136,0.12)" };
    if (p.tipo === "tiempo_limitado") {
      if (!p.fechaInicio || !p.fechaFin) return { label: "Sin fechas", color: "#888", bg: "rgba(136,136,136,0.12)" };
      const ahora = new Date();
      if (ahora < new Date(p.fechaInicio)) return { label: "Próximamente", color: "#f0a93f", bg: "rgba(240,169,63,0.12)" };
      if (ahora > new Date(p.fechaFin)) return { label: "Expirado", color: "#f0493f", bg: "rgba(240,73,63,0.12)" };
      return { label: "Activo", color: "#3fd68a", bg: "rgba(63,214,138,0.12)" };
    }
    if (p.stock === 0) return { label: "Sin stock", color: "#f0493f", bg: "rgba(240,73,63,0.12)" };
    return { label: `Stock: ${p.stock}`, color: "#3fd68a", bg: "rgba(63,214,138,0.12)" };
  };

  const inputStyle = {
    width: "100%", background: "#1e1e1e",
    border: "1px solid rgba(238,238,238,0.1)", borderRadius: 4,
    padding: "10px 12px", fontFamily: "Poppins", fontSize: "0.88rem",
    color: "#eeeeee", outline: "none", boxSizing: "border-box",
  };

  return (
    <AdminLayout>
      <div className="admin-page-wrapper">

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, gap: 12 }}>
          <div>
            <p style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#f0493f", marginBottom: 8 }}>✦ Catálogo</p>
            <h1 style={{ fontFamily: "Montserrat", fontWeight: 900, fontSize: "clamp(1.4rem, 4vw, 1.8rem)", letterSpacing: "-0.03em", color: "#eeeeee" }}>Productos</h1>
          </div>
          <button onClick={abrirCrear} style={{
            background: "#f0493f", color: "#fff", border: "none",
            padding: "10px 16px", borderRadius: 6, fontFamily: "Montserrat",
            fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.06em",
            cursor: "pointer", transition: "all 0.15s",
            display: "flex", alignItems: "center", gap: 8, flexShrink: 0,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#eeeeee"; e.currentTarget.style.color = "#272727"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#f0493f"; e.currentTarget.style.color = "#fff"; }}
          >
            <i className="fa-solid fa-plus" /> <span className="btn-label-desktop">Nuevo producto</span><span className="btn-label-mobile">Nuevo</span>
          </button>
        </div>

        {/* Grid */}
        <div className="admin-productos-grid">
          {productos.map((p, i) => {
            const badge = getBadge(p);
            return (
              <div key={i} style={{
                background: "#272727", borderRadius: 8,
                border: "1px solid rgba(238,238,238,0.06)",
                overflow: "hidden", opacity: p.activo ? 1 : 0.5,
              }}>
                {/* Preview — siempre fondo claro */}
                <div style={{
                  background: "linear-gradient(160deg, #e0e0e0, #d4d4d4)",
                  height: 140, display: "flex", alignItems: "center",
                  justifyContent: "center", position: "relative",
                }}>
                  {p.imagen
                    ? <img src={p.imagen} alt={p.nombre} style={{ height: 100, objectFit: "contain" }} />
                    : <i className="fa-solid fa-image" style={{ fontSize: "2rem", color: "rgba(32,32,32,0.15)" }} />
                  }
                  <span style={{
                    position: "absolute", top: 8, left: 8,
                    fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.62rem",
                    padding: "3px 8px", borderRadius: 3, letterSpacing: "0.06em", textTransform: "uppercase",
                    background: p.tipo === "tiempo_limitado" ? "rgba(63,169,240,0.85)" : "rgba(32,32,32,0.55)",
                    color: "#fff",
                  }}>
                    {p.tipo === "tiempo_limitado" ? "⏰ Tiempo" : "📦 Stock"}
                  </span>
                </div>

                <div style={{ padding: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <p style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.88rem", color: "#eeeeee" }}>{p.nombre}</p>
                    <span style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.62rem", padding: "3px 8px", borderRadius: 3, background: badge.bg, color: badge.color, flexShrink: 0, marginLeft: 8 }}>{badge.label}</span>
                  </div>
                  <p style={{ fontFamily: "Montserrat", fontSize: "0.68rem", color: "rgba(238,238,238,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>#{p.codigoProducto}</p>
                  <p style={{ fontFamily: "Montserrat", fontWeight: 900, fontSize: "1rem", color: "#f0493f", marginBottom: 14 }}>₡{Number(p.precio).toLocaleString()}</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => abrirEditar(p)} style={{
                      flex: 1, padding: "8px", borderRadius: 4,
                      background: "rgba(238,238,238,0.07)", border: "none",
                      color: "rgba(238,238,238,0.6)", fontFamily: "Montserrat",
                      fontWeight: 600, fontSize: "0.75rem", cursor: "pointer",
                      transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(238,238,238,0.12)"; e.currentTarget.style.color = "#eeeeee"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(238,238,238,0.07)"; e.currentTarget.style.color = "rgba(238,238,238,0.6)"; }}
                    >
                      <i className="fa-solid fa-pen" /> Editar
                    </button>
                    <button onClick={() => setConfirmarEliminar(p._id)} style={{
                      padding: "8px 12px", borderRadius: 4,
                      background: "rgba(240,73,63,0.08)", border: "none",
                      color: "#f0493f", cursor: "pointer", transition: "all 0.15s",
                      fontFamily: "Montserrat", fontWeight: 600, fontSize: "0.75rem",
                      display: "flex", alignItems: "center", gap: 6,
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(240,73,63,0.18)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(240,73,63,0.08)"}
                    >
                      <i className="fa-solid fa-trash" /> <span className="btn-label-desktop">Eliminar</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal crear/editar */}
      {modal && (
        <>
          <div onClick={() => setModal(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 100 }} />
          <div style={{
            position: "fixed", top: "50%", left: "50%", zIndex: 101,
            transform: "translate(-50%, -50%)",
            width: "94%", maxWidth: 480,
            background: "#272727", borderRadius: 8,
            border: "1px solid rgba(238,238,238,0.08)",
            padding: "clamp(20px, 4vw, 32px)", maxHeight: "88vh", overflowY: "auto",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "Montserrat", fontWeight: 900, fontSize: "1.1rem", color: "#eeeeee" }}>
                {modal === "crear" ? "Nuevo producto" : "Editar producto"}
              </h2>
              <button onClick={() => setModal(null)} style={{ background: "transparent", border: "none", color: "rgba(238,238,238,0.3)", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
            </div>

            {[
              { key: "codigoProducto", label: "Código de Producto" },
              { key: "nombre", label: "Nombre" },
              { key: "descripcion", label: "Descripción" },
              { key: "precio", label: "Precio (ej: 2500)" },
              { key: "peso", label: "Peso / Contenido (ej: 120g, 250ml)" },
            ].map(({ key, label }) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(238,238,238,0.4)", display: "block", marginBottom: 8 }}>{label}</label>
                {key === "descripcion" ? (
                  <textarea value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} rows={3}
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={e => e.target.style.borderColor = "rgba(240,73,63,0.5)"}
                    onBlur={e => e.target.style.borderColor = "rgba(238,238,238,0.1)"} />
                ) : (
                  <input value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "rgba(240,73,63,0.5)"}
                    onBlur={e => e.target.style.borderColor = "rgba(238,238,238,0.1)"} />
                )}
              </div>
            ))}

            {/* Tipo */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(238,238,238,0.4)", display: "block", marginBottom: 8 }}>Tipo de producto</label>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { value: "stock", label: "📦 Por stock", desc: "Se bloquea si no hay stock" },
                  { value: "tiempo_limitado", label: "⏰ Tiempo limitado", desc: "Visible solo en fechas definidas" },
                ].map(op => (
                  <button key={op.value}
                    onClick={() => setForm(p => ({ ...p, tipo: op.value, activo: op.value === "tiempo_limitado" ? false : true }))}
                    style={{
                      flex: 1, padding: "10px 12px", borderRadius: 4, cursor: "pointer", textAlign: "left",
                      border: `1px solid ${form.tipo === op.value ? "#f0493f" : "rgba(238,238,238,0.08)"}`,
                      background: form.tipo === op.value ? "rgba(240,73,63,0.1)" : "transparent",
                      transition: "all 0.15s",
                    }}>
                    <p style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.78rem", color: form.tipo === op.value ? "#f0493f" : "rgba(238,238,238,0.5)", marginBottom: 2 }}>{op.label}</p>
                    <p style={{ fontFamily: "Poppins", fontSize: "0.68rem", color: "rgba(238,238,238,0.3)", lineHeight: 1.4 }}>{op.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {form.tipo === "stock" && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(238,238,238,0.4)", display: "block", marginBottom: 8 }}>Stock disponible</label>
                <input type="number" min="0" value={form.stock} onChange={e => setForm(p => ({ ...p, stock: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "rgba(240,73,63,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(238,238,238,0.1)"} />
              </div>
            )}

            {form.tipo === "tiempo_limitado" && (
              <div style={{ background: "rgba(63,169,240,0.06)", borderRadius: 6, border: "1px solid rgba(63,169,240,0.15)", padding: 16, marginBottom: 16 }}>
                <p style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.72rem", color: "#3fa9f0", marginBottom: 10 }}>⏰ Período de disponibilidad</p>
                <p style={{ fontFamily: "Poppins", fontSize: "0.78rem", color: "rgba(238,238,238,0.4)", marginBottom: 14 }}>El producto será visible solo entre estas fechas.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[["fechaInicio", "Fecha inicio"], ["fechaFin", "Fecha fin"]].map(([key, label]) => (
                    <div key={key}>
                      <label style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(238,238,238,0.4)", display: "block", marginBottom: 6 }}>{label}</label>
                      <input type="date" value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                        style={{ ...inputStyle, colorScheme: "dark" }}
                        onFocus={e => e.target.style.borderColor = "rgba(63,169,240,0.5)"}
                        onBlur={e => e.target.style.borderColor = "rgba(238,238,238,0.1)"} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Toggle activo */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(238,238,238,0.4)", display: "block", marginBottom: 8 }}>Estado</label>
              <button onClick={() => setForm(p => ({ ...p, activo: !p.activo }))} style={{
                width: "100%", padding: "12px", borderRadius: 4, cursor: "pointer",
                border: `1px solid ${form.activo ? "rgba(63,214,138,0.3)" : "rgba(238,238,238,0.08)"}`,
                background: form.activo ? "rgba(63,214,138,0.08)" : "rgba(238,238,238,0.04)",
                transition: "all 0.15s", display: "flex", alignItems: "center", gap: 10,
              }}>
                <div style={{ width: 36, height: 20, borderRadius: 10, position: "relative", background: form.activo ? "#3fd68a" : "rgba(238,238,238,0.15)", transition: "background 0.2s", flexShrink: 0 }}>
                  <div style={{ position: "absolute", top: 3, width: 14, height: 14, borderRadius: "50%", background: "#fff", transition: "left 0.2s", left: form.activo ? 19 : 3 }} />
                </div>
                <div>
                  <p style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.82rem", color: form.activo ? "#3fd68a" : "rgba(238,238,238,0.4)", marginBottom: 1 }}>{form.activo ? "Activo" : "Inactivo"}</p>
                  <p style={{ fontFamily: "Poppins", fontSize: "0.72rem", color: "rgba(238,238,238,0.3)" }}>{form.activo ? "El producto es visible en la tienda" : "El producto está oculto en la tienda"}</p>
                </div>
              </button>
            </div>

            {/* Imagen */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(238,238,238,0.4)", display: "block", marginBottom: 8 }}>Imagen</label>
              {form.imagen ? (
                <div style={{ background: "#1e1e1e", borderRadius: 4, padding: 12, border: "1px solid rgba(238,238,238,0.1)", marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={form.imagen} alt="preview" style={{ width: 56, height: 56, objectFit: "contain", borderRadius: 4, background: "#272727", padding: 4 }} />
                  <div style={{ flex: 1, overflow: "hidden" }}>
                    <p style={{ fontFamily: "Poppins", fontSize: "0.75rem", color: "rgba(238,238,238,0.5)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{form.imagen}</p>
                  </div>
                  <button onClick={() => setForm(p => ({ ...p, imagen: "" }))} style={{ background: "transparent", border: "none", color: "rgba(238,238,238,0.3)", cursor: "pointer", fontSize: "1rem", flexShrink: 0 }}>✕</button>
                </div>
              ) : (
                <div style={{ background: "#1e1e1e", borderRadius: 4, border: "1px dashed rgba(238,238,238,0.1)", padding: "20px", textAlign: "center", marginBottom: 10 }}>
                  <i className="fa-solid fa-image" style={{ fontSize: "1.5rem", color: "rgba(238,238,238,0.15)", marginBottom: 8, display: "block" }} />
                  <p style={{ fontFamily: "Poppins", fontSize: "0.8rem", color: "rgba(238,238,238,0.3)" }}>Sin imagen seleccionada</p>
                </div>
              )}
              <button onClick={abrirSelectorGaleria} style={{
                width: "100%", padding: "10px", borderRadius: 4,
                background: "rgba(238,238,238,0.07)", border: "1px solid rgba(238,238,238,0.1)",
                color: "rgba(238,238,238,0.6)", fontFamily: "Montserrat", fontWeight: 600,
                fontSize: "0.78rem", cursor: "pointer", transition: "all 0.15s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(238,238,238,0.12)"; e.currentTarget.style.color = "#eeeeee"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(238,238,238,0.07)"; e.currentTarget.style.color = "rgba(238,238,238,0.6)"; }}
              >
                <i className="fa-solid fa-images" /> {form.imagen ? "Cambiar imagen" : "Seleccionar desde galería"}
              </button>
            </div>

            <button onClick={guardar} style={{
              width: "100%", background: "#f0493f", color: "#fff", border: "none",
              padding: "13px", borderRadius: 4, fontFamily: "Montserrat", fontWeight: 700,
              fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase",
              cursor: "pointer", marginTop: 8, transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.target.style.background = "#eeeeee"; e.target.style.color = "#272727"; }}
              onMouseLeave={e => { e.target.style.background = "#f0493f"; e.target.style.color = "#fff"; }}
            >
              {modal === "crear" ? "Crear producto" : "Guardar cambios"}
            </button>
          </div>
        </>
      )}

      {/* Modal galería */}
      {selectorGaleria && (
        <>
          <div onClick={() => setSelectorGaleria(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", zIndex: 102 }} />
          <div style={{
            position: "fixed", top: "50%", left: "50%", zIndex: 103,
            transform: "translate(-50%, -50%)",
            width: "94%", maxWidth: 720, height: "80vh",
            background: "#272727", borderRadius: 8,
            border: "1px solid rgba(238,238,238,0.08)",
            display: "flex", flexDirection: "column", overflow: "hidden",
          }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(238,238,238,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
              <h3 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: "1rem", color: "#eeeeee" }}>
                Seleccionar imagen {carpetaActual && <span style={{ color: "rgba(238,238,238,0.35)", fontWeight: 400 }}>/ {carpetaActual}</span>}
              </h3>
              <button onClick={() => setSelectorGaleria(false)} style={{ background: "transparent", border: "none", color: "rgba(238,238,238,0.3)", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
              <div style={{ width: 160, flexShrink: 0, borderRight: "1px solid rgba(238,238,238,0.06)", overflowY: "auto", padding: 8 }}>
                <p style={{ fontFamily: "Montserrat", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(238,238,238,0.25)", padding: "8px 8px 4px" }}>Carpetas</p>
                {carpetas.length === 0
                  ? <p style={{ fontFamily: "Poppins", fontSize: "0.78rem", color: "rgba(238,238,238,0.2)", padding: 8, textAlign: "center" }}>Sin carpetas</p>
                  : carpetas.map(c => (
                    <button key={c} onClick={() => seleccionarCarpeta(c)} style={{
                      width: "100%", background: carpetaActual === c ? "rgba(240,73,63,0.12)" : "transparent",
                      border: "none", color: carpetaActual === c ? "#f0493f" : "rgba(238,238,238,0.5)",
                      padding: "8px 10px", borderRadius: 4, cursor: "pointer",
                      fontFamily: "Montserrat", fontWeight: 600, fontSize: "0.78rem",
                      textAlign: "left", transition: "all 0.15s",
                      display: "flex", alignItems: "center", gap: 7,
                    }}
                      onMouseEnter={e => { if (carpetaActual !== c) { e.currentTarget.style.background = "rgba(238,238,238,0.05)"; e.currentTarget.style.color = "#eeeeee"; } }}
                      onMouseLeave={e => { if (carpetaActual !== c) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(238,238,238,0.5)"; } }}
                    >
                      <i className="fa-solid fa-folder" style={{ fontSize: "0.75rem" }} />{c}
                    </button>
                  ))
                }
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
                {!carpetaActual && <div style={{ textAlign: "center", padding: "40px 20px", color: "rgba(238,238,238,0.25)" }}><i className="fa-solid fa-folder-open" style={{ fontSize: "2rem", marginBottom: 12, display: "block" }} /><p style={{ fontFamily: "Poppins", fontSize: "0.85rem" }}>Seleccioná una carpeta</p></div>}
                {loadingImagenes && <div style={{ textAlign: "center", padding: 40, fontFamily: "Poppins", fontSize: "0.85rem", color: "rgba(238,238,238,0.3)" }}>Cargando imágenes...</div>}
                {!loadingImagenes && carpetaActual && imagenes.length === 0 && <div style={{ textAlign: "center", padding: "40px 20px", color: "rgba(238,238,238,0.25)" }}><i className="fa-solid fa-image" style={{ fontSize: "2rem", marginBottom: 12, display: "block" }} /><p style={{ fontFamily: "Poppins", fontSize: "0.85rem" }}>Carpeta vacía</p></div>}
                {!loadingImagenes && imagenes.length > 0 && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 10 }}>
                    {imagenes.map(img => (
                      <div key={img.publicId} onClick={() => seleccionarImagen(img.url)} style={{
                        background: "#1e1e1e", borderRadius: 6, overflow: "hidden",
                        border: `2px solid ${form.imagen === img.url ? "#f0493f" : "transparent"}`,
                        cursor: "pointer", transition: "all 0.15s",
                      }}
                        onMouseEnter={e => { if (form.imagen !== img.url) e.currentTarget.style.borderColor = "rgba(238,238,238,0.2)"; }}
                        onMouseLeave={e => { if (form.imagen !== img.url) e.currentTarget.style.borderColor = "transparent"; }}
                      >
                        <div style={{ height: 90, overflow: "hidden" }}>
                          <img src={img.url} alt={img.publicId} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ padding: "5px 7px" }}>
                          <p style={{ fontFamily: "Montserrat", fontSize: "0.62rem", color: "rgba(238,238,238,0.4)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{img.publicId.split("/").pop()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Confirmar eliminar */}
      {confirmarEliminar && (
        <>
          <div onClick={() => setConfirmarEliminar(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 100 }} />
          <div style={{ position: "fixed", top: "50%", left: "50%", zIndex: 101, transform: "translate(-50%, -50%)", width: "90%", maxWidth: 380, background: "#272727", borderRadius: 8, border: "1px solid rgba(240,73,63,0.2)", padding: 28, textAlign: "center" }}>
            <p style={{ fontSize: "2rem", marginBottom: 12 }}>🗑</p>
            <h3 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: "1rem", color: "#eeeeee", marginBottom: 8 }}>¿Eliminar producto?</h3>
            <p style={{ fontFamily: "Poppins", fontSize: "0.85rem", color: "rgba(238,238,238,0.4)", marginBottom: 24 }}>Esta acción no se puede deshacer.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setConfirmarEliminar(null)} style={{ flex: 1, padding: "11px", borderRadius: 4, background: "rgba(238,238,238,0.07)", border: "none", color: "rgba(238,238,238,0.5)", fontFamily: "Montserrat", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer" }}>Cancelar</button>
              <button onClick={() => eliminar(confirmarEliminar)} style={{ flex: 1, padding: "11px", borderRadius: 4, background: "#f0493f", border: "none", color: "#fff", fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}>Eliminar</button>
            </div>
          </div>
        </>
      )}

      <style>{`
        .admin-page-wrapper { padding: clamp(20px, 4vw, 36px) clamp(16px, 4vw, 40px); }
        .admin-productos-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .btn-label-mobile { display: none; }
        .btn-label-desktop { display: inline; }
        @media (max-width: 1200px) { .admin-productos-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 900px)  { .admin-productos-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .admin-productos-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } }
        @media (max-width: 768px) {
          .btn-label-mobile  { display: inline; }
          .btn-label-desktop { display: none; }
        }
      `}</style>
    </AdminLayout>
  );
}