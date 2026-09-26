import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(email, password, name, address);
      }
      navigate('/');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto px-5 py-16">
      <h1 className="font-display italic text-3xl text-ink mb-1">
        {mode === 'login' ? 'Welcome back' : 'Create account'}
      </h1>
      <p className="font-body text-sm text-clay mb-6">
        {mode === 'login' ? 'Log in to order and track deliveries.' : 'Sign up in a few seconds.'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === 'signup' && (
          <>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-clay/30 rounded-md px-3 py-2 font-body text-sm bg-white"
            />
            <input
              type="text"
              placeholder="Delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-clay/30 rounded-md px-3 py-2 font-body text-sm bg-white"
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-clay/30 rounded-md px-3 py-2 font-body text-sm bg-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full border border-clay/30 rounded-md px-3 py-2 font-body text-sm bg-white"
        />

        {error && <p className="text-chili font-body text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-tandoor text-paper font-body font-semibold py-3 rounded-md hover:bg-chili transition disabled:opacity-50"
        >
          {submitting ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Sign up'}
        </button>
      </form>

      <button
        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
        className="mt-4 text-sm font-body text-clay underline"
      >
        {mode === 'login' ? "New here? Create an account" : 'Already have an account? Log in'}
      </button>
    </div>
  );
};

export default Login;
