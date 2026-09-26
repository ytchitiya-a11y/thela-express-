import { io } from 'socket.io-client';

// Single shared socket instance for the whole app
const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: false, // we connect manually once the user is logged in (see AuthContext)
});

export const joinCustomerRoom = (userId) => {
  if (!socket.connected) socket.connect();
  socket.emit('join_room', { role: 'customer', id: userId });
};

export default socket;
