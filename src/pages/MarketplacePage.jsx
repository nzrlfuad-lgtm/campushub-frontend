import { useEffect, useState } from "react";
import api from "../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AnimatedNumber({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const increment = target / 60;

    const timer = setInterval(() => {
      start += increment;

      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [target]);

  return count;
}
function ProductPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

useEffect(() => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    navigate("/");
    return;
  }

  if (user.role !== "pembeli") {
    navigate("/dashboard");
  }

}, []);
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

const handleOrder = async (product) => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  console.log("PRODUCT:", product);
console.log("SELLER:", product.sellerName);

  if (!user) {
    alert("Silakan login dulu");
    return;
  }

  console.log(
  "TOKEN:",
  localStorage.getItem("token")
);

  try {

   await api.post(
  "/orders",
  {
    productName: product.name,
    buyerName: user.name,
    nim: user.nim,
    sellerName: product.sellerName,
    buyerRealName: user.name,
    quantity: 1,
    type: "marketplace",
  }
);

    alert("Pesanan berhasil dibuat");

  } catch (error) {

    console.log(error);

    alert("Gagal membuat pesanan");

  }
};

console.log(products);
  return (
    <div className="
min-h-screen
bg-gradient-to-br
from-[#eef2ff]
via-[#f8fafc]
to-[#ede9fe]
">

  <div className="relative bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 text-white py-14 px-6 overflow-hidden">

  <button
    onClick={() => navigate("/home")}
    className="
      absolute top-6 left-6
      bg-white text-gray-800
      px-5 py-3 rounded-2xl
      shadow-xl hover:scale-105
      transition font-semibold
    "
  >
    ← Kembali
  </button>

  <div className="absolute top-10 right-10 text-8xl opacity-10">
    🛒
  </div>

  <div className="absolute bottom-5 left-32 text-7xl opacity-10">
    📦
  </div>

  <div className="absolute top-24 left-1/4 text-6xl opacity-10">
    💳
  </div>

  <div className="max-w-5xl mx-auto text-center">

    <h1 className="text-5xl md:text-6xl font-black">
      🛒 Marketplace Mahasiswa
    </h1>

    <p className="mt-4 text-lg text-blue-100">
      Temukan kebutuhan kuliah, buku, alat praktikum,
      dan berbagai produk mahasiswa lainnya.
    </p>

    <div className="grid grid-cols-3 gap-4 mt-8">

      <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
        <h3 className="text-2xl font-bold">
  <AnimatedNumber target={700} />+
</h3>
        <p className="text-sm">
          Produk Aktif
        </p>
      </div>

      <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
        <h3 className="text-2xl font-bold">
  <AnimatedNumber target={500} />+
</h3>
        <p className="text-sm">
          Mahasiswa Aktif
        </p>
      </div>

      <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
        <h3 className="text-2xl font-bold">
          4.9★
        </h3>
        <p className="text-sm">
          Rating
        </p>
      </div>

    </div>

  </div>

</div>

      <div className="max-w-7xl mx-auto p-8">

       <div className="mb-8">

  <h2 className="text-4xl font-black text-gray-800 mb-3">
    🛒 Produk Marketplace
  </h2>

  <p className="text-gray-500 mb-6">
    Temukan berbagai kebutuhan mahasiswa dengan mudah
  </p>

  <input
    type="text"
    placeholder="🔍 Cari produk marketplace..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
      w-full
      bg-white
      border border-gray-200
      rounded-2xl
      px-5 py-4
      shadow-md
      focus:outline-none
      focus:ring-4
      focus:ring-blue-200
      text-lg
    "
  />

</div>

<h2 className="text-4xl font-black text-gray-800 mb-3">
    Produk Yang Tersedia Saat Ini
  </h2>

        <div className="grid md:grid-cols-3 gap-6">

        {products
  .filter(
    (product) =>
      product.type === "marketplace" &&
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
  )
  .map((product) => (
          <div
  key={product.id}
  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
>
  <img
    src={`http://localhost:5000/uploads/${product.image}`}
    alt=""
    className="w-full h-56 object-cover"
  />

  <div className="p-5">

    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
  Produk Mahasiswa
</span>

    <h2 className="text-xl font-bold mb-2">
      {product.name}
    </h2>

    <p className="text-2xl text-blue-600 font-bold mb-3">
      Rp {Number(product.price).toLocaleString("id-ID")}
    </p>

  <p className="text-sm text-gray-500 mb-2">
  👨‍💼 Penjual: {product.sellerRealName}
</p>

    <p className="text-gray-600 text-sm mb-4">
      {product.description}
    </p>

    <button
  onClick={() => handleOrder(product)}

      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
    >
      Pesan Sekarang
    </button>

  </div>
</div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default ProductPage;