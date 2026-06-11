import { Plus, Star } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import type { Product } from "../../types";
import { formatMoney } from "../../utils/money";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-soil/10 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative h-72 overflow-hidden bg-oat">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <span className="absolute left-5 top-5 rounded-full bg-cream px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-soil">
            {product.badge}
          </span>
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link to={`/products/${product.slug}`} className="font-display text-2xl font-semibold text-soil hover:text-leaf">
              {product.name}
            </Link>
            <p className="mt-2 text-sm text-soil/58">{product.description}</p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-moss/10 px-3 py-1 text-sm font-bold text-leaf">
            <Star className="h-4 w-4 fill-current" /> {product.rating}
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="font-display text-2xl font-bold text-soil">{formatMoney(product.price)}</p>
            <p className="text-sm text-soil/45"><span className="line-through">{formatMoney(product.mrp)}</span> / {product.unit}</p>
          </div>
          <button
            onClick={() => {
              addItem(product);
              toast.success(`${product.name} added to cart`);
            }}
            className="grid h-12 w-12 place-items-center rounded-full bg-leaf text-white transition hover:bg-soil"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}
