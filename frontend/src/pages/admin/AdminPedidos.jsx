import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';

const estadoConfig = {
  'pendiente': { bg: 'rgba(240,169,63,0.12)', color: '#f0a93f' },
  'confirmado': { bg: 'rgba(63,214,138,0.12)', color: '#3fd68a' },
  'entregado': { bg: 'rgba(238,238,238,0.08)', color: 'rgba(238,238,238,0.4)' },
};

const filtros = ['Todos', 'pendiente', 'confirmado', 'entregado'];

export default function AdminPedidos() {
  const [filtro, setFiltro] = useState('Todos');
  const [detalle, setDetalle] = useState(null);
  const [pedidos, setPedidos] = useState([]);

  const pedidosFiltrados = filtro === 'Todos'
    ? pedidos
    : pedidos.filter(p => p.estado === filtro);

  useEffect(() => {
    listaPedidos()
  }, [])

  const listaPedidos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/pedidos", {
        method: "GET"
      });
      const data = await respuesta.json();
      setPedidos(data)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await fetch(`http://localhost:3000/api/pedidos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado })
      });
      await listaPedidos()
      if (detalle?._id === id) setDetalle(prev => ({ ...prev, estado: nuevoEstado }));
    } catch (error) {
      console.error("Error:", error)
    }
  };

  return (
    <AdminLayout>
      <div style={{ padding: '36px 40px' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{
            fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem',
            letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f0493f', marginBottom: 8,
          }}>✦ Gestión</p>
          <h1 style={{
            fontFamily: 'Montserrat', fontWeight: 900,
            fontSize: '1.8rem', letterSpacing: '-0.03em', color: '#eeeeee',
          }}>Pedidos</h1>
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {filtros.map(f => (
            <button key={f} onClick={() => setFiltro(f)} style={{
              padding: '7px 16px', borderRadius: 6, border: 'none',
              fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.78rem',
              cursor: 'pointer', transition: 'all 0.15s',
              background: filtro === f ? '#f0493f' : 'rgba(238,238,238,0.07)',
              color: filtro === f ? '#fff' : 'rgba(238,238,238,0.5)',
              textTransform: 'capitalize'
            }}>{f}</button>
          ))}
        </div>

        {/* Tabla */}
        <div style={{ background: '#272727', borderRadius: 8, border: '1px solid rgba(238,238,238,0.06)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(238,238,238,0.06)' }}>
                {['Pedido', 'Cliente', 'Total', 'Estado', 'Fecha', 'Acciones'].map(h => (
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
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(238,238,238,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '14px 20px', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.85rem', color: '#f0493f' }}>{p.codigo}</td>
                  <td style={{ padding: '14px 20px', fontFamily: 'Poppins', fontSize: '0.85rem', color: '#eeeeee' }}>{p.nombre}</td>
                  <td style={{ padding: '14px 20px', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.85rem', color: '#eeeeee' }}>₡{p.total.toLocaleString()}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.72rem',
                      padding: '4px 10px', borderRadius: 4,
                      background: estadoConfig[p.estado]?.bg || 'rgba(238,238,238,0.08)',
                      color: estadoConfig[p.estado]?.color || 'rgba(238,238,238,0.4)',
                      textTransform: 'capitalize'
                    }}>{p.estado}</span>
                  </td>
                  <td style={{ padding: '14px 20px', fontFamily: 'Poppins', fontSize: '0.82rem', color: 'rgba(238,238,238,0.4)' }}>
                    {new Date(p.fecha).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <button onClick={() => setDetalle(p)} style={{
                      background: 'rgba(238,238,238,0.07)', border: 'none',
                      color: 'rgba(238,238,238,0.6)', padding: '6px 14px',
                      borderRadius: 4, fontFamily: 'Montserrat', fontWeight: 600,
                      fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.15s',
                    }}
                      onMouseEnter={e => { e.target.style.background = 'rgba(240,73,63,0.12)'; e.target.style.color = '#f0493f'; }}
                      onMouseLeave={e => { e.target.style.background = 'rgba(238,238,238,0.07)'; e.target.style.color = 'rgba(238,238,238,0.6)'; }}
                    >Ver detalle</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal detalle */}
      {detalle && (
        <>
          <div onClick={() => setDetalle(null)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)', zIndex: 100,
          }} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%', zIndex: 101,
            transform: 'translate(-50%, -50%)',
            width: '90%', maxWidth: 520,
            background: '#272727', borderRadius: 8,
            border: '1px solid rgba(238,238,238,0.08)',
            padding: 32, maxHeight: '85vh', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <p style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '1.1rem', color: '#f0493f', marginBottom: 4 }}>{detalle.codigo}</p>
                <p style={{ fontFamily: 'Poppins', fontSize: '0.82rem', color: 'rgba(238,238,238,0.4)' }}>
                  {new Date(detalle.fecha).toLocaleDateString()}
                </p>
              </div>
              <button onClick={() => setDetalle(null)} style={{
                background: 'transparent', border: 'none', color: 'rgba(238,238,238,0.3)',
                fontSize: '1.2rem', cursor: 'pointer',
              }}>✕</button>
            </div>

            {/* Cliente */}
            <div style={{ background: '#1e1e1e', borderRadius: 6, padding: '16px 20px', marginBottom: 16 }}>
              <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(238,238,238,0.3)', marginBottom: 12 }}>Cliente</p>
              <p style={{ fontFamily: 'Poppins', fontSize: '0.9rem', color: '#eeeeee', marginBottom: 4 }}>{detalle.nombre}</p>
              <p style={{ fontFamily: 'Poppins', fontSize: '0.82rem', color: 'rgba(238,238,238,0.4)', marginBottom: 4 }}>{detalle.numero}</p>
              <p style={{ fontFamily: 'Poppins', fontSize: '0.82rem', color: 'rgba(238,238,238,0.4)' }}>{detalle.direccion}</p>
            </div>

            {/* Items */}
            <div style={{ background: '#1e1e1e', borderRadius: 6, padding: '16px 20px', marginBottom: 16 }}>
              <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(238,238,238,0.3)', marginBottom: 12 }}>Productos</p>
              {detalle.lista.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i < detalle.lista.length - 1 ? 10 : 0 }}>
                  <span style={{ fontFamily: 'Poppins', fontSize: '0.88rem', color: 'rgba(238,238,238,0.7)' }}>
                    {item.nombre} <span style={{ color: 'rgba(238,238,238,0.35)' }}>x{item.cantidad}</span>
                  </span>
                  <span style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.88rem', color: '#eeeeee' }}>
                    ₡{item.precio.toLocaleString()}
                  </span>
                </div>
              ))}
              <div style={{ height: 1, background: 'rgba(238,238,238,0.07)', margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'Montserrat', fontWeight: 700, color: '#eeeeee' }}>Total</span>
                <span style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '1.1rem', color: '#f0493f' }}>
                  ₡{detalle.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Cambiar estado */}
            <div>
              <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(238,238,238,0.3)', marginBottom: 12 }}>Estado del pedido</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {['pendiente', 'confirmado', 'entregado'].map(estado => (
                  <button key={estado} onClick={() => cambiarEstado(detalle._id, estado)} style={{
                    flex: 1, padding: '10px', borderRadius: 4,
                    border: `1px solid ${detalle.estado === estado ? estadoConfig[estado].color : 'rgba(238,238,238,0.08)'}`,
                    background: detalle.estado === estado ? estadoConfig[estado].bg : 'transparent',
                    color: detalle.estado === estado ? estadoConfig[estado].color : 'rgba(238,238,238,0.4)',
                    fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.75rem',
                    cursor: 'pointer', transition: 'all 0.15s', textTransform: 'capitalize'
                  }}>{estado}</button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}