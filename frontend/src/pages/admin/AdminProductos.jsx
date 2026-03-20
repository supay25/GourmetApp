import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { useAuth } from '../../context/AuthContext';

const API = import.meta.env.VITE_API_URL;

export default function AdminProductos() {
  const { token } = useAuth();
  const [productos, setProductos] = useState([]);
  const [modal, setModal] = useState(null); // null | 'crear' | producto
  const [form, setForm] = useState({ codigoProducto: '', nombre: '', descripcion: '', precio: '', stock: '', imagen: '' });
  const [confirmarEliminar, setConfirmarEliminar] = useState(null);

  // Estado del selector de galería
  const [selectorGaleria, setSelectorGaleria] = useState(false);
  const [carpetas, setCarpetas] = useState([]);
  const [carpetaActual, setCarpetaActual] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [loadingImagenes, setLoadingImagenes] = useState(false);

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const abrirCrear = () => {
    setForm({ codigoProducto: '', nombre: '', descripcion: '', precio: '', stock: '', imagen: '' });
    setModal('crear');
  };

  const abrirEditar = (p) => {
    setForm({ ...p });
    setModal(p);
  };

  useEffect(() => { listaProductos(); }, []);

  const listaProductos = async () => {
    try {
      const respuesta = await fetch(`${API}/api/productos`, { method: 'GET' });
      const data = await respuesta.json();
      setProductos(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const guardar = async () => {
    if (!form.nombre) return;
    try {
      if (modal === 'crear') {
        const producto = await fetch(`${API}/api/productos`, {
          method: 'POST',
          headers,
          body: JSON.stringify(form),
        });
        await producto.json();
        await listaProductos();
        setModal(null);
      } else {
        const producto = await fetch(`${API}/api/productos/${modal._id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(form),
        });
        await producto.json();
        await listaProductos();
        setModal(null);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const eliminar = async (id) => {
    try {
      await fetch(`${API}/api/productos/${id}`, { method: 'DELETE' });
      await listaProductos();
      setConfirmarEliminar(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // ── Galería selector ──────────────────────

  // Cargar carpetas al abrir el selector
  const abrirSelectorGaleria = async () => {
    setSelectorGaleria(true);
    setCarpetaActual(null);
    setImagenes([]);
    try {
      const res = await fetch(`${API}/api/media/folders`, { headers });
      const data = await res.json();
      setCarpetas(data.folders || []);
    } catch (e) {
      console.error('Error al cargar carpetas:', e);
    }
  };

  // Cargar imágenes de la carpeta seleccionada
  const seleccionarCarpeta = async (carpeta) => {
    setCarpetaActual(carpeta);
    setLoadingImagenes(true);
    setImagenes([]);
    try {
      const res = await fetch(`${API}/api/media/images?folder=${carpeta}`, { headers });
      const data = await res.json();
      setImagenes(data.images || []);
    } catch (e) {
      console.error('Error al cargar imágenes:', e);
    } finally {
      setLoadingImagenes(false);
    }
  };

  // Seleccionar imagen — guarda la URL en el form y cierra el selector
  const seleccionarImagen = (url) => {
    setForm(p => ({ ...p, imagen: url }));
    setSelectorGaleria(false);
    setCarpetaActual(null);
    setImagenes([]);
  };

  return (
    <AdminLayout>
      <div style={{ padding: '36px 40px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <p style={{
              fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem',
              letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f0493f', marginBottom: 8,
            }}>✦ Catálogo</p>
            <h1 style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '1.8rem', letterSpacing: '-0.03em', color: '#eeeeee' }}>Productos</h1>
          </div>
          <button onClick={abrirCrear} style={{
            background: '#f0493f', color: '#fff', border: 'none',
            padding: '10px 20px', borderRadius: 6,
            fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.8rem',
            letterSpacing: '0.06em', cursor: 'pointer', transition: 'all 0.15s',
            display: 'flex', alignItems: 'center', gap: 8,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#eeeeee'; e.currentTarget.style.color = '#272727'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f0493f'; e.currentTarget.style.color = '#fff'; }}
          >
            <i className="fa-solid fa-plus" /> Nuevo producto
          </button>
        </div>

        {/* Grid productos */}
        <div className="admin-productos-grid">
          {productos.map((p, i) => (
            <div key={i} style={{
              background: '#272727', borderRadius: 8,
              border: '1px solid rgba(238,238,238,0.06)', overflow: 'hidden',
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #2a2a2a, #1e1e1e)',
                height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {p.imagen ? (
                  <img src={p.imagen} alt={p.nombre} style={{ height: 100, objectFit: 'contain' }} />
                ) : (
                  <i className="fa-solid fa-image" style={{ fontSize: '2rem', color: 'rgba(238,238,238,0.15)' }} />
                )}
              </div>
              <div style={{ padding: '16px' }}>
                <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.9rem', color: '#eeeeee', marginBottom: 4 }}>{p.nombre}</p>
                <p style={{ fontFamily: 'Montserrat', fontSize: '0.68rem', color: 'rgba(238,238,238,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{p.codigoProducto}</p>
                <p style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '1rem', color: '#f0493f', marginBottom: 16 }}>{p.precio}</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => abrirEditar(p)} style={{
                    flex: 1, padding: '8px', borderRadius: 4,
                    background: 'rgba(238,238,238,0.07)', border: 'none',
                    color: 'rgba(238,238,238,0.6)', fontFamily: 'Montserrat',
                    fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(238,238,238,0.12)'; e.currentTarget.style.color = '#eeeeee'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(238,238,238,0.07)'; e.currentTarget.style.color = 'rgba(238,238,238,0.6)'; }}
                  >
                    <i className="fa-solid fa-pen" style={{ marginRight: 6 }} />Editar
                  </button>
                  <button onClick={() => setConfirmarEliminar(p._id)} style={{
                    padding: '8px 12px', borderRadius: 4,
                    background: 'rgba(240,73,63,0.08)', border: 'none',
                    color: '#f0493f', cursor: 'pointer', transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(240,73,63,0.18)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(240,73,63,0.08)'}
                  >
                    <i className="fa-solid fa-trash" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal crear/editar */}
      {modal && (
        <>
          <div onClick={() => setModal(null)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)', zIndex: 100,
          }} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%', zIndex: 101,
            transform: 'translate(-50%, -50%)',
            width: '90%', maxWidth: 480,
            background: '#272727', borderRadius: 8,
            border: '1px solid rgba(238,238,238,0.08)',
            padding: 32, maxHeight: '85vh', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '1.1rem', color: '#eeeeee' }}>
                {modal === 'crear' ? 'Nuevo producto' : 'Editar producto'}
              </h2>
              <button onClick={() => setModal(null)} style={{ background: 'transparent', border: 'none', color: 'rgba(238,238,238,0.3)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>

            {/* Campos de texto */}
            {[
              { key: 'codigoProducto', label: 'Código de Producto' },
              { key: 'nombre', label: 'Nombre' },
              { key: 'descripcion', label: 'Descripción' },
              { key: 'precio', label: 'Precio (ej: ₡2.500)' },
              { key: 'stock', label: 'Cantidad del Producto' },
            ].map(({ key, label }) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={{
                  fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.68rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(238,238,238,0.4)', display: 'block', marginBottom: 8,
                }}>{label}</label>
                {key === 'descripcion' ? (
                  <textarea
                    value={form[key]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    rows={3}
                    style={{
                      width: '100%', background: '#1e1e1e',
                      border: '1px solid rgba(238,238,238,0.1)', borderRadius: 4,
                      padding: '10px 12px', fontFamily: 'Poppins', fontSize: '0.88rem',
                      color: '#eeeeee', outline: 'none', resize: 'none',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(240,73,63,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(238,238,238,0.1)'}
                  />
                ) : (
                  <input
                    value={form[key]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    style={{
                      width: '100%', background: '#1e1e1e',
                      border: '1px solid rgba(238,238,238,0.1)', borderRadius: 4,
                      padding: '10px 12px', fontFamily: 'Poppins', fontSize: '0.88rem',
                      color: '#eeeeee', outline: 'none', boxSizing: 'border-box',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(240,73,63,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(238,238,238,0.1)'}
                  />
                )}
              </div>
            ))}

            {/* Selector de imagen desde galería */}
            <div style={{ marginBottom: 20 }}>
              <label style={{
                fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.68rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'rgba(238,238,238,0.4)', display: 'block', marginBottom: 8,
              }}>Imagen</label>

              {/* Preview de imagen seleccionada */}
              {form.imagen ? (
                <div style={{
                  background: '#1e1e1e', borderRadius: 4, padding: 12,
                  border: '1px solid rgba(238,238,238,0.1)', marginBottom: 10,
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <img src={form.imagen} alt="preview"
                    style={{ width: 56, height: 56, objectFit: 'contain', borderRadius: 4, background: '#272727', padding: 4 }} />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <p style={{
                      fontFamily: 'Poppins', fontSize: '0.75rem',
                      color: 'rgba(238,238,238,0.5)',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>{form.imagen}</p>
                  </div>
                  {/* Botón para quitar imagen */}
                  <button onClick={() => setForm(p => ({ ...p, imagen: '' }))} style={{
                    background: 'transparent', border: 'none',
                    color: 'rgba(238,238,238,0.3)', cursor: 'pointer',
                    fontSize: '1rem', flexShrink: 0,
                  }}>✕</button>
                </div>
              ) : (
                <div style={{
                  background: '#1e1e1e', borderRadius: 4,
                  border: '1px dashed rgba(238,238,238,0.1)',
                  padding: '20px', textAlign: 'center', marginBottom: 10,
                }}>
                  <i className="fa-solid fa-image" style={{ fontSize: '1.5rem', color: 'rgba(238,238,238,0.15)', marginBottom: 8, display: 'block' }} />
                  <p style={{ fontFamily: 'Poppins', fontSize: '0.8rem', color: 'rgba(238,238,238,0.3)' }}>
                    Sin imagen seleccionada
                  </p>
                </div>
              )}

              {/* Botón abrir galería */}
              <button onClick={abrirSelectorGaleria} style={{
                width: '100%', padding: '10px', borderRadius: 4,
                background: 'rgba(238,238,238,0.07)',
                border: '1px solid rgba(238,238,238,0.1)',
                color: 'rgba(238,238,238,0.6)',
                fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.78rem',
                cursor: 'pointer', transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(238,238,238,0.12)'; e.currentTarget.style.color = '#eeeeee'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(238,238,238,0.07)'; e.currentTarget.style.color = 'rgba(238,238,238,0.6)'; }}
              >
                <i className="fa-solid fa-images" />
                {form.imagen ? 'Cambiar imagen' : 'Seleccionar desde galería'}
              </button>
            </div>

            <button onClick={guardar} style={{
              width: '100%', background: '#f0493f', color: '#fff',
              border: 'none', padding: '13px', borderRadius: 4,
              fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.85rem',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              cursor: 'pointer', marginTop: 8, transition: 'all 0.15s',
            }}
              onMouseEnter={e => { e.target.style.background = '#eeeeee'; e.target.style.color = '#272727'; }}
              onMouseLeave={e => { e.target.style.background = '#f0493f'; e.target.style.color = '#fff'; }}
            >
              {modal === 'crear' ? 'Crear producto' : 'Guardar cambios'}
            </button>
          </div>
        </>
      )}

      {/* Modal selector de galería */}
      {selectorGaleria && (
        <>
          <div onClick={() => setSelectorGaleria(false)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)', zIndex: 102,
          }} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%', zIndex: 103,
            transform: 'translate(-50%, -50%)',
            width: '90%', maxWidth: 720, height: '75vh',
            background: '#272727', borderRadius: 8,
            border: '1px solid rgba(238,238,238,0.08)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}>
            {/* Header del selector */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(238,238,238,0.06)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h3 style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '1rem', color: '#eeeeee' }}>
                  Seleccionar imagen
                </h3>
                {carpetaActual && (
                  <span style={{
                    fontFamily: 'Montserrat', fontSize: '0.72rem', color: 'rgba(238,238,238,0.35)',
                  }}>/ {carpetaActual}</span>
                )}
              </div>
              <button onClick={() => setSelectorGaleria(false)} style={{
                background: 'transparent', border: 'none',
                color: 'rgba(238,238,238,0.3)', fontSize: '1.2rem', cursor: 'pointer',
              }}>✕</button>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              {/* Sidebar carpetas */}
              <div style={{
                width: 180, flexShrink: 0,
                borderRight: '1px solid rgba(238,238,238,0.06)',
                overflowY: 'auto', padding: 8,
              }}>
                <p style={{
                  fontFamily: 'Montserrat', fontSize: '0.62rem', letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'rgba(238,238,238,0.25)',
                  padding: '8px 8px 4px',
                }}>Carpetas</p>
                {carpetas.length === 0 ? (
                  <p style={{ fontFamily: 'Poppins', fontSize: '0.78rem', color: 'rgba(238,238,238,0.2)', padding: '8px', textAlign: 'center' }}>
                    Sin carpetas
                  </p>
                ) : (
                  carpetas.map(c => (
                    <button key={c} onClick={() => seleccionarCarpeta(c)} style={{
                      width: '100%', background: carpetaActual === c ? 'rgba(240,73,63,0.12)' : 'transparent',
                      border: 'none', color: carpetaActual === c ? '#f0493f' : 'rgba(238,238,238,0.5)',
                      padding: '8px 10px', borderRadius: 4, cursor: 'pointer',
                      fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.78rem',
                      textAlign: 'left', transition: 'all 0.15s',
                      display: 'flex', alignItems: 'center', gap: 7,
                    }}
                      onMouseEnter={e => { if (carpetaActual !== c) { e.currentTarget.style.background = 'rgba(238,238,238,0.05)'; e.currentTarget.style.color = '#eeeeee'; } }}
                      onMouseLeave={e => { if (carpetaActual !== c) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(238,238,238,0.5)'; } }}
                    >
                      <i className="fa-solid fa-folder" style={{ fontSize: '0.75rem' }} />
                      {c}
                    </button>
                  ))
                )}
              </div>

              {/* Grid de imágenes */}
              <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
                {!carpetaActual && (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(238,238,238,0.25)' }}>
                    <i className="fa-solid fa-folder-open" style={{ fontSize: '2rem', marginBottom: 12, display: 'block' }} />
                    <p style={{ fontFamily: 'Poppins', fontSize: '0.85rem' }}>Seleccioná una carpeta</p>
                  </div>
                )}

                {loadingImagenes && (
                  <div style={{ textAlign: 'center', padding: 40, fontFamily: 'Poppins', fontSize: '0.85rem', color: 'rgba(238,238,238,0.3)' }}>
                    Cargando imágenes...
                  </div>
                )}

                {!loadingImagenes && carpetaActual && imagenes.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(238,238,238,0.25)' }}>
                    <i className="fa-solid fa-image" style={{ fontSize: '2rem', marginBottom: 12, display: 'block' }} />
                    <p style={{ fontFamily: 'Poppins', fontSize: '0.85rem' }}>Carpeta vacía</p>
                  </div>
                )}

                {!loadingImagenes && imagenes.length > 0 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                    gap: 10,
                  }}>
                    {imagenes.map(img => (
                      <div key={img.publicId}
                        onClick={() => seleccionarImagen(img.url)}
                        style={{
                          background: '#1e1e1e', borderRadius: 6, overflow: 'hidden',
                          border: `2px solid ${form.imagen === img.url ? '#f0493f' : 'transparent'}`,
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => { if (form.imagen !== img.url) e.currentTarget.style.borderColor = 'rgba(238,238,238,0.2)'; }}
                        onMouseLeave={e => { if (form.imagen !== img.url) e.currentTarget.style.borderColor = 'transparent'; }}
                      >
                        <div style={{ height: 100, overflow: 'hidden' }}>
                          <img src={img.url} alt={img.publicId}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '6px 8px' }}>
                          <p style={{
                            fontFamily: 'Montserrat', fontSize: '0.65rem',
                            color: 'rgba(238,238,238,0.4)',
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                          }}>{img.publicId.split('/').pop()}</p>
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
          <div onClick={() => setConfirmarEliminar(null)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)', zIndex: 100,
          }} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%', zIndex: 101,
            transform: 'translate(-50%, -50%)',
            width: '90%', maxWidth: 380,
            background: '#272727', borderRadius: 8,
            border: '1px solid rgba(240,73,63,0.2)',
            padding: 28, textAlign: 'center',
          }}>
            <p style={{ fontSize: '2rem', marginBottom: 12 }}>🗑</p>
            <h3 style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '1rem', color: '#eeeeee', marginBottom: 8 }}>¿Eliminar producto?</h3>
            <p style={{ fontFamily: 'Poppins', fontSize: '0.85rem', color: 'rgba(238,238,238,0.4)', marginBottom: 24 }}>Esta acción no se puede deshacer.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmarEliminar(null)} style={{
                flex: 1, padding: '11px', borderRadius: 4,
                background: 'rgba(238,238,238,0.07)', border: 'none',
                color: 'rgba(238,238,238,0.5)', fontFamily: 'Montserrat',
                fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer',
              }}>Cancelar</button>
              <button onClick={() => eliminar(confirmarEliminar)} style={{
                flex: 1, padding: '11px', borderRadius: 4,
                background: '#f0493f', border: 'none',
                color: '#fff', fontFamily: 'Montserrat',
                fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
              }}>Eliminar</button>
            </div>
          </div>
        </>
      )}

      <style>{`
        .admin-productos-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 1200px) { .admin-productos-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 900px) { .admin-productos-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </AdminLayout>
  );
}