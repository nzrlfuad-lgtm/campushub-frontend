import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
function LandingPage() {
  const navigate = useNavigate();

  return (

    <div className="
min-h-screen
bg-gradient-to-br
from-[#eef2ff]
via-[#f8fafc]
to-[#ede9fe]
">

  <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 px-8 py-4 flex justify-between items-center">
    
    <h1 className="text-3xl font-extrabold text-blue-600">
  CampusHub
</h1>

      <div className="hidden md:flex gap-8 font-medium text-gray-600">

    <a href="#tentang">
    Tentang
  </a>

  <a href="#fitur">
    Fitur
  </a>

  <a href="#kontak">
    Kontak
  </a>
    
</div>

    <div className="flex gap-3">

      <button
        onClick={() => navigate("/login")}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        Masuk
      </button>

      <button
        onClick={() => navigate("/register")}
        className="bg-green-600 text-white px-5 py-2 rounded-lg"
      >
        Daftar
      </button>

    </div>

  </nav> 

<div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-28">

  <div className="max-w-6xl mx-auto text-center px-6">

    <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
      Platform Modern Untuk Mahasiswa
    </span>

    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mt-6 leading-tight">
  Semua Kebutuhan
  <span className="block text-yellow-300">
    Mahasiswa Kampus
  </span>
  Dalam Satu Platform
</h1>

    <p className="text-xl mt-6 text-blue-100 max-w-3xl mx-auto">
      Jual beli produk, jasa print, jastip, dan sewa barang
      dengan cepat dan aman.
    </p>

    <div className="flex justify-center gap-4 mt-10">

<button
  onClick={() => navigate("/register")}
  className="
    bg-white
    text-blue-600
    px-8 py-4
    rounded-2xl
    font-bold
    shadow-lg
    hover:bg-gradient-to-r
    hover:from-blue-600
    hover:via-indigo-600
    hover:to-purple-700
    hover:text-white
    transition-all
    duration-300
  "
>
  Mulai Belanja
</button>

<button
  onClick={() => navigate("/register")}
  className="border border-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-blue-600 transition"
>
  Jual Produk
</button>

    </div>

  </div>

  </div>

      <div className="max-w-6xl mx-auto -mt-16 px-6 relative z-10">

  <div className="grid md:grid-cols-4 gap-6">

    <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
      <h2 className="text-4xl font-bold text-blue-600">
  <AnimatedNumber target={500} />+
</h2>
      <p className="text-gray-500 mt-2">
        Produk
      </p>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
    <h2 className="text-4xl font-bold text-green-600">
  <AnimatedNumber target={1000} />+
</h2>
      <p className="text-gray-500 mt-2">
        Transaksi
      </p>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
      <h2 className="text-4xl font-bold text-purple-600">
  <AnimatedNumber target={700} />+
</h2>
      <p className="text-gray-500 mt-2">
        Mahasiswa
      </p>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
      <h2 className="text-4xl font-bold text-orange-500">
  <AnimatedNumber target={24} />/7
</h2>
      <p className="text-gray-500 mt-2">
        Aktif
      </p>
    </div>

  </div>

</div>

<div
  id="tentang"
  className="max-w-7xl mx-auto py-28 px-6"
>

  <div className="text-center mb-20">

    <h2 className="text-5xl font-black mt-6 text-gray-800">
      Solusi Digital Modern
      <span className="block text-blue-600">
        Untuk Kehidupan Mahasiswa
      </span>
    </h2>

    <p className="text-gray-500 mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
      CampusHub hadir untuk membantu mahasiswa memenuhi
      kebutuhan kampus dalam satu platform modern.
      Mulai dari jual beli produk, jasa print, jastip,
      hingga penyewaan alat kampus kini menjadi lebih cepat,
      aman, dan praktis.
    </p>

  </div>

  <div className="grid lg:grid-cols-2 gap-14 items-center">

    {/* KIRI */}
    <div className="space-y-8">

      <div className="
        bg-white rounded-3xl p-8 shadow-xl
        hover:-translate-y-2 transition duration-500
      ">
        <div className="flex items-start gap-5">

          <div className="
            w-16 h-16 rounded-2xl
            bg-blue-100 text-blue-600
            flex items-center justify-center
            text-3xl
          ">
            🚀
          </div>

          <div>

            <h3 className="text-2xl font-bold text-gray-800">
              Cepat & Praktis
            </h3>

            <p className="text-gray-500 mt-3 leading-relaxed">
              Semua kebutuhan mahasiswa dapat dilakukan
              langsung dari satu aplikasi tanpa ribet
              dan tanpa harus berpindah platform.
            </p>

          </div>

        </div>
      </div>

      <div className="
        bg-white rounded-3xl p-8 shadow-xl
        hover:-translate-y-2 transition duration-500
      ">
        <div className="flex items-start gap-5">

          <div className="
            w-16 h-16 rounded-2xl
            bg-green-100 text-green-600
            flex items-center justify-center
            text-3xl
          ">
            🔒
          </div>

          <div>

            <h3 className="text-2xl font-bold text-gray-800">
              Aman Digunakan
            </h3>

            <p className="text-gray-500 mt-3 leading-relaxed">
              Transaksi dilakukan antar mahasiswa kampus
              sehingga lebih terpercaya dan nyaman digunakan.
            </p>

          </div>

        </div>
      </div>

      <div className="
        bg-white rounded-3xl p-8 shadow-xl
        hover:-translate-y-2 transition duration-500
      ">
        <div className="flex items-start gap-5">

          <div className="
            w-16 h-16 rounded-2xl
            bg-purple-100 text-purple-600
            flex items-center justify-center
            text-3xl
          ">
            🌎
          </div>

          <div>

            <h3 className="text-2xl font-bold text-gray-800">
              Ekosistem Mahasiswa
            </h3>

            <p className="text-gray-500 mt-3 leading-relaxed">
              CampusHub membangun ekosistem digital mahasiswa
              agar saling membantu memenuhi kebutuhan akademik
              maupun kehidupan kampus sehari-hari.
            </p>

          </div>

        </div>
      </div>

    </div>

    {/* KANAN */}
    <div className="relative">

      <div className="
        bg-gradient-to-br
        from-blue-600
        via-indigo-600
        to-purple-700
        rounded-[40px]
        p-10
        text-white
        shadow-2xl
        relative overflow-hidden
      ">

        <div className="absolute top-5 right-5 text-8xl opacity-10">
          🎓
        </div>

        <h3 className="text-3xl sm:text-4xl font-black leading-tight">
          Platform Mahasiswa
          <span className="block text-yellow-300">
            Generasi Baru
          </span>
        </h3>

        <p className="mt-6 text-blue-100 leading-relaxed">
          Dibuat untuk mendukung aktivitas mahasiswa
          agar lebih produktif, efisien, dan modern
          di era digital kampus.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">

    <div className="bg-white/10 backdrop-blur rounded-2xl p-5">
      <h1 className="text-3xl sm:text-4xl font-black break-words">
        1000+
      </h1>

      <p className="text-sm text-blue-100 mt-2 break-words">
        Pengguna Aktif
      </p>
    </div>

    <div className="bg-white/10 backdrop-blur rounded-2xl p-5">
      <h1 className="text-3xl sm:text-4xl font-black break-words">
        4 Layanan
      </h1>

      <p className="text-sm text-blue-100 mt-2 break-words">
        Dalam Satu Platform
      </p>
    </div>

    <div className="bg-white/10 backdrop-blur rounded-2xl p-5">
      <h1 className="text-3xl sm:text-4xl font-black break-words">
        24/7
      </h1>

      <p className="text-sm text-blue-100 mt-2 break-words">
        Akses Online
      </p>
    </div>

    <div className="bg-white/10 backdrop-blur rounded-2xl p-5">
      <h1 className="text-3xl sm:text-4xl font-black break-words">
        Kampus
      </h1>

      <p className="text-sm text-blue-100 mt-2 break-words">
        Terhubung Digital
      </p>
    </div>

  </div>

</div>

    </div>

  </div>

</div>

    <div
  id="fitur"
  className="max-w-6xl mx-auto py-24 px-6"
>

  <h2 className="text-4xl font-bold text-center mb-16">
    Fitur Unggulan
  </h2>

  <div className="grid md:grid-cols-4 gap-8">

    <div className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-4
         hover:shadow-2xl
         duration-500 transition">
      <div className="text-5xl">🛒</div>
      <h3 className="font-bold text-xl mt-4">
        Marketplace
      </h3>
      <p className="text-gray-500 mt-3">
        Jual beli kebutuhan mahasiswa.
      </p>
    </div>

    <div className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-4
        hover:shadow-2xl
        duration-500 transition">
      <div className="text-5xl">🖨️</div>
      <h3 className="font-bold text-xl mt-4">
        Jasa Print
      </h3>
      <p className="text-gray-500 mt-3">
        Cetak tugas dengan mudah.
      </p>
    </div>

    <div className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-4
         hover:shadow-2xl
         duration-500 transition">
      <div className="text-5xl">🍔</div>
      <h3 className="font-bold text-xl mt-4">
        Jastip
      </h3>
      <p className="text-gray-500 mt-3">
        Titip beli makanan favorit.
      </p>
    </div>

    <div className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-4
         hover:shadow-2xl
         duration-500 transition">
      <div className="text-5xl">🧰</div>
      <h3 className="font-bold text-xl mt-4">
        Sewa Barang
      </h3>
      <p className="text-gray-500 mt-3">
        Sewa perlengkapan kampus.
      </p>
    </div>

  </div>

</div>

    <div className="max-w-6xl mx-auto py-24 px-6">

  <h2 className="text-4xl font-bold text-center mb-16">
    Apa Kata Mahasiswa?
  </h2>

  <div className="grid md:grid-cols-3 gap-8">

    <div className="bg-white p-8 rounded-3xl shadow-lg">
      <p className="text-gray-600 italic">
        "Marketplace-nya membantu banget cari
        kebutuhan kuliah dengan cepat."
      </p>

      <div className="mt-5">
        <h4 className="font-bold">
          Andi Saputra
        </h4>

        <p className="text-gray-500 text-sm">
          Mahasiswa Hukum
        </p>
      </div>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-lg">
      <p className="text-gray-600 italic">
        "Jasa print sangat membantu saat deadline
        tugas karena tidak perlu antre."
      </p>

      <div className="mt-5">
        <h4 className="font-bold">
          Siti Rahma
        </h4>

        <p className="text-gray-500 text-sm">
          Mahasiswa Sistem Informasi
        </p>
      </div>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-lg">
      <p className="text-gray-600 italic">
        "Jastip dan sewa barang membuat kebutuhan
        kampus jadi lebih praktis."
      </p>

      <div className="mt-5">
        <h4 className="font-bold">
          Rizky Pratama
        </h4>

        <p className="text-gray-500 text-sm">
          Mahasiswa Teknik Sipil
        </p>
      </div>
    </div>

  </div>

</div>

    <div className="max-w-5xl mx-auto py-24 px-6">

  <h2 className="text-4xl font-bold text-center mb-16">
    Pertanyaan Umum
  </h2>

  <div className="space-y-6">

    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="font-bold text-lg">
        Apakah CampusHub hanya untuk mahasiswa?
      </h3>

      <p className="text-gray-600 mt-2">
        Ya, platform ini dibuat khusus untuk mahasiswa kampus.
      </p>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="font-bold text-lg">
        Bagaimana cara menjual produk?
      </h3>

      <p className="text-gray-600 mt-2">
        Setelah login, buka menu Marketplace dan unggah produk Anda.
      </p>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="font-bold text-lg">
        Apakah layanan print tersedia setiap hari?
      </h3>

      <p className="text-gray-600 mt-2">
        Ya, layanan dapat diakses kapan saja melalui CampusHub.
      </p>
    </div>

  </div>

</div>

  <footer
  id="kontak"
  className="bg-black text-white py-20 border-t border-gray-800"
>

  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

    <div>
      <h2 className="text-3xl font-bold">
        CampusHub
      </h2>

      <p className="text-gray-400 mt-4">
        Platform layanan internal mahasiswa.
      </p>
    </div>

    <div>
      <h3 className="font-bold mb-4">
        Layanan
      </h3>

      <p>Marketplace</p>
      <p>Print</p>
      <p>Jastip</p>
      <p>Sewa Barang</p>
    </div>

    <div>
      <h3 className="font-bold mb-4">
        Kontak
      </h3>

      <p>Email:campushub@gmail.com</p>
      <p>Instagram:CampusHubb</p>
      <p>WhatsApp:+62 812-3456-3711</p>
    </div>

  </div>

  <div className="text-center text-gray-500 mt-12">
    © 2026 CampusHub
  </div>

</footer>

    </div>

  );
}

export default LandingPage;