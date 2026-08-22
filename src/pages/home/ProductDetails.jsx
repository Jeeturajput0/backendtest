import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Check, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { API_URI, setImageURL } from "../../config";
import ProductGrid from "./ProductGrid";

const productLabel = (value) => (typeof value === "object" ? value?.name || value?.title || "—" : value || "—");

const ProductDetails = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URI}/product/${product_id}`);
        const item = response.data.data;
        setProduct(item);
        setSelectedVariant(item.variations?.[0] || null);
        setQuantity(1);
      } catch (error) {
        console.log(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [product_id]);

  useEffect(() => {
    if (!product) return;
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(`${API_URI}/product`);
        const categoryId = typeof product.category === "object" ? product.category._id : product.category;
        setRelatedProducts((response.data.data || []).filter((item) => {
          const itemCategory = typeof item.category === "object" ? item.category._id : item.category;
          return item._id !== product._id && itemCategory === categoryId;
        }).slice(0, 4));
      } catch (error) { console.log(error); }
    };
    fetchRelatedProducts();
  }, [product]);

  if (loading) return <div className="grid h-screen place-items-center text-xl font-semibold text-slate-600">Loading product…</div>;
  if (!product) return <div className="grid h-screen place-items-center text-xl font-semibold text-slate-600">Product not found</div>;

  const hasVariants = Boolean(product.variations?.length);
  const selectedPrice = selectedVariant?.price ?? product.saleprice;
  const selectedStock = selectedVariant?.stock ?? product.quantity;
  const selectedColor = selectedVariant?.color || product.color;
  const selectedSize = selectedVariant?.size || productLabel(product.size);
  const displayImage = selectedVariant?.image || product.image;
  const maxQuantity = Math.max(1, Number(selectedStock) || 0);

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login", { state: { from: location.pathname } });
    try {
      const response = await axios.post(`${API_URI}/admin/cart`, { product: product._id, quantity, color: selectedColor, size: selectedSize }, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.success) navigate("/cart");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Could not add this product to cart");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(380px,.9fr)] lg:gap-14">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50"><img src={setImageURL(displayImage)} alt={product.name} className="aspect-square w-full object-cover" /></div>
          {hasVariants && <section className="mt-5"><div className="mb-3 flex items-center justify-between"><h2 className="font-extrabold text-slate-900">Choose a variant</h2><span className="text-sm text-slate-500">{product.variations.length} options</span></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{product.variations.map((variant, index) => { const isSelected = selectedVariant === variant; return <button type="button" key={`${variant.sku || "variant"}-${index}`} onClick={() => { setSelectedVariant(variant); setQuantity(1); }} className={`flex min-w-0 items-center gap-3 rounded-2xl border p-2 text-left transition ${isSelected ? "border-orange-500 bg-orange-50 ring-2 ring-orange-100" : "border-slate-200 bg-white hover:border-slate-400"}`}><img src={setImageURL(variant.image || product.image)} alt={`${variant.color || ""} ${variant.size || ""}`} className="h-14 w-14 rounded-xl object-cover" /><span className="min-w-0"><span className="block truncate text-sm font-bold text-slate-900">{variant.color || "Variant"}</span><span className="block truncate text-xs text-slate-500">{variant.size || "One size"} · ₹{variant.price ?? product.saleprice}</span></span></button>; })}</div></section>}
        </motion.div>
        <div className="lg:pt-2"><p className="text-sm font-bold uppercase tracking-[.16em] text-orange-600">{productLabel(product.category)}</p><h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{product.name}</h1><div className="mt-4 flex gap-1">{[1, 2, 3, 4, 5].map((i) => <Star key={i} size={18} className="fill-amber-400 text-amber-400" />)}</div><div className="mt-6 flex items-end gap-3"><h2 className="text-4xl font-extrabold text-orange-600">₹{selectedPrice}</h2>{Number(product.mrp) > Number(selectedPrice) && <p className="pb-1 text-lg text-slate-400 line-through">₹{product.mrp}</p>}</div><p className="mt-5 leading-7 text-slate-600">{product.details}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-4 text-sm"><p><b>Color:</b> {selectedColor}</p><p><b>Size:</b> {selectedSize}</p><p><b>Brand:</b> {productLabel(product.brand)}</p><p className={selectedStock > 0 ? "text-emerald-700" : "text-rose-600"}><b>Availability:</b> {selectedStock > 0 ? `${selectedStock} in stock` : "Out of stock"}</p></div>
          <div className="mt-8 flex flex-wrap items-center gap-4"><div className="flex items-center rounded-xl border border-slate-200 bg-white"><button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="p-3 text-slate-700"><Minus size={19} /></button><span className="grid w-10 place-items-center font-bold">{quantity}</span><button type="button" onClick={() => setQuantity((current) => Math.min(maxQuantity, current + 1))} disabled={!selectedStock} className="p-3 text-slate-700 disabled:text-slate-300"><Plus size={19} /></button></div><button type="button" onClick={addToCart} disabled={!selectedStock} className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-7 py-3.5 font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"><ShoppingBag size={19} />Add to cart</button><button type="button" className="rounded-xl border border-slate-200 p-3.5 text-slate-700 transition hover:bg-rose-50 hover:text-rose-600"><Heart size={19} /></button></div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2"><div className="flex gap-3"><Truck className="text-orange-600" /><div><h3 className="font-bold">Free delivery</h3><p className="text-sm text-slate-500">Dispatch within 24 hours</p></div></div><div className="flex gap-3"><ShieldCheck className="text-orange-600" /><div><h3 className="font-bold">Quality assured</h3><p className="text-sm text-slate-500">7 days return policy</p></div></div></div>
        </div>
      </div>
      <section className="mt-20"><div className="mb-8 flex items-center justify-between"><h2 className="text-3xl font-extrabold">Related Products</h2><div className="flex gap-2 text-emerald-600"><Check />Curated for you</div></div><ProductGrid products={relatedProducts} /></section>
    </div>
  );
};

export default ProductDetails;
