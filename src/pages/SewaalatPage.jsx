import { useEffect, useState } from "react";
import api from "../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SewaalatPage() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const user = JSON.parse(
  localStorage.getItem("user")
);

const handleOrder = async (tool) => {

  const location = window.prompt(
    "Masukkan lokasi pengantaran:"
  );

  if (!location || location.trim() === "") {
    alert("Lokasi pengantaran wajib diisi");
    return;
  }

  const confirmOrder = window.confirm(
    `Pesan ${tool.name} dan kirim ke:\n\n${location}?`
  );

  if (!confirmOrder) return;

  try {

    await api.post(
      "/orders",
      {
        productName: tool.name,

        buyerName: user?.name || "Guest",

        buyerRealName:
          user?.name || "Guest",

        nim: user?.nim || "-",

        quantity: 1,

        sellerName:
          tool.sellerName,

        sellerRealName:
          tool.sellerRealName,

        type: "sewaalat",

        note: location,

        status: "Menunggu",
      }
    );

    alert("Pesanan berhasil dibuat");

  } catch (error) {

    console.log(error);

    alert("Gagal membuat pesanan");

  }
};

  const fetchProducts = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      const SewaalatProducts = res.data.filter(
        (product) => product.type === "sewaalat"
      );

      setProducts(
  SewaalatProducts.map(product => ({
    ...product,
  }))
);

    } catch (error) {
      console.log(error);
    }
  };

  const [search, setSearch] = useState("");

  return (
    <div className="
min-h-screen
bg-gradient-to-br
from-[#eef2ff]
via-[#f8fafc]
to-[#ede9fe]
">

      <div className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 text-white py-12 px-6 overflow-hidden">

        <div className="mb-8">
          <button
            onClick={() => navigate("/home")}
            className="
              bg-white text-gray-800
              px-5 py-3 rounded-2xl
              shadow-xl hover:scale-105
              transition font-semibold
            "
          >
            ← Kembali
          </button>
        </div>

        <div className="absolute top-10 right-10 text-8xl opacity-10">
          🧰
        </div>

        <div className="absolute bottom-5 left-20 text-7xl opacity-10">
          💻
        </div>

        <div className="absolute top-24 left-1/4 text-6xl opacity-10">
          📷
        </div>

        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-5xl md:text-6xl font-black">
            🧰 Sewa Barang Kebutuhan Kampus
          </h1>

          <p className="mt-4 text-lg text-green-100">
            Mungkin Kamu Butuh sesuatu,Sewa Aja Yuksss
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8">

            <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
              <h3 className="text-2xl font-bold">
                120+
              </h3>

              <p className="text-sm">
                Barang Tersedia
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
              <h3 className="text-2xl font-bold">
                4.8★
              </h3>

              <p className="text-sm">
                Rating
              </p>
            </div>

   <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
  <h3 className="text-2xl font-bold">
    8 Fakultas
  </h3>

  <p className="text-sm">
    Menggunakan Layanan
  </p>
</div>

          </div>

        </div>

      </div>

      <div className="max-w-6xl mx-auto p-8">

  {/* PRODUK */}
<div className="mb-8">

<div className="mb-8">

  <input
    type="text"
    placeholder="🔍 Cari barang..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="
      w-full
      bg-white
      border border-gray-200
      rounded-2xl
      px-5 py-4
      shadow-md
      focus:outline-none
      focus:ring-4
      focus:ring-green-200
      text-lg
    "
  />

</div>

  <h2 className="text-4xl font-black text-gray-800 mb-3">
    🧰 Produk Yang Tersedia Saat Ini
  </h2>

  <p className="text-gray-500">
    Pilih barang yang ingin kamu sewa untuk kebutuhan kampus
  </p>

</div>

<div className="grid md:grid-cols-2 gap-8">

    {products
  .filter((tool) =>
    tool.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((tool) => (

      <div
        key={tool.id}
        className="
          bg-white rounded-3xl shadow-xl
          overflow-hidden hover:shadow-2xl
          transition duration-300
        "
      >

        <img
          src={`http://localhost:5000/uploads/${tool.image}`}
          alt=""
          className="w-full h-56 object-cover"
        />

        <div className="p-6">

          <div className="flex justify-between items-start">

            <div>

              <h2 className="text-2xl font-bold">
                {tool.name}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                👨‍💼 Pemilik: {tool.sellerRealName}
              </p>

            </div>

            <span className="
              bg-green-100 text-green-600
              px-4 py-1 rounded-full
              text-sm font-semibold
            ">
              Tersedia
            </span>

          </div>

          <p className="text-gray-600 mt-4">
            {tool.description}
          </p>

          <p className="text-3xl font-black text-green-600 mt-5">
            Rp {Number(tool.price).toLocaleString("id-ID")}
            <span className="text-lg font-medium">
              {" "} / hari
            </span>
          </p>

          <button
  onClick={() => handleOrder(tool)}
  className="
    w-full mt-6
    bg-gradient-to-r from-green-600 to-emerald-600
    text-white py-3 rounded-2xl
    font-bold hover:scale-105
    transition
  "
>
  Sewa Sekarang
</button>

        </div>

      </div>

    ))}

  </div>

  {/* INFORMASI PENYEWAAN */}
  <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

    <h2 className="text-2xl font-bold mb-6">
      📌 Informasi Penyewaan
    </h2>

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

      <div className="bg-green-50 p-5 rounded-2xl">
        <h3 className="font-bold text-green-600 mb-2">
          ⚡ Proses Cepat
        </h3>

        <p className="text-gray-600">
          Penyewaan diproses kurang dari 10 menit.
        </p>
      </div>

      <div className="bg-blue-50 p-5 rounded-2xl">
        <h3 className="font-bold text-blue-600 mb-2">
          💰 Pembayaran
        </h3>

        <p className="text-gray-600">
          Pembayaran dilakukan saat pengambilan barang
        </p>
      </div>

      <div className="bg-orange-50 p-5 rounded-2xl">
        <h3 className="font-bold text-orange-600 mb-2">
          🔥 Tips Penyewaan
        </h3>

        <ul className="space-y-2 text-gray-600">
          <li>• Gunakan barang dengan hati-hati</li>
          <li>• Kembalikan tepat waktu</li>
          <li>• Pastikan kondisi barang tetap baik</li>
        </ul>
      </div>

      <div className="bg-purple-50 p-5 rounded-2xl">
        <h3 className="font-bold text-purple-600 mb-2">
          🎯 Barang Populer
        </h3>

        <div className="flex flex-wrap gap-2 mt-3">

          <span className="bg-white px-3 py-2 rounded-xl shadow">
            Kemeja putih
          </span>

          <span className="bg-white px-3 py-2 rounded-xl shadow">
            Celana hitam
          </span>

          <span className="bg-white px-3 py-2 rounded-xl shadow">
            Dasi hitam
          </span>

        </div>

      </div>

    </div>

  </div>

</div>

    </div>
  );
}

export default SewaalatPage;