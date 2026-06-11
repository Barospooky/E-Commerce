import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAdminProduct,
  fetchAdminProduct,
  updateAdminProduct,
  type AdminProductInput,
  type ApiProduct
} from "../api/products";
import { useAdminSessionStore } from "../store/adminSessionStore";

type ProductFormState = {
  name: string;
  slug: string;
  category: AdminProductInput["category"];
  price: string;
  mrp: string;
  unit: string;
  rating: string;
  stock: string;
  badge: string;
  image: string;
  color: string;
  description: string;
  tags: string;
  isActive: boolean;
};

const emptyForm: ProductFormState = {
  name: "",
  slug: "",
  category: "fruits",
  price: "",
  mrp: "",
  unit: "1 kg",
  rating: "4.5",
  stock: "",
  badge: "New",
  image: "",
  color: "#0e8a66",
  description: "",
  tags: "",
  isActive: true
};

function formFromProduct(product: ApiProduct): ProductFormState {
  return {
    name: product.name,
    slug: product.slug,
    category: product.category,
    price: String(product.price),
    mrp: String(product.mrp),
    unit: product.unit,
    rating: String(product.rating),
    stock: String(product.stock),
    badge: product.badge,
    image: product.image,
    color: product.color,
    description: product.description,
    tags: product.tags.join(", "),
    isActive: product.isActive
  };
}

