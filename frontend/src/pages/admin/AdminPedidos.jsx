import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';

const API = import.meta.env.VITE_API_URL;

const estadoConfig = {
  'pendiente':  { bg: 'rgba(240,169,63,0.12)',  color: '#f0a93f' },
  'confirmado': { bg: 'rgba(63,214,138,0.12)',  color: '#3fd68a' },
  'entregado':  { bg: 'rgba(238,238,238,0.08)', color: 'rgba(238,238,238,0.4)' },
  'cancelado':  { bg: 'rgba(240,73,63,0.12)',   color: '#f0493f' },
};

const filtros = ['Todos', 'pendiente', 'confirmado', 'entregado', 'cancelado'];

export default function AdminPedidos() {
  const [filtro, setFiltro] = useState('Todos');
  const [detalle, setDetalle] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [confirmarEliminar, setConfirmarEliminar] = useState(null);
  const [confirmarCancelar, setConfirmarCancelar] = useState(null);
  const [procesando, setProcesando] = useState(false);

  const pedidosFiltrados = filtro === 'Todos'
    ? pedidos
    : pedidos.filter(p => p.estado === filtro);

  useEffect(() => { listaPedidos(); }, []);

  const listaPedidos = async () => {
    try {
      const res = await fetch(`${API}/api/pedidos`);
      const data = await res.json();
      setPedidos(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await fetch(`${API}/api/pedidos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      await listaPedidos();
      if (detalle?._id === id) setDetalle(prev => ({ ...prev, estado: nuevoEstado }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const cancelarPedido = async (id) => {
    setProcesando(true);
    try {
      const res = await fetch(`${API}/api/pedidos/${id}/cancelar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.mensaje);
        return;
      }
      await listaPedidos();
      setConfirmarCancelar(null);
      if (detalle?._id === id) setDetalle(prev => ({ ...prev, estado: 'cancelado' }));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setProcesando(false);
    }
  };

  const eliminarPedido = async (id) => {
    setProcesando(true);
    try {
      await fetch(`${API}/api/pedidos/${id}`, { method: "DELETE" });
      await listaPedidos();
      setConfirmarEliminar(null);
      setDetalle(null);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setProcesando(false);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page-wrapper">

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <p style={{
            fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem',
            letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f0493f', marginBottom: 8,
          }}>✦ Gestión</p>
          <h1 style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', letterSpacing: '-0.03em', color: '#eeeeee' }}>
            Pedidos
          </h1>
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
          {filtros.map(f => (
            <button key={f} onClick={() => setFiltro(f)} style={{
              padding: '6px 14px', borderRadius: 6, border: 'none',
              fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.75rem',
              cursor: 'pointer', transition: 'all 0.15s', textTransform: 'capitalize',
              background: filtro === f ? '#f0493f' : 'rgba(238,238,238,0.07)',
              color: filtro === f ? '#fff' : 'rgba(238,238,238,0.5)',
            }}>{f}</button>
          ))}
        </div>

        {/* Contenedor */}
        <div style={{ background: '#272727', borderRadius: 8, border: '1px solid rgba(238,238,238,0.06)', overflow: 'hidden' }}>

          {/* Desktop — tabla */}
          <div className="pedidos-tabla-desktop">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(238,238,238,0.06)' }}>
                  {['Pedido', 'Cliente', 'Total', 'Comprobante', 'Estado', 'Fecha', 'Acciones'].map(h => (
                    <th key={h} style={{
                      padding: '12px 20px', textAlign: 'left',
                      fontFamily: 'Montserrat', fontSize: '0.68rem',
                      fontWeight: 700, letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: 'rgba(238,238,238,0.3)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.map((p, i) => (
                  <tr key={p._id} style={{
                    borderBottom: i < pedidosFiltrados.length - 1 ? '1px solid rgba(238,238,238,0.04)' : 'none',
                    transition: 'background 0.15s',
                    opacity: p.estado === 'cancelado' ? 0.6 : 1,
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(238,238,238,0.03)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '14px 20px', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.85rem', color: '#f0493f' }}>{p.codigo}</td>
                    <td style={{ padding: '14px 20px', fontFamily: 'Poppins', fontSize: '0.85rem', color: '#eeeeee' }}>{p.nombre}</td>
                    <td style={{ padding: '14px 20px', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.85rem', color: '#eeeeee' }}>₡{p.total.toLocaleString()}</td>
                    <td style={{ padding: '14px 20px' }}>
                      {p.comprobante
                        ? <span style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.68rem', padding: '3px 8px', borderRadius: 4, background: 'rgba(63,214,138,0.12)', color: '#3fd68a' }}>✓ Subido</span>
                        : <span style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.68rem', padding: '3px 8px', borderRadius: 4, background: 'rgba(240,169,63,0.1)', color: 'rgba(240,169,63,0.6)' }}>Pendiente</span>
                      }
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{
                        fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.72rem',
                        padding: '4px 10px', borderRadius: 4, textTransform: 'capitalize',
                        background: estadoConfig[p.estado]?.bg || 'rgba(238,238,238,0.08)',
                        color: estadoConfig[p.estado]?.color || 'rgba(238,238,238,0.4)',
                      }}>{p.estado}</span>
                    </td>
                    <td style={{ padding: '14px 20px', fontFamily: 'Poppins', fontSize: '0.82rem', color: 'rgba(238,238,238,0.4)' }}>
                      {new Date(p.fecha).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => setDetalle(p)} style={{
                          background: 'rgba(238,238,238,0.07)', border: 'none',
                          color: 'rgba(238,238,238,0.6)', padding: '6px 14px',
                          borderRadius: 4, fontFamily: 'Montserrat', fontWeight: 600,
                          fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.15s',
                          display: 'flex', alignItems: 'center', gap: 6,
                        }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(240,73,63,0.12)'; e.currentTarget.style.color = '#f0493f'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(238,238,238,0.07)'; e.currentTarget.style.color = 'rgba(238,238,238,0.6)'; }}
                        >
                          <i className="fa-solid fa-eye" style={{ fontSize: '0.75rem' }} /> Ver
                        </button>
                        <button onClick={() => setConfirmarEliminar(p)} style={{
                          background: 'rgba(240,73,63,0.08)', border: 'none',
                          color: '#f0493f', padding: '6px 14px',
                          borderRadius: 4, fontFamily: 'Montserrat', fontWeight: 600,
                          fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.15s',
                          display: 'flex', alignItems: 'center', gap: 6,
                        }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(240,73,63,0.18)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(240,73,63,0.08)'}
                        >
                          <i className="fa-solid fa-trash" style={{ fontSize: '0.75rem' }} /> Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile — cards */}
          <div className="pedidos-cards-mobile">
            {pedidosFiltrados.length === 0 ? (
              <p style={{ padding: '32px 20px', textAlign: 'center', fontFamily: 'Poppins', fontSize: '0.85rem', color: 'rgba(238,238,238,0.3)' }}>
                No hay pedidos con este filtro.
              </p>
            ) : pedidosFiltrados.map((p, i) => (
              <div key={p._id} style={{
                padding: '16px',
                borderBottom: i < pedidosFiltrados.length - 1 ? '1px solid rgba(238,238,238,0.06)' : 'none',
                opacity: p.estado === 'cancelado' ? 0.6 : 1,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.9rem', color: '#f0493f' }}>{p.codigo}</span>
                  <span style={{
                    fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.68rem',
                    padding: '3px 10px', borderRadius: 4, textTransform: 'capitalize',
                    background: estadoConfig[p.estado]?.bg || 'rgba(238,238,238,0.08)',
                    color: estadoConfig[p.estado]?.color || 'rgba(238,238,238,0.4)',
                  }}>{p.estado}</span>
                </div>
                <p style={{ fontFamily: 'Poppins', fontSize: '0.85rem', color: '#eeeeee', marginBottom: 6 }}>{p.nombre}</p>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.88rem', color: '#eeeeee' }}>₡{p.total.toLocaleString()}</span>
                  <span style={{ fontFamily: 'Poppins', fontSize: '0.78rem', color: 'rgba(238,238,238,0.35)' }}>{new Date(p.fecha).toLocaleDateString()}</span>
                  {p.comprobante
                    ? <span style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem', padding: '2px 7px', borderRadius: 4, background: 'rgba(63,214,138,0.12)', color: '#3fd68a' }}>✓ Comprobante</span>
                    : <span style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem', padding: '2px 7px', borderRadius: 4, background: 'rgba(240,169,63,0.1)', color: 'rgba(240,169,63,0.6)' }}>Sin comprobante</span>
                  }
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setDetalle(p)} style={{
                    flex: 1, padding: '9px', borderRadius: 4, border: 'none',
                    background: 'rgba(238,238,238,0.07)', color: 'rgba(238,238,238,0.7)',
                    fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.75rem',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}>
                    <i className="fa-solid fa-eye" /> Ver detalle
                  </button>
                  <button onClick={() => setConfirmarEliminar(p)} style={{
                    padding: '9px 14px', borderRadius: 4, border: 'none',
                    background: 'rgba(240,73,63,0.08)', color: '#f0493f',
                    fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.75rem',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    <i className="fa-solid fa-trash" /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal detalle */}
      {detalle && (
        <>
          <div onClick={() => setDetalle(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100 }} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%', zIndex: 101,
            transform: 'translate(-50%, -50%)',
            width: '94%', maxWidth: 520,
            background: '#272727', borderRadius: 8,
            border: '1px solid rgba(238,238,238,0.08)',
            padding: 'clamp(20px, 4vw, 32px)', maxHeight: '88vh', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <p style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '1.1rem', color: '#f0493f', marginBottom: 4 }}>{detalle.codigo}</p>
                <p style={{ fontFamily: 'Poppins', fontSize: '0.82rem', color: 'rgba(238,238,238,0.4)' }}>{new Date(detalle.fecha).toLocaleDateString()}</p>
              </div>
              <button onClick={() => setDetalle(null)} style={{ background: 'transparent', border: 'none', color: 'rgba(238,238,238,0.3)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ background: '#1e1e1e', borderRadius: 6, padding: '16px 20px', marginBottom: 16 }}>
              <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(238,238,238,0.3)', marginBottom: 12 }}>Cliente</p>
              <p style={{ fontFamily: 'Poppins', fontSize: '0.9rem', color: '#eeeeee', marginBottom: 4 }}>{detalle.nombre}</p>
              <p style={{ fontFamily: 'Poppins', fontSize: '0.82rem', color: 'rgba(238,238,238,0.4)', marginBottom: 4 }}>{detalle.numero}</p>
              <p style={{ fontFamily: 'Poppins', fontSize: '0.82rem', color: 'rgba(238,238,238,0.4)' }}>{detalle.direccion}</p>
            </div>

            <div style={{ background: '#1e1e1e', borderRadius: 6, padding: '16px 20px', marginBottom: 16 }}>
              <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(238,238,238,0.3)', marginBottom: 12 }}>Productos</p>
              {detalle.lista?.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i < detalle.lista.length - 1 ? 10 : 0 }}>
                  <span style={{ fontFamily: 'Poppins', fontSize: '0.88rem', color: 'rgba(238,238,238,0.7)' }}>
                    {item.nombre} <span style={{ color: 'rgba(238,238,238,0.35)' }}>x{item.cantidad}</span>
                  </span>
                  <span style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.88rem', color: '#eeeeee' }}>₡{item.precio.toLocaleString()}</span>
                </div>
              ))}
              <div style={{ height: 1, background: 'rgba(238,238,238,0.07)', margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'Montserrat', fontWeight: 700, color: '#eeeeee' }}>Total</span>
                <span style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '1.1rem', color: '#f0493f' }}>₡{detalle.total.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(238,238,238,0.3)', marginBottom: 12 }}>Comprobante de pago</p>
              {detalle.comprobante ? (
                <div style={{ background: '#1e1e1e', borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(63,214,138,0.2)' }}>
                  <img src={detalle.comprobante} alt="Comprobante" style={{ width: '100%', maxHeight: 300, objectFit: 'contain', display: 'block' }} />
                  <div style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(238,238,238,0.05)' }}>
                    <span style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.72rem', color: '#3fd68a' }}>✓ Comprobante recibido</span>
                    <a href={detalle.comprobante} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.72rem', color: 'rgba(238,238,238,0.4)', textDecoration: 'none' }}>Ver completo →</a>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'rgba(240,169,63,0.06)', border: '1px solid rgba(240,169,63,0.2)', borderRadius: 6, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span>⚠️</span>
                  <p style={{ fontFamily: 'Poppins', fontSize: '0.82rem', color: 'rgba(240,169,63,0.8)', margin: 0 }}>El cliente aún no ha subido el comprobante.</p>
                </div>
              )}
            </div>

            {detalle.estado !== 'cancelado' && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(238,238,238,0.3)', marginBottom: 12 }}>Estado del pedido</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['pendiente', 'confirmado', 'entregado'].map(estado => (
                    <button key={estado} onClick={() => cambiarEstado(detalle._id, estado)} style={{
                      flex: 1, padding: '10px 4px', borderRadius: 4, textTransform: 'capitalize',
                      border: `1px solid ${detalle.estado === estado ? estadoConfig[estado].color : 'rgba(238,238,238,0.08)'}`,
                      background: detalle.estado === estado ? estadoConfig[estado].bg : 'transparent',
                      color: detalle.estado === estado ? estadoConfig[estado].color : 'rgba(238,238,238,0.4)',
                      fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.72rem',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}>{estado}</button>
                  ))}
                </div>
              </div>
            )}

            {detalle.estado === 'cancelado' && (
              <div style={{ background: 'rgba(240,73,63,0.08)', border: '1px solid rgba(240,73,63,0.2)', borderRadius: 6, padding: '12px 16px', marginBottom: 16, textAlign: 'center' }}>
                <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.82rem', color: '#f0493f' }}>🚫 Pedido cancelado — stock restaurado</p>
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
              {detalle.estado !== 'cancelado' && detalle.estado !== 'entregado' && (
                <button onClick={() => setConfirmarCancelar(detalle)} style={{
                  flex: 1, minWidth: 140, padding: '11px', borderRadius: 4,
                  background: 'rgba(240,169,63,0.08)', border: '1px solid rgba(240,169,63,0.2)',
                  color: '#f0a93f', fontFamily: 'Montserrat', fontWeight: 700,
                  fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.15s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(240,169,63,0.15)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(240,169,63,0.08)'}
                >
                  <i className="fa-solid fa-ban" /> Cancelar pedido
                </button>
              )}
              <button onClick={() => setConfirmarEliminar(detalle)} style={{
                flex: 1, minWidth: 140, padding: '11px', borderRadius: 4,
                background: 'rgba(240,73,63,0.08)', border: '1px solid rgba(240,73,63,0.2)',
                color: '#f0493f', fontFamily: 'Montserrat', fontWeight: 700,
                fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(240,73,63,0.18)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(240,73,63,0.08)'}
              >
                <i className="fa-solid fa-trash" /> Eliminar pedido
              </button>
            </div>
          </div>
        </>
      )}

      {confirmarCancelar && (
        <>
          <div onClick={() => setConfirmarCancelar(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 102 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', zIndex: 103, transform: 'translate(-50%, -50%)', width: '90%', maxWidth: 400, background: '#272727', borderRadius: 8, border: '1px solid rgba(240,169,63,0.2)', padding: 28, textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', marginBottom: 12 }}>🚫</p>
            <h3 style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '1rem', color: '#eeeeee', marginBottom: 8 }}>¿Cancelar pedido?</h3>
            <p style={{ fontFamily: 'Poppins', fontSize: '0.85rem', color: 'rgba(238,238,238,0.4)', marginBottom: 6 }}>{confirmarCancelar.codigo} — {confirmarCancelar.nombre}</p>
            <p style={{ fontFamily: 'Poppins', fontSize: '0.8rem', color: '#f0a93f', marginBottom: 24, background: 'rgba(240,169,63,0.08)', border: '1px solid rgba(240,169,63,0.2)', borderRadius: 4, padding: '8px 12px' }}>⚠️ El stock se restaurará automáticamente.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmarCancelar(null)} disabled={procesando} style={{ flex: 1, padding: '11px', borderRadius: 4, background: 'rgba(238,238,238,0.07)', border: 'none', color: 'rgba(238,238,238,0.5)', fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>Volver</button>
              <button onClick={() => cancelarPedido(confirmarCancelar._id)} disabled={procesando} style={{ flex: 1, padding: '11px', borderRadius: 4, background: '#f0a93f', border: 'none', color: '#272727', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.82rem', cursor: procesando ? 'not-allowed' : 'pointer', opacity: procesando ? 0.6 : 1 }}>
                {procesando ? 'Cancelando...' : 'Sí, cancelar'}
              </button>
            </div>
          </div>
        </>
      )}

      {confirmarEliminar && (
        <>
          <div onClick={() => setConfirmarEliminar(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 102 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', zIndex: 103, transform: 'translate(-50%, -50%)', width: '90%', maxWidth: 400, background: '#272727', borderRadius: 8, border: '1px solid rgba(240,73,63,0.2)', padding: 28, textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', marginBottom: 12 }}>🗑</p>
            <h3 style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '1rem', color: '#eeeeee', marginBottom: 8 }}>¿Eliminar pedido?</h3>
            <p style={{ fontFamily: 'Poppins', fontSize: '0.85rem', color: 'rgba(238,238,238,0.4)', marginBottom: 6 }}>{confirmarEliminar.codigo} — {confirmarEliminar.nombre}</p>
            <p style={{ fontFamily: 'Poppins', fontSize: '0.82rem', color: 'rgba(238,238,238,0.3)', marginBottom: 24 }}>Esta acción es permanente y no se puede deshacer.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmarEliminar(null)} disabled={procesando} style={{ flex: 1, padding: '11px', borderRadius: 4, background: 'rgba(238,238,238,0.07)', border: 'none', color: 'rgba(238,238,238,0.5)', fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={() => eliminarPedido(confirmarEliminar._id)} disabled={procesando} style={{ flex: 1, padding: '11px', borderRadius: 4, background: '#f0493f', border: 'none', color: '#fff', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.82rem', cursor: procesando ? 'not-allowed' : 'pointer', opacity: procesando ? 0.6 : 1 }}>
                {procesando ? 'Eliminando...' : 'Sí, eliminar'}
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        .admin-page-wrapper { padding: clamp(20px, 4vw, 36px) clamp(16px, 4vw, 40px); }
        .pedidos-tabla-desktop { display: block; }
        .pedidos-cards-mobile  { display: none; }
        @media (max-width: 768px) {
          .pedidos-tabla-desktop { display: none; }
          .pedidos-cards-mobile  { display: block; }
        }
      `}</style>
    </AdminLayout>
  );
}