import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import AdminDashboard from './pages/admin/Dashboard';
import SellerDashboard from './pages/seller/Dashboard';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import { useAuth } from './lib/store';
import Login from './pages/Login';

const queryClient = new QueryClient();

function ProtectedRoute({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;
  
  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProductList />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            
            <Route
              path="checkout"
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="orders"
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <Orders />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="profile"
              element={
                <ProtectedRoute allowedRoles={['customer', 'seller', 'admin']}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="admin/*"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="seller/*"
              element={
                <ProtectedRoute allowedRoles={['seller']}>
                  <SellerDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;