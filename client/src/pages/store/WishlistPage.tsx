import { Heart, ShoppingBasket, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import { useWishlistStore } from "../../store/wishlistStore";
import { formatMoney } from "../../utils/money";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const addCartItem = useCartStore((state) => state.addItem);

  return (
    <section className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-5 shadow-[0_12px_30px_rgba(48,37,29,0.06)] sm:p-6">
        <div className="text-sm text-soil/50">Home &gt; Wishlist</div>
        <div className="mt-4 flex items-center gap-3">
          <Heart className="h-6 w-6 text-[#ff7b47]" />
          <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-soil">My Wishlist</h1>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-[1.4rem] border border-soil/8 bg-white shadow-[0_8px_18px_rgba(48,37,29,0.04)]">
              <img src={product.image} alt={product.name} className="h-44 w-full object-cover" />
              <div className="p-4">
                <Link to={`/products/${product.slug}`} className="text-lg font-semibold text-soil">
                  {product.name}
                </Link>
                <p className="mt-1 text-sm text-soil/55">{product.unit}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-lg font-bold text-soil">{formatMoney(product.price)}</span>
                  <span className="text-sm text-soil/40 line-through">{formatMoney(product.mrp)}</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      addCartItem(product);
                      toast.success(`${product.name} added to cart`);
                    }}
                    className="flex-1 rounded-[0.85rem] bg-[#0e8a66] px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white"
                  >
                    <ShoppingBasket className="mr-1 inline h-4 w-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="grid h-10 w-10 place-items-center rounded-[0.85rem] border border-soil/10 text-soil/55"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
