import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Bold,
  ChevronRight,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Plus,
  Underline,
  Upload,
  X
} from "lucide-react";
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
  shortDescription: string;
  subCategory: string;
  brand: string;
  minimumOrderQuantity: string;
  hsnCode: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  isOrganic: boolean;
  isFeatured: boolean;
  allowCashOnDelivery: boolean;
};

const emptyForm: ProductFormState = {
  name: "",
  slug: "",
  category: "fruits",
  price: "",
  mrp: "",
  unit: "kg",
  rating: "4.5",
  stock: "",
  badge: "New",
  image: "",
  color: "#0e8a66",
  description: "",
  tags: "",
  isActive: true,
  shortDescription: "",
  subCategory: "Apples",
  brand: "Shop Organic",
  minimumOrderQuantity: "1",
  hsnCode: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  isOrganic: true,
  isFeatured: false,
  allowCashOnDelivery: false
};

const categoryOptions: Array<{ value: AdminProductInput["category"]; label: string; subCategories: string[] }> = [
  { value: "fruits", label: "Fruits", subCategories: ["Apples", "Bananas", "Citrus", "Berries"] },
  { value: "vegetables", label: "Vegetables", subCategories: ["Leafy Greens", "Roots", "Tomatoes", "Peppers"] },
  { value: "grains", label: "Grains", subCategories: ["Rice", "Millets", "Pulses", "Flours"] },
  { value: "pantry", label: "Pantry", subCategories: ["Oils", "Spices", "Sweeteners", "Dry Goods"] }
];

const unitOptions = ["kg", "g", "L", "ml", "pack", "piece"];
const imageFallback = "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=900&q=80";