export default function AdminAddProductPage() {
  const token = useAdminSessionStore((state) => state.accessToken);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.productId ? Number(params.productId) : null;
  const isEdit = Number.isFinite(productId ?? NaN);

  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [dirty, setDirty] = useState(false);

  const productQuery = useQuery({
    queryKey: ["admin-product", productId],
    queryFn: () => fetchAdminProduct(token ?? "", productId ?? 0),
    enabled: Boolean(token && isEdit && productId)
  });

  useEffect(() => {
    if (productQuery.data?.data && !dirty) {
      setForm(formFromProduct(productQuery.data.data));
    }
  }, [dirty, productQuery.data?.data]);

  const saveMutation = useMutation({
    mutationFn: async (payload: AdminProductInput) => {
      if (isEdit && productId) {
        return updateAdminProduct(token ?? "", productId, payload);
      }

      return createAdminProduct(token ?? "", payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-product", productId] });
      navigate("/admin/products", { replace: true });
    }
  });

  const pageTitle = isEdit ? "Edit Product" : "Add Product";
  const actionLabel = isEdit ? "Save Changes" : "Add Product";

  const preview = useMemo(
    () => ({
      name: form.name || "Organic Product",
      category: form.category,
      price: form.price || "0",
      stock: form.stock || "0",
      badge: form.badge || "New",
      image: form.image || "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=900&q=80"
    }),
    [form.badge, form.category, form.image, form.name, form.price, form.stock]
  );

  function updateField<K extends keyof ProductFormState>(key: K, value: ProductFormState[K]) {
    setDirty(true);
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await saveMutation.mutateAsync({
      name: form.name.trim(),
      slug: form.slug.trim() || undefined,
      category: form.category,
      price: Number(form.price),
      mrp: Number(form.mrp),
      unit: form.unit.trim(),
      rating: Number(form.rating),
      stock: Number(form.stock),
      badge: form.badge.trim(),
      image: form.image.trim(),
      color: form.color.trim(),
      description: form.description.trim(),
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      isActive: form.isActive
    });
  }

  return (
    <div className="grid gap-4 text-soil xl:grid-cols-[1.08fr_0.92fr]">
      <section className="rounded-[20px] bg-white p-5 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#0e8a66]">Products</p>
            <h1 className="mt-2 text-[1.7rem] font-semibold tracking-[-0.04em] text-soil">{pageTitle}</h1>
            <p className="mt-1 text-sm text-soil/70">{isEdit ? "Update the existing product details." : "Add new product to your store."}</p>
          </div>
          <button
            type="submit"
            form="product-form"
            disabled={saveMutation.isPending}
            className="rounded-[12px] bg-[#ff7b47] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(255,123,71,0.18)] disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            {saveMutation.isPending ? "Saving..." : actionLabel}
          </button>
        </div>

        <form id="product-form" onSubmit={handleSubmit} className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-3">
            <SectionInput label="Product Name" value={form.name} onChange={(value) => updateField("name", value)} />
            <div className="grid gap-3 md:grid-cols-2">
              <SectionInput label="Price (USD)" value={form.price} onChange={(value) => updateField("price", value)} />
              <SectionInput label="SKU" value={form.slug} onChange={(value) => updateField("slug", value)} />
            </div>
            <SectionInput
              label="Short Description"
              value={form.description}
              onChange={(value) => updateField("description", value)}
            />
            <div className="rounded-[16px] border border-soil/8 bg-[#faf8f4] p-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-soil/70">Full Description</span>
                <div className="flex items-center gap-2 text-soil/45">
                  <span className="grid h-7 w-7 place-items-center rounded-md border border-soil/8">B</span>
                  <span className="grid h-7 w-7 place-items-center rounded-md border border-soil/8">I</span>
                  <span className="grid h-7 w-7 place-items-center rounded-md border border-soil/8">U</span>
                </div>
              </div>
              <textarea
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
                rows={5}
                className="mt-3 w-full resize-none rounded-[12px] border border-soil/8 bg-white px-4 py-3 text-sm outline-none"
              />
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <SelectField
                label="Category"
                value={form.category}
                options={["fruits", "vegetables", "grains", "pantry"]}
                onChange={(value) => updateField("category", value as AdminProductInput["category"])}
              />
              <SectionInput label="Brand Color" value={form.color} onChange={(value) => updateField("color", value)} />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <SectionInput label="Stock" value={form.stock} onChange={(value) => updateField("stock", value)} />
              <SelectField
                label="Status"
                value={form.isActive ? "Active" : "Inactive"}
                options={["Active", "Inactive"]}
                onChange={(value) => updateField("isActive", value === "Active")}
              />
            </div>
            <SectionInput label="Tags" value={form.tags} onChange={(value) => updateField("tags", value)} />
            <SectionInput label="Image URL" value={form.image} onChange={(value) => updateField("image", value)} />
            <div className="grid gap-3 md:grid-cols-2">
              <SectionInput label="Unit" value={form.unit} onChange={(value) => updateField("unit", value)} />
              <SectionInput label="Rating" value={form.rating} onChange={(value) => updateField("rating", value)} />
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-[18px] border border-soil/8 bg-white p-4 shadow-[0_8px_18px_rgba(48,37,29,0.04)]">
              <div className="flex items-center justify-between">
                <h2 className="text-[1rem] font-semibold text-soil">Product Images</h2>
                <span className="rounded-full bg-[#e5f7e8] px-2.5 py-1 text-[0.72rem] font-medium text-[#0e8a66]">Preview</span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden rounded-[14px] border border-soil/8 bg-[linear-gradient(135deg,#e3f5df,#fff2df)]"
                  />
                ))}
              </div>

              <div className="mt-3 grid h-[150px] place-items-center rounded-[18px] border border-dashed border-soil/15 bg-[#faf8f4] text-center">
                <div className="grid place-items-center gap-2 text-soil/55">
                  <ImagePlus className="h-6 w-6" />
                  <span className="text-sm font-medium">Upload Images</span>
                  <span className="text-xs">Paste image URLs into the form on the left</span>
                </div>
              </div>
            </div>

            <div className="grid gap-3 rounded-[18px] border border-soil/8 bg-white p-4 shadow-[0_8px_18px_rgba(48,37,29,0.04)]">
              <div className="flex items-center justify-between">
                <h2 className="text-[1rem] font-semibold text-soil">Quick Summary</h2>
                <span className="text-xs font-medium text-soil/45">Live preview</span>
              </div>
              <div className="space-y-3">
                <div className="overflow-hidden rounded-[16px] border border-soil/8 bg-[#faf8f4]">
                  <img src={preview.image} alt={preview.name} className="h-44 w-full object-cover" />
                </div>
                <div>
                  <p className="text-[1rem] font-semibold text-soil">{preview.name}</p>
                  <p className="mt-1 text-sm text-soil/70">
                    {preview.category} - {form.unit || "1 kg"} - {form.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
                <div className="grid gap-2 text-sm text-soil/70">
                  <InfoRow label="Price" value={`₹${form.price || "0"}`} />
                  <InfoRow label="MRP" value={`₹${form.mrp || "0"}`} />
                  <InfoRow label="Stock" value={form.stock || "0"} />
                  <InfoRow label="Badge" value={preview.badge} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="aspect-square rounded-[14px] bg-[linear-gradient(135deg,#eff7e8,#fff6e7)] shadow-[0_8px_18px_rgba(48,37,29,0.04)]" />
              ))}
            </div>
          </div>
        </form>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="rounded-[12px] border border-soil/8 bg-white px-4 py-2.5 text-sm text-soil"
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-[12px] border border-soil/8 bg-[#f8f7f3] px-4 py-2.5 text-sm text-soil"
            onClick={() => setForm(emptyForm)}
          >
            Reset
          </button>
          <button
            type="submit"
            form="product-form"
            disabled={saveMutation.isPending}
            className="rounded-[12px] bg-[#0e8a66] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(14,138,102,0.16)] disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            {saveMutation.isPending ? "Saving..." : actionLabel}
          </button>
        </div>
      </section>
    </div>
  );
}

function SectionInput({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-soil/70">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="rounded-[12px] border border-soil/8 bg-[#faf8f4] px-4 py-3 text-sm outline-none" />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-soil/70">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-[12px] border border-soil/8 bg-[#faf8f4] px-4 py-3 text-sm outline-none">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-[12px] bg-[#faf8f4] px-3 py-2.5">
      <span>{label}</span>
      <span className="font-medium text-soil">{value}</span>
    </div>
  );
}
