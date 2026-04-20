import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { searchProducts } from '../utils/api';
import './SearchPage.css';

const allMockProducts = [
  { id: 1, name: 'Apple iPhone 15 Pro (256GB)', price: 129900, originalPrice: 149900, rating: 5, category: 'Electronics', isPrime: true, imageUrl: 'https://picsum.photos/seed/phone/300/300' },
  { id: 2, name: 'Samsung 65" 4K QLED Smart TV', price: 89999, originalPrice: 120000, rating: 4, category: 'Electronics', isPrime: true, imageUrl: 'https://picsum.photos/seed/tv/300/300' },
  { id: 3, name: 'Sony WH-1000XM5 Wireless Headphones', price: 24990, originalPrice: 34990, rating: 5, category: 'Electronics', isPrime: true, imageUrl: 'https://picsum.photos/seed/headphone/300/300' },
  { id: 4, name: 'The Alchemist - Paulo Coelho', price: 199, originalPrice: 350, rating: 4, category: 'Books', imageUrl: 'https://picsum.photos/seed/book1/300/300' },
  { id: 5, name: 'Atomic Habits by James Clear', price: 399, originalPrice: 599, rating: 5, category: 'Books', isPrime: true, imageUrl: 'https://picsum.photos/seed/book2/300/300' },
  { id: 6, name: 'Nike Air Max 270 Running Shoes', price: 7995, originalPrice: 11995, rating: 4, category: 'Clothing', imageUrl: 'https://picsum.photos/seed/shoe/300/300' },
  { id: 7, name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker', price: 8499, originalPrice: 12999, rating: 4, category: 'Home', imageUrl: 'https://picsum.photos/seed/pot/300/300' },
  { id: 8, name: 'LEGO Technic Bugatti Set', price: 15999, originalPrice: 19999, rating: 5, category: 'Toys', isPrime: true, imageUrl: 'https://picsum.photos/seed/lego/300/300' },
  { id: 9, name: 'Kindle Paperwhite (16GB)', price: 13999, originalPrice: 16999, rating: 5, category: 'Electronics', isPrime: true, imageUrl: 'https://picsum.photos/seed/kindle/300/300' },
  { id: 10, name: 'boAt Airdopes 141 TWS Earbuds', price: 999, originalPrice: 2990, rating: 4, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/earbuds/300/300' },
  { id: 11, name: 'Prestige Electric Kettle 1.8L', price: 799, originalPrice: 1299, rating: 4, category: 'Home', imageUrl: 'https://picsum.photos/seed/kettle/300/300' },
  { id: 12, name: 'Fastrack Analog Men\'s Watch', price: 1295, originalPrice: 2295, rating: 4, category: 'Clothing', imageUrl: 'https://picsum.photos/seed/watch/300/300' },
];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Avg. Customer Review' },
];

const SearchPage = () => {
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('featured');
  const [primeOnly, setPrimeOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await searchProducts(query);
        setProducts(res.data);
      } catch {
        const filtered = allMockProducts.filter(p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filtered.length ? filtered : allMockProducts);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [query]);

  let displayed = [...products];
  if (primeOnly) displayed = displayed.filter(p => p.isPrime);
  if (maxPrice) displayed = displayed.filter(p => p.price <= Number(maxPrice));
  if (sort === 'price-asc') displayed.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') displayed.sort((a, b) => b.price - a.price);
  if (sort === 'rating') displayed.sort((a, b) => (b.rating || 0) - (a.rating || 0));

  return (
    <div className="search-page container">
      <div className="search-layout">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <h3 className="filter-title">Filters</h3>

          <div className="filter-section">
            <h4>Prime</h4>
            <label className="filter-check">
              <input type="checkbox" checked={primeOnly} onChange={e => setPrimeOnly(e.target.checked)} />
              ⚡ Prime Eligible
            </label>
          </div>

          <div className="filter-section">
            <h4>Max Price (₹)</h4>
            <input
              type="number"
              className="price-input"
              placeholder="e.g. 10000"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
            />
          </div>

          <div className="filter-section">
            <h4>Avg. Customer Review</h4>
            {[4, 3, 2].map(r => (
              <div key={r} className="filter-star-row">
                <span style={{ color: '#FF9900' }}>{'★'.repeat(r)}{'☆'.repeat(5 - r)}</span>
                <span>& Up</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Results */}
        <main className="search-results">
          <div className="results-header">
            <p className="results-count">
              {loading ? 'Searching...' : `${displayed.length} results for `}
              {!loading && <strong>"{query}"</strong>}
            </p>
            <div className="sort-row">
              <label>Sort by:</label>
              <select value={sort} onChange={e => setSort(e.target.value)}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="spinner" />
          ) : displayed.length === 0 ? (
            <div className="no-results">
              <p>No results found for "<strong>{query}</strong>".</p>
              <p>Try checking your spelling or using more general terms.</p>
            </div>
          ) : (
            <div className="search-grid">
              {displayed.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchPage;
