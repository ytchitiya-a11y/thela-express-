import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../api/client';
import socket from '../socket';

const STEPS = ['pending', 'assigned', 'accepted', 'picked_up', 'delivered'];
const STEP_LABELS = {
  pending: 'Order Placed',
  assigned: 'Partner Assigned',
  accepted: 'Accepted',
  picked_up: 'Picked Up',
  delivered: 'Delivered',
};

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getOrderById(id)
      .then(({ data }) => setOrder(data.order))
      .catch(() => setError('Could not load this order.'));
  }, [id]);

  useEffect(() => {
    const handleUpdate = (update) => {
      if (String(update.orderId) !== String(id)) return;
      setOrder((prev) => (prev ? { ...prev, ...update, status: update.status || prev.status } : prev));
    };
    socket.on('order_status_update', handleUpdate);
    return () => socket.off('order_status_update', handleUpdate);
  }, [id]);

  if (error) return <p className="max-w-md mx-auto px-5 py-16 font-body text-chili">{error}</p>;
  if (!order) return <p className="max-w-md mx-auto px-5 py-16 font-body text-clay">Loading order…</p>;

  const currentStepIndex = STEPS.indexOf(order.status);

  return (
    <div className="max-w-md mx-auto px-5 py-10">
      <h1 className="font-display text-2xl text-ink mb-1">Order #{order.id}</h1>
      <p className="font-body text-sm text-clay mb-8">{order.delivery_address}</p>

      <div className="space-y-4 mb-8">
        {STEPS.map((step, idx) => {
          const done = idx <= currentStepIndex;
          return (
            <div key={step} className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-body font-semibold ${
                  done ? 'bg-chutney text-paper' : 'bg-clay/15 text-clay'
                }`}
              >
                {done ? '✓' : idx + 1}
              </div>
              <span className={`font-body text-sm ${done ? 'text-ink font-medium' : 'text-clay'}`}>
                {STEP_LABELS[step]}
              </span>
            </div>
          );
        })}
      </div>

      {order.delivery_partner_name && (
        <div className="chit rounded-md p-4">
          <p className="font-body text-xs text-clay mb-1">Delivery Partner</p>
          <p className="font-body text-sm font-medium text-ink">{order.delivery_partner_name}</p>
          {order.delivery_partner_phone && (
            <p className="font-mono text-xs text-clay mt-1">{order.delivery_partner_phone}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
