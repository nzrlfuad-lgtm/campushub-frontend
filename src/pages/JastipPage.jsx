import axios from "axios";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AnimatedNumber({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current += Math.ceil(target / 50);

      if (current >= target) {
        current = target;
        clearInterval(interval);
      }

      setCount(current);
    }, 30);

    return () => clearInterval(interval);
  }, [target]);

  return <>{count}</>;
}
function JastipPage() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [jastipData, setJastipData] = useState({
    itemName: "",
    location: "",
    quantity: 1,
    note: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

  setLoading(true);

  try {

await api.post(
  "/orders",
  {
    productName: `Jastip: ${jastipData.itemName}`,
    buyerName: user?.name || user?.nim,
    nim: user?.nim,
    buyerRealName: user.name,

    quantity: jastipData.quantity,
    building: jastipData.location,
    note: jastipData.note,
    type: "jastip",
    status: "Diproses",
  }
);

      alert("Pesanan jastip berhasil");
      setLoading(false);
    } 
    
    catch (error) {

  console.log(error.response?.data);

  alert(
    error.response?.data?.message ||
    "Terjadi error"
  );

  setLoading(false);
}

  };

    return (
  <div className="
min-h-screen
bg-gradient-to-br
from-[#eef2ff]
via-[#f8fafc]
to-[#ede9fe]
">
    <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white py-12 px-6">
      <div className="absolute top-10 right-10 text-8xl opacity-10">
  🍔
</div>

<div className="absolute bottom-5 left-32 text-7xl opacity-10">
  🥤
</div>

<div className="absolute top-24 left-1/4 text-6xl opacity-10">
  🍟
</div>
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

  <div className="max-w-4xl mx-auto text-center">

    <h1 className="text-5xl md:text-6xl font-black">
      🍔 Jastip Jajanan Kampus
    </h1>

    <p className="mt-4 text-lg text-orange-100">
      Titip beli makanan dan minuman favoritmu tanpa perlu antre.
    </p>

    <div className="grid grid-cols-3 gap-4 mt-8">

      <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
        <h3 className="text-2xl font-bold">
     <AnimatedNumber target={250} />+
    </h3>
        <p className="text-sm">Pesanan Hari Ini</p>
      </div>

      <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
        <h3 className="text-2xl font-bold">
    <AnimatedNumber target={15} />
    </h3>
        <p className="text-sm">Penitip Aktif</p>
      </div>

      <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
        <h3 className="text-2xl font-bold">4.9★</h3>
        <p className="text-sm">Rating</p>
      </div>

  </div>
  </div>

</div>
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 p-8">

    <div className="bg-white rounded-3xl shadow-xl p-8">
<h2 className="text-2xl font-bold mb-6">
  Buat Pesanan Jastip
</h2>

<div className="space-y-5">

  <div>
    <label className="font-medium">
      Nama Makanan / Minuman
    </label>

    <input
      type="text"
      placeholder="Contoh: Es Teh Jumbo"
      className="w-full mt-2 border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
      onChange={(e)=>
        setJastipData({
          ...jastipData,
          itemName:e.target.value
        })
      }
    />
  </div>

  <div>
    <label className="font-medium">
      Lokasi Kantin
    </label>

    <input
      type="text"
      placeholder="Contoh: Kantin Teknik"
      className="w-full mt-2 border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
      onChange={(e)=>
        setJastipData({
          ...jastipData,
          location:e.target.value
        })
      }
    />
  </div>

  <div>
    <label className="font-medium">
      Jumlah
    </label>

    <input
      type="number"
      min="1"
      className="w-full mt-2 border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
      onChange={(e)=>
        setJastipData({
          ...jastipData,
          quantity:e.target.value
        })
      }
    />
  </div>

  <div>
    <label className="font-medium">
      Lokasi Penerima
    </label>

    <textarea
      rows="4"
      placeholder="Diantar kemana?"
      className="w-full mt-2 border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
      onChange={(e)=>
        setJastipData({
          ...jastipData,
          note:e.target.value
        })
      }
    />
  </div>

  <button
    onClick={handleSubmit}
    className="
      w-full
      bg-gradient-to-r
      from-orange-500
      to-red-500
      text-white
      py-4
      rounded-2xl
      font-bold
      text-lg
      shadow-lg
      hover:scale-105
      transition
      disabled:opacity-50
    "
  >
     {loading ? "Memproses..." : "Pesan Sekarang"}
  </button>

      <div className="mt-8">

  <div className="space-y-3">

  </div>

</div>

</div>

    </div>

    <div className="bg-white rounded-3xl shadow-xl p-8">

  <h2 className="text-2xl font-bold mb-6">
    📌 Informasi Layanan
  </h2>

  <div className="space-y-5">

    <div className="bg-orange-50 p-5 rounded-2xl">
      <h3 className="font-bold text-orange-600 mb-2">
        ⚡ Estimasi Proses
      </h3>

      <p className="text-gray-600">
        Pesanan biasanya diproses dalam waktu
        5 - 15 menit setelah dikirim.
      </p>
    </div>

    <div className="bg-green-50 p-5 rounded-2xl">
      <h3 className="font-bold text-green-600 mb-2">
        💰 Pembayaran
      </h3>

      <p className="text-gray-600">
        Pembayaran dilakukan setelah pesanan
        diterima oleh penitip.
      </p>
    </div>

    <div className="bg-blue-50 p-5 rounded-2xl">
      <h3 className="font-bold text-blue-600 mb-2">
        🎯 Tips Pemesanan
      </h3>

      <ul className="space-y-2 text-gray-600">
        <li>• Tulis nama menu dengan jelas</li>
        <li>• Cantumkan lokasi kantin yang benar</li>
        <li>• Tambahkan catatan jika ada request khusus</li>
        <li>• Pastikan jumlah pesanan sesuai</li>
      </ul>
    </div>

    <div className="bg-purple-50 p-5 rounded-2xl">
      <h3 className="font-bold text-purple-600 mb-2">
        🔥 Menu Populer
      </h3>

      <div className="flex flex-wrap gap-2 mt-3">

        <span className="bg-white px-3 py-2 rounded-xl shadow">
          Es Teh Jumbo
        </span>

        <span className="bg-white px-3 py-2 rounded-xl shadow">
          Ayam Geprek
        </span>

        <span className="bg-white px-3 py-2 rounded-xl shadow">
          Mie Pedas
        </span>

        <span className="bg-white px-3 py-2 rounded-xl shadow">
          Kopi Susu
        </span>

        <span className="bg-white px-3 py-2 rounded-xl shadow">
          Batagor
        </span>

        <span className="bg-white px-3 py-2 rounded-xl shadow">
          Rokok
        </span>

      </div>
    </div>

      </div>

    </div>

  </div>

</div>  );
}

export default JastipPage;