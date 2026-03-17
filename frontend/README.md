# Gourmetto — Frontend

Aplicación de eCommerce para productos artesanales costarricenses. Construida con Vite + React + Tailwind CSS v4.

---

## Stack

- **Vite** + **React 18**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **react-router-dom** v6
- **FontAwesome** (via CDN en `index.html`)
- **Google Fonts** — Montserrat + Poppins (via CDN)

---

## Requisitos previos

- Node.js 20.19+ o 22.12+
- npm 9+

---

## Instalación
```bash
# Clonar el repo
git clone https://github.com/tu-usuario/GourmetApp.git

# Entrar al frontend
cd GourmetApp/frontend

# Instalar dependencias
npm install
```

## Variables de entorno

Creá un archivo `.env` en la raíz del frontend (`/frontend/.env`):
```env
# URL del backend (cuando esté disponible)
VITE_API_URL=http://localhost:3000

# Credenciales del panel admin
VITE_ADMIN_USER=admin
VITE_ADMIN_PASS=gourmetto2024
```

> ⚠️ El archivo `.env` no se sube al repositorio. Cada desarrollador debe crearlo localmente.

---

## Correr el proyecto
```bash
# Modo desarrollo
npm run dev

# Modo desarrollo con acceso desde red local (para probar en móvil)
npm run dev -- --host

# Build de producción
npm run build

# Preview del build
npm run preview
```

El servidor corre en `http://localhost:5173` por defecto.

---

## Estructura del proyecto
```
frontend/
├── public/
│   └── images/              # Imágenes estáticas servidas desde la raíz
│       ├── bowl.png
│       ├── logo.png
│       ├── headers/
│       └── products/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductModal.jsx
│   │   ├── ScrollToTop.jsx
│   │   └── AdminRoute.jsx   # Protección de rutas del admin
│   ├── context/
│   │   ├── CartContext.jsx  # Estado global del carrito
│   │   └── AuthContext.jsx  # Autenticación del admin
│   ├── data/
│   │   └── products.js      # Datos estáticos (reemplazar por API)
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Productos.jsx
│   │   ├── Contacto.jsx
│   │   ├── Carrito.jsx
│   │   ├── Checkout.jsx
│   │   ├── Sinpe.jsx
│   │   ├── Confirmacion.jsx
│   │   └── admin/
│   │       ├── AdminLogin.jsx
│   │       ├── AdminLayout.jsx
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminPedidos.jsx
│   │       ├── AdminProductos.jsx
│   │       └── AdminConfiguracion.jsx
│   ├── App.jsx              # Rutas principales
│   ├── main.jsx
│   └── style.css            # Variables CSS globales y estilos base
├── index.html               # Bootstrap, FontAwesome y Fonts via CDN
├── vite.config.js
├── .env                     # Variables de entorno (no subir al repo)
└── README.md
```

---

## Rutas

### Públicas
| Ruta | Página |
|------|--------|
| `/` | Home |
| `/productos` | Catálogo |
| `/contacto` | Contacto |
| `/carrito` | Carrito de compras |
| `/checkout` | Formulario de datos |
| `/pago` | Pantalla Sinpe Móvil |
| `/confirmacion` | Confirmación del pedido |

### Panel Admin
| Ruta | Página |
|------|--------|
| `/admin` | Login |
| `/admin/dashboard` | Dashboard con métricas |
| `/admin/pedidos` | Gestión de pedidos |
| `/admin/productos` | CRUD de productos |
| `/admin/configuracion` | Configuración del sistema |

> El panel admin no tiene enlace desde la tienda pública. Se accede directamente por URL.

---

## Panel Admin

Accedé en `/admin` con las credenciales del `.env`:
```
Usuario: (valor de VITE_ADMIN_USER)
Contraseña: (valor de VITE_ADMIN_PASS)
```

La sesión se mantiene en `sessionStorage` — se cierra al cerrar el tab o hacer logout.

---

## Diseño

### Paleta de colores
```css
--primary-color: #272727
--primary-color-dark: #202020
--secondary-color: #eeeeee
--third-color: #f0493f  /* accent rojo */
```

### Tipografía
- **Montserrat** — títulos, navegación, botones
- **Poppins** — texto de cuerpo

### Imágenes
Todas las imágenes van en `/public/images/` y se referencian desde la raíz con `/images/...`. Vite sirve la carpeta `public/` estáticamente.

---

## Estado del proyecto

### Frontend Público ✅
- [x] Navbar responsive con carrito
- [x] Home con secciones completas
- [x] Catálogo de productos con modal
- [x] Carrito de compras
- [x] Checkout con validación
- [x] Pantalla Sinpe Móvil
- [x] Página de confirmación
- [x] Footer global
- [x] Responsive móvil

### Panel Admin ✅
- [x] Login con credenciales
- [x] Dashboard con métricas
- [x] Gestión de pedidos
- [x] CRUD de productos
- [x] Configuración del sistema

### Pendiente 🔄
- [ ] Integración con API backend
- [ ] Despliegue (Vercel / Netlify)

---

## Conexión con el backend

Cuando el backend esté listo, los únicos cambios necesarios son:

1. **Catálogo** — `src/data/products.js` reemplazar por `GET /api/productos`
2. **Checkout** — `src/pages/Checkout.jsx` reemplazar mock por `POST /api/pedidos`
3. **Sinpe** — `src/pages/Sinpe.jsx` reemplazar `CONFIG` por `GET /api/config`
4. **Admin Login** — `src/context/AuthContext.jsx` reemplazar validación local por `POST /api/auth/login`

---

## Contacto del proyecto

- **Email:** gourmettocr@gmail.com
- **WhatsApp:** +506 6381-8443
- **Instagram:** [@gourmetto.cr](https://instagram.com/gourmetto.cr)