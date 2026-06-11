import { getProductById, listProducts, updateProduct } from "./catalogStore";

export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface AdminOrderItem {
  productName: string;
  price: number;
  quantity: number;
}

export interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  amount: number;
  payment: "Paid" | "COD";
  status: OrderStatus;
  date: string;
  items: AdminOrderItem[];
  shippingAddress: string[];
}

export interface AdminCustomer {
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  status: "Active" | "Inactive";
}

export interface AdminCategory {
  id: number;
  category: string;
  description: string;
  products: number;
  status: "Active" | "Inactive";
}

export interface AdminCoupon {
  code: string;
  discount: string;
  minOrder: number;
  usageCurrent: number;
  usageLimit: number;
  validUntil: string;
  status: "Active" | "Inactive";
}

const orders: AdminOrder[] = [
  {
    id: "ORD-1256",
    customer: "John Doe",
    email: "john.doe@email.com",
    amount: 125,
    payment: "Paid",
    status: "DELIVERED",
    date: "May 18, 2024",
    items: [
      { productName: "Organic Bananas", price: 24.5, quantity: 2 },
      { productName: "Organic Honey", price: 6.75, quantity: 1 }
    ],
    shippingAddress: ["John Doe", "123 Green Street, Apt 48", "New York, NY 10001", "United States"]
  },
  {
    id: "ORD-1255",
    customer: "Jane Smith",
    email: "jane.smith@email.com",
    amount: 89.5,
    payment: "Paid",
    status: "PROCESSING",
    date: "May 18, 2024",
    items: [
      { productName: "Organic Apples", price: 3.25, quantity: 4 },
      { productName: "Organic Milk", price: 4.25, quantity: 2 }
    ],
    shippingAddress: ["Jane Smith", "42 River Side Road", "Boston, MA 02101", "United States"]
  },
  {
    id: "ORD-1254",
    customer: "Robert Johnson",
    email: "robert.johnson@email.com",
    amount: 210,
    payment: "COD",
    status: "PENDING",
    date: "May 17, 2024",
    items: [
      { productName: "Organic Red Rice", price: 265, quantity: 1 }
    ],
    shippingAddress: ["Robert Johnson", "54 Lake View Road", "Chicago, IL 60601", "United States"]
  },
  {
    id: "ORD-1253",
    customer: "Emily Davis",
    email: "emily.davis@email.com",
    amount: 65.75,
    payment: "Paid",
    status: "SHIPPED",
    date: "May 17, 2024",
    items: [
      { productName: "Organic Spinach", price: 1.8, quantity: 3 }
    ],
    shippingAddress: ["Emily Davis", "18 Meadow Lane", "Austin, TX 78701", "United States"]
  },
  {
    id: "ORD-1252",
    customer: "Michael Brown",
    email: "michael.brown@email.com",
    amount: 99.99,
    payment: "Paid",
    status: "DELIVERED",
    date: "May 16, 2024",
    items: [
      { productName: "Cold-Pressed Groundnut Oil", price: 349, quantity: 1 }
    ],
    shippingAddress: ["Michael Brown", "7 Sunset Avenue", "Seattle, WA 98101", "United States"]
  }
];

const customers: AdminCustomer[] = [
  { name: "John Doe", email: "john.doe@email.com", phone: "+1 987 654 3210", totalOrders: 12, totalSpent: 1245.5, status: "Active" },
  { name: "Jane Smith", email: "jane.smith@email.com", phone: "+1 054 321 3000", totalOrders: 8, totalSpent: 845.3, status: "Active" },
  { name: "Robert Johnson", email: "robert.johnson@email.com", phone: "+1 654 321 0897", totalOrders: 15, totalSpent: 1976, status: "Active" },
  { name: "Emily Davis", email: "emily.davis@email.com", phone: "+1 654 321 0118", totalOrders: 6, totalSpent: 453.45, status: "Inactive" },
  { name: "Michael Brown", email: "michael.brown@email.com", phone: "+1 521 310 9876", totalOrders: 9, totalSpent: 908.1, status: "Active" }
];

let categories: AdminCategory[] = [
  { id: 1, category: "Fruits", description: "Fresh and organic fruits", products: 2, status: "Active" },
  { id: 2, category: "Vegetables", description: "Organic and fresh vegetables", products: 3, status: "Active" },
  { id: 3, category: "Organic Food", description: "Pure organic food products", products: 1, status: "Active" },
  { id: 4, category: "Dairy", description: "Organic dairy and milk products", products: 1, status: "Active" },
  { id: 5, category: "Nuts & Seeds", description: "Healthy nuts and seeds", products: 1, status: "Active" },
  { id: 6, category: "Beverages", description: "Organic drinks and juices", products: 0, status: "Inactive" }
];

