import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        background: scrolled ? 'rgba(32,32,32,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(240,73,63,0.15)' : 'none',
        transition: 'all 0.4s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px', height: '72px',
      }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/images/logo.png" alt="Gourmetto" style={{ height: 40, width: 'auto' }} />
        </Link>

        {/* Desktop links */}
        <div className="navbar-desktop">
          {[['/', 'Inicio'], ['/productos', 'Productos'], ['/contacto', 'Contacto']].map(([path, label]) => (
            <Link key={path} to={path} style={{
              color: isActive(path) ? '#f0493f' : '#eeeeee',
              textDecoration: 'none',
              fontSize: '0.9rem', fontWeight: 500,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              paddingBottom: 4,
              borderBottom: isActive(path) ? '2px solid #f0493f' : '2px solid transparent',
              transition: 'all 0.2s', fontFamily: 'Montserrat',
            }}>
              {label}
            </Link>
          ))}
        </div>

        {/* Right: carrito + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>

          {/* Ícono carrito */}
          <Link to="/carrito" style={{ textDecoration: 'none', position: 'relative', display: 'flex', alignItems: 'center' }}
            className="cart-icon-wrapper">
            <i className="fa-solid fa-bag-shopping" style={{ color: '#eeeeee', fontSize: '1.2rem', transition: 'color 0.2s' }} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute', top: -8, right: -8,
                background: '#f0493f', color: '#fff',
                borderRadius: '50%', width: 18, height: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.65rem', fontWeight: 700, fontFamily: 'Montserrat',
              }}>
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>

          {/* CTA */}
          <Link to="/productos" style={{ textDecoration: 'none' }} className="navbar-cta-wrapper">
            <button className="navbar-cta">Pedir ahora</button>
          </Link>
        </div>

        {/* Mobile toggler */}
        <button className="navbar-toggler" onClick={() => setIsOpen(!isOpen)}>
          <span style={{ transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', transition: 'all 0.3s' }} />
          <span style={{ opacity: isOpen ? 0 : 1, transition: 'all 0.3s' }} />
          <span style={{ transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none', transition: 'all 0.3s' }} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className="navbar-mobile-menu" style={{ right: isOpen ? 0 : '-100%' }}>
        <div style={{ padding: '100px 40px 40px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[['/', 'Inicio'], ['/productos', 'Productos'], ['/contacto', 'Contacto']].map(([path, label]) => (
            <Link key={path} to={path} onClick={() => setIsOpen(false)} style={{
              color: isActive(path) ? '#f0493f' : '#eeeeee',
              textDecoration: 'none', fontFamily: 'Montserrat', fontWeight: 700,
              fontSize: '2rem', letterSpacing: '-0.02em',
              borderBottom: '1px solid rgba(238,238,238,0.07)',
              paddingBottom: 20, paddingTop: 12, transition: 'color 0.2s',
            }}>
              {label}
            </Link>
          ))}

          {/* Carrito mobile */}
          <Link to="/carrito" onClick={() => setIsOpen(false)} style={{
            color: '#eeeeee', textDecoration: 'none', fontFamily: 'Montserrat',
            fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.02em',
            borderBottom: '1px solid rgba(238,238,238,0.07)',
            paddingBottom: 20, paddingTop: 12,
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            Carrito
            {totalItems > 0 && (
              <span style={{
                background: '#f0493f', color: '#fff', borderRadius: '50%',
                width: 28, height: 28, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700,
              }}>
                {totalItems}
              </span>
            )}
          </Link>

          <div style={{ marginTop: 32, display: 'flex', gap: 16 }}>
            <a href="https://instagram.com/gourmetto.cr" target="_blank" rel="noreferrer" style={{ color: '#f0493f', fontSize: '1.5rem' }}><i className="fa-brands fa-instagram" /></a>
            <a href="https://www.facebook.com/profile.php?id=61558109290511" target="_blank" rel="noreferrer" style={{ color: '#f0493f', fontSize: '1.5rem' }}><i className="fa-brands fa-facebook" /></a>
            <a href="https://wa.me/50663818443" target="_blank" rel="noreferrer" style={{ color: '#f0493f', fontSize: '1.5rem' }}><i className="fa-brands fa-whatsapp" /></a>
          </div>
        </div>
      </div>

      <style>{`
        .navbar-desktop { display: flex; align-items: center; gap: 40px; }
        .cart-icon-wrapper:hover i { color: #f0493f !important; }
        .navbar-cta {
          background: #f0493f; color: #fff; border: none;
          padding: 10px 24px; border-radius: 4px;
          font-family: Montserrat; font-weight: 700;
          font-size: 0.8rem; letter-spacing: 0.08em;
          text-transform: uppercase; cursor: pointer; transition: all 0.2s;
        }
        .navbar-cta:hover { background: #272727; }
        .navbar-toggler {
          display: none; flex-direction: column; gap: 5px;
          background: transparent; border: none;
          cursor: pointer; padding: 4px; z-index: 60;
        }
        .navbar-toggler span {
          display: block; width: 28px; height: 2px;
          background: #eeeeee; border-radius: 2px;
        }
        .navbar-mobile-menu {
          display: none; position: fixed; top: 0;
          width: 100%; height: 100vh;
          background: rgba(32,32,32,0.98);
          backdrop-filter: blur(16px);
          z-index: 40;
          transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (max-width: 768px) {
          .navbar-desktop { display: none !important; }
          .navbar-cta-wrapper { display: none !important; }
          .navbar-toggler { display: flex !important; }
          .navbar-mobile-menu { display: block; }
          nav { padding: 0 24px !important; }
        }
      `}</style>
    </>
  );
}

export default Navbar;