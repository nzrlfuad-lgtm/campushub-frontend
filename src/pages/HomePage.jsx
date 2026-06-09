import Navbar from "../components/Navbar";
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

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br
from-[#eef2ff]
via-[#f8fafc]
to-[#ede9fe] overflow-x-hidden">

      <Navbar />

      <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white py-20 md:py-36 relative overflow-hidden">

  <div className="max-w-6xl mx-auto px-6 text-center">

    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight break-words">
      Semua Kebutuhan Kampus
      <br />
      Dalam Satu Platform
    </h1>

    <p className="text-base sm:text-lg md:text-xl text-blue-100 mt-8 max-w-3xl mx-auto px-2">
      Marketplace, jasa print, jastip, dan penyewaan barang
      kampus untuk mahasiswa yang lebih produktif.
    </p>

    <div className="flex flex-col md:flex-row justify-center gap-5 mt-10">

 <button className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:scale-105 transition-all duration-300">
  Mulai Sekarang
</button>

      <button className="border border-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-blue-700 hover:scale-105 transition-all duration-300">
        Pelajari Lebih Lanjut
      </button>

    </div>

  </div>

    <div className="max-w-6xl mx-auto px-6 relative z-10 mt-12">

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

    <div className="bg-white p-8 rounded-3xl shadow-2xl text-center">
     <h3 className="text-5xl font-bold text-blue-600">
  <AnimatedNumber target={500} />+
</h3>
      <p className="text-gray-600 mt-3 font-medium">
        Mahasiswa Aktif
      </p>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-2xl text-center">
 <h3 className="text-5xl font-bold text-green-600">
  <AnimatedNumber target={1000} />+
</h3>
      <p className="text-gray-600 mt-3 font-medium">
        Pesanan Selesai
      </p>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-2xl text-center">
      <h3 className="text-5xl font-bold text-purple-600">
  <AnimatedNumber target={700} />+
</h3>
      <p className="text-gray-600 mt-3 font-medium">
        Produk Marketplace
      </p>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-2xl text-center">
      <h3 className="text-5xl font-bold text-orange-600">
  <AnimatedNumber target={24} />/7
</h3>
      <p className="text-gray-600 mt-3 font-medium">
        Layanan Online
      </p>
    </div>

  </div>

</div>
</div>

    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

  <h2 className="text-3xl font-bold mb-4">
    Apa itu CampusHub?
  </h2>

  <p className="text-lg text-gray-700 mb-10">
    CampusHub adalah platform digital
    yang membantu mahasiswa dalam
    jual beli produk, jasa print,
    jastip, dan penyewaan barang kampus.
  </p>

 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">

  <div className="bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
    <div className="text-5xl mb-4">🛒</div>

    <h3 className="font-bold text-xl mb-3">
      Marketplace
    </h3>

    <p className="text-gray-500">
      Jual beli kebutuhan mahasiswa dengan mudah.
    </p>
  </div>

  <div className="bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
    <div className="text-5xl mb-4">🖨️</div>

    <h3 className="font-bold text-xl mb-3">
      Jasa Print
    </h3>

    <p className="text-gray-500">
      Upload file dan cetak tanpa antre.
    </p>
  </div>

  <div className="bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
    <div className="text-5xl mb-4">🍔</div>

    <h3 className="font-bold text-xl mb-3">
      Jastip
    </h3>

    <p className="text-gray-500">
      Titip beli makanan dan kebutuhan harian.
    </p>
  </div>

  <div className="bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
    <div className="text-5xl mb-4">🧰</div>

    <h3 className="font-bold text-xl mb-3">
      Sewa Barang
    </h3>

    <p className="text-gray-500">
      Penyewaan barang praktikum dan kegiatan kampus.
    </p>
  </div>

</div>

    <div className="max-w-6xl mx-auto mt-24 px-6">

  <h2 className="text-4xl font-bold text-center mb-12">
    Kenapa Memilih CampusHub?
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

    <div className="bg-white p-8 rounded-3xl shadow-lg">
      ⚡
      <h3 className="font-bold text-xl mt-4">
        Cepat
      </h3>

      <p className="text-gray-500 mt-3">
        Semua layanan kampus dalam satu platform.
      </p>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-lg">
      🔒
      <h3 className="font-bold text-xl mt-4">
        Aman
      </h3>

      <p className="text-gray-500 mt-3">
        Hanya untuk mahasiswa terverifikasi.
      </p>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-lg">
      🤝
      <h3 className="font-bold text-xl mt-4">
        Terhubung
      </h3>

      <p className="text-gray-500 mt-3">
        Memudahkan kolaborasi antar mahasiswa.
      </p>
    </div>

  </div>

</div>

    <div className="mt-28">

  <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
     Layanan Terpopuler
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

    <div className="bg-white p-8 rounded-3xl shadow-lg">
      <div className="text-5xl mb-4">
        🖨️
      </div>

      <h3 className="text-xl font-bold">
        Jasa Print
      </h3>

      <p className="text-gray-500 mt-3">
        Layanan yang paling sering digunakan mahasiswa.
      </p>

      <div className="mt-5 text-blue-600 font-bold">
        350+ Pesanan Bulan Ini
      </div>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-lg">
      <div className="text-5xl mb-4">
        🛒
      </div>

      <h3 className="text-xl font-bold">
        Marketplace
      </h3>

      <p className="text-gray-500 mt-3">
        Produk mahasiswa paling banyak dicari.
      </p>

      <div className="mt-5 text-green-600 font-bold">
        200+ Produk Aktif
      </div>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-lg">
      <div className="text-5xl mb-4">
        🍔
      </div>

      <h3 className="text-xl font-bold">
        Jastip
      </h3>

      <p className="text-gray-500 mt-3">
        Solusi cepat untuk kebutuhan harian mahasiswa.
      </p>

      <div className="mt-5 text-orange-600 font-bold">
        150+ Transaksi
      </div>
    </div>

  </div>

</div>

    <div className="mt-28">

  <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
    Aktivitas Terbaru
  </h2>

  <div className="bg-white rounded-3xl shadow-lg p-8">

    <div className="border-b py-4">
      🛒 Buku Pemrograman berhasil terjual
    </div>

    <div className="border-b py-4">
      🖨️ Pesanan print laporan diterima
    </div>

    <div className="border-b py-4">
      🍔 Jastip makanan berhasil dikirim
    </div>

    <div className="py-4">
      🧰 Penyewaan barang praktikum selesai
    </div>

  </div>

</div>
    
    <div className="mt-28">

  <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
    Apa Kata Mahasiswa?
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

    <div className="bg-white p-8 rounded-3xl shadow-lg">
      ⭐⭐⭐⭐⭐

      <p className="mt-4 text-gray-600">
        Print tugas jadi jauh lebih mudah.
      </p>

      <h4 className="font-bold mt-4">
        Andi - Teknik Informatika
      </h4>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-lg">
      ⭐⭐⭐⭐⭐

      <p className="mt-4 text-gray-600">
        Marketplace sangat membantu mahasiswa.
      </p>

      <h4 className="font-bold mt-4">
        Rina - Sistem Informasi
      </h4>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-lg">
      ⭐⭐⭐⭐⭐

      <p className="mt-4 text-gray-600">
        Jastip makanan sangat praktis.
      </p>

      <h4 className="font-bold mt-4">
        Budi - Manajemen
      </h4>
    </div>

  </div>

</div>
 </div>
<footer className="bg-gradient-to-b from-gray-950 to-black text-white mt-24 w-full border-t border-gray-800">

  <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

      <div className="lg:col-span-1">

  <h2 className="text-2xl md:text-3xl font-extrabold">
    CampusHub
  </h2>

  <p className="text-gray-400 mt-4 leading-relaxed max-w-xs">
          Platform digital mahasiswa untuk marketplace,
          jasa print, jastip, dan penyewaan barang kampus
          dalam satu ekosistem modern.
        </p>

      </div>

      <div>

        <h3 className="font-bold text-lg mb-5">
          Produk
        </h3>

        <ul className="space-y-3 text-gray-400">

          <li className="hover:text-white cursor-pointer">
            Marketplace
          </li>

          <li className="hover:text-white cursor-pointer">
            Jasa Print
          </li>

          <li className="hover:text-white cursor-pointer">
            Jastip
          </li>

          <li className="hover:text-white cursor-pointer">
            Sewa Barang
          </li>

        </ul>

      </div>

      <div>

        <h3 className="font-bold text-lg mb-5">
          Bantuan
        </h3>

        <ul className="space-y-3 text-gray-400">

          <li className="hover:text-white cursor-pointer">
            Pusat Bantuan
          </li>

          <li className="hover:text-white cursor-pointer">
            Syarat & Ketentuan
          </li>

          <li className="hover:text-white cursor-pointer">
            Kebijakan Privasi
          </li>

          <li className="hover:text-white cursor-pointer">
            FAQ
          </li>

        </ul>

      </div>

      <div>

        <h3 className="font-bold text-lg mb-5">
          Hubungi Kami
        </h3>

        <div className="space-y-4 text-gray-400">

  <p className="break-all">
    📧 support@campushub.com
  </p>

  <p>
    📱 +62 812-3456-3711
  </p>

          <p>
            📍UMSU
          </p>

        </div>

      </div>

    </div>

    <div className="border-t border-gray-800 mt-12 pt-8">

      <div className="flex flex-col md:flex-row justify-between items-center">

        <p className="text-gray-500 mt-4 md:mt-0">
          © 2026 CampusHub. All rights reserved.
        </p>

      </div>

    </div>

  </div>

</footer>


</div>

  );
}

export default HomePage;