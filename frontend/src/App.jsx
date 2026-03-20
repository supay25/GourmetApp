import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import Sinpe from './pages/Sinpe';
import Confirmacion from './pages/Confirmacion';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPedidos from './pages/admin/AdminPedidos';
import AdminProductos from './pages/admin/AdminProductos';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminConfiguracion from './pages/admin/AdminConfiguracion';
import AdminGaleria from './pages/admin/AdminGaleria';
import './style.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
            <Route path="/productos" element={<><Navbar /><Productos /><Footer /></>} />
            <Route path="/contacto" element={<><Navbar /><Contacto /><Footer /></>} />
            <Route path="/carrito" element={<><Navbar /><Carrito /><Footer /></>} />
            <Route path="/checkout" element={<><Navbar /><Checkout /></>} />
            <Route path="/pago" element={<Sinpe />} />
            <Route path="/confirmacion" element={<Confirmacion />} />
            <Route path="/admin/usuarios" element={<AdminRoute><AdminUsuarios /></AdminRoute>} />

            {/* Admin */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/pedidos" element={<AdminRoute><AdminPedidos /></AdminRoute>} />
            <Route path="/admin/productos" element={<AdminRoute><AdminProductos /></AdminRoute>} />
            <Route path="/admin/configuracion" element={<AdminRoute><AdminConfiguracion /></AdminRoute>} />
            <Route path="/admin/galeria" element={<AdminRoute><AdminGaleria /></AdminRoute>} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;