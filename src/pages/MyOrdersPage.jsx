import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyOrdersPage() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

useEffect(() => {

  fetchOrders();

  const interval = setInterval(() => {
    fetchOrders();
  }, 3000);

  return () => clearInterval(interval);

}, []);

  const fetchOrders = async () => {

    try {

   const res = await axios.get(
  "https://campushub-backend-production-df39.up.railway.app/api/orders"
);

console.log("USER LOGIN:", user);

console.log("SEMUA ORDER:", res.data);

const filtered = res.data.filter(
  (item) =>
    String(item.nim) === String(user?.nim)
);

      setOrders(filtered);

    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {

    switch (status) {

      case "Selesai":
        return "bg-green-100 text-green-600";

      case "Diproses":
        return "bg-yellow-100 text-yellow-600";

      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  const getTypeIcon = (type) => {

    switch (type) {

      case "print":
        return "🖨️";

      case "marketplace":
        return "🛒";

      case "jastip":
        return "🍔";

      default:
        return "🧰";
    }
  };

  const cancelOrder = async (id) => {

  const confirmCancel = window.confirm(
    "Yakin ingin membatalkan pesanan?"
  );

  if (!confirmCancel) return;

  try {

    await axios.delete(
      `https://campushub-backend-production-df39.up.railway.app/api/orders/${id}`
    );

    alert("Pesanan berhasil dibatalkan");

    fetchOrders();

  } catch (error) {

    console.log(error);

    alert("Gagal membatalkan pesanan");

  }

}; 

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="relative bg-gradient-to-r from-indigo-600 via-blue-700 to-purple-700 text-white py-12 px-6 overflow-hidden">

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
          📦
        </div>

        <div className="absolute bottom-5 left-32 text-7xl opacity-10">
          🛒
        </div>

        <div className="absolute top-24 left-1/4 text-6xl opacity-10">
          🖨️
        </div>

        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-5xl md:text-6xl font-black">
            📦 Pesanan Saya
          </h1>

          <p className="mt-4 text-lg text-blue-100">
            Lihat seluruh riwayat transaksi dan pesanan kamu.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8">

            <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
              <h3 className="text-2xl font-bold">
                {orders.length}
              </h3>

              <p className="text-sm">
                Total Pesanan
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
              <h3 className="text-2xl font-bold">
                {
                  orders.filter(
                    (o) => o.status === "Diproses"
                  ).length
                }
              </h3>

              <p className="text-sm">
                Sedang Diproses
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
              <h3 className="text-2xl font-bold">
                {
                  orders.filter(
                    (o) => o.status === "Selesai"
                  ).length
                }
              </h3>

              <p className="text-sm">
                Pesanan Selesai
              </p>
            </div>

          </div>

        </div>

      </div>

      <div className="max-w-6xl mx-auto p-8">

        {orders.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-xl p-16 text-center">

            <div className="text-8xl mb-6">
              📭
            </div>

            <h2 className="text-3xl font-bold mb-3">
              Belum Ada Pesanan
            </h2>

            <p className="text-gray-500">
              Semua pesanan kamu akan muncul di sini.
            </p>

          </div>

        ) : (

          <div className="grid gap-6">

            {orders.map((order) => (

              <div
                key={order.id}
                className="
                  bg-white rounded-3xl
                  shadow-xl p-6
                  hover:scale-[1.01]
                  transition
                "
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                  <div className="flex items-start gap-5">

                    <div className="text-5xl">
                      {getTypeIcon(order.type)}
                    </div>

                    <div>

                      <h2 className="text-2xl font-bold">
                        {order.productName}
                      </h2>

                      <p className="text-gray-500 mt-2">
  NIM: {order.nim}
</p>

                      <p className="text-gray-500">
                        Jumlah: {order.quantity || 1}
                      </p>

            {(order.type === "jastip" ||
  order.type === "print") &&
  order.sellerName && (

  <div className="mt-3 bg-blue-50 p-3 rounded-xl">
    <p className="text-blue-700 font-semibold">
      🚚 Pesanan Diambil Oleh
    </p>

    <p className="text-gray-700">
      Nama: {order.sellerRealName}
    </p>

    <p className="text-gray-700">
      NIM: {order.sellerName}
    </p>
  </div>

)}

                    </div>

                  </div>

                  <div className="text-right">

                    <span
                      className={`
                        px-4 py-2 rounded-full
                        text-sm font-bold
                        ${getStatusColor(order.status)}
                      `}
                    >
                      {order.status || "Menunggu"}
                    </span>

                    <p className="text-gray-400 mt-4 text-sm">
                      #{order.id}
                    </p>
                    
                    {order.status !== "Selesai" && (

  <button
    onClick={() => cancelOrder(order.id)}
    className="
      mt-4 bg-red-500 hover:bg-red-600
      text-white px-4 py-2
      rounded-xl font-semibold
      transition
    "
  >
    Batalkan
  </button>

)}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default MyOrdersPage;