import { useState } from 'react';
import AdminLayout from './AdminLayout';

export default function AdminConfiguracion() {
  const [form, setForm] = useState({
    nombreNegocio: 'Gourmetto',
    sinpeNumero: '6381-8443',
    email: 'gourmettocr@gmail.com',
    whatsapp: '+506 6381-8443',
    direccion: 'Nicoya, Costa Rica',
    instagram: 'https://instagram.com/gourmetto.cr',
    facebook: 'https://www.facebook.com/profile.php?id=61558109290511',
  });
  const [guardado, setGuardado] = useState(false);

  const handleChange = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
    setGuardado(false);
  };

  const guardar = () => {
    console.log('Config a guardar:', form);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  const campos = [
    { section: 'Negocio', fields: [
      { key: 'nombreNegocio', label: 'Nombre del negocio' },
      { key: 'direccion',     label: 'Dirección' },
    ]},
    { section: 'Pago', fields: [
      { key: 'sinpeNumero', label: 'Número Sinpe Móvil' },
    ]},
    { section: 'Contacto', fields: [
      { key: 'email',    label: 'Email' },
      { key: 'whatsapp', label: 'WhatsApp' },
    ]},
    { section: 'Redes sociales', fields: [
      { key: 'instagram', label: 'Instagram URL' },
      { key: 'facebook',  label: 'Facebook URL' },
    ]},
  ];

  return (
    <AdminLayout>
      <div className="admin-page-wrapper" style={{ maxWidth: 680 }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <p style={{
            fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem',
            letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f0493f', marginBottom: 8,
          }}>✦ Sistema</p>
          <h1 style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', letterSpacing: '-0.03em', color: '#eeeeee' }}>
            Configuración
          </h1>
        </div>

        {campos.map(({ section, fields }) => (
          <div key={section} style={{
            background: '#272727', borderRadius: 8,
            border: '1px solid rgba(238,238,238,0.06)',
            padding: 'clamp(18px, 3vw, 24px)', marginBottom: 16,
          }}>
            <p style={{
              fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.68rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'rgba(238,238,238,0.3)', marginBottom: 18,
            }}>{section}</p>
            {fields.map(({ key, label }) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={{
                  fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.68rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'rgba(238,238,238,0.45)', display: 'block', marginBottom: 8,
                }}>{label}</label>
                <input
                  value={form[key]}
                  onChange={e => handleChange(key, e.target.value)}
                  style={{
                    width: '100%', background: '#1e1e1e',
                    border: '1px solid rgba(238,238,238,0.1)', borderRadius: 4,
                    padding: '11px 14px', fontFamily: 'Poppins', fontSize: '0.9rem',
                    color: '#eeeeee', outline: 'none', boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(240,73,63,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(238,238,238,0.1)'}
                />
              </div>
            ))}
          </div>
        ))}

        {/* Botón guardar */}
        <button onClick={guardar} style={{
          background: guardado ? '#3fd68a' : '#f0493f',
          color: '#fff', border: 'none', padding: '14px 32px',
          borderRadius: 6, fontFamily: 'Montserrat', fontWeight: 700,
          fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase',
          cursor: 'pointer', transition: 'all 0.2s',
          display: 'flex', alignItems: 'center', gap: 8,
          width: '100%', justifyContent: 'center',
        }}>
          <i className={`fa-solid ${guardado ? 'fa-circle-check' : 'fa-floppy-disk'}`} />
          {guardado ? '¡Guardado!' : 'Guardar cambios'}
        </button>

        <p style={{ fontFamily: 'Poppins', fontSize: '0.78rem', color: 'rgba(238,238,238,0.2)', marginTop: 16 }}>
          Los cambios se guardarán en la base de datos cuando el backend esté conectado.
        </p>
      </div>

      <style>{`
        .admin-page-wrapper { padding: clamp(20px, 4vw, 36px) clamp(16px, 4vw, 40px); }
      `}</style>
    </AdminLayout>
  );
}