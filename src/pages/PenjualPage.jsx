import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../services/productService";

import {
  LayoutDashboard,
  Package,
  Truck,
  LogOut,
  BarChart3,
} from "lucide-react";

import { motion } from "framer-motion";

import toast, { Toaster } from "react-hot-toast";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

function Dashboard() {

  const user = JSON.parse(
  localStorage.getItem("user")
) || {};

console.log("TEST DASHBOARD");
console.log("USER:", user);

console.log("USER DARI LOCALSTORAGE:", user);

  const navigate = useNavigate();

useEffect(() => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user || user.role !== "penjual") {
    navigate("/");
  }
}, []);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

useEffect(() => {

  const loadData = async () => {

    setLoadingData(true);

    await fetchOrders();
    await fetchProducts();

    setLoadingData(false);

  };

  loadData();

}, []);

const fetchOrders = async () => {
  try {

    const res = await axios.get(
      "https://campushub-backend-production-df39.up.railway.app/api/orders"
    );

    console.log("DATA ORDERS:", res.data);

    setOrders(res.data);

  } catch (error) {
    console.log(error);
  }
};

 const fetchProducts = async () => {
  try {

    const data = await getProducts();

    setProducts(data);

  } catch (error) {
    console.log(error);
  }
};

 const updateStatus = async (id, status) => {
  try {

    const token =
      localStorage.getItem("token");

    await axios.put(
      `https://campushub-backend-production-df39.up.railway.app/api/orders/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchOrders();

    toast.success(
      "Status berhasil diperbarui"
    );

  } catch (error) {

    console.log(error);

    console.log(
      error.response?.data
    );

    toast.error(
      "Gagal update status"
    );

  }
};

const totalProducts = products.filter(
  (product) =>
    String(product.sellerName) === String(user.nim) &&
    (
      product.type === "marketplace" ||
      product.type === "sewaalat"
    )
).length;


const [marketForm, setMarketForm] = useState({
  name: "",
  price: "",
  description: "",
  image: null,
});

const [printForm, setPrintForm] = useState({
  name: "",
  price: "",
  description: "",
  image: null,
});

const [jastipForm, setJastipForm] = useState({
  name: "",
  price: "",
  description: "",
  image: null,
});

const [sewaalatForm, setsewaalatForm] = useState({
  name: "",
  price: "",
  description: "",
  image: null,
});

const handlePrintChange = (e) => {
  if (e.target.name === "image") {
    setPrintForm({
      ...printForm,
      image: e.target.files[0],
    });
  } else {
    setPrintForm({
      ...printForm,
      [e.target.name]: e.target.value,
    });
  }
};

const handleJastipChange = (e) => {
  if (e.target.name === "image") {
    setJastipForm({
      ...jastipForm,
      image: e.target.files[0],
    });
  } else {
    setJastipForm({
      ...jastipForm,
      [e.target.name]: e.target.value,
    });
  }
};

const [file, setFile] = useState(null);

const [printData, setPrintData] = useState({
  copies: 1,
  note: "",
});

const handlePrint = async () => {
  try {

    if (!file) {
      alert("Pilih file terlebih dahulu");
      return;
    }

    if (!printData.copies || Number(printData.copies) < 1) {
      alert("Jumlah lembar minimal 1");
      return;
    }

    const data = new FormData();

    data.append("file", file);

    data.append("productName", "Jasa Print");

    data.append(
      "buyerName",
      user?.nim || "Guest"
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
      "type",
      "print"
    );

    data.append(
      "status",
      "Diproses"
    );

    data.append(
      "note",
      printData.note
    );

    data.append(
      "building",
      "-"
    );

    data.append(
      "floor",
      "-"
    );

    data.append(
      "room",
      "-"
    );

    await axios.post(
      "https://campushub-backend-production-df39.up.railway.app/api/orders",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("File berhasil dikirim");

  } catch (error) {

    console.log(error);

    alert("Gagal upload");

  }
};

const handleJastipSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("name", jastipForm.name);
    data.append("price", jastipForm.price);
    data.append("description", jastipForm.description);
    data.append("image", jastipForm.image);
    data.append("type", "jastip");

    data.append("sellerName", user.nim);
    data.append("sellerRealName", user.name);
    await axios.post(
      "https://campushub-backend-production-df39.up.railway.app/api/products/add",
      data
    );

    toast.success("Jastip berhasil ditambahkan");

    fetchProducts();

  } catch (error) {
    console.log(error);
  }
};

const handleMarketChange = (e) => {
  if (e.target.name === "image") {
    setMarketForm({
      ...marketForm,
      image: e.target.files[0],
    });
  } else {
    setMarketForm({
      ...marketForm,
      [e.target.name]: e.target.value,
    });
  }
};

const handlesewaalatChange = (e) => {
  if (e.target.name === "image") {
    setsewaalatForm({
      ...sewaalatForm,
      image: e.target.files[0],
    });
  } else {
    setsewaalatForm({
      ...sewaalatForm,
      [e.target.name]: e.target.value,
    });
  }
};

const handleMarketplaceSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("name", marketForm.name);
    data.append("price", marketForm.price);
    data.append("description", marketForm.description);
    data.append("image", marketForm.image);
    data.append("type", "marketplace");

   data.append(
  "sellerName",
  user.nim
);

data.append(
  "sellerRealName",
  user.name
);

   const token =
  localStorage.getItem("token");

await axios.post(
  "https://campushub-backend-production-df39.up.railway.app/api/products/add",
  data,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }
);

    toast.success("Produk marketplace berhasil ditambahkan");

    fetchProducts();

  } catch (error) {
    console.log(error);
  }
};

const [loading, setLoading] = useState(false);

const handleSewaAlatSubmit = async (e) => {
  e.preventDefault();

  if (
    !sewaalatForm.name ||
    !sewaalatForm.price ||
    !sewaalatForm.description ||
    !sewaalatForm.image
  ) {
    toast.error("Semua form wajib diisi");
    return;
  }

  if (loading) return;

  try {
    setLoading(true);

    const data = new FormData();

    data.append("name", sewaalatForm.name);
    data.append("price", sewaalatForm.price);
    data.append("description", sewaalatForm.description);
    data.append("image", sewaalatForm.image);
    data.append("type", "sewaalat");

data.append(
  "sellerName",
  user.nim
);

data.append(
  "sellerRealName",
  user.name
);

    const token =
  localStorage.getItem("token");

await axios.post(
  "https://campushub-backend-production-df39.up.railway.app/api/products/add",
  data,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }
);

    toast.success("Produk berhasil ditambahkan");

    setsewaalatForm({
      name: "",
      price: "",
      description: "",
      image: null,
    });

    fetchProducts();

  } catch (error) {
    console.log(error);
    toast.error("Gagal menambahkan produk");
  } finally {
    setLoading(false);
  }
};

console.log("USER:", user);
console.log("ORDERS:", orders);

console.log(
  orders.map(order => ({
    sellerName: order.sellerName,
    userNim: user.nim
  }))
);

console.log("USER LOGIN:", user);

console.log("USER LOGIN:", user.nim);

console.log(
  orders.map(order => ({
    sellerName: order.sellerName,
    type: order.type
  }))
);

const myOrders = orders.filter((order) => {

  console.log("ORDER:", order);

  // marketplace & sewaalat → hanya pemilik produk
  if (
    order.type === "marketplace" ||
    order.type === "sewaalat"
  ) {
    return (
      String(order.sellerName) ===
      String(user.nim)
    );
  }

  // print & jastip → semua penjual bisa lihat
  if (
    order.type === "print" ||
    order.type === "jastip"
  ) {
    return true;
  }

  return false;
});

console.log("MY ORDERS:", myOrders);
console.log("USER LOGIN:", user);
console.log("ALL ORDERS:", orders);
console.log("FILTERED ORDERS:", myOrders);

const salesData = [
  { name: "Sen", total: 0 },
  { name: "Sel", total: 0 },
  { name: "Rab", total: 0 },
  { name: "Kam", total: 0 },
  { name: "Jum", total: 0 },
  { name: "Sab", total: 0 },
  { name: "Min", total: 0 },
];

myOrders.forEach((order) => {

  const date = new Date(order.createdAt);

  const day = date.getDay();

  const mapping = {
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    0: 6,
  };

  const index = mapping[day];

  if (index !== undefined) {
    salesData[index].total += 1;
  }

});

const totalOrders = myOrders.length;

const myProducts = products.filter(
  (product) =>
    String(product.sellerName) === String(user.nim)
);
 
const marketplaceProducts = myProducts.filter(
  (product) => product.type === "marketplace"
);

const sewaalatProducts = myProducts.filter(
  (product) => product.type === "sewaalat"
);

const printProducts = myProducts.filter(
  (product) => product.type === "print"
);

const jastipProducts = myProducts.filter(
  (product) => product.type === "jastip"
);
const [editingProduct, setEditingProduct] = useState(null);useEffect(() => {
  console.log("EDITING:", editingProduct);
}, [editingProduct]);


const handleUpdateProduct = async () => {
  try {

    await updateProduct(
      editingProduct.id,
      {
        name: editingProduct.name,
        price: editingProduct.price,
        description:
          editingProduct.description,
      }
    );

    toast.success(
      "Produk berhasil diperbarui"
    );

    setEditingProduct(null);

    fetchProducts();

  } catch (error) {

    console.log(error);

    toast.error(
      "Gagal mengupdate produk"
    );

  }
};

const handleDeleteProduct = async (id) => {

  const confirmDelete = window.confirm(
    "Yakin ingin menghapus produk ini?"
  );

  if (!confirmDelete) return;

  try {

await deleteProduct(id);

    toast.success("Produk berhasil dihapus");

    fetchProducts();

  } catch (error) {

    console.log(error);

  }
};

const completedOrders = myOrders.filter(

  (order) => order.status === "Selesai"
).length;

const processingOrders = myOrders.filter(
  (order) =>
    order.status === "Diproses" ||
    order.status === "Sedang Diantar"
).length;

const jastipOrders = orders.filter(
  (order) => order.type === "jastip"
);

const printOrders = orders.filter(
  (order) => order.type === "print"
);

 const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/");
};

const [showMarketplaceForm, setShowMarketplaceForm] = useState(false);

const [showSewaalatForm, setShowSewaalatForm] = useState(false);

const [productTab, setProductTab] =
  useState("marketplace");

  const handleTakeOrder = async (id) => {

  try {

    await axios.put(
      `https://campushub-backend-production-df39.up.railway.app/api/orders/${id}/take`,
      {
        sellerName: user.nim,
        sellerRealName: user.name,
      }
    );

    toast.success(
      "Pesanan berhasil diambil"
    );

    fetchOrders();

  } catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Gagal mengambil pesanan"
    );

  }

};

