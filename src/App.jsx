import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import OrderHistory from './pages/OrderHistory';
import Login from './pages/Login';

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <Navbar onCartClick={() => setCartOpen(true)} />
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/track/:id" element={<OrderTracking />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
