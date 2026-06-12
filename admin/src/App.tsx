import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./components/AdminLayout";
import AdminLoginPage from "./pages/AdminLoginPage";
import RequireAdmin from "./components/RequireAdmin";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminAddProductPage from "./pages/AdminAddProductPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminOrderDetailsPage from "./pages/AdminOrderDetailsPage";
import AdminInventoryPage from "./pages/AdminInventoryPage";
import AdminCustomersPage from "./pages/AdminCustomersPage";
import AdminCategoriesPage from "./pages/AdminCategoriesPage";
import AdminCouponsPage from "./pages/AdminCouponsPage";
import AdminReportsPage from "./pages/AdminReportsPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<RequireAdmin />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/add" element={<AdminAddProductPage />} />
          <Route path="products/:productId/edit" element={<AdminAddProductPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="orders/:orderId" element={<AdminOrderDetailsPage />} />
          <Route path="inventory" element={<AdminInventoryPage />} />
          <Route path="customers" element={<AdminCustomersPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="coupons" element={<AdminCouponsPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}
