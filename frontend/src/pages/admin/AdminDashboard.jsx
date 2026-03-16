import AdminLayout from './AdminLayout';

const stats = [
  { label: 'Pedidos hoy', value: '4', icon: 'fa-bag-shopping', color: '#f0493f' },
  { label: 'Pendientes de pago', value: '2', icon: 'fa-clock', color: '#f0a93f' },
  { label: 'Confirmados', value: '1', icon: 'fa-circle-check', color: '#3fd68a' },
  { label: 'Ventas del día', value: '₡10.000', icon: 'fa-colón-sign', color: '#3fa9f0' },
];

const pedidosRecientes = [
  { id: 'GRM-001', cliente: 'María García', total: '₡5.000', estado: 'Pendiente', fecha: '16/03/2026' },
  { id: 'GRM-002', cliente: 'Carlos Vargas', total: '₡2.500', estado: 'Confirmado', fecha: '16/03/2026' },
  { id: 'GRM-003', cliente: 'Sofía Rojas', total: '₡7.500', estado: 'Pendiente', fecha: '15/03/2026' },
  { id: 'GRM-004', cliente: 'Andrés Mora', total: '₡2.500', estado: 'Entregado', fecha: '15/03/2026' },
];

const estadoColor = {
  'Pendiente': { bg: 'rgba(240,169,63,0.12)', color: '#f0a93f' },
  'Confirmado': { bg: 'rgba(63,214,138,0.12)', color: '#3fd68a' },
  'Entregado': { bg: 'rgba(238,238,238,0.08)', color: 'rgba(238,238,238,0.5)' },
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div style={{ padding: '36px 40px' }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <p style={{
            fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#f0493f', marginBottom: 8,
          }}>✦ Panel de control</p>
          <h1 style={{
            fontFamily: 'Montserrat', fontWeight: 900,
            fontSize: '1.8rem', letterSpacing: '-0.03em', color: '#eeeeee',
          }}>Dashboard</h1>
        </div>

        {/* Stats */}
        <div className="admin-stats-grid">
          {stats.map((s, i) => (
            <div key={i} style={{
              background: '#272727', borderRadius: 8,
              border: '1px solid rgba(238,238,238,0.06)',
              padding: '24px', display: 'flex',
              alignItems: 'center', gap: 16,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 8, flexShrink: 0,
                background: `${s.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className={`fa-solid ${s.icon}`} style={{ color: s.color, fontSize: '1.1rem' }} />
              </div>
              <div>
                <p style={{
                  fontFamily: 'Poppins', fontSize: '0.78rem',
                  color: 'rgba(238,238,238,0.4)', marginBottom: 4,
                }}>{s.label}</p>
                <p style={{
                  fontFamily: 'Montserrat', fontWeight: 900,
                  fontSize: '1.5rem', color: '#eeeeee', lineHeight: 1,
                }}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pedidos recientes */}
        <div style={{
          background: '#272727', borderRadius: 8,
          border: '1px solid rgba(238,238,238,0.06)',
          marginTop: 32,
        }}>
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(238,238,238,0.06)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <h2 style={{
              fontFamily: 'Montserrat', fontWeight: 800,
              fontSize: '0.85rem', letterSpacing: '0.06em',
              textTransform: 'uppercase', color: '#eeeeee',
            }}>Pedidos recientes</h2>
            <a href="/admin/pedidos" style={{
              fontFamily: 'Montserrat', fontSize: '0.75rem',
              color: '#f0493f', textDecoration: 'none', fontWeight: 600,
            }}>Ver todos →</a>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(238,238,238,0.06)' }}>
                {['Pedido', 'Cliente', 'Total', 'Estado', 'Fecha'].map(h => (
                  <th key={h} style={{
                    padding: '12px 24px', textAlign: 'left',
                    fontFamily: 'Montserrat', fontSize: '0.68rem',
                    fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'rgba(238,238,238,0.3)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pedidosRecientes.map((p, i) => (
                <tr key={i} style={{
                  borderBottom: i < pedidosRecientes.length - 1 ? '1px solid rgba(238,238,238,0.04)' : 'none',
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(238,238,238,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '14px 24px', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.85rem', color: '#f0493f' }}>{p.id}</td>
                  <td style={{ padding: '14px 24px', fontFamily: 'Poppins', fontSize: '0.85rem', color: '#eeeeee' }}>{p.cliente}</td>
                  <td style={{ padding: '14px 24px', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.85rem', color: '#eeeeee' }}>{p.total}</td>
                  <td style={{ padding: '14px 24px' }}>
                    <span style={{
                      fontFamily: 'Montserrat', fontWeight: 700,
                      fontSize: '0.72rem', letterSpacing: '0.06em',
                      padding: '4px 10px', borderRadius: 4,
                      background: estadoColor[p.estado].bg,
                      color: estadoColor[p.estado].color,
                    }}>{p.estado}</span>
                  </td>
                  <td style={{ padding: '14px 24px', fontFamily: 'Poppins', fontSize: '0.82rem', color: 'rgba(238,238,238,0.4)' }}>{p.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 1100px) {
          .admin-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </AdminLayout>
  );
}