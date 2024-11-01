import {Truck, CheckCircle } from 'lucide-react';

// Mock orders data
const orders = [
  {
    id: '1',
    date: '2024-02-25',
    total: 259.98,
    status: 'delivered',
    items: [
      {
        id: '1',
        name: 'Wireless Earbuds Pro',
        price: 129.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&q=80&w=400',
      }
    ],
    tracking: 'DHL-123456789',
  },
  {
    id: '2',
    date: '2024-02-20',
    total: 89.99,
    status: 'shipped',
    items: [
      {
        id: '2',
        name: 'Denim Jacket',
        price: 89.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=400',
      }
    ],
    tracking: 'UPS-987654321',
  },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

function OrderStatus({ status }: { status: keyof typeof statusColors }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function Orders() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Your Orders</h1>
          <div className="flex items-center space-x-2">
            <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option>All Orders</option>
              <option>Last 30 days</option>
              <option>Last 6 months</option>
              <option>2023</option>
            </select>
          </div>
        </div>

        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-medium">Order #{order.id}</h2>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <OrderStatus status={order.status as keyof typeof statusColors} />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="space-y-1">
                  <p className="text-gray-500">Total Amount</p>
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">Tracking Number</p>
                  <p className="font-medium">{order.tracking}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">Items</p>
                  <p className="font-medium">
                    {order.items.reduce((acc, item) => acc + item.quantity, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="ml-6 flex-1">
                    <h3 className="text-base font-medium">{item.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  {order.status === 'shipped' && (
                    <div className="flex items-center text-blue-600">
                      <Truck className="h-5 w-5 mr-2" />
                      <span className="text-sm font-medium">In Transit</span>
                    </div>
                  )}
                  {order.status === 'delivered' && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="text-sm font-medium">Delivered</span>
                    </div>
                  )}
                </div>
                <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;