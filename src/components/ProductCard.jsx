import { useCart } from '../context/CartContext';

const ProductCard = ({ product, badge }) => {
  const { addItem } = useCart();

  return (
    <div className="chit rounded-lg p-4 pt-6 flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square w-full rounded-md overflow-hidden bg-paper mb-3 relative">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-clay/50 font-display italic text-sm">
            No image
          </div>
        )}
        {badge && (
          <span className="chalk-tag absolute top-2 left-2 bg-tandoor/85 text-saffron text-sm px-2 py-0.5 rounded">
            {badge}
          </span>
        )}
        {!product.is_available && (
          <div className="absolute inset-0 bg-tandoor/60 flex items-center justify-center">
            <span className="text-paper font-body text-sm font-semibold">Sold Out</span>
          </div>
        )}
      </div>

      <h3 className="font-display text-lg text-ink leading-tight mb-1">{product.name}</h3>
      <p className="font-mono text-sm text-clay mb-3">₹{Number(product.price).toFixed(0)}</p>

      <button
        onClick={() => addItem(product)}
        disabled={!product.is_available}
        className="mt-auto bg-tandoor text-paper font-body text-sm font-medium py-2 rounded-md hover:bg-chili transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
