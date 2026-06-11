import { Navigate, Route, Routes } from "react-router-dom";
import CartPage from "./pages/store/CartPage";
import CheckoutPage from "./pages/store/CheckoutPage";
import HomePage from "./pages/store/HomePage";
import ProductDetailPage from "./pages/store/ProductDetailPage";
import ProductsPage from "./pages/store/ProductsPage";
import StoreLayout from "./components/layout/StoreLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StoreLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:slug" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
