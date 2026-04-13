import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { to: '/admin/dashboard', icon: 'fa-gauge',      label: 'Dashboard' },
  { to: '/admin/pedidos',   icon: 'fa-bag-shopping', label: 'Pedidos' },
  { to: '/admin/productos', icon: 'fa-jar',         label: 'Productos' },
  { to: '/admin/usuarios',  icon: 'fa-users',       label: 'Usuarios' },
  { to: '/admin/galeria',   icon: 'fa-images',      label: 'Galería' },
  { to: '/admin/configuracion', icon: 'fa-gear',    label: 'Configuración' },
];

export default function AdminLayout({ children }) {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detectar cambio de tamaño
  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setDrawerOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Cerrar drawer al navegar
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Bloquear scroll del body cuando el drawer está abierto
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const isActive = (path) => location.pathname === path;

  // ── Contenido del sidebar (reutilizado en desktop y drawer) ──
  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div style={{
        padding: '28px 24px 24px',
        borderBottom: '1px solid rgba(238,238,238,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <img src="/images/logo.png" alt="Gourmetto"
            style={{ height: 28, objectFit: 'contain' }} />
          <p style={{
            fontFamily: 'Montserrat', fontSize: '0.6rem',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'rgba(238,238,238,0.25)', marginTop: 8,
          }}>Panel Admin</p>
        </div>
        {/* Botón cerrar — solo visible en mobile */}
        {isMobile && (
          <button onClick={() => setDrawerOpen(false)} style={{
            background: 'transparent', border: 'none',
            color: 'rgba(238,238,238,0.4)', fontSize: '1.2rem',
            cursor: 'pointer', padding: 4, lineHeight: 1,
          }}>✕</button>
        )}
      </div>

      {/* Nav links */}
      <div style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
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
    </>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#161616' }}>

      {/* ── DESKTOP: sidebar fijo ── */}
      {!isMobile && (
        <aside style={{
          width: 240, flexShrink: 0,
          background: '#1a1a1a',
          borderRight: '1px solid rgba(238,238,238,0.06)',
          display: 'flex', flexDirection: 'column',
          position: 'sticky', top: 0, height: '100vh',
        }}>
          <SidebarContent />
        </aside>
      )}

      {/* ── MOBILE: overlay + drawer ── */}
      {isMobile && (
        <>
          {/* Overlay */}
          {drawerOpen && (
            <div
              onClick={() => setDrawerOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 200,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(3px)',
                animation: 'fadeInOverlay 0.2s ease',
              }}
            />
          )}

          {/* Drawer */}
          <aside style={{
            position: 'fixed', top: 0, left: 0, zIndex: 201,
            width: 260, height: '100vh',
            background: '#1a1a1a',
            borderRight: '1px solid rgba(238,238,238,0.06)',
            display: 'flex', flexDirection: 'column',
            transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            <SidebarContent />
          </aside>
        </>
      )}

      {/* ── COLUMNA PRINCIPAL ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Topbar mobile */}
        {isMobile && (
          <header style={{
            position: 'sticky', top: 0, zIndex: 100,
            background: '#1a1a1a',
            borderBottom: '1px solid rgba(238,238,238,0.06)',
            padding: '0 16px',
            height: 56,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            {/* Hamburguesa */}
            <button onClick={() => setDrawerOpen(true)} style={{
              background: 'transparent', border: 'none',
              color: 'rgba(238,238,238,0.7)', cursor: 'pointer',
              padding: '8px', borderRadius: 6,
              display: 'flex', flexDirection: 'column', gap: 5,
              transition: 'color 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#eeeeee'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(238,238,238,0.7)'}
            >
              <span style={{ display: 'block', width: 20, height: 2, background: 'currentColor', borderRadius: 2 }} />
              <span style={{ display: 'block', width: 20, height: 2, background: 'currentColor', borderRadius: 2 }} />
              <span style={{ display: 'block', width: 20, height: 2, background: 'currentColor', borderRadius: 2 }} />
            </button>

            {/* Logo centrado */}
            <img src="/images/logo.png" alt="Gourmetto"
              style={{ height: 22, objectFit: 'contain', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} />

            {/* Logout rápido */}
            <button onClick={handleLogout} style={{
              background: 'rgba(240,73,63,0.08)', border: 'none',
              color: '#f0493f', cursor: 'pointer',
              padding: '7px 10px', borderRadius: 6,
              fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.72rem',
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(240,73,63,0.16)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(240,73,63,0.08)'}
            >
              <i className="fa-solid fa-right-from-bracket" style={{ fontSize: '0.8rem' }} />
            </button>
          </header>
        )}

        {/* Contenido de la página */}
        <main style={{ flex: 1, overflowY: 'auto', background: '#161616' }}>
          {children}
        </main>
      </div>

      <style>{`
        @keyframes fadeInOverlay {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
      `}</style>
    </div>
  );
}