import { ArrowLeft, ShoppingBasket, Star } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { products } from "../../data/products";
import { useCartStore } from "../../store/cartStore";
import { formatMoney } from "../../utils/money";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug) ?? products[0];
  const addItem = useCartStore((state) => state.addItem);

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-soil/60 hover:text-soil">
        <ArrowLeft className="h-4 w-4" /> Back to harvest
      </Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative overflow-hidden rounded-[3rem] bg-oat shadow-soft">
          <img src={product.image} alt={product.name} className="h-[560px] w-full object-cover" />
          <div className="absolute bottom-6 left-6 rounded-[1.5rem] bg-cream/88 p-5 shadow-card backdrop-blur">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-clay">{product.badge}</p>
            <p className="mt-2 text-soil/65">Stock available: {product.stock}</p>
          </div>
        </div>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-leaf/10 px-4 py-2 font-bold text-leaf">
            <Star className="h-4 w-4 fill-current" /> {product.rating} verified reviews
          </div>
          <h1 className="mt-6 font-display text-6xl font-black leading-none tracking-[-0.06em] text-soil md:text-8xl">{product.name}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-soil/66">{product.description} Built into the white-label catalog model with category, variants, images and stock support.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {product.tags.map((tag) => <span key={tag} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-soil/62 shadow-card">{tag}</span>)}
          </div>
          <div className="mt-10 flex flex-col gap-5 rounded-[2rem] border border-soil/10 bg-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-5xl font-black text-soil">{formatMoney(product.price)}</p>
              <p className="mt-1 text-sm text-soil/45"><span className="line-through">{formatMoney(product.mrp)}</span> / {product.unit}</p>
            </div>
            <button
              onClick={() => {
                addItem(product);
                toast.success("Added to cart");
              }}
              className="inline-flex items-center justify-center rounded-full bg-leaf px-7 py-4 font-bold text-white shadow-soft transition hover:bg-soil"
            >
              <ShoppingBasket className="mr-2 h-5 w-5" /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
