import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';

const estadoColor = {
  'pendiente':  { bg: 'rgba(240,169,63,0.12)', color: '#f0a93f' },
  'confirmado': { bg: 'rgba(63,214,138,0.12)',  color: '#3fd68a' },
  'entregado':  { bg: 'rgba(238,238,238,0.08)', color: 'rgba(238,238,238,0.5)' },
};

export default function AdminDashboard() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/pedidos`)
      .then(r => r.json())
      .then(data => setPedidos(data.slice(-4).reverse()))
      .catch(console.error);
  }, []);

  const pendientes    = pedidos.filter(p => p.estado === 'pendiente').length;
  const confirmados   = pedidos.filter(p => p.estado === 'confirmado').length;
  const ventasTotales = pedidos.reduce((sum, p) => sum + p.total, 0);

  const stats = [
    { label: 'Pedidos totales',    value: pedidos.length,                      icon: 'fa-bag-shopping', color: '#f0493f' },
    { label: 'Pendientes de pago', value: pendientes,                          icon: 'fa-clock',        color: '#f0a93f' },
    { label: 'Confirmados',        value: confirmados,                         icon: 'fa-circle-check', color: '#3fd68a' },
    { label: 'Ventas totales',     value: `₡${ventasTotales.toLocaleString()}`, icon: 'fa-coins',        color: '#3fa9f0' },
  ];

  return (
    <AdminLayout>
      <div className="admin-page-wrapper">

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{
            fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem',
            letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f0493f', marginBottom: 8,
          }}>✦ Panel de control</p>
          <h1 style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', letterSpacing: '-0.03em', color: '#eeeeee' }}>
            Dashboard
          </h1>
        </div>

        {/* Stats */}
        <div className="admin-stats-grid">
          {stats.map((s, i) => (
            <div key={i} style={{
              background: '#272727', borderRadius: 8,
              border: '1px solid rgba(238,238,238,0.06)',
              padding: '20px 24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                  background: `${s.color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <i className={`fa-solid ${s.icon}`} style={{ color: s.color, fontSize: '1rem' }} />
                </div>
                <p style={{ fontFamily: 'Poppins', fontSize: '0.82rem', color: 'rgba(238,238,238,0.5)', margin: 0 }}>
                  {s.label}
                </p>
              </div>
              <p style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#eeeeee', lineHeight: 1, margin: 0 }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Pedidos recientes */}
        <div style={{
          background: '#272727', borderRadius: 8,
          border: '1px solid rgba(238,238,238,0.06)',
          marginTop: 28, overflow: 'hidden',
        }}>
          <div style={{
            padding: '18px 24px',
            borderBottom: '1px solid rgba(238,238,238,0.06)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <h2 style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#eeeeee' }}>
              Pedidos recientes
            </h2>
            <a href="/admin/pedidos" style={{ fontFamily: 'Montserrat', fontSize: '0.75rem', color: '#f0493f', textDecoration: 'none', fontWeight: 600 }}>
              Ver todos →
            </a>
          </div>

          {/* Desktop — tabla */}
          <div className="dashboard-tabla-desktop">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(238,238,238,0.06)' }}>
                  {['Pedido', 'Cliente', 'Total', 'Estado', 'Fecha'].map(h => (
                    <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontFamily: 'Montserrat', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(238,238,238,0.3)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pedidos.map((p, i) => (
                  <tr key={p._id} style={{ borderBottom: i < pedidos.length - 1 ? '1px solid rgba(238,238,238,0.04)' : 'none', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(238,238,238,0.03)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '14px 24px', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.85rem', color: '#f0493f' }}>{p.codigo}</td>
                    <td style={{ padding: '14px 24px', fontFamily: 'Poppins', fontSize: '0.85rem', color: '#eeeeee' }}>{p.nombre}</td>
                    <td style={{ padding: '14px 24px', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.85rem', color: '#eeeeee' }}>₡{p.total.toLocaleString()}</td>
                    <td style={{ padding: '14px 24px' }}>
                      <span style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.72rem', padding: '4px 10px', borderRadius: 4, textTransform: 'capitalize', background: estadoColor[p.estado]?.bg || 'rgba(238,238,238,0.08)', color: estadoColor[p.estado]?.color || 'rgba(238,238,238,0.4)' }}>{p.estado}</span>
                    </td>
                    <td style={{ padding: '14px 24px', fontFamily: 'Poppins', fontSize: '0.82rem', color: 'rgba(238,238,238,0.4)' }}>
                      {new Date(p.fecha).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile — cards */}
          <div className="dashboard-cards-mobile">
            {pedidos.map((p, i) => (
              <div key={p._id} style={{ padding: '14px 16px', borderBottom: i < pedidos.length - 1 ? '1px solid rgba(238,238,238,0.06)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.88rem', color: '#f0493f' }}>{p.codigo}</span>
                  <span style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.68rem', padding: '3px 8px', borderRadius: 4, textTransform: 'capitalize', background: estadoColor[p.estado]?.bg || 'rgba(238,238,238,0.08)', color: estadoColor[p.estado]?.color || 'rgba(238,238,238,0.4)' }}>{p.estado}</span>
                </div>
                <p style={{ fontFamily: 'Poppins', fontSize: '0.83rem', color: '#eeeeee', marginBottom: 4 }}>{p.nombre}</p>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.85rem', color: '#eeeeee' }}>₡{p.total.toLocaleString()}</span>
                  <span style={{ fontFamily: 'Poppins', fontSize: '0.75rem', color: 'rgba(238,238,238,0.35)' }}>{new Date(p.fecha).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .admin-page-wrapper { padding: clamp(20px, 4vw, 36px) clamp(16px, 4vw, 40px); }
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .dashboard-tabla-desktop { display: block; }
        .dashboard-cards-mobile  { display: none; }
        @media (max-width: 1100px) { .admin-stats-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .admin-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } }
        @media (max-width: 768px) {
          .dashboard-tabla-desktop { display: none; }
          .dashboard-cards-mobile  { display: block; }
        }
      `}</style>
    </AdminLayout>
  );
}