return (
  <>
    <Toaster position="top-right" />

    <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#6d28d9] text-white">

    {/* NAVBAR */}
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 px-8 py-4 flex justify-between items-center sticky top-0 z-50">

      <div>
        <h1 className="text-3xl font-extrabold">
          CampusHub Seller
        </h1>

        <p className="text-sm text-gray-200">
          Dashboard Penjual
        </p>
      </div>

      <div className="flex items-center gap-4">

  {/* DESKTOP */}
  <div className="hidden lg:flex items-center gap-4">

   <div className="bg-white/20 px-4 py-2 rounded-xl text-right">
  <div className="font-semibold">
    {user.name}
  </div>

  <div className="text-xs opacity-80">
    {user.nim}
  </div>
</div>

    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-semibold transition"
    >
      Keluar
    </button>

  </div>

  {/* MOBILE HAMBURGER */}
  <button
    onClick={() => setMobileMenu(!mobileMenu)}
    className="lg:hidden bg-white/20 p-3 rounded-xl"
  >
    ☰
  </button>

</div>

    </nav>

  {/* MOBILE MENU */}
{mobileMenu && (
  <div className="lg:hidden bg-white/10 backdrop-blur-xl border-b border-white/20 p-6 space-y-4">

    <button
      onClick={() => {
        setActiveMenu("dashboard");
        setMobileMenu(false);
      }}
      className="w-full text-left bg-white/10 p-4 rounded-2xl"
    >
      Dashboard
    </button>

    <button
      onClick={() => {
        setActiveMenu("products");
        setMobileMenu(false);
      }}
      className="w-full text-left bg-white/10 p-4 rounded-2xl"
    >
      Produk
    </button>

    <button
      onClick={() => {
        setActiveMenu("orders");
        setMobileMenu(false);
      }}
      className="w-full text-left bg-white/10 p-4 rounded-2xl"
    >
      Pesanan
    </button>

    <div className="bg-white/20 p-4 rounded-2xl">

  <div className="font-bold text-lg">
    {user.name}
  </div>

  <div className="text-sm opacity-80">
    {user.nim}
  </div>

  <div className="text-xs opacity-70 mt-1">
    Login sebagai Penjual
  </div>

</div>

    <button
      onClick={handleLogout}
      className="w-full bg-red-500 hover:bg-red-600 p-4 rounded-2xl font-semibold"
    >
      Keluar
    </button>

  </div>
)}

   <div className="flex">

  {/* SIDEBAR */}
  <div className="w-72 min-h-screen bg-white/10 backdrop-blur-xl border-r border-white/20 p-6 hidden lg:block
  backdrop-blur-xl
bg-white/10
border-r border-white/10
shadow-2xl">

    <h2 className="text-3xl font-black mb-10">
      Menu
    </h2>

    <div className="space-y-4">

  <button
    onClick={() => setActiveMenu("dashboard")}
    className={`flex items-center gap-3 w-full p-4 rounded-2xl transition ${
      activeMenu === "dashboard"
        ? "bg-white/20"
        : "bg-white/10 hover:bg-white/20"
    }`}
  >
    <LayoutDashboard />
    Dashboard
  </button>

  <button
    onClick={() => setActiveMenu("products")}
    className={`flex items-center gap-3 w-full p-4 rounded-2xl transition ${
      activeMenu === "products"
        ? "bg-white/20"
        : "bg-white/10 hover:bg-white/20"
    }`}
  >
    <Package />
    Produk
  </button>

  <button
    onClick={() => setActiveMenu("orders")}
    className={`flex items-center gap-3 w-full p-4 rounded-2xl transition ${
      activeMenu === "orders"
        ? "bg-white/20"
        : "bg-white/10 hover:bg-white/20"
    }`}
  >
    <Truck />
    Pesanan
  </button>

</div>

  </div>

    <div className="flex-1 p-8 overflow-hidden max-w-[1600px] mx-auto w-full">
    
    {loadingData ? (

  <div className="text-center py-20">

    <h1 className="text-4xl font-black">
      Loading Dashboard...
    </h1>

  </div>

) : (
      <div className="mb-14">

        <h2 className="text-5xl font-black leading-tight">
          Kelola Produk & Pesanan
        </h2>

      </div>
)}

      {activeMenu === "dashboard" && (
      <>
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

        <div className="
bg-white/10
backdrop-blur-xl
border border-white/20
rounded-3xl
p-6
shadow-2xl
hover:scale-105
hover:bg-white/20
transition duration-300
">
          <p className="text-gray-200">
            Total Produk
          </p>

          <h1 className="text-5xl font-black mt-3">
            {totalProducts}
          </h1>
        </div>

        <div className="
bg-white/10
backdrop-blur-xl
border border-white/20
rounded-3xl
p-6
shadow-2xl
hover:scale-105
hover:bg-white/20
transition duration-300
">
          <p className="text-gray-200">
            Total Order
          </p>

          <h1 className="text-5xl font-black mt-3">
            {totalOrders}
          </h1>
        </div>

        <div className="
bg-white/10
backdrop-blur-xl
border border-white/20
rounded-3xl
p-6
shadow-2xl
hover:scale-105
hover:bg-white/20
transition duration-300
">
          <p className="text-gray-200">
            Pesanan Selesai
          </p>

          <h1 className="text-5xl font-black mt-3 text-green-300">
            {completedOrders}
          </h1>
        </div>

        <div className="
bg-white/10
backdrop-blur-xl
border border-white/20
rounded-3xl
p-6
shadow-2xl
hover:scale-105
hover:bg-white/20
transition duration-300
">
          <p className="text-gray-200">
            Sedang Diproses
          </p>

          <h1 className="text-5xl font-black mt-3 text-yellow-300">
            {processingOrders}
          </h1>
        </div>

      </div>

      {/* CHART */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl mb-10"
>

  <div className="flex items-center gap-3 mb-6">
    <BarChart3 size={28} />
    <h2 className="text-3xl font-bold">
      Statistik Penjualan
    </h2>
  </div>

  <ResponsiveContainer width="100%" height={300}>
    <AreaChart
  data={salesData}
  margin={{
    top: 10,
    right: 20,
    left: 20,
    bottom: 10,
  }}
>

      <XAxis
  dataKey="name"
  stroke="#fff"
  tick={{ fill: "#fff" }}
  axisLine={false}
  tickLine={false}
/>
      <Tooltip />

      <defs>
  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
    <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
  </linearGradient>
</defs>

      <Area
        type="monotone"
        dataKey="total"
        stroke="#4ade80"
       fillOpacity={0.4}
       fill="url(#colorSales)"
      />

    </AreaChart>
  </ResponsiveContainer>

</motion.div>
</>
      )}

{activeMenu === "products" && (

<div className="space-y-8">

{editingProduct && (
  <div className="bg-white text-black rounded-3xl p-8 mb-6">

    <h2 className="text-2xl font-bold mb-4">
      Edit Produk
    </h2>

    <input
      type="text"
      value={editingProduct.name}
      onChange={(e) =>
        setEditingProduct({
          ...editingProduct,
          name: e.target.value,
        })
      }
      className="w-full border p-3 rounded-xl mb-3"
    />

    <input
      type="number"
      value={editingProduct.price}
      onChange={(e) =>
        setEditingProduct({
          ...editingProduct,
          price: e.target.value,
        })
      }
      className="w-full border p-3 rounded-xl mb-3"
    />

    <textarea
      value={editingProduct.description}
      onChange={(e) =>
        setEditingProduct({
          ...editingProduct,
          description: e.target.value,
        })
      }
      className="w-full border p-3 rounded-xl mb-3"
    />

    <div className="flex gap-3">

      <button
        onClick={handleUpdateProduct}
        className="bg-blue-600 text-white px-5 py-3 rounded-xl"
      >
        Simpan
      </button>

      <button
        onClick={() =>
          setEditingProduct(null)
        }
        className="bg-gray-500 text-white px-5 py-3 rounded-xl"
      >
        Batal
      </button>

    </div>

  </div>
)}

  {/* TOP BAR */}
  <div className="flex gap-3 flex-wrap items-center">

    <button
      onClick={() => setProductTab("marketplace")}
      className={`px-5 py-3 rounded-2xl font-semibold transition ${
        productTab === "marketplace"
          ? "bg-white text-black"
          : "bg-white/10"
      }`}
    >
      Marketplace
    </button>

    <button
      onClick={() => setProductTab("sewaalat")}
      className={`px-5 py-3 rounded-2xl font-semibold transition ${
        productTab === "sewaalat"
          ? "bg-white text-black"
          : "bg-white/10"
      }`}
    >
      Sewa Barang
    </button>

    <button
      onClick={() => {
        if (productTab === "marketplace") {
          setShowMarketplaceForm(!showMarketplaceForm);
        } else {
          setShowSewaalatForm(!showSewaalatForm);
        }
      }}
      className="
      ml-auto
      bg-white/20
      hover:bg-white/30
      backdrop-blur-xl
      border border-white/20
      rounded-2xl
      px-6 py-3
      text-lg
      font-semibold
      transition
    "
    >
      ➕ Tambah Produk
    </button>

  </div>

  {/* FORM MARKETPLACE */}
  {productTab === "marketplace" && showMarketplaceForm && (

    <div className="bg-white text-black rounded-3xl p-8 shadow-2xl">

      <h2 className="text-3xl font-black text-blue-700 mb-6">
        🛒 Tambah Marketplace
      </h2>

      <form
        onSubmit={handleMarketplaceSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Nama Produk"
          onChange={handleMarketChange}
          className="w-full border-2 border-gray-200 p-4 rounded-2xl"
        />

        <input
          type="number"
          name="price"
          placeholder="Harga"
          onChange={handleMarketChange}
          className="w-full border-2 border-gray-200 p-4 rounded-2xl"
        />

        <textarea
          name="description"
          rows="4"
          placeholder="Deskripsi"
          onChange={handleMarketChange}
          className="w-full border-2 border-gray-200 p-4 rounded-2xl"
        />

        <input
          type="file"
          name="image"
          onChange={handleMarketChange}
          className="w-full border-2 border-gray-200 p-4 rounded-2xl"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold"
        >
          Tambah Produk
        </button>

      </form>

    </div>

  )}

  {productTab === "sewaalat" && showSewaalatForm && (

    <div className="bg-white text-black rounded-3xl p-8 shadow-2xl">

      <h2 className="text-3xl font-black text-green-700 mb-6">
        🧰 Tambah Produk Sewa
      </h2>

      <form
        onSubmit={handleSewaAlatSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Nama Alat"
          onChange={handlesewaalatChange}
          className="w-full border-2 border-gray-200 p-4 rounded-2xl"
        />

        <input
          type="number"
          name="price"
          placeholder="Harga / Hari"
          onChange={handlesewaalatChange}
          className="w-full border-2 border-gray-200 p-4 rounded-2xl"
        />

        <textarea
          name="description"
          rows="4"
          placeholder="Deskripsi"
          onChange={handlesewaalatChange}
          className="w-full border-2 border-gray-200 p-4 rounded-2xl"
        />

        <input
          type="file"
          name="image"
          onChange={handlesewaalatChange}
          className="w-full border-2 border-gray-200 p-4 rounded-2xl"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold"
        >
          Tambah Produk
        </button>

      </form>

    </div>

  )}

  {/* PRODUK MARKETPLACE */}
  {productTab === "marketplace" && (

    <div>

      <h2 className="text-3xl font-bold mb-6">
        🛒 Produk Marketplace
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {marketplaceProducts.length === 0 ? (

  <div className="col-span-full text-center py-16">

    <h1 className="text-3xl font-black">
      Belum ada produk marketplace
    </h1>

    <p className="text-gray-300 mt-3">
      Tambahkan produk pertama kamu 
    </p>

  </div>

) : (

  marketplaceProducts.map((product) => (

          <div
            key={product.id}
            className="bg-white text-black rounded-3xl overflow-hidden shadow-2xl"
          >

            <img
              src={`https://campushub-backend-production-df39.up.railway.app/uploads/${product.image}`}
              alt=""
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

              <h3 className="text-2xl font-bold">
                {product.name}
              </h3>

              <p className="text-blue-600 font-bold text-xl mt-2">
                Rp {Number(product.price).toLocaleString("id-ID")}
              </p>

              <p className="text-gray-500 mt-3">
  {product.description}
</p>

<div className="flex gap-3 mt-5">

 <button
  onClick={(e) => {
    e.preventDefault();
    console.log("TOMBOL EDIT DIKLIK");
    alert("TOMBOL EDIT DIKLIK");
    setEditingProduct(product);
  }}
  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold"
>
  Edit Produk
</button>

</div>

            </div>

          </div>

        ))
)}
      </div>

    </div>

  )}

  {productTab === "sewaalat" && (

    <div>

      <h2 className="text-3xl font-bold mb-6">
        🧰 Produk Sewa Barang
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {sewaalatProducts.length === 0 ? (

  <div className="col-span-full text-center py-16">

    <h1 className="text-3xl font-black">
      Belum ada produk sewa barang
    </h1>

    <p className="text-gray-300 mt-3">
      Tambahkan barang pertama kamu
    </p>

  </div>

) : (

  sewaalatProducts.map((product) => (

          <div
            key={product.id}
            className="bg-white text-black rounded-3xl overflow-hidden shadow-2xl"
          >

            <img
              src={`https://campushub-backend-production-df39.up.railway.app/uploads/${product.image}`}
              alt=""
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

              <h3 className="text-2xl font-bold">
                {product.name}
              </h3>

              <p className="text-green-600 font-bold text-xl mt-2">
                Rp {Number(product.price).toLocaleString("id-ID")} / hari
              </p>

              <p className="text-gray-500 mt-3">
  {product.description}
</p>

<div className="flex gap-3 mt-5">

  <button
  onClick={() => {
    console.log("EDIT DIKLIK");
    console.log(product);

    setEditingProduct(product);
  }}
  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-2xl font-semibold"
>
  Edit Produk
</button>

  <button
    onClick={() => handleDeleteProduct(product.id)}
    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold"
  >
    Hapus Produk
  </button>

</div>

            </div>

          </div>

        ))
)}

      </div>

    </div>

  )}

</div>

)}
{activeMenu === "orders" && (

<div>

  <h2 className="text-4xl font-black mb-8">
    📦 Kelola Pesanan
  </h2>

  <div className="space-y-8">

    {myOrders.map((order) => (

      <div
        key={order.id}
        className="
          bg-white text-black
          rounded-3xl
          p-6
          shadow-2xl
          flex flex-col xl:flex-row
          gap-6
          items-start xl:items-center
          justify-between
        "
      >

        {/* LEFT */}
        <div className="flex gap-5 items-center">

          {/* ICON FILE */}
          <div className="
            w-24 h-24
            rounded-2xl
            bg-gray-100
            flex items-center justify-center
            text-5xl
          ">
            {order.type === "print"
              ? "📄"
              : order.type === "jastip"
              ? "🛍️"
              : order.type === "marketplace"
              ? "📦"
              : "🧰"}
          </div>

          {/* INFO */}
          <div>

            <h2 className="text-3xl font-black">

  {order.type === "print" &&
    ` ${order.productName}`}

  {order.type === "jastip" &&
    `${order.productName}`}

  {order.type === "marketplace" &&
    `Marketplace: ${order.productName}`}

  {order.type === "sewaalat" &&
    `Sewa Barang: ${order.productName}`}

</h2>

            <p className="text-gray-500 mt-2">
              👤 Dipesan oleh: {order.buyerRealName} ({order.nim})
            </p>

            <p className="text-gray-500">
              📦 Jumlah: {order.quantity || 1}
            </p>
            
              {order.note && (
  <p className="text-gray-600 mt-2">
    📝 Catatan Lokasi: {order.note}
  </p>
)}

  {(order.type === "jastip" ||
  order.type === "print") &&
  order.sellerName && (

  <div className="mt-3 bg-blue-50 p-3 rounded-xl">
    <p className="text-blue-700 font-semibold">
      Pesanan Diambil Oleh
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

        {/* RIGHT */}
        <div className="flex flex-col gap-4 w-full xl:w-auto">

          {/* STATUS */}
          <div className="flex justify-end">

            <span
              className={`px-5 py-2 rounded-full text-sm font-bold text-white ${
                order.status === "Selesai"
                  ? "bg-green-500"
                  : order.status === "Sedang Diantar"
                  ? "bg-blue-500"
                  : "bg-yellow-500"
              }`}
            >
              {order.status}
            </span>

          </div>

          {/* DOWNLOAD FILE */}
          {order.file && (

            <a
              href={`https://campushub-backend-production-df39.up.railway.app/uploads/orders/${order.file}`}
              target="_blank"
              rel="noreferrer"
              className="
                bg-blue-600 hover:bg-blue-700
                text-white
                px-6 py-3
                rounded-2xl
                font-bold
                text-center
                transition
              "
            >
              📥 Lihat / Download File
            </a>

          )}

          {(order.type === "print" ||
  order.type === "jastip") &&
  !order.sellerName && (

  <button
    onClick={() =>
      handleTakeOrder(order.id)
    }
    className="
      w-full
      bg-purple-600
      hover:bg-purple-700
      text-white
      py-3
      rounded-2xl
      font-bold
      transition
    "
  >
    Ambil Pesanan
  </button>

)}

          {/* BUTTON STATUS */}
          <div className="grid grid-cols-3 gap-3">

            <button
              onClick={() =>
                updateStatus(order.id, "Diproses")
              }
              className="
                bg-yellow-500 hover:bg-yellow-600
                text-white py-3 rounded-2xl
                font-semibold transition
              "
            >
              Diproses
            </button>

            <button
              onClick={() =>
                updateStatus(order.id, "Sedang Diantar")
              }
              className="
                bg-blue-500 hover:bg-blue-600
                text-white py-3 rounded-2xl
                font-semibold transition
              "
            >
              Antar
            </button>

            <button
              onClick={() =>
                updateStatus(order.id, "Selesai")
              }
              className="
                bg-green-600 hover:bg-green-700
                text-white py-3 rounded-2xl
                font-semibold transition
              "
            >
              Selesai
            </button>
          </div>

        </div>

      </div>

    ))}

  </div>

</div>

)}

    </div>
  </div>
</div>

  </>
);
}

export default Dashboard;