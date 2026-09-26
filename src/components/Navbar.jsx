import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onCartClick }) => {
  const { count } = useCart();
  const { dbUser, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-tandoor text-paper">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link to="/" className="font-display italic text-2xl tracking-tight">
          Thela Express
        </Link>

        <nav className="hidden sm:flex items-center gap-6 font-body text-sm">
          <Link to="/" className="hover:text-saffron transition-colors">Menu</Link>
          {dbUser && (
            <Link to="/orders" className="hover:text-saffron transition-colors">My Orders</Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {dbUser ? (
            <button onClick={logout} className="text-sm font-body hover:text-saffron transition-colors">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-sm font-body hover:text-saffron transition-colors">
              Login
            </Link>
          )}

          <button
            onClick={onCartClick}
            className="relative bg-saffron text-tandoor font-body font-semibold text-sm px-4 py-2 rounded-full hover:brightness-110 transition"
          >
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-chili text-paper text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
