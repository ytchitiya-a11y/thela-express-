import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer = ({ open, onClose }) => {
  const { items, updateQuantity, removeItem, total } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-tandoor/50 z-40 transition-opacity ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-paper z-50 shadow-xl transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="bg-tandoor text-paper px-5 py-4 flex items-center justify-between">
          <h2 className="font-display italic text-xl">Your Order</h2>
          <button onClick={onClose} className="text-paper/70 hover:text-saffron text-sm">
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="font-body text-clay text-sm mt-10 text-center">
              Cart is empty. Add something garam-garam!
            </p>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id} className="chit rounded-md p-3 flex items-center gap-3">
                  <div className="flex-1">
                    <p className="font-body font-medium text-sm text-ink">{item.name}</p>
                    <p className="font-mono text-xs text-clay">₹{item.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-clay/20 text-ink text-sm"
                    >
                      −
                    </button>
                    <span className="font-mono text-sm w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-clay/20 text-ink text-sm"
                    >
                      +
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-chili text-xs ml-2">
                    remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-clay/20 px-5 py-4">
          <div className="flex justify-between font-mono text-base mb-3">
            <span>Total</span>
            <span>₹{total.toFixed(0)}</span>
          </div>
          <Link
            to="/checkout"
            onClick={onClose}
            className={`block text-center bg-chili text-paper font-body font-semibold py-3 rounded-md hover:brightness-110 transition ${
              items.length === 0 ? 'pointer-events-none opacity-40' : ''
            }`}
          >
            Proceed to Checkout
          </Link>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;
