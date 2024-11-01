import { Routes, Route, Link } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Package,
  Settings,
  Boxes,
  ShoppingBag
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Mock data
const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
];

function Overview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">$54,230</p>
          <span className="text-green-500 text-sm">↑ 12% from last month</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">1,234</p>
          <span className="text-green-500 text-sm">↑ 8% from last month</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold mt-2">892</p>
          <span className="text-green-500 text-sm">↑ 15% from last month</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
          <p className="text-3xl font-bold mt-2">432</p>
          <span className="text-red-500 text-sm">↓ 3% from last month</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
        <BarChart width={800} height={300} data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#4F46E5" />
        </BarChart>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {/* Add recent orders list here */}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Top Products</h2>
          <div className="space-y-4">
            {/* Add top products list here */}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const navigation = [
    { name: 'Overview', icon: BarChart3, path: '' },
    { name: 'Users', icon: Users, path: 'users' },
    { name: 'Products', icon: Package, path: 'products' },
    { name: 'Categories', icon: Boxes, path: 'categories' },
    { name: 'Orders', icon: ShoppingBag, path: 'orders' },
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
          <Route path="users" element={<div>Users Management</div>} />
          <Route path="products" element={<div>Products Management</div>} />
          <Route path="categories" element={<div>Categories Management</div>} />
          <Route path="orders" element={<div>Orders Management</div>} />
          <Route path="settings" element={<div>Settings</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminDashboard;