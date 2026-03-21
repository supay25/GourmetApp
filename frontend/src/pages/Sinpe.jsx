import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const API = import.meta.env.VITE_API_URL;

const CONFIG = {
  telefono: "6381-8443",
  nombreNegocio: "Gourmetto",
};

export default function Sinpe() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const pedido = state?.pedido;
  const fileInputRef = useRef();

  const [comprobante, setComprobante] = useState(null); // URL de Cloudinary
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [preview, setPreview] = useState(null); // preview local antes de subir

  useEffect(() => {
    if (!pedido) navigate("/productos");
  }, [pedido, navigate]);

  if (!pedido) return null;

  const fecha = new Date()
    .toLocaleDateString("es-CR", { day: "2-digit", month: "2-digit", year: "numeric" })
    .replace(/\//g, "-");

  const referencia = `${CONFIG.nombreNegocio} ${fecha} ${pedido.numeroPedido}`;

  const pasos = [
    { num: "01", texto: "Abrí tu app bancaria o billetera digital." },
    { num: "02", texto: `Seleccioná la opción "Sinpe Móvil" y buscá el número ${CONFIG.telefono}.` },
    { num: "03", texto: `Ingresá el monto exacto: ₡${pedido.total.toLocaleString()}.` },
    { num: "04", texto: `En el campo de referencia escribí exactamente: "${referencia}".` },
    { num: "05", texto: "Tomá una captura de pantalla del comprobante y subila abajo." },
  ];

  // Subir comprobante usando la ruta pública — sin JWT requerido
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploadError('');
    setUploading(true);
    setComprobante(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      // Ruta pública separada — sin autenticación
      const res = await fetch(`${API}/api/public/comprobante`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Error al subir el comprobante');
      const data = await res.json();
      setComprobante(data.url);

      // Guardar URL del comprobante en el pedido
      await fetch(`${API}/api/pedidos/${pedido.pedidoId}/comprobante`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comprobante: data.url }),
      });

    } catch (err) {
      setUploadError('No se pudo subir el comprobante. Intentá de nuevo.');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleContinuar = () => {
    navigate("/confirmacion", {
      state: { pedido: { ...pedido, comprobante } }
    });
  };

  return (
    <section style={{ minHeight: "100vh", background: "#202020", paddingTop: 100, paddingBottom: 80 }}>
      <div className="sinpe-wrapper">

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p style={{
            fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.7rem",
            letterSpacing: "0.2em", textTransform: "uppercase", color: "#f0493f", marginBottom: 16,
          }}>✦ Último paso</p>
          <h1 style={{
            fontFamily: "Montserrat", fontWeight: 900,
            fontSize: "clamp(2rem, 5vw, 4rem)",
            letterSpacing: "-0.04em", color: "#eeeeee", lineHeight: 0.95,
          }}>
            PAGO POR<br /><span style={{ color: "#f0493f" }}>SINPE MÓVIL</span>
          </h1>
        </div>

        {/* Datos de pago */}
        <div style={{
          background: "#272727", borderRadius: 6,
          border: "1px solid rgba(240,73,63,0.25)",
          padding: 28, marginBottom: 24,
        }}>
          <p style={{
            fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.7rem",
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: "rgba(238,238,238,0.4)", marginBottom: 20,
          }}>Datos para tu transferencia</p>

          <div style={{ marginBottom: 20 }}>
            <p style={{
              fontFamily: "Montserrat", fontSize: "0.72rem", letterSpacing: "0.1em",
              textTransform: "uppercase", color: "rgba(238,238,238,0.35)", marginBottom: 8,
            }}>Número Sinpe Móvil</p>
            <p style={{
              fontFamily: "Montserrat", fontWeight: 900,
              fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
              color: "#eeeeee", letterSpacing: "0.05em", lineHeight: 1,
            }}>{CONFIG.telefono}</p>
          </div>

          <div style={{ height: 1, background: "rgba(238,238,238,0.07)", marginBottom: 20 }} />

          <div className="sinpe-datos-row">
            <div>
              <p style={{
                fontFamily: "Montserrat", fontSize: "0.72rem", letterSpacing: "0.1em",
                textTransform: "uppercase", color: "rgba(238,238,238,0.35)", marginBottom: 8,
              }}>Monto exacto</p>
              <p style={{
                fontFamily: "Montserrat", fontWeight: 900,
                fontSize: "clamp(1.6rem, 4vw, 2rem)",
                color: "#f0493f", lineHeight: 1,
              }}>₡{pedido.total.toLocaleString()}</p>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontFamily: "Montserrat", fontSize: "0.72rem", letterSpacing: "0.1em",
                textTransform: "uppercase", color: "rgba(238,238,238,0.35)", marginBottom: 8,
              }}>Referencia</p>
              <p style={{
                fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.9rem",
                color: "#eeeeee", lineHeight: 1.4,
                background: "rgba(240,73,63,0.08)",
                border: "1px dashed rgba(240,73,63,0.3)",
                borderRadius: 4, padding: "10px 14px",
                letterSpacing: "0.02em", wordBreak: "break-word",
              }}>{referencia}</p>
            </div>
          </div>
        </div>

        {/* Pasos */}
        <div style={{
          background: "#272727", borderRadius: 6,
          border: "1px solid rgba(238,238,238,0.05)",
          padding: 28, marginBottom: 24,
        }}>
          <p style={{
            fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.7rem",
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: "rgba(238,238,238,0.4)", marginBottom: 24,
          }}>Instrucciones</p>

          {pasos.map((paso, i) => (
            <div key={i} style={{
              display: "flex", gap: 16, alignItems: "flex-start",
              marginBottom: i < pasos.length - 1 ? 20 : 0,
            }}>
              <span style={{
                fontFamily: "Montserrat", fontWeight: 900, fontSize: "1rem",
                color: "#f0493f", flexShrink: 0, lineHeight: 1.6,
              }}>{paso.num}</span>
              <p style={{
                fontFamily: "Poppins", fontWeight: 300, fontSize: "0.9rem",
                color: "rgba(238,238,238,0.7)", lineHeight: 1.7, margin: 0,
              }}>{paso.texto}</p>
            </div>
          ))}
        </div>

        {/* Subida de comprobante */}
        <div style={{
          background: "#272727", borderRadius: 6,
          border: `1px solid ${comprobante ? 'rgba(63,214,138,0.3)' : 'rgba(238,238,238,0.08)'}`,
          padding: 28, marginBottom: 24, transition: 'border-color 0.3s',
        }}>
          <p style={{
            fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.7rem",
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: comprobante ? '#3fd68a' : "rgba(238,238,238,0.4)",
            marginBottom: 8, transition: 'color 0.3s',
          }}>
            {comprobante ? '✓ Comprobante recibido' : 'Subí tu comprobante de pago'}
          </p>
          <p style={{
            fontFamily: "Poppins", fontSize: "0.82rem",
            color: "rgba(238,238,238,0.4)", marginBottom: 20, lineHeight: 1.6,
          }}>
            Tomá una captura o foto del comprobante de Sinpe y subila acá. Esto nos permite confirmar tu pago más rápido.
          </p>

          {/* Input oculto — capture="environment" abre la cámara en móvil */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleUpload}
            style={{ display: 'none' }}
          />

          {/* Preview o área de drop */}
          {preview ? (
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <img src={preview} alt="Comprobante" style={{
                width: '100%', maxHeight: 280, objectFit: 'contain',
                borderRadius: 4, background: '#1e1e1e',
                border: '1px solid rgba(238,238,238,0.08)',
              }} />
              {/* Overlay cargando */}
              {uploading && (
                <div style={{
                  position: 'absolute', inset: 0, background: 'rgba(32,32,32,0.8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 4,
                }}>
                  <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.85rem', color: '#eeeeee' }}>
                    Subiendo comprobante...
                  </p>
                </div>
              )}
              {/* Check de éxito */}
              {comprobante && (
                <div style={{
                  position: 'absolute', top: 10, right: 10,
                  background: '#3fd68a', borderRadius: '50%',
                  width: 32, height: 32,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem',
                }}>✓</div>
              )}
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current.click()}
              style={{
                border: '2px dashed rgba(238,238,238,0.15)',
                borderRadius: 6, padding: '32px 20px',
                textAlign: 'center', cursor: 'pointer',
                transition: 'border-color 0.2s', marginBottom: 16,
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(240,73,63,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(238,238,238,0.15)'}
            >
              <i className="fa-solid fa-camera" style={{ fontSize: '2rem', color: 'rgba(238,238,238,0.2)', display: 'block', marginBottom: 12 }} />
              <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.82rem', color: 'rgba(238,238,238,0.5)', marginBottom: 4 }}>
                Tocá para subir el comprobante
              </p>
              <p style={{ fontFamily: 'Poppins', fontSize: '0.75rem', color: 'rgba(238,238,238,0.25)' }}>
                JPG, PNG o captura de pantalla
              </p>
            </div>
          )}

          {/* Botón cambiar imagen */}
          {preview && !uploading && (
            <button onClick={() => fileInputRef.current.click()} style={{
              background: 'transparent', border: '1px solid rgba(238,238,238,0.1)',
              color: 'rgba(238,238,238,0.4)', padding: '8px 16px', borderRadius: 4,
              fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.75rem',
              cursor: 'pointer', transition: 'all 0.15s', width: '100%',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(238,238,238,0.25)'; e.currentTarget.style.color = '#eeeeee'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(238,238,238,0.1)'; e.currentTarget.style.color = 'rgba(238,238,238,0.4)'; }}
            >
              <i className="fa-solid fa-arrow-rotate-left" style={{ marginRight: 8 }} />
              Cambiar imagen
            </button>
          )}

          {/* Error */}
          {uploadError && (
            <p style={{
              fontFamily: 'Poppins', fontSize: '0.82rem', color: '#f0493f',
              marginTop: 12, textAlign: 'center',
            }}>{uploadError}</p>
          )}
        </div>

        {/* Aviso */}
        <div style={{
          background: "rgba(240,73,63,0.06)", border: "1px solid rgba(240,73,63,0.15)",
          borderRadius: 6, padding: "14px 18px", marginBottom: 32,
          display: "flex", gap: 12, alignItems: "flex-start",
        }}>
          <span style={{ fontSize: "1rem", flexShrink: 0 }}>⚠️</span>
          <p style={{
            fontFamily: "Poppins", fontSize: "0.85rem",
            color: "rgba(238,238,238,0.55)", lineHeight: 1.6, margin: 0,
          }}>
            Una vez subido el comprobante, nuestro equipo lo confirmará y se pondrá en contacto con vos para coordinar la entrega.
          </p>
        </div>

        {/* Botón continuar — bloqueado hasta que haya comprobante */}
        <button
          onClick={handleContinuar}
          disabled={!comprobante || uploading}
          style={{
            width: "100%", padding: "16px", borderRadius: 2,
            fontFamily: "Montserrat", fontWeight: 700, fontSize: "0.9rem",
            letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s",
            background: comprobante ? "#f0493f" : "rgba(238,238,238,0.08)",
            color: comprobante ? "#fff" : "rgba(238,238,238,0.25)",
            border: "none", cursor: comprobante ? "pointer" : "not-allowed",
          }}
          onMouseEnter={e => { if (comprobante) { e.target.style.background = "#eeeeee"; e.target.style.color = "#272727"; } }}
          onMouseLeave={e => { if (comprobante) { e.target.style.background = "#f0493f"; e.target.style.color = "#fff"; } }}
        >
          {uploading ? "Subiendo comprobante..." : comprobante ? "Continuar →" : "Subí el comprobante para continuar"}
        </button>
      </div>

      <style>{`
        .sinpe-wrapper { max-width: 720px; margin: 0 auto; padding: 0 48px; }
        .sinpe-datos-row { display: flex; gap: 32px; flex-wrap: wrap; }
        @media (max-width: 600px) {
          .sinpe-wrapper { padding: 0 20px; }
          .sinpe-datos-row { flex-direction: column; gap: 20px; }
        }
      `}</style>
    </section>
  );
}