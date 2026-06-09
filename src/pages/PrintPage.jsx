import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function PrintPage() {
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const user = JSON.parse(
  localStorage.getItem("user")
);
    console.log("USER LOGIN:",user);

  const [printData, setPrintData] = useState({
  copies:1,
  note: "",
  color: "bw",
  paperSize: "A4",
});

   const handlePrint = async () => {
  try {

    // VALIDASI FILE
    if (!file) {
      alert("Pilih file terlebih dahulu");
      return;
    }

    // VALIDASI JUMLAH
    if (!printData.copies || Number(printData.copies) < 1) {
      alert("Jumlah lembar minimal 1");
      return;
    }

    const data = new FormData();

    // FILE
    data.append("file", file);

    // DATA ORDER
    data.append("productName", "Jasa Print");
    data.append("type", "print");

    // seller kosong → bisa diambil semua penjual
    data.append("sellerName", "");

    data.append(
  "buyerName",
  user?.name || "Guest"
);

    data.append(
  "buyerRealName",
  user?.name || "Guest"
);

    data.append(
      "nim",
      user?.nim || "-"
    );

    data.append(
      "quantity",
      printData.copies
    );

    data.append(
      "note",
      printData.note
    );

    data.append(
      "color",
      printData.color
    );

    data.append(
      "paperSize",
      printData.paperSize
    );

    data.append("building", "-");
    data.append("floor", "-");
    data.append("room", "-");

    data.append("status", "Diproses");

    // DEBUG
    console.log("FILE:", file);

    const res = await api.post(
  "/orders",
  data,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

    console.log("SUCCESS:", res.data);

    alert("File berhasil dikirim");

    // reset form
    setFile(null);

    setPrintData({
      copies: 1,
      note: "",
      color: "bw",
      paperSize: "A4",
    });

  } catch (error) {

    console.log("ERROR:", error);

    if (error.response) {
      console.log(error.response.data);
    }

    alert("Gagal upload file");

  }
};

  const calculatePrice = () => {

  let pricePerPage =
    printData.color === "color"
      ? 1000
      : 500;

  return (
    Number(printData.copies || 0)
    * pricePerPage
  );
};

  return (
    <div className="
min-h-screen
bg-gradient-to-br
from-[#eef2ff]
via-[#f8fafc]
to-[#ede9fe]
">

  <div className="absolute top-10 right-10 text-8xl opacity-10">
    🖨️
  </div>

  <div className="absolute bottom-5 left-32 text-7xl opacity-10">
    📄
  </div>

  <div className="absolute top-24 left-1/4 text-6xl opacity-10">
    📚
  </div>

    
    <div className="relative bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 text-white py-12 px-6 overflow-hidden w-full">

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

  <div className="max-w-4xl mx-auto text-center">

    <h1 className="text-5xl md:text-6xl font-black">
      🖨️ Jasa Print Kampus
    </h1>

    <p className="mt-4 text-lg text-blue-100">
      Upload file, atur spesifikasi cetak,
      dan ambil hasil print tanpa antre.
    </p>

    <div className="grid grid-cols-3 gap-4 mt-8">

      <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
        <h3 className="text-2xl font-bold">
          350+
        </h3>
        <p className="text-sm">
          Pesanan Bulan Ini
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

      <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
        <h3 className="text-2xl font-bold">
          24 Jam
        </h3>
        <p className="text-sm">
          Respon Cepat
        </p>
      </div>

    </div>

  </div>

</div>
<div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 p-8">

  <div className="bg-white rounded-3xl shadow-xl p-8">

    <label className="border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center mb-6 block cursor-pointer hover:bg-blue-50 transition">
    
  <div className="text-6xl mb-4">
    📄
  </div>

  <h3 className="font-bold text-lg">
    Upload File Print
  </h3>

  <p className="text-gray-500 text-sm mb-4">
    PDF, DOCX, PPTX
  </p>

  <input
    type="file"
    hidden
    onChange={(e) => setFile(e.target.files[0])}
  />
</label>
  {file && (
    <div className="bg-green-50 border border-green-200 p-4 rounded-xl mb-5">
      ✅ File dipilih: {file.name}
    </div>
  )}

  <input
  type="number"
  min="1"
  step="1"
  placeholder="Jumlah Lembar"
  className="w-full border p-4 rounded-xl mb-4"
  value={printData.copies}
  onChange={(e) =>
    setPrintData({
      ...printData,
      copies: e.target.value,
    })
  }
/>

  <select
  className="w-full border p-4 rounded-xl mb-4"
  onChange={(e) =>
    setPrintData({
      ...printData,
      color: e.target.value,
    })
  }
>
  <option value="bw">
    Hitam Putih
  </option>

  <option value="color">
    Berwarna
  </option>
</select>

  <select
  className="w-full border p-4 rounded-xl mb-4"
  onChange={(e) =>
    setPrintData({
      ...printData,
      paperSize: e.target.value,
    })
  }
>
  <option value="A4">
    A4
  </option>

  <option value="F4">
    F4
  </option>
</select>

  <textarea
    placeholder="Diantar kemana?"
    className="w-full border p-4 rounded-xl mb-4"
    rows="4"
    onChange={(e) =>
      setPrintData({
        ...printData,
        note: e.target.value,
      })
    }
  />

  <div className="bg-blue-50 p-4 rounded-xl mb-5">

  <p>
    📄 Jumlah Lembar:
    <b>
      {" "}
      {printData.copies || 0}
    </b>
  </p>

  <p>
    🖨️ Jenis:
    <b>
      {" "}
      {printData.color === "color"
        ? "Berwarna"
        : "Hitam Putih"}
    </b>
  </p>

  <p>
    💰 Estimasi Harga:
    <b className="text-blue-600">
      {" "}
      Rp {calculatePrice().toLocaleString("id-ID")}
    </b>
  </p>

</div>

  <button
    onClick={handlePrint}
    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:scale-105 transition"
  >
    Kirim File Print
  </button>

</div>

<div className="bg-white rounded-3xl shadow-xl p-8">

  <h2 className="text-2xl font-bold mb-6">
    📌 Informasi Layanan
  </h2>

  <div className="space-y-5">

    <div className="bg-blue-50 p-5 rounded-2xl">
      <h3 className="font-bold text-blue-600 mb-2">
        ⚡ Estimasi Pengerjaan
      </h3>

      <p className="text-gray-600">
        Dokumen biasanya selesai dicetak dalam
        5 - 15 menit.
      </p>
    </div>

    <div className="bg-green-50 p-5 rounded-2xl">
      <h3 className="font-bold text-green-600 mb-2">
        💰 Tarif Print
      </h3>

      <p className="text-gray-600">
        Hitam Putih: Rp500/lembar
        <br />
        Berwarna: Rp1.000/lembar
      </p>
    </div>

    <div className="bg-purple-50 p-5 rounded-2xl">
      <h3 className="font-bold text-purple-600 mb-2">
        📄 Ukuran Kertas
      </h3>

      <p className="text-gray-600">
        Mendukung ukuran A4 dan F4.
      </p>
    </div>

    <div className="bg-orange-50 p-5 rounded-2xl">
      <h3 className="font-bold text-orange-600 mb-2">
        🔥 Tips Print
      </h3>

      <ul className="text-gray-600 space-y-2">
        <li>• Upload file PDF agar format tidak berubah</li>
        <li>• Periksa jumlah lembar sebelum kirim</li>
        <li>• Gunakan warna hanya jika diperlukan</li>
        <li>• Tambahkan catatan khusus bila ada</li>
      </ul>
    </div>

  </div>
  </div>
  </div>
  </div>

  );
}

export default PrintPage;