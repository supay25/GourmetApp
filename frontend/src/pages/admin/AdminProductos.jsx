import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useEffect } from 'react';



export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [modal, setModal] = useState(null); // null | 'crear' | producto
  const [form, setForm] = useState({ codigoProducto: '', nombre: '', descripcion: '', precio: '', stock: '', imagen: '' });
  const [confirmarEliminar, setConfirmarEliminar] = useState(null);

  const abrirCrear = () => {
    setForm({ codigoProducto: '', nombre: '', descripcion: '', precio: '', stock: '', imagen: '' });
    setModal('crear');
  };

  const abrirEditar = (p) => {
    setForm({ ...p });
    setModal(p);
  };


  useEffect(() => {
    listaProductos()
  }, [])



  const listaProductos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/productos", {
        method: "GET"
      });
      const data = await respuesta.json();
      setProductos(data)
      console.log(data)

    } catch (error) {
      console.error("Error:", error)
    }
  }





  const guardar = async () => {
    if (!form.nombre) return;

    try {
      if (modal == 'crear') {
        const producto = await fetch("http://localhost:3000/api/productos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        });
        const data = await producto.json();
        console.log(data)
        await listaProductos()
         setModal(null)
      }
      else{
         const producto = await fetch(`http://localhost:3000/api/productos/${modal._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        });
        const data = await producto.json();
        console.log(data)
        
        await listaProductos()
        setModal(null)
      }




    } catch (error) {
      console.error("Error:", error)
    }
  };






  const eliminar = async (id) => {

    try {

      const producto = await fetch(`http://localhost:3000/api/productos/${id}`, {
        method: "DELETE"
      })
      await listaProductos()
      setConfirmarEliminar(null);

    } catch (error) {
      console.error("Error:", error)
    }

  };




  return (
    <AdminLayout>
      <div style={{ padding: '36px 40px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <p style={{
              fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.65rem',
              letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f0493f', marginBottom: 8,
            }}>✦ Catálogo</p>
            <h1 style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '1.8rem', letterSpacing: '-0.03em', color: '#eeeeee' }}>Productos</h1>
          </div>
          <button onClick={abrirCrear} style={{
            background: '#f0493f', color: '#fff', border: 'none',
            padding: '10px 20px', borderRadius: 6,
            fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.8rem',
            letterSpacing: '0.06em', cursor: 'pointer', transition: 'all 0.15s',
            display: 'flex', alignItems: 'center', gap: 8,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#eeeeee'; e.currentTarget.style.color = '#272727'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f0493f'; e.currentTarget.style.color = '#fff'; }}
          >
            <i className="fa-solid fa-plus" /> Nuevo producto
          </button>
        </div>

        {/* Grid productos */}
        <div className="admin-productos-grid">
          {productos.map((p, i) => (
            <div key={i} style={{
              background: '#272727', borderRadius: 8,
              border: '1px solid rgba(238,238,238,0.06)',
              overflow: 'hidden',
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #2a2a2a, #1e1e1e)',
                height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img src={p.photo} alt={p.name} style={{ height: 100, objectFit: 'contain' }} />
              </div>
              <div style={{ padding: '16px' }}>
                <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.9rem', color: '#eeeeee', marginBottom: 4 }}>{p.name}</p>
                <p style={{ fontFamily: 'Montserrat', fontSize: '0.68rem', color: 'rgba(238,238,238,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{p.weight}</p>
                <p style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '1rem', color: '#f0493f', marginBottom: 16 }}>{p.price}</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => abrirEditar(p)} style={{
                    flex: 1, padding: '8px', borderRadius: 4,
                    background: 'rgba(238,238,238,0.07)', border: 'none',
                    color: 'rgba(238,238,238,0.6)', fontFamily: 'Montserrat',
                    fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(238,238,238,0.12)'; e.currentTarget.style.color = '#eeeeee'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(238,238,238,0.07)'; e.currentTarget.style.color = 'rgba(238,238,238,0.6)'; }}
                  >
                    <i className="fa-solid fa-pen" style={{ marginRight: 6 }} />Editar
                  </button>
                  <button onClick={() => setConfirmarEliminar(p._id)} style={{
                    padding: '8px 12px', borderRadius: 4,
                    background: 'rgba(240,73,63,0.08)', border: 'none',
                    color: '#f0493f', cursor: 'pointer', transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(240,73,63,0.18)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(240,73,63,0.08)'}
                  >
                    <i className="fa-solid fa-trash" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal crear/editar */}
      {modal && (
        <>
          <div onClick={() => setModal(null)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)', zIndex: 100,
          }} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%', zIndex: 101,
            transform: 'translate(-50%, -50%)',
            width: '90%', maxWidth: 480,
            background: '#272727', borderRadius: 8,
            border: '1px solid rgba(238,238,238,0.08)',
            padding: 32, maxHeight: '85vh', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '1.1rem', color: '#eeeeee' }}>
                {modal === 'crear' ? 'Nuevo producto' : 'Editar producto'}
              </h2>
              <button onClick={() => setModal(null)} style={{ background: 'transparent', border: 'none', color: 'rgba(238,238,238,0.3)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>

            {[
              { key: 'codigoProducto', label: 'Código de Producto' },
              { key: 'nombre', label: 'nombre' },
              { key: 'descripcion', label: 'descripcion' },
              { key: 'precio', label: 'Precio (ej: ₡2.500)' },
              { key: 'stock', label: 'Cantidad del Producto' },
              { key: 'imagen', label: 'imagen' }
            ].map(({ key, label }) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={{
                  fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.68rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(238,238,238,0.4)', display: 'block', marginBottom: 8,
                }}>{label}</label>
                {key === 'descripcion' ? (
                  <textarea
                    value={form[key]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    rows={3}
                    style={{
                      width: '100%', background: '#1e1e1e',
                      border: '1px solid rgba(238,238,238,0.1)', borderRadius: 4,
                      padding: '10px 12px', fontFamily: 'Poppins', fontSize: '0.88rem',
                      color: '#eeeeee', outline: 'none', resize: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                ) : (
                  <input
                    value={form[key]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    style={{
                      width: '100%', background: '#1e1e1e',
                      border: '1px solid rgba(238,238,238,0.1)', borderRadius: 4,
                      padding: '10px 12px', fontFamily: 'Poppins', fontSize: '0.88rem',
                      color: '#eeeeee', outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                )}
              </div>
            ))}

            <button onClick={guardar} style={{
              width: '100%', background: '#f0493f', color: '#fff',
              border: 'none', padding: '13px', borderRadius: 4,
              fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.85rem',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              cursor: 'pointer', marginTop: 8, transition: 'all 0.15s',
            }}
              onMouseEnter={e => { e.target.style.background = '#eeeeee'; e.target.style.color = '#272727'; }}
              onMouseLeave={e => { e.target.style.background = '#f0493f'; e.target.style.color = '#fff'; }}
            >
              {modal === 'crear' ? 'Crear producto' : 'Guardar cambios'}
            </button>
          </div>
        </>
      )}

      {/* Confirmar eliminar */}
      {confirmarEliminar && (
        <>
          <div onClick={() => setConfirmarEliminar(null)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)', zIndex: 100,
          }} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%', zIndex: 101,
            transform: 'translate(-50%, -50%)',
            width: '90%', maxWidth: 380,
            background: '#272727', borderRadius: 8,
            border: '1px solid rgba(240,73,63,0.2)',
            padding: 28, textAlign: 'center',
          }}>
            <p style={{ fontSize: '2rem', marginBottom: 12 }}>🗑</p>
            <h3 style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '1rem', color: '#eeeeee', marginBottom: 8 }}>¿Eliminar producto?</h3>
            <p style={{ fontFamily: 'Poppins', fontSize: '0.85rem', color: 'rgba(238,238,238,0.4)', marginBottom: 24 }}>Esta acción no se puede deshacer.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmarEliminar(null)} style={{
                flex: 1, padding: '11px', borderRadius: 4,
                background: 'rgba(238,238,238,0.07)', border: 'none',
                color: 'rgba(238,238,238,0.5)', fontFamily: 'Montserrat',
                fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer',
              }}>Cancelar</button>
              <button onClick={() => eliminar(confirmarEliminar)} style={{
                flex: 1, padding: '11px', borderRadius: 4,
                background: '#f0493f', border: 'none',
                color: '#fff', fontFamily: 'Montserrat',
                fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
              }}>Eliminar</button>
            </div>
          </div>
        </>
      )}

      <style>{`
        .admin-productos-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 1200px) { .admin-productos-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 900px) { .admin-productos-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </AdminLayout>
  );
}