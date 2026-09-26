import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder, createRazorpayOrder, verifyPayment } from '../api/client';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { dbUser } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState(dbUser?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  // Opens the Razorpay popup for a given internal order, resolves once payment is verified
  const payWithRazorpay = (order) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await createRazorpayOrder(order.id);

        const rzp = new window.Razorpay({
          key: data.keyId,
          amount: data.amount,
          currency: data.currency,
          order_id: data.razorpayOrderId,
          name: 'Thela Express',
          description: `Order #${order.id}`,
          theme: { color: '#C13B2C' },
          handler: async (response) => {
            try {
              await verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_id: order.id,
              });
              resolve();
            } catch (err) {
              reject(new Error('Payment succeeded but verification failed. Contact support.'));
            }
          },
          modal: {
            ondismiss: () => reject(new Error('Payment cancelled')),
          },
        });

        rzp.on('payment.failed', () => reject(new Error('Payment failed. Please try again.')));
        rzp.open();
      } catch (err) {
        reject(new Error('Could not start payment. Try again.'));
      }
    });

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      setError('Please enter a delivery address');
      return;
    }
    setError('');
    setPlacing(true);
    try {
      const { data } = await placeOrder({
        items: items.map((i) => ({ product_id: i.id, quantity: i.quantity })),
        delivery_address: address,
        payment_method: paymentMethod,
      });

      if (paymentMethod === 'upi') {
        await payWithRazorpay(data.order); // waits until Razorpay verify succeeds
      }

      clearCart();
      navigate(`/track/${data.order.id}`);
    } catch (err) {
      setError(err.message || err.response?.data?.message || 'Could not place order. Try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (!dbUser) {
    return (
      <div className="max-w-md mx-auto px-5 py-16 text-center">
        <p className="font-body text-ink mb-4">Please log in to checkout.</p>
        <a href="/login" className="text-chili font-body font-medium underline">Go to login</a>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-5 py-10">
      <h1 className="font-display text-2xl text-ink mb-6">Checkout</h1>

      <label className="block font-body text-sm text-ink mb-1">Delivery address</label>
      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        rows={3}
        placeholder="House no, street, area, Prayagraj"
        className="w-full border border-clay/30 rounded-md px-3 py-2 font-body text-sm mb-4 bg-white"
      />

      <label className="block font-body text-sm text-ink mb-2">Payment method</label>
      <div className="flex gap-3 mb-6">
        {['cod', 'upi'].map((method) => (
          <button
            key={method}
            onClick={() => setPaymentMethod(method)}
            className={`flex-1 py-2 rounded-md font-body text-sm font-medium border ${
              paymentMethod === method
                ? 'bg-tandoor text-paper border-tandoor'
                : 'bg-white text-ink border-clay/30'
            }`}
          >
            {method === 'cod' ? 'Cash on Delivery' : 'UPI'}
          </button>
        ))}
      </div>

      <div className="chit rounded-md p-4 mb-6">
        <div className="flex justify-between font-mono text-sm mb-1">
          <span>Items</span>
          <span>{items.length}</span>
        </div>
        <div className="flex justify-between font-mono text-base font-semibold">
          <span>Total</span>
          <span>₹{total.toFixed(0)}</span>
        </div>
      </div>

      {error && <p className="text-chili font-body text-sm mb-3">{error}</p>}

      <button
        onClick={handlePlaceOrder}
        disabled={placing || items.length === 0}
        className="w-full bg-chili text-paper font-body font-semibold py-3 rounded-md hover:brightness-110 transition disabled:opacity-50"
      >
        {placing
          ? paymentMethod === 'upi' ? 'Waiting for payment…' : 'Placing order…'
          : paymentMethod === 'upi' ? 'Pay & Place Order' : 'Place Order'}
      </button>
    </div>
  );
};

export default Checkout;
