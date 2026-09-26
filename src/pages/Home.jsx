import { useEffect, useState } from 'react';
import { getProducts } from '../api/client';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getProducts(category)
      .then(({ data }) => setProducts(data.products))
      .catch(() => setError('Could not load the menu. Is the backend running?'))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div>
      {/* ===== HERO: signature thali + steam moment ===== */}
      <section className="bg-tandoor text-paper overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-20 grid sm:grid-cols-2 gap-10 items-center">
          <div>
            <span className="chalk-tag inline-block text-saffron text-2xl mb-2">Aaj ka special</span>
            <h1 className="font-display italic text-4xl sm:text-5xl leading-tight mb-4">
              Garam garam,
              <br />
              seedha aapke ghar.
            </h1>
            <p className="font-body text-paper/70 max-w-sm mb-6">
              Prayagraj ki thela-style street food aur roz ka saaman — 20 minute mein delivered.
            </p>
            <a
              href="#menu"
              className="inline-block bg-saffron text-tandoor font-body font-semibold px-6 py-3 rounded-full hover:brightness-110 transition"
            >
              Order Now
            </a>
          </div>

          {/* Thali visual: circular plate with steam rising */}
          <div className="relative flex justify-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-clay to-tandoor border-4 border-saffron/40 shadow-2xl flex items-center justify-center">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-tandoor/60 border border-saffron/20 flex items-center justify-center text-5xl">
                🍛
              </div>
              {/* Steam lines */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-3">
                <span className="w-1 h-8 bg-paper/40 rounded-full animate-steam" style={{ animationDelay: '0s' }} />
                <span className="w-1 h-10 bg-paper/40 rounded-full animate-steam" style={{ animationDelay: '0.4s' }} />
                <span className="w-1 h-8 bg-paper/40 rounded-full animate-steam" style={{ animationDelay: '0.8s' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MENU ===== */}
      <section id="menu" className="max-w-6xl mx-auto px-5 py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-2xl text-ink">Menu</h2>
          <CategoryTabs active={category} onChange={setCategory} />
        </div>

        {loading && <p className="font-body text-clay text-sm">Loading menu…</p>}
        {error && <p className="font-body text-chili text-sm">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p className="font-body text-clay text-sm">No items found in this category yet.</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              badge={product.category === 'food' ? 'Fresh' : undefined}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
