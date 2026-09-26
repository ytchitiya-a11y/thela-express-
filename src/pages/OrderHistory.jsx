import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../api/client';

const statusColor = {
  pending: 'text-clay',
  assigned: 'text-saffron',
  accepted: 'text-saffron',
  picked_up: 'text-saffron',
  delivered: 'text-chutney',
  cancelled: 'text-chili',
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(({ data }) => setOrders(data.orders))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <h1 className="font-display text-2xl text-ink mb-6">My Orders</h1>

      {loading && <p className="font-body text-clay text-sm">Loading…</p>}
      {!loading && orders.length === 0 && (
        <p className="font-body text-clay text-sm">No orders yet. Go get some chaat!</p>
      )}

      <div className="space-y-3">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/track/${order.id}`}
            className="chit rounded-md p-4 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <p className="font-body text-sm font-medium text-ink">Order #{order.id}</p>
              <p className="font-mono text-xs text-clay">₹{Number(order.total_amount).toFixed(0)}</p>
            </div>
            <span className={`font-body text-xs font-semibold uppercase ${statusColor[order.status] || 'text-clay'}`}>
              {order.status.replace('_', ' ')}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
