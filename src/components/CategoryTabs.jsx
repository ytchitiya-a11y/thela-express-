const categories = [
  { key: '', label: 'All' },
  { key: 'food', label: 'Food' },
  { key: 'grocery', label: 'Grocery' },
];

const CategoryTabs = ({ active, onChange }) => {
  return (
    <div className="flex gap-2">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={`px-5 py-2 rounded-t-xl font-body text-sm font-medium transition-colors border-b-2 ${
            active === cat.key
              ? 'bg-white border-chili text-ink'
              : 'bg-clay/10 border-transparent text-clay hover:bg-clay/20'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
