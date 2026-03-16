import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { login, isAuth } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ user: '', pass: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Si ya está autenticado, redirigir directo
  if (isAuth) {
    navigate('/admin/dashboard');
    return null;
  }

  const handleSubmit = async () => {
    if (!form.user || !form.pass) {
      setError('Completá ambos campos.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600)); // simular delay
    const ok = login(form.user, form.pass);
    setLoading(false);
    if (ok) {
      navigate('/admin/dashboard');
    } else {
      setError('Credenciales incorrectas.');
    }
  };

  return (
    <section style={{
      minHeight: '100vh', background: '#161616',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <img src="/images/logo.png" alt="Gourmetto"
            style={{ height: 36, objectFit: 'contain', marginBottom: 16 }} />
          <p style={{
            fontFamily: 'Montserrat', fontWeight: 700,
            fontSize: '0.65rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(238,238,238,0.3)',
          }}>Panel de administración</p>
        </div>

        {/* Card */}
        <div style={{
          background: '#272727', borderRadius: 8,
          border: '1px solid rgba(238,238,238,0.06)',
          padding: '36px 32px',
        }}>
          <h1 style={{
            fontFamily: 'Montserrat', fontWeight: 900,
            fontSize: '1.6rem', letterSpacing: '-0.03em',
            color: '#eeeeee', marginBottom: 32,
          }}>Iniciar sesión</h1>

          {/* Usuario */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              fontFamily: 'Montserrat', fontWeight: 700,
              fontSize: '0.68rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(238,238,238,0.4)',
              display: 'block', marginBottom: 8,
            }}>Usuario</label>
            <input
              value={form.user}
              onChange={e => { setForm(p => ({ ...p, user: e.target.value })); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="Usuario"
              style={{
                width: '100%', background: '#1e1e1e',
                border: `1px solid ${error ? 'rgba(240,73,63,0.5)' : 'rgba(238,238,238,0.1)'}`,
                borderRadius: 2, padding: '12px 14px',
                fontFamily: 'Poppins', fontSize: '0.9rem',
                color: '#eeeeee', outline: 'none',
                boxSizing: 'border-box', transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(240,73,63,0.5)'}
              onBlur={e => e.target.style.borderColor = error ? 'rgba(240,73,63,0.5)' : 'rgba(238,238,238,0.1)'}
            />
          </div>

          {/* Contraseña */}
          <div style={{ marginBottom: 28 }}>
            <label style={{
              fontFamily: 'Montserrat', fontWeight: 700,
              fontSize: '0.68rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(238,238,238,0.4)',
              display: 'block', marginBottom: 8,
            }}>Contraseña</label>
            <input
              type="password"
              value={form.pass}
              onChange={e => { setForm(p => ({ ...p, pass: e.target.value })); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="••••••••"
              style={{
                width: '100%', background: '#1e1e1e',
                border: `1px solid ${error ? 'rgba(240,73,63,0.5)' : 'rgba(238,238,238,0.1)'}`,
                borderRadius: 2, padding: '12px 14px',
                fontFamily: 'Poppins', fontSize: '0.9rem',
                color: '#eeeeee', outline: 'none',
                boxSizing: 'border-box', transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(240,73,63,0.5)'}
              onBlur={e => e.target.style.borderColor = error ? 'rgba(240,73,63,0.5)' : 'rgba(238,238,238,0.1)'}
            />
          </div>

          {/* Error */}
          {error && (
            <p style={{
              fontFamily: 'Poppins', fontSize: '0.82rem',
              color: '#f0493f', marginBottom: 20, marginTop: -12,
            }}>{error}</p>
          )}

          {/* Botón */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%', background: loading ? '#444' : '#f0493f',
              color: '#fff', border: 'none', padding: '14px',
              borderRadius: 2, fontFamily: 'Montserrat', fontWeight: 700,
              fontSize: '0.85rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (!loading) { e.target.style.background = '#eeeeee'; e.target.style.color = '#272727'; } }}
            onMouseLeave={e => { if (!loading) { e.target.style.background = '#f0493f'; e.target.style.color = '#fff'; } }}
          >
            {loading ? 'Verificando...' : 'Entrar →'}
          </button>
        </div>

        <p style={{
          textAlign: 'center', marginTop: 24,
          fontFamily: 'Montserrat', fontSize: '0.72rem',
          color: 'rgba(238,238,238,0.15)', letterSpacing: '0.05em',
        }}>
          Acceso restringido — solo personal autorizado
        </p>
      </div>
    </section>
  );
}