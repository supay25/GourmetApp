import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { loginWithBackend, isAuth } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuth) navigate('/admin/dashboard');
  }, [isAuth, navigate]);

  const handleSubmit = async () => {
    if (!form.identifier || !form.password) {
      setError('Completá ambos campos.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await loginWithBackend(form.identifier, form.password);
      navigate('/admin/dashboard');
    } catch {
      setError('Credenciales incorrectas.');
    } finally {
      setLoading(false);
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
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
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
          padding: 'clamp(24px, 6vw, 36px) clamp(20px, 6vw, 32px)',
        }}>
          <h1 style={{
            fontFamily: 'Montserrat', fontWeight: 900,
            fontSize: 'clamp(1.3rem, 5vw, 1.6rem)', letterSpacing: '-0.03em',
            color: '#eeeeee', marginBottom: 28,
          }}>Iniciar sesión</h1>

          {/* Usuario o email */}
          <div style={{ marginBottom: 18 }}>
            <label style={{
              fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.68rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(238,238,238,0.4)', display: 'block', marginBottom: 8,
            }}>Usuario o email</label>
            <input
              value={form.identifier}
              onChange={e => { setForm(p => ({ ...p, identifier: e.target.value })); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="Ej: marcelo o admin@gourmetto.com"
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
          <div style={{ marginBottom: error ? 12 : 24 }}>
            <label style={{
              fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.68rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(238,238,238,0.4)', display: 'block', marginBottom: 8,
            }}>Contraseña</label>
            <input
              type="password"
              value={form.password}
              onChange={e => { setForm(p => ({ ...p, password: e.target.value })); setError(''); }}
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

          {error && (
            <p style={{ fontFamily: 'Poppins', fontSize: '0.82rem', color: '#f0493f', marginBottom: 18 }}>{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%', background: loading ? '#444' : '#f0493f',
              color: '#fff', border: 'none', padding: '14px',
              borderRadius: 2, fontFamily: 'Montserrat', fontWeight: 700,
              fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (!loading) { e.target.style.background = '#eeeeee'; e.target.style.color = '#272727'; } }}
            onMouseLeave={e => { if (!loading) { e.target.style.background = '#f0493f'; e.target.style.color = '#fff'; } }}
          >
            {loading ? 'Verificando...' : 'Entrar →'}
          </button>
        </div>

        <p style={{
          textAlign: 'center', marginTop: 20,
          fontFamily: 'Montserrat', fontSize: '0.72rem',
          color: 'rgba(238,238,238,0.15)', letterSpacing: '0.05em',
        }}>
          Acceso restringido — solo personal autorizado
        </p>
      </div>
    </section>
  );
}