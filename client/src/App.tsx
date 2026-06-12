import { Navigate, Route, Routes } from "react-router-dom";
import CartPage from "./pages/store/CartPage";
import CategoryPage from "./pages/store/CategoryPage";
import CheckoutPage from "./pages/store/CheckoutPage";
import ContactPage from "./pages/store/ContactPage";
import HomePage from "./pages/store/HomePage";
import MyAccountPage from "./pages/store/MyAccountPage";
import MyOrdersPage from "./pages/store/MyOrdersPage";
import OrderSuccessPage from "./pages/store/OrderSuccessPage";
import ProductDetailPage from "./pages/store/ProductDetailPage";
import ProductsPage from "./pages/store/ProductsPage";
import StoreLayout from "./components/layout/StoreLayout";
import WishlistPage from "./pages/store/WishlistPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StoreLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:slug" element={<ProductDetailPage />} />
        <Route path="categories/:category" element={<CategoryPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order-success" element={<OrderSuccessPage />} />
        <Route path="account" element={<MyAccountPage />} />
        <Route path="account/orders" element={<MyOrdersPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
