import React from 'react';
import { Link } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';

const products = [
  {
    id: '1',
    name: 'Wireless Earbuds',
    category: 'Electronics',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&q=80&w=400',
    rating: 4.5,
    reviews: 128,
  },
  {
    id: '2',
    name: 'Denim Jacket',
    category: 'Clothing',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=400',
    rating: 4.3,
    reviews: 95,
  },
  {
    id: '3',
    name: 'Running Shoes',
    category: 'Footwear',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    reviews: 156,
  },
  // Add more products...
];

function ProductList() {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [priceRange, setPriceRange] = React.useState([0, 1000]);
  const [sortBy, setSortBy] = React.useState('featured');
  const [showFilters, setShowFilters] = React.useState(false);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'footwear', name: 'Footwear' },
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Filters - Desktop */}
      <aside className="hidden md:block w-64 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={selectedCategory === category.id}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Price Range</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-24 px-2 py-1 border rounded-md"
                min="0"
              />
              <span>to</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-24 px-2 py-1 border rounded-md"
                min="0"
              />
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Rating</h2>
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700">
                {rating}+ Stars
              </span>
            </label>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Filters Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {/* Mobile Filters Modal */}
        {showFilters && (
          <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75" onClick={() => setShowFilters(false)} />
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl">
                  <div className="flex items-center justify-between px-4 py-6">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setShowFilters(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <SlidersHorizontal className="h-6 w-6" />
                    </button>
                  </div>
                  {/* Mobile filters content */}
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    {/* Copy of desktop filters */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sort and Grid */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Products
            </h2>
          </div>
          <div className="flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="ml-4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-w-3 aspect-h-4 bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="mt-1 flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <svg
                          key={rating}
                          className={`h-5 w-5 flex-shrink-0 ${
                            product.rating > rating
                              ? 'text-yellow-400'
                              : 'text-gray-200'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 15.934l-6.18 3.254 1.18-6.875L.083 7.571l6.9-1.002L10 .333l3.017 6.236 6.9 1.002-4.917 4.742 1.18 6.875z"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="ml-2 text-sm text-gray-500">
                      ({product.reviews})
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;