let coupons: AdminCoupon[] = [
  { code: "WELCOME20", discount: "20% OFF", minOrder: 50, usageCurrent: 120, usageLimit: 500, validUntil: "June 30, 2024", status: "Active" },
  { code: "SAVE15", discount: "15% OFF", minOrder: 30, usageCurrent: 80, usageLimit: 300, validUntil: "May 31, 2024", status: "Active" },
  { code: "FREESHIP", discount: "Free Shipping", minOrder: 25, usageCurrent: 250, usageLimit: 1000, validUntil: "June 15, 2024", status: "Active" },
  { code: "SUMMER10", discount: "10% OFF", minOrder: 30, usageCurrent: 60, usageLimit: 200, validUntil: "May 25, 2024", status: "Inactive" },
  { code: "ORGANICS", discount: "5% OFF", minOrder: 10, usageCurrent: 150, usageLimit: 500, validUntil: "June 10, 2024", status: "Active" }
];

function formatCategoryName(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export function listAdminOrders() {
  return [...orders];
}

export function getAdminOrder(id: string) {
  return orders.find((order) => order.id === id);
}

export function updateAdminOrderStatus(id: string, status: OrderStatus) {
  const order = orders.find((entry) => entry.id === id);
  if (!order) {
    return null;
  }

  order.status = status;
  return order;
}

export function listAdminCustomers() {
  return [...customers];
}

export function updateAdminCustomerStatus(email: string, status: AdminCustomer["status"]) {
  const customer = customers.find((entry) => entry.email === email);
  if (!customer) {
    return null;
  }

  customer.status = status;
  return customer;
}

export function listAdminCategories() {
  return [...categories];
}

export function createAdminCategory(input: Pick<AdminCategory, "category" | "description" | "status">) {
  const category = {
    id: categories.reduce((max, entry) => Math.max(max, entry.id), 0) + 1,
    ...input,
    category: formatCategoryName(input.category)
  };
  categories.unshift(category);
  return category;
}

export function updateAdminCategory(id: number, input: Partial<Omit<AdminCategory, "id">>) {
  const index = categories.findIndex((entry) => entry.id === id);
  if (index < 0) {
    return null;
  }

  categories[index] = {
    ...categories[index],
    ...input,
    category: input.category ? formatCategoryName(input.category) : categories[index].category
  };
  return categories[index];
}

export function removeAdminCategory(id: number) {
  const index = categories.findIndex((entry) => entry.id === id);
  if (index < 0) {
    return false;
  }

  categories.splice(index, 1);
  return true;
}

export function listAdminCoupons() {
  return [...coupons];
}

export function createAdminCoupon(input: Omit<AdminCoupon, "code"> & { code?: string }) {
  const coupon: AdminCoupon = {
    code: input.code?.trim().toUpperCase() || `CODE${coupons.length + 1}`,
    discount: input.discount,
    minOrder: input.minOrder,
    usageCurrent: input.usageCurrent,
    usageLimit: input.usageLimit,
    validUntil: input.validUntil,
    status: input.status
  };
  coupons.unshift(coupon);
  return coupon;
}

export function updateAdminCoupon(code: string, input: Partial<Omit<AdminCoupon, "code">>) {
  const coupon = coupons.find((entry) => entry.code === code);
  if (!coupon) {
    return null;
  }

  Object.assign(coupon, input);
  return coupon;
}

export function removeAdminCoupon(code: string) {
  const index = coupons.findIndex((entry) => entry.code === code);
  if (index < 0) {
    return false;
  }

  coupons.splice(index, 1);
  return true;
}

export function listAdminInventory() {
  return listProducts().map((product) => ({
    id: product.id,
    product: product.name,
    sku: product.slug.toUpperCase().replace(/-/g, "").slice(0, 6),
    category: formatCategoryName(product.category),
    stock: product.stock,
    reserved: Math.max(0, Math.floor(product.stock * 0.08)),
    available: Math.max(0, product.stock - Math.floor(product.stock * 0.08)),
    reorder: Math.max(5, Math.floor(product.stock * 0.2)),
    status: product.stock <= 25 ? "Low Stock" : "In Stock"
  }));
}

export function updateInventoryStock(productId: number, stock: number) {
  const product = getProductById(productId);
  if (!product) {
    return null;
  }

  return updateProduct(productId, { stock });
}
