import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { useAuth } from '../../context/AuthContext';

const API = import.meta.env.VITE_API_URL;

const roleConfig = {
  admin:   { bg: 'rgba(240,73,63,0.12)',  color: '#f0493f' },
  cliente: { bg: 'rgba(63,169,240,0.12)', color: '#3fa9f0' },
};

const emptyForm = { fullName: '', username: '', email: '', identification: '', passwordHash: '', role: 'admin' };

export default function AdminUsuarios() {
  const { token } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [confirmarEliminar, setConfirmarEliminar] = useState(null);

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/users`, { headers });
      if (!res.ok) throw new Error('Error al cargar usuarios');
      const data = await res.json();
      setUsuarios(data);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsuarios(); }, []);

  const abrirCrear = () => { setForm(emptyForm); setFormError(''); setModal('crear'); };

  const abrirEditar = (u) => {
    setForm({ fullName: u.fullName, username: u.username || '', email: u.email, identification: u.identification, passwordHash: '', role: u.role || 'admin' });
    setFormError(''); setModal(u);
  };

  const guardar = async () => {
    if (!form.fullName || !form.email || !form.identification || !form.username) {
      setFormError('Nombre, usuario, email e identificación son requeridos.'); return;
    }
    if (modal === 'crear' && !form.passwordHash) {
      setFormError('La contraseña es requerida al crear un usuario.'); return;
    }
    setSaving(true); setFormError('');
    try {
      if (modal === 'crear') {
        const res = await fetch(`${API}/api/users`, { method: 'POST', headers, body: JSON.stringify(form) });
        if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Error al crear usuario'); }
      } else {
        const body = { ...form };
        if (!body.passwordHash) delete body.passwordHash;
        const res = await fetch(`${API}/api/users/${modal._id}`, { method: 'PUT', headers, body: JSON.stringify(body) });
        if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Error al actualizar usuario'); }
      }
      await fetchUsuarios(); setModal(null);
    } catch (e) { setFormError(e.message); }
    finally { setSaving(false); }
  };

  const eliminar = async (id) => {
    try {
      await fetch(`${API}/api/users/${id}`, { method: 'DELETE', headers });
      await fetchUsuarios(); setConfirmarEliminar(null);
    } catch (e) { setError(e.message); }
  };

  const inputStyle = {
    width: '100%', background: '#1e1e1e',
    border: '1px solid rgba(238,238,238,0.1)', borderRadius: 4,
    padding: '10px 12px', fontFamily: 'Poppins', fontSize: '0.88rem',
    color: '#eeeeee', outline: 'none', boxSizing: 'border-box',
  };

  return (
    <AdminLayout>
      <div className="admin-page-wrapper">

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, gap: 12 }}>
          <div>
            <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f0493f', marginBottom: 8 }}>✦ Sistema</p>
            <h1 style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', letterSpacing: '-0.03em', color: '#eeeeee' }}>Usuarios</h1>
          </div>
          <button onClick={abrirCrear} style={{
            background: '#f0493f', color: '#fff', border: 'none',
            padding: '10px 16px', borderRadius: 6, fontFamily: 'Montserrat',
            fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.06em',
            cursor: 'pointer', transition: 'all 0.15s',
            display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#eeeeee'; e.currentTarget.style.color = '#272727'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f0493f'; e.currentTarget.style.color = '#fff'; }}
          >
            <i className="fa-solid fa-plus" />
            <span className="btn-label-desktop">Nuevo usuario</span>
            <span className="btn-label-mobile">Nuevo</span>
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(240,73,63,0.1)', border: '1px solid rgba(240,73,63,0.3)', borderRadius: 6, padding: '12px 16px', marginBottom: 24, fontFamily: 'Poppins', fontSize: '0.85rem', color: '#f0493f' }}>{error}</div>
        )}

        {/* Tabla desktop / Cards mobile */}
        <div style={{ background: '#272727', borderRadius: 8, border: '1px solid rgba(238,238,238,0.06)', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: 48, textAlign: 'center', fontFamily: 'Poppins', color: 'rgba(238,238,238,0.3)', fontSize: '0.9rem' }}>Cargando usuarios...</div>
          ) : usuarios.length === 0 ? (
            <div style={{ padding: 48, textAlign: 'center' }}>
              <p style={{ fontSize: '2rem', marginBottom: 12 }}>👤</p>
              <p style={{ fontFamily: 'Montserrat', fontWeight: 700, color: '#eeeeee', marginBottom: 8 }}>No hay usuarios todavía</p>
              <p style={{ fontFamily: 'Poppins', fontSize: '0.85rem', color: 'rgba(238,238,238,0.35)' }}>Creá el primer usuario con el botón de arriba.</p>
            </div>
          ) : (
            <>
              {/* Desktop — tabla */}
              <div className="usuarios-tabla-desktop">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(238,238,238,0.06)' }}>
                      {['Nombre', 'Usuario', 'Email', 'Identificación', 'Rol', 'Acciones'].map(h => (
                        <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontFamily: 'Montserrat', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(238,238,238,0.3)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((u, i) => (
                      <tr key={u._id} style={{ borderBottom: i < usuarios.length - 1 ? '1px solid rgba(238,238,238,0.04)' : 'none', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(238,238,238,0.03)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={{ padding: '14px 20px', fontFamily: 'Poppins', fontSize: '0.88rem', color: '#eeeeee' }}>{u.fullName}</td>
                        <td style={{ padding: '14px 20px', fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.85rem', color: '#f0493f' }}>@{u.username || '—'}</td>
                        <td style={{ padding: '14px 20px', fontFamily: 'Poppins', fontSize: '0.85rem', color: 'rgba(238,238,238,0.6)' }}>{u.email}</td>
                        <td style={{ padding: '14px 20px', fontFamily: 'Poppins', fontSize: '0.85rem', color: 'rgba(238,238,238,0.6)' }}>{u.identification}</td>
                        <td style={{ padding: '14px 20px' }}>
                          <span style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.72rem', padding: '4px 10px', borderRadius: 4, background: roleConfig[u.role || 'admin']?.bg || roleConfig.admin.bg, color: roleConfig[u.role || 'admin']?.color || roleConfig.admin.color }}>{u.role || 'admin'}</span>
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => abrirEditar(u)} style={{ background: 'rgba(238,238,238,0.07)', border: 'none', color: 'rgba(238,238,238,0.6)', padding: '6px 14px', borderRadius: 4, fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 6 }}
                              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(238,238,238,0.12)'; e.currentTarget.style.color = '#eeeeee'; }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(238,238,238,0.07)'; e.currentTarget.style.color = 'rgba(238,238,238,0.6)'; }}
                            >
                              <i className="fa-solid fa-pen" style={{ fontSize: '0.75rem' }} /> Editar
                            </button>
                            <button onClick={() => setConfirmarEliminar(u)} style={{ background: 'rgba(240,73,63,0.08)', border: 'none', color: '#f0493f', padding: '6px 14px', borderRadius: 4, fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 6 }}
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
              <div className="usuarios-cards-mobile">
                {usuarios.map((u, i) => (
                  <div key={u._id} style={{ padding: '16px', borderBottom: i < usuarios.length - 1 ? '1px solid rgba(238,238,238,0.06)' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <div>
                        <p style={{ fontFamily: 'Poppins', fontSize: '0.9rem', color: '#eeeeee', marginBottom: 2 }}>{u.fullName}</p>
                        <p style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.8rem', color: '#f0493f' }}>@{u.username || '—'}</p>
                      </div>
                      <span style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.68rem', padding: '3px 10px', borderRadius: 4, background: roleConfig[u.role || 'admin']?.bg || roleConfig.admin.bg, color: roleConfig[u.role || 'admin']?.color || roleConfig.admin.color }}>{u.role || 'admin'}</span>
                    </div>
                    <p style={{ fontFamily: 'Poppins', fontSize: '0.8rem', color: 'rgba(238,238,238,0.45)', marginBottom: 2 }}>{u.email}</p>
                    <p style={{ fontFamily: 'Poppins', fontSize: '0.78rem', color: 'rgba(238,238,238,0.3)', marginBottom: 12 }}>{u.identification}</p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => abrirEditar(u)} style={{ flex: 1, padding: '9px', borderRadius: 4, border: 'none', background: 'rgba(238,238,238,0.07)', color: 'rgba(238,238,238,0.7)', fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <i className="fa-solid fa-pen" /> Editar
                      </button>
                      <button onClick={() => setConfirmarEliminar(u)} style={{ padding: '9px 14px', borderRadius: 4, border: 'none', background: 'rgba(240,73,63,0.08)', color: '#f0493f', fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <i className="fa-solid fa-trash" /> Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal crear/editar */}
      {modal && (
        <>
          <div onClick={() => setModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100 }} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%', zIndex: 101,
            transform: 'translate(-50%, -50%)',
            width: '94%', maxWidth: 480,
            background: '#272727', borderRadius: 8,
            border: '1px solid rgba(238,238,238,0.08)',
            padding: 'clamp(20px, 4vw, 32px)', maxHeight: '88vh', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '1.1rem', color: '#eeeeee' }}>
                {modal === 'crear' ? 'Nuevo usuario' : 'Editar usuario'}
              </h2>
              <button onClick={() => setModal(null)} style={{ background: 'transparent', border: 'none', color: 'rgba(238,238,238,0.3)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>

            {[
              { key: 'fullName', label: 'Nombre completo', placeholder: 'Ej: María García' },
              { key: 'username', label: 'Usuario', placeholder: 'Ej: maria.garcia' },
              { key: 'email', label: 'Email', placeholder: 'Ej: maria@correo.com', type: 'email' },
              { key: 'identification', label: 'Identificación', placeholder: 'Ej: 1-1234-5678' },
              { key: 'passwordHash', label: modal === 'crear' ? 'Contraseña' : 'Nueva contraseña (dejar vacío para no cambiar)', placeholder: '••••••••', type: 'password' },
            ].map(({ key, label, placeholder, type = 'text' }) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(238,238,238,0.4)', display: 'block', marginBottom: 8 }}>{label}</label>
                <input type={type} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} placeholder={placeholder}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(240,73,63,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(238,238,238,0.1)'} />
              </div>
            ))}

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(238,238,238,0.4)', display: 'block', marginBottom: 8 }}>Rol</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {['admin', 'cliente'].map(r => (
                  <button key={r} onClick={() => setForm(p => ({ ...p, role: r }))} style={{
                    flex: 1, padding: '10px', borderRadius: 4, cursor: 'pointer', textTransform: 'capitalize',
                    border: `1px solid ${form.role === r ? roleConfig[r].color : 'rgba(238,238,238,0.08)'}`,
                    background: form.role === r ? roleConfig[r].bg : 'transparent',
                    color: form.role === r ? roleConfig[r].color : 'rgba(238,238,238,0.4)',
                    fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.82rem', transition: 'all 0.15s',
                  }}>{r}</button>
                ))}
              </div>
            </div>

            {formError && <p style={{ fontFamily: 'Poppins', fontSize: '0.82rem', color: '#f0493f', marginBottom: 16 }}>{formError}</p>}

            <button onClick={guardar} disabled={saving} style={{
              width: '100%', background: saving ? '#444' : '#f0493f', color: '#fff',
              border: 'none', padding: '13px', borderRadius: 4,
              fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.85rem',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              cursor: saving ? 'not-allowed' : 'pointer', transition: 'all 0.15s',
            }}
              onMouseEnter={e => { if (!saving) { e.target.style.background = '#eeeeee'; e.target.style.color = '#272727'; } }}
              onMouseLeave={e => { if (!saving) { e.target.style.background = '#f0493f'; e.target.style.color = '#fff'; } }}
            >
              {saving ? 'Guardando...' : modal === 'crear' ? 'Crear usuario' : 'Guardar cambios'}
            </button>
          </div>
        </>
      )}

      {/* Confirmar eliminar */}
      {confirmarEliminar && (
        <>
          <div onClick={() => setConfirmarEliminar(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', zIndex: 101, transform: 'translate(-50%, -50%)', width: '90%', maxWidth: 380, background: '#272727', borderRadius: 8, border: '1px solid rgba(240,73,63,0.2)', padding: 28, textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', marginBottom: 12 }}>🗑</p>
            <h3 style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '1rem', color: '#eeeeee', marginBottom: 8 }}>¿Eliminar usuario?</h3>
            <p style={{ fontFamily: 'Poppins', fontSize: '0.85rem', color: 'rgba(238,238,238,0.4)', marginBottom: 8 }}>{confirmarEliminar.fullName}</p>
            <p style={{ fontFamily: 'Poppins', fontSize: '0.82rem', color: 'rgba(238,238,238,0.3)', marginBottom: 24 }}>Esta acción no se puede deshacer.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmarEliminar(null)} style={{ flex: 1, padding: '11px', borderRadius: 4, background: 'rgba(238,238,238,0.07)', border: 'none', color: 'rgba(238,238,238,0.5)', fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={() => eliminar(confirmarEliminar._id)} style={{ flex: 1, padding: '11px', borderRadius: 4, background: '#f0493f', border: 'none', color: '#fff', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>Eliminar</button>
            </div>
          </div>
        </>
      )}

      <style>{`
        .admin-page-wrapper { padding: clamp(20px, 4vw, 36px) clamp(16px, 4vw, 40px); }
        .usuarios-tabla-desktop { display: block; }
        .usuarios-cards-mobile  { display: none; }
        .btn-label-mobile  { display: none; }
        .btn-label-desktop { display: inline; }
        @media (max-width: 768px) {
          .usuarios-tabla-desktop { display: none; }
          .usuarios-cards-mobile  { display: block; }
          .btn-label-mobile  { display: inline; }
          .btn-label-desktop { display: none; }
        }
      `}</style>
    </AdminLayout>
  );
}