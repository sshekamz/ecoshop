import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, Truck, Shield, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../lib/store';

// Mock product data
const product = {
  id: '1',
  name: 'Wireless Earbuds Pro',
  price: 129.99,
  description: 'High-quality wireless earbuds with active noise cancellation and premium sound quality.',
  category: 'Electronics',
  rating: 4.5,
  reviews: 128,
  stock: 50,
  images: [
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1598331668826-20cecc596b86?auto=format&fit=crop&q=80&w=400',
  ],
  features: [
    'Active Noise Cancellation',
    'Up to 24 hours battery life',
    'Wireless charging case',
    'Premium sound quality',
    'Touch controls',
  ],
  specifications: {
    'Battery Life': '6 hours (24 hours with case)',
    'Connectivity': 'Bluetooth 5.0',
    'Water Resistance': 'IPX4',
    'Weight': '5.4g per earbud',
    'Charging': 'USB-C and Wireless',
  },
};

function ProductDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Image gallery */}
        <div className="flex flex-col">
          <div className="relative">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            <button
              onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : prev))}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setSelectedImage((prev) => (prev < product.images.length - 1 ? prev + 1 : prev))}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {product.name}
          </h1>

          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">${product.price}</p>
          </div>

          {/* Reviews */}
          <div className="mt-3">
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star
                    key={rating}
                    className={`h-5 w-5 flex-shrink-0 ${
                      product.rating > rating
                        ? 'text-yellow-400'
                        : 'text-gray-200'
                    }`}
                    fill="currentColor"
                  />
                ))}
              </div>
              <p className="ml-3 text-sm text-gray-500">
                {product.reviews} reviews
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <p className="text-base text-gray-700">{product.description}</p>
          </div>

          {/* Features */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Features</h3>
            <ul className="mt-2 space-y-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="ml-2 text-sm text-gray-500">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-sm font-medium text-gray-900">Specifications</h3>
            <div className="mt-4 space-y-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2">
                  <dt className="text-sm font-medium text-gray-500">{key}</dt>
                  <dd className="text-sm text-gray-900">{value}</dd>
                </div>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <div className="mt-8">
            <div className="flex items-center">
              <label htmlFor="quantity" className="sr-only">
                Quantity
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddToCart}
                className="ml-4 flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add to cart
              </button>
            </div>
          </div>

          {/* Shipping and returns */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div className="flex items-center">
                <Truck className="h-6 w-6 text-gray-400" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">
                    Free shipping
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    2-3 working days
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Shield className="h-6 w-6 text-gray-400" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">
                    Warranty
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    2 years coverage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;