function titleCase(value: string) {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

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
    isActive: product.isActive,
    shortDescription: product.description,
    subCategory: categoryOptions.find((entry) => entry.value === product.category)?.subCategories[0] ?? "General",
    brand: "Shop Organic",
    minimumOrderQuantity: "1",
    hsnCode: "",
    metaTitle: product.name,
    metaDescription: product.description,
    metaKeywords: product.tags.join(", "),
    isOrganic: true,
    isFeatured: product.badge.toLowerCase().includes("best") || product.badge.toLowerCase().includes("featured"),
    allowCashOnDelivery: false
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
  const actionLabel = isEdit ? "Save Changes" : "Publish Product";
  const categoryMeta = categoryOptions.find((entry) => entry.value === form.category) ?? categoryOptions[0];

  const imageGallery = useMemo(() => {
    const baseImage = form.image.trim() || imageFallback;
    return [baseImage, baseImage, baseImage];
  }, [form.image]);

  const tagItems = useMemo(
    () =>
      form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    [form.tags]
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
      image: form.image.trim() || imageFallback,
      color: form.color.trim(),
      description: form.description.trim(),
      tags: tagItems,
      isActive: form.isActive
    });
  }

  return (
    <div className="space-y-5 text-soil">
      <section className="flex flex-col gap-4 rounded-[22px] bg-white px-6 py-5 shadow-[0_12px_30px_rgba(48,37,29,0.06)]">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-soil/55">
              <span>Dashboard</span>
              <ChevronRight className="h-4 w-4" />
              <span>Products</span>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-soil">{pageTitle}</span>
            </div>
            <h1 className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] text-soil">{pageTitle}</h1>
            <p className="mt-1 text-sm text-soil/70">
              {isEdit ? "Update the product details and publish the latest changes." : "Add new product to your store."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="inline-flex items-center gap-2 self-start rounded-[12px] border border-soil/10 bg-white px-4 py-2.5 text-sm font-medium text-soil shadow-[0_4px_10px_rgba(48,37,29,0.03)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </button>
        </div>
      </section>

      <form id="product-form" onSubmit={handleSubmit} className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-5">
          <Panel title="Product Information">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Product Name"
                required
                value={form.name}
                onChange={(value) => updateField("name", value)}
                placeholder="Organic Red Apples"
              />
              <SelectField
                label="Category"
                required
                value={form.category}
                options={categoryOptions.map((option) => ({ value: option.value, label: option.label }))}
                onChange={(value) => {
                  const nextCategory = value as AdminProductInput["category"];
                  const nextSubCategory = categoryOptions.find((entry) => entry.value === nextCategory)?.subCategories[0] ?? "";
                  updateField("category", nextCategory);
                  updateField("subCategory", nextSubCategory);
                }}
              />
              <TextField
                label="Price (INR)"
                required
                value={form.price}
                onChange={(value) => updateField("price", value)}
                prefix="Rs."
                placeholder="325"
              />
              <TextField
                label="Discount Price (Optional)"
                value={form.mrp}
                onChange={(value) => updateField("mrp", value)}
                prefix="Rs."
                placeholder="299"
              />
              <TextField
                label="SKU"
                required
                value={form.slug}
                onChange={(value) => updateField("slug", value)}
                placeholder="ORG-APP-001"
              />
              <TextField
                label="Stock Quantity"
                required
                value={form.stock}
                onChange={(value) => updateField("stock", value)}
                placeholder="85"
              />
            </div>

            <div className="mt-4">
              <TextField
                label="Short Description"
                value={form.shortDescription}
                onChange={(value) => updateField("shortDescription", value)}
                placeholder="Fresh and crisp apples full of nutrients."
              />
            </div>

            <div className="mt-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-soil/72">Full Description</span>
                <div className="overflow-hidden rounded-[14px] border border-soil/10 bg-white">
                  <div className="flex flex-wrap items-center gap-2 border-b border-soil/8 px-3 py-2.5 text-soil/60">
                    {[
                      Bold,
                      Italic,
                      Underline,
                      List,
                      ListOrdered,
                      Link2
                    ].map((Icon, index) => (
                      <span key={index} className="grid h-8 w-8 place-items-center rounded-[10px] border border-soil/8 bg-[#fbfaf8]">
                        <Icon className="h-4 w-4" />
                      </span>
                    ))}
                  </div>
                  <textarea
                    rows={6}
                    value={form.description}
                    onChange={(event) => updateField("description", event.target.value)}
                    placeholder="Describe the product, sourcing story, and why customers will love it."
                    className="w-full resize-none border-0 bg-white px-4 py-3 text-sm leading-7 outline-none"
                  />
                </div>
              </label>
            </div>
          </Panel>

          <Panel title="SEO Information (Optional)">
            <div className="grid gap-4">
              <TextField
                label="Meta Title"
                value={form.metaTitle}
                onChange={(value) => updateField("metaTitle", value)}
                placeholder="Organic Red Apples - Fresh and Healthy"
              />
              <TextField
                label="Meta Description"
                value={form.metaDescription}
                onChange={(value) => updateField("metaDescription", value)}
                placeholder="Buy organic red apples online. Fresh, healthy and chemical free apples."
              />
              <TextField
                label="Meta Keywords"
                value={form.metaKeywords}
                onChange={(value) => updateField("metaKeywords", value)}
                placeholder="organic apples, red apples, fresh apples, healthy fruits"
              />
            </div>
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel title="Product Images">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {imageGallery.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-[16px] border border-soil/10 bg-[#f4f5f0]">
                  <img src={image} alt={`${form.name || "Product"} preview ${index + 1}`} className="h-28 w-full object-cover" />
                  <button
                    type="button"
                    className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/95 text-soil shadow-[0_4px_10px_rgba(48,37,29,0.12)]"
                    aria-label="Preview image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <label className="grid h-28 cursor-pointer place-items-center rounded-[16px] border border-dashed border-soil/20 bg-[#fbfaf8] text-center text-soil/60">
                <div className="grid justify-items-center gap-2 px-3">
                  <Upload className="h-5 w-5" />
                  <span className="text-sm font-medium">Upload More</span>
                </div>
              </label>
            </div>
            <p className="mt-3 text-xs text-soil/50">Upload up to 5 images. JPG, PNG or WEBP. For now, use the Image URL field below.</p>
            <div className="mt-4">
              <TextField
                label="Primary Image URL"
                value={form.image}
                onChange={(value) => updateField("image", value)}
                placeholder="https://..."
              />
            </div>
          </Panel>

          <Panel title="Category & Tags">
            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                label="Category"
                required
                value={form.category}
                options={categoryOptions.map((option) => ({ value: option.value, label: option.label }))}
                onChange={(value) => updateField("category", value as AdminProductInput["category"])}
              />
              <SelectField
                label="Sub Category"
                value={form.subCategory}
                options={categoryMeta.subCategories.map((option) => ({ value: option, label: option }))}
                onChange={(value) => updateField("subCategory", value)}
              />
            </div>

            <div className="mt-4 grid gap-2">
              <span className="text-sm font-medium text-soil/72">Tags</span>
              <div className="flex min-h-[52px] flex-wrap items-center gap-2 rounded-[14px] border border-soil/10 bg-white px-3 py-2.5">
                {tagItems.length > 0 ? (
                  tagItems.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-[#e9f6ee] px-3 py-1 text-xs font-medium text-[#157c57]">
                      {titleCase(tag)}
                      <X className="h-3 w-3" />
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-soil/35">Add comma separated tags below</span>
                )}
              </div>
              <input
                value={form.tags}
                onChange={(event) => updateField("tags", event.target.value)}
                className="rounded-[14px] border border-soil/10 bg-white px-4 py-3 text-sm outline-none"
                placeholder="Organic, Red Apple, Fresh"
              />
            </div>
          </Panel>

          <Panel title="Product Details">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Brand"
                value={form.brand}
                onChange={(value) => updateField("brand", value)}
                placeholder="Shop Organic"
              />
              <SelectField
                label="Unit"
                value={form.unit}
                options={unitOptions.map((option) => ({ value: option, label: option }))}
                onChange={(value) => updateField("unit", value)}
              />
              <TextField
                label="Minimum Order Quantity"
                value={form.minimumOrderQuantity}
                onChange={(value) => updateField("minimumOrderQuantity", value)}
                placeholder="1"
              />
              <TextField
                label="HSN Code (Optional)"
                value={form.hsnCode}
                onChange={(value) => updateField("hsnCode", value)}
                placeholder="0808"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-5">
              <CheckboxField
                label="This is Organic Product"
                checked={form.isOrganic}
                onChange={(value) => updateField("isOrganic", value)}
              />
              <CheckboxField
                label="This is Featured Product"
                checked={form.isFeatured}
                onChange={(value) => {
                  updateField("isFeatured", value);
                  updateField("badge", value ? "Featured" : form.badge || "New");
                }}
              />
              <CheckboxField
                label="Allow Cash on Delivery"
                checked={form.allowCashOnDelivery}
                onChange={(value) => updateField("allowCashOnDelivery", value)}
              />
            </div>
          </Panel>

          <Panel title="Product Status">
            <div className="grid gap-4">
              <SelectField
                label="Status"
                required
                value={form.isActive ? "Active" : "Inactive"}
                options={[
                  { value: "Active", label: "Active" },
                  { value: "Inactive", label: "Inactive" }
                ]}
                onChange={(value) => updateField("isActive", value === "Active")}
              />
              <div className="rounded-[14px] border border-[#e4efe8] bg-[#f8fcf9] px-4 py-3 text-sm text-soil/70">
                <div className="flex items-center justify-between gap-3">
                  <span>Preview badge</span>
                  <span className="rounded-full bg-[#e5f7e8] px-2.5 py-1 text-xs font-semibold text-[#0e8a66]">
                    {form.badge || "New"}
                  </span>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </form>

      <div className="sticky bottom-0 z-10 flex flex-col gap-3 rounded-[20px] border border-soil/8 bg-white/95 px-5 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          className="rounded-[12px] border border-soil/10 bg-white px-5 py-3 text-sm font-medium text-soil"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => setForm(emptyForm)}
          className="rounded-[12px] bg-[#0c7a52] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(12,122,82,0.18)]"
        >
          Save as Draft
        </button>
        <button
          type="submit"
          form="product-form"
          disabled={saveMutation.isPending}
          className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-[#ff7b47] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(255,123,71,0.22)] disabled:opacity-60"
        >
          {saveMutation.isPending ? <ImagePlus className="h-4 w-4 animate-pulse" /> : <Plus className="h-4 w-4" />}
          {saveMutation.isPending ? "Saving..." : actionLabel}
        </button>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[20px] border border-soil/8 bg-white p-5 shadow-[0_8px_22px_rgba(48,37,29,0.04)]">
      <h2 className="text-[1.05rem] font-semibold tracking-[-0.03em] text-soil">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  required,
  prefix
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  prefix?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-soil/72">
        {label}
        {required ? <span className="ml-1 text-[#ff7b47]">*</span> : null}
      </span>
      <div className="flex overflow-hidden rounded-[12px] border border-soil/10 bg-white">
        {prefix ? (
          <span className="grid place-items-center border-r border-soil/8 px-3 text-sm text-soil/55">{prefix}</span>
        ) : null}
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full border-0 px-4 py-3 text-sm outline-none"
        />
      </div>
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
  required
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-soil/72">
        {label}
        {required ? <span className="ml-1 text-[#ff7b47]">*</span> : null}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-[12px] border border-soil/10 bg-white px-4 py-3 text-sm outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function CheckboxField({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-soil/78">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-soil/20 text-[#0e8a66] focus:ring-[#0e8a66]"
      />
      <span>{label}</span>
    </label>
  );
}
