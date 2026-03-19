import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { to: '/admin/dashboard', icon: 'fa-gauge', label: 'Dashboard' },
  { to: '/admin/pedidos', icon: 'fa-bag-shopping', label: 'Pedidos' },
  { to: '/admin/productos', icon: 'fa-jar', label: 'Productos' },
  { to: '/admin/configuracion', icon: 'fa-gear', label: 'Configuración' },
];

export default function AdminLayout({ children }) {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#161616' }}>

      {/* Sidebar */}
      <aside style={{
        width: 240, flexShrink: 0,
        background: '#1a1a1a',
        borderRight: '1px solid rgba(238,238,238,0.06)',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh',
      }}>
        {/* Logo */}
        <div style={{
          padding: '28px 24px 24px',
          borderBottom: '1px solid rgba(238,238,238,0.06)',
        }}>
          <img src="/images/logo.png" alt="Gourmetto"
            style={{ height: 28, objectFit: 'contain' }} />
          <p style={{
            fontFamily: 'Montserrat', fontSize: '0.6rem',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'rgba(238,238,238,0.25)', marginTop: 8,
          }}>Panel Admin</p>
        </div>

        {/* Nav */}
        <div style={{ flex: 1, padding: '16px 12px' }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px', borderRadius: 6, marginBottom: 4,
              textDecoration: 'none', transition: 'all 0.15s',
              background: isActive(link.to) ? 'rgba(240,73,63,0.12)' : 'transparent',
              color: isActive(link.to) ? '#f0493f' : 'rgba(238,238,238,0.5)',
            }}
              onMouseEnter={e => {
                if (!isActive(link.to)) {
                  e.currentTarget.style.background = 'rgba(238,238,238,0.05)';
                  e.currentTarget.style.color = '#eeeeee';
                }
              }}
              onMouseLeave={e => {
                if (!isActive(link.to)) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(238,238,238,0.5)';
                }
              }}
            >
              <i className={`fa-solid ${link.icon}`} style={{ fontSize: '0.9rem', width: 16 }} />
              <span style={{
                fontFamily: 'Montserrat', fontWeight: 600,
                fontSize: '0.82rem', letterSpacing: '0.04em',
              }}>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Footer sidebar */}
        <div style={{
          padding: '16px 12px',
          borderTop: '1px solid rgba(238,238,238,0.06)',
        }}>
          <Link to="/" target="_blank" style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 12px', borderRadius: 6, marginBottom: 4,
            textDecoration: 'none', color: 'rgba(238,238,238,0.35)',
            transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#eeeeee'; e.currentTarget.style.background = 'rgba(238,238,238,0.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(238,238,238,0.35)'; e.currentTarget.style.background = 'transparent'; }}
          >
            <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.85rem', width: 16 }} />
            <span style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.82rem' }}>Ver tienda</span>
          </Link>

          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 12px', borderRadius: 6, width: '100%',
            background: 'transparent', border: 'none',
            color: 'rgba(238,238,238,0.35)', cursor: 'pointer',
            transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f0493f'; e.currentTarget.style.background = 'rgba(240,73,63,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(238,238,238,0.35)'; e.currentTarget.style.background = 'transparent'; }}
          >
            <i className="fa-solid fa-right-from-bracket" style={{ fontSize: '0.85rem', width: 16 }} />
            <span style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.82rem' }}>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main — sin header, contenido directo */}
      <main style={{ flex: 1, overflowY: 'auto', background: '#161616' }}>
        {children}
      </main>
    </div>
  );
}