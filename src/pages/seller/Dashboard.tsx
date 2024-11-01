import { Routes, Route, Link } from 'react-router-dom';
import {
  BarChart3,
  Package,
  ShoppingBag,
  Settings,
  PlusCircle,
  DollarSign
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const mockSalesData = [
  { name: 'Jan', sales: 2400 },
  { name: 'Feb', sales: 1398 },
  { name: 'Mar', sales: 9800 },
  { name: 'Apr', sales: 3908 },
  { name: 'May', sales: 4800 },
  { name: 'Jun', sales: 3800 },
];

function Overview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Monthly Revenue</h3>
          <p className="text-3xl font-bold mt-2">$12,345</p>
          <span className="text-green-500 text-sm">↑ 8% from last month</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
          <p className="text-3xl font-bold mt-2">67</p>
          <span className="text-green-500 text-sm">↑ 4 new this month</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Pending Orders</h3>
          <p className="text-3xl font-bold mt-2">12</p>
          <span className="text-yellow-500 text-sm">Requires attention</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
        <BarChart width={800} height={300} data={mockSalesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#4F46E5" />
        </BarChart>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link
              to="orders"
              className="text-sm text-indigo-600 hover:text-indigo-900"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {/* Add recent orders list here */}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Top Products</h2>
            <Link
              to="products"
              className="text-sm text-indigo-600 hover:text-indigo-900"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {/* Add top products list here */}
          </div>
        </div>
      </div>
    </div>
  );
}

function SellerDashboard() {
  const navigation = [
    { name: 'Overview', icon: BarChart3, path: '' },
    { name: 'Products', icon: Package, path: 'products' },
    { name: 'Add Product', icon: PlusCircle, path: 'products/new' },
    { name: 'Orders', icon: ShoppingBag, path: 'orders' },
    { name: 'Revenue', icon: DollarSign, path: 'revenue' },
    { name: 'Settings', icon: Settings, path: 'settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-sm">
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <item.icon
                  className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <Routes>
          <Route index element={<Overview />} />
          <Route path="products" element={<div>Products Management</div>} />
          <Route path="products/new" element={<div>Add New Product</div>} />
          <Route path="orders" element={<div>Orders Management</div>} />
          <Route path="revenue" element={<div>Revenue Analytics</div>} />
          <Route path="settings" element={<div>Settings</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default SellerDashboard;