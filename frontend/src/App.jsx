import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Contacto from "./pages/Contacto";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import Sinpe from "./pages/Sinpe";
import Confirmacion from "./pages/Confirmacion";
import Footer from './components/Footer';
import "./style.css";
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pago" element={<Sinpe />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
