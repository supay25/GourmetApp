import { useState, useEffect, useRef } from 'react';
import AdminLayout from './AdminLayout';
import { useAuth } from '../../context/AuthContext';

const API = import.meta.env.VITE_API_URL;

export default function AdminGaleria() {
  const { token } = useAuth();
  const [carpetas, setCarpetas] = useState([]);
  const [carpetaActual, setCarpetaActual] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [modalNuevaCarpeta, setModalNuevaCarpeta] = useState(false);
  const [nuevaCarpeta, setNuevaCarpeta] = useState('');
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [confirmarEliminar, setConfirmarEliminar] = useState(null);
  const [copiado, setCopiado] = useState(null);
  const fileInputRef = useRef();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const headersMultipart = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Cargar carpetas al montar
  const fetchCarpetas = async () => {
    try {
      const res = await fetch(`${API}/api/media/folders`, { headers });
      const data = await res.json();
      setCarpetas(data.folders || []);
    } catch (e) {
      setError('Error al cargar carpetas');
    }
  };

  // Cargar imágenes de la carpeta actual
  const fetchImagenes = async (folder) => {
    try {
      setLoading(true);
      setImagenes([]);
      const res = await fetch(`${API}/api/media/images?folder=${folder}`, { headers });
      const data = await res.json();
      setImagenes(data.images || []);
    } catch (e) {
      setError('Error al cargar imágenes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCarpetas(); }, []);

  useEffect(() => {
    if (carpetaActual) fetchImagenes(carpetaActual);
  }, [carpetaActual]);

  // Crear carpeta nueva
  const crearCarpeta = async () => {
    if (!nuevaCarpeta.trim()) return;
    try {
      await fetch(`${API}/api/media/folders`, {
        method: 'POST', headers,
        body: JSON.stringify({ name: nuevaCarpeta.trim() }),
      });
      await fetchCarpetas();
      setCarpetaActual(nuevaCarpeta.trim());
      setNuevaCarpeta('');
      setModalNuevaCarpeta(false);
    } catch (e) {
      setError('Error al crear carpeta');
    }
  };

  // Subir imagen
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !carpetaActual) return;

    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', carpetaActual);

      const res = await fetch(`${API}/api/media/images`, {
        method: 'POST',
        headers: headersMultipart,
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Error al subir imagen');
      }

      await fetchImagenes(carpetaActual);
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
      fileInputRef.current.value = '';
    }
  };

  // Eliminar imagen
  const eliminarImagen = async (publicId) => {
    try {
      await fetch(`${API}/api/media/images`, {
        method: 'DELETE', headers,
        body: JSON.stringify({ publicId }),
      });
      await fetchImagenes(carpetaActual);
      setConfirmarEliminar(null);
      setImagenSeleccionada(null);
    } catch (e) {
      setError('Error al eliminar imagen');
    }
  };

  // Copiar URL al portapapeles
  const copiarURL = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

        {/* Sidebar de carpetas */}
        <div style={{
          width: 220, flexShrink: 0,
          background: '#1e1e1e',
          borderRight: '1px solid rgba(238,238,238,0.06)',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
        }}>
          <div style={{
            padding: '20px 16px 12px',
            borderBottom: '1px solid rgba(238,238,238,0.06)',
          }}>
            <p style={{
              fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'rgba(238,238,238,0.3)', marginBottom: 12,
            }}>Carpetas</p>
            <button onClick={() => setModalNuevaCarpeta(true)} style={{
              width: '100%', background: 'rgba(240,73,63,0.1)',
              border: '1px dashed rgba(240,73,63,0.3)', color: '#f0493f',
              padding: '8px', borderRadius: 4, cursor: 'pointer',
              fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.75rem',
              transition: 'all 0.15s', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 6,
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(240,73,63,0.18)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(240,73,63,0.1)'}
            >
              <i className="fa-solid fa-plus" /> Nueva carpeta
            </button>
          </div>

          <div style={{ padding: '8px' }}>
            {carpetas.length === 0 ? (
              <p style={{
                fontFamily: 'Poppins', fontSize: '0.78rem',
                color: 'rgba(238,238,238,0.2)', padding: '12px 8px', textAlign: 'center',
              }}>Sin carpetas aún</p>
            ) : (
              carpetas.map(c => (
                <button key={c} onClick={() => setCarpetaActual(c)} style={{
                  width: '100%', background: carpetaActual === c ? 'rgba(240,73,63,0.12)' : 'transparent',
                  border: 'none', color: carpetaActual === c ? '#f0493f' : 'rgba(238,238,238,0.5)',
                  padding: '9px 12px', borderRadius: 4, cursor: 'pointer',
                  fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.8rem',
                  textAlign: 'left', transition: 'all 0.15s',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}
                  onMouseEnter={e => { if (carpetaActual !== c) { e.currentTarget.style.background = 'rgba(238,238,238,0.05)'; e.currentTarget.style.color = '#eeeeee'; } }}
                  onMouseLeave={e => { if (carpetaActual !== c) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(238,238,238,0.5)'; } }}
                >
                  <i className="fa-solid fa-folder" style={{ fontSize: '0.8rem' }} />
                  {c}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Área principal */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 36px' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
            <div>
              <p style={{
                fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem',
                letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f0493f', marginBottom: 8,
              }}>✦ Recursos</p>
              <h1 style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '1.8rem', letterSpacing: '-0.03em', color: '#eeeeee' }}>
                Galería {carpetaActual && <span style={{ color: 'rgba(238,238,238,0.4)', fontWeight: 400, fontSize: '1.2rem' }}>/ {carpetaActual}</span>}
              </h1>
            </div>
            {carpetaActual && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  style={{ display: 'none' }}
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  disabled={uploading}
                  style={{
                    background: uploading ? '#444' : '#f0493f', color: '#fff',
                    border: 'none', padding: '10px 20px', borderRadius: 6,
                    fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.8rem',
                    letterSpacing: '0.06em', cursor: uploading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 8,
                  }}
                  onMouseEnter={e => { if (!uploading) { e.currentTarget.style.background = '#eeeeee'; e.currentTarget.style.color = '#272727'; } }}
                  onMouseLeave={e => { if (!uploading) { e.currentTarget.style.background = '#f0493f'; e.currentTarget.style.color = '#fff'; } }}
                >
                  <i className="fa-solid fa-upload" />
                  {uploading ? 'Subiendo...' : 'Subir imagen'}
                </button>
              </>
            )}
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: 'rgba(240,73,63,0.1)', border: '1px solid rgba(240,73,63,0.3)',
              borderRadius: 6, padding: '12px 16px', marginBottom: 24,
              fontFamily: 'Poppins', fontSize: '0.85rem', color: '#f0493f',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              {error}
              <button onClick={() => setError('')} style={{ background: 'transparent', border: 'none', color: '#f0493f', cursor: 'pointer' }}>✕</button>
            </div>
          )}

          {/* Estado inicial — sin carpeta seleccionada */}
          {!carpetaActual && (
            <div style={{
              textAlign: 'center', padding: '80px 40px',
              background: '#272727', borderRadius: 8,
              border: '1px solid rgba(238,238,238,0.06)',
            }}>
              <p style={{ fontSize: '3rem', marginBottom: 16 }}>🖼</p>
              <h3 style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '1.1rem', color: '#eeeeee', marginBottom: 8 }}>
                Seleccioná una carpeta
              </h3>
              <p style={{ fontFamily: 'Poppins', fontSize: '0.85rem', color: 'rgba(238,238,238,0.35)' }}>
                Elegí una carpeta del panel izquierdo o creá una nueva para empezar a subir imágenes.
              </p>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div style={{ textAlign: 'center', padding: 48, fontFamily: 'Poppins', color: 'rgba(238,238,238,0.3)' }}>
              Cargando imágenes...
            </div>
          )}

          {/* Grid de imágenes */}
          {!loading && carpetaActual && imagenes.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '60px 40px',
              background: '#272727', borderRadius: 8,
              border: '1px dashed rgba(238,238,238,0.1)',
            }}>
              <p style={{ fontSize: '2.5rem', marginBottom: 12 }}>📭</p>
              <p style={{ fontFamily: 'Montserrat', fontWeight: 700, color: '#eeeeee', marginBottom: 8 }}>
                Carpeta vacía
              </p>
              <p style={{ fontFamily: 'Poppins', fontSize: '0.85rem', color: 'rgba(238,238,238,0.35)' }}>
                Subí la primera imagen con el botón de arriba.
              </p>
            </div>
          )}

          {!loading && imagenes.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 16,
            }}>
              {imagenes.map(img => (
                <div key={img.publicId} style={{
                  background: '#272727', borderRadius: 6, overflow: 'hidden',
                  border: `1px solid ${imagenSeleccionada?.publicId === img.publicId ? 'rgba(240,73,63,0.5)' : 'rgba(238,238,238,0.06)'}`,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
                  onClick={() => setImagenSeleccionada(img)}
                  onMouseEnter={e => { if (imagenSeleccionada?.publicId !== img.publicId) e.currentTarget.style.borderColor = 'rgba(238,238,238,0.15)'; }}
                  onMouseLeave={e => { if (imagenSeleccionada?.publicId !== img.publicId) e.currentTarget.style.borderColor = 'rgba(238,238,238,0.06)'; }}
                >
                  {/* Imagen */}
                  <div style={{ height: 140, overflow: 'hidden', background: '#1e1e1e' }}>
                    <img src={img.url} alt={img.publicId}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  {/* Info */}
                  <div style={{ padding: '10px 12px' }}>
                    <p style={{
                      fontFamily: 'Montserrat', fontSize: '0.72rem', color: '#eeeeee',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      marginBottom: 4,
                    }}>{img.publicId.split('/').pop()}</p>
                    <p style={{ fontFamily: 'Poppins', fontSize: '0.68rem', color: 'rgba(238,238,238,0.3)' }}>
                      {img.width}×{img.height} · {formatSize(img.size)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Panel lateral derecho — detalle de imagen */}
        {imagenSeleccionada && (
          <div style={{
            width: 280, flexShrink: 0,
            background: '#1e1e1e',
            borderLeft: '1px solid rgba(238,238,238,0.06)',
            display: 'flex', flexDirection: 'column',
            overflowY: 'auto',
          }}>
            <div style={{ padding: '16px', borderBottom: '1px solid rgba(238,238,238,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(238,238,238,0.4)' }}>
                Detalle
              </p>
              <button onClick={() => setImagenSeleccionada(null)} style={{ background: 'transparent', border: 'none', color: 'rgba(238,238,238,0.3)', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
            </div>

            {/* Preview */}
            <div style={{ padding: 16 }}>
              <div style={{ borderRadius: 6, overflow: 'hidden', marginBottom: 16, background: '#272727' }}>
                <img src={imagenSeleccionada.url} alt="" style={{ width: '100%', objectFit: 'contain', maxHeight: 200 }} />
              </div>

              {/* Info */}
              {[
                { label: 'Dimensiones', value: `${imagenSeleccionada.width}×${imagenSeleccionada.height}px` },
                { label: 'Formato', value: imagenSeleccionada.format?.toUpperCase() },
                { label: 'Tamaño', value: formatSize(imagenSeleccionada.size) },
              ].map(({ label, value }) => (
                <div key={label} style={{ marginBottom: 12 }}>
                  <p style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(238,238,238,0.3)', marginBottom: 4 }}>{label}</p>
                  <p style={{ fontFamily: 'Poppins', fontSize: '0.85rem', color: '#eeeeee' }}>{value}</p>
                </div>
              ))}

              <div style={{ height: 1, background: 'rgba(238,238,238,0.07)', margin: '16px 0' }} />

              {/* URL */}
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(238,238,238,0.3)', marginBottom: 8 }}>URL</p>
                <div style={{
                  background: '#272727', borderRadius: 4, padding: '8px 10px',
                  fontFamily: 'Poppins', fontSize: '0.72rem', color: 'rgba(238,238,238,0.5)',
                  wordBreak: 'break-all', marginBottom: 8,
                }}>{imagenSeleccionada.url}</div>
                <button onClick={() => copiarURL(imagenSeleccionada.url, imagenSeleccionada.publicId)} style={{
                  width: '100%', padding: '9px',
                  background: copiado === imagenSeleccionada.publicId ? 'rgba(63,214,138,0.12)' : 'rgba(238,238,238,0.07)',
                  border: `1px solid ${copiado === imagenSeleccionada.publicId ? 'rgba(63,214,138,0.3)' : 'rgba(238,238,238,0.1)'}`,
                  color: copiado === imagenSeleccionada.publicId ? '#3fd68a' : 'rgba(238,238,238,0.6)',
                  borderRadius: 4, fontFamily: 'Montserrat', fontWeight: 600,
                  fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}>
                  <i className={`fa-solid ${copiado === imagenSeleccionada.publicId ? 'fa-check' : 'fa-copy'}`} />
                  {copiado === imagenSeleccionada.publicId ? '¡Copiado!' : 'Copiar URL'}
                </button>
              </div>

              {/* Eliminar */}
              <button onClick={() => setConfirmarEliminar(imagenSeleccionada)} style={{
                width: '100%', padding: '9px',
                background: 'rgba(240,73,63,0.08)', border: 'none',
                color: '#f0493f', borderRadius: 4,
                fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.75rem',
                cursor: 'pointer', transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(240,73,63,0.18)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(240,73,63,0.08)'}
              >
                <i className="fa-solid fa-trash" /> Eliminar imagen
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal nueva carpeta */}
      {modalNuevaCarpeta && (
        <>
          <div onClick={() => setModalNuevaCarpeta(false)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)', zIndex: 100,
          }} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%', zIndex: 101,
            transform: 'translate(-50%, -50%)',
            width: '90%', maxWidth: 400,
            background: '#272727', borderRadius: 8,
            border: '1px solid rgba(238,238,238,0.08)', padding: 28,
          }}>
            <h2 style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '1.1rem', color: '#eeeeee', marginBottom: 20 }}>
              Nueva carpeta
            </h2>
            <label style={{
              fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.68rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(238,238,238,0.4)', display: 'block', marginBottom: 8,
            }}>Nombre</label>
            <input
              value={nuevaCarpeta}
              onChange={e => setNuevaCarpeta(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && crearCarpeta()}
              placeholder="Ej: productos, banners, logos"
              autoFocus
              style={{
                width: '100%', background: '#1e1e1e',
                border: '1px solid rgba(238,238,238,0.1)', borderRadius: 4,
                padding: '10px 12px', fontFamily: 'Poppins', fontSize: '0.9rem',
                color: '#eeeeee', outline: 'none', boxSizing: 'border-box', marginBottom: 20,
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(240,73,63,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(238,238,238,0.1)'}
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setModalNuevaCarpeta(false)} style={{
                flex: 1, padding: '11px', borderRadius: 4,
                background: 'rgba(238,238,238,0.07)', border: 'none',
                color: 'rgba(238,238,238,0.5)', fontFamily: 'Montserrat',
                fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer',
              }}>Cancelar</button>
              <button onClick={crearCarpeta} style={{
                flex: 1, padding: '11px', borderRadius: 4,
                background: '#f0493f', border: 'none', color: '#fff',
                fontFamily: 'Montserrat', fontWeight: 700,
                fontSize: '0.82rem', cursor: 'pointer',
              }}>Crear</button>
            </div>
          </div>
        </>
      )}

      {/* Modal confirmar eliminar */}
      {confirmarEliminar && (
        <>
          <div onClick={() => setConfirmarEliminar(null)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)', zIndex: 100,
          }} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%', zIndex: 101,
            transform: 'translate(-50%, -50%)',
            width: '90%', maxWidth: 360,
            background: '#272727', borderRadius: 8,
            border: '1px solid rgba(240,73,63,0.2)',
            padding: 28, textAlign: 'center',
          }}>
            <p style={{ fontSize: '2rem', marginBottom: 12 }}>🗑</p>
            <h3 style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '1rem', color: '#eeeeee', marginBottom: 8 }}>
              ¿Eliminar imagen?
            </h3>
            <p style={{ fontFamily: 'Poppins', fontSize: '0.82rem', color: 'rgba(238,238,238,0.3)', marginBottom: 24 }}>
              Esta acción no se puede deshacer.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmarEliminar(null)} style={{
                flex: 1, padding: '11px', borderRadius: 4,
                background: 'rgba(238,238,238,0.07)', border: 'none',
                color: 'rgba(238,238,238,0.5)', fontFamily: 'Montserrat',
                fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer',
              }}>Cancelar</button>
              <button onClick={() => eliminarImagen(confirmarEliminar.publicId)} style={{
                flex: 1, padding: '11px', borderRadius: 4,
                background: '#f0493f', border: 'none', color: '#fff',
                fontFamily: 'Montserrat', fontWeight: 700,
                fontSize: '0.82rem', cursor: 'pointer',
              }}>Eliminar</button>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}