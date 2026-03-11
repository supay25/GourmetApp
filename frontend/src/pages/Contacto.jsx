export default function Contacto() {
  return (
    <section style={{
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#202020',
    }}>
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/images/headers/desktop/home-banner - 2.png')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.2,
      }} />

      {/* Large BG text */}
      <p style={{
        position: 'absolute', bottom: -20, left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'Montserrat', fontWeight: 900,
        fontSize: 'clamp(5rem, 14vw, 14rem)',
        letterSpacing: '-0.06em', whiteSpace: 'nowrap',
        color: 'rgba(238,238,238,0.03)',
        userSelect: 'none', pointerEvents: 'none',
        lineHeight: 1,
      }}>
        GOURMETTO
      </p>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 680, padding: '120px 48px 80px', textAlign: 'center' }}>
        <img src="/images/isotipo-blanco.png" alt="Gourmetto"
          style={{ width: 72, marginBottom: 40, opacity: 0.9 }} />

        <p style={{
          fontFamily: 'Montserrat', fontWeight: 700,
          fontSize: '0.7rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: '#f0493f', marginBottom: 20,
        }}>✦ Redes sociales</p>

        <h1 style={{
          fontFamily: 'Montserrat', fontWeight: 900,
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          letterSpacing: '-0.04em', lineHeight: 1.0,
          color: '#eeeeee', marginBottom: 24,
        }}>
          SÍGUENOS EN<br /><span style={{ color: '#f0493f' }}>NUESTRAS REDES</span>
        </h1>

        <div style={{ width: 40, height: 2, background: '#f0493f', margin: '0 auto 32px' }} />

        <p style={{
          fontFamily: 'Poppins', fontWeight: 300,
          fontSize: '1rem', lineHeight: 1.8,
          color: 'rgba(238,238,238,0.6)', marginBottom: 8,
        }}>
          Síguenos en todas nuestras redes para que no te pierdas ninguna novedad.
        </p>
        <p style={{
          fontFamily: 'Poppins', fontWeight: 300,
          fontSize: '1rem', lineHeight: 1.8,
          color: 'rgba(238,238,238,0.6)', marginBottom: 56,
        }}>
          Así estarás al tanto de cada nuevo producto que anunciamos.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Instagram', icon: 'fa-instagram', url: 'https://instagram.com/gourmetto.cr' },
            { label: 'Facebook', icon: 'fa-facebook', url: 'https://www.facebook.com/profile.php?id=61558109290511' },
            { label: 'WhatsApp', icon: 'fa-whatsapp', url: 'https://wa.me/50663818443?text=%C2%A1Hola,%20Quiero%20informaci%C3%B3n%20acerca%20de%20Gourmetto!' },
          ].map(({ label, icon, url }) => (
            <button key={label} onClick={() => window.open(url, '_blank')} style={{
              background: 'transparent',
              color: '#eeeeee',
              border: '1px solid rgba(238,238,238,0.2)',
              padding: '16px 32px',
              fontFamily: 'Montserrat', fontWeight: 600,
              fontSize: '0.85rem', letterSpacing: '0.08em',
              textTransform: 'uppercase', cursor: 'pointer',
              borderRadius: 2, transition: 'all 0.25s',
              display: 'flex', alignItems: 'center', gap: 10,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f0493f'; e.currentTarget.style.borderColor = '#f0493f'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(238,238,238,0.2)'; }}
            >
              <i className={`fa-brands ${icon}`} style={{ fontSize: '1.1rem' }}></i>
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
