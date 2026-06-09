import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
  <div className="w-full px-6 py-4">

    <div className="flex items-center justify-between w-full">

      <Link
        to="/"
        className="text-2xl font-bold"
      >
        CampusHub
      </Link>

      {/* HAMBURGER */}
      <button
        className="md:hidden text-4xl transition"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* DESKTOP MENU */}
      <div
        className="
          hidden md:flex
          flex-col xl:flex-row
          items-end xl:items-center
          gap-3
          ml-auto
        "
      >

      {user && (
  <div className="flex items-center gap-3 order-1 xl:order-2">

    <div className="flex flex-col items-end leading-tight">
      <span className="font-semibold text-sm">
        {user.name}
      </span>

      <span className="text-xs opacity-80">
        {user.nim}
      </span>
    </div>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/");
              }}
              className="bg-red-500 px-4 py-2 rounded-lg whitespace-nowrap"
            >
              Keluar
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2 items-center justify-end order-2 xl:order-1">

          {user && user.role === "pembeli" && (
            <>
              <Link
                to="/marketplace"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg whitespace-nowrap"
              >
                Marketplace
              </Link>

              <Link
                to="/print"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg whitespace-nowrap"
              >
                Jasa Print
              </Link>

              <Link
                to="/jastip"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg whitespace-nowrap"
              >
                Jastip
              </Link>

              <Link
                to="/sewa"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg whitespace-nowrap"
              >
                Sewa Barang
              </Link>

              <Link
                to="/my-orders"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg whitespace-nowrap"
              >
                Pesanan Saya
              </Link>
            </>
          )}

          {user?.role === "penjual" && (
  <>
    <Link
      to="/dashboard"
      className="bg-yellow-400 text-black px-4 py-2 rounded-lg"
    >
      Dashboard
    </Link>
  </>
)}
          {!user && (
            <Link
              to="/"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg"
            >
              Masuk / Daftar
            </Link>
          )}

        </div>
      </div>

    </div>

    {/* MOBILE DROPDOWN */}
    {menuOpen && (
      <div
        className="
          md:hidden
          absolute
          top-20
          left-4
          right-4
          bg-white/10
          backdrop-blur-2xl
          border border-white/20
          rounded-3xl
          p-6
          shadow-2xl
          animate-fadeIn
        "
      >

       {user && (
  <div className="mb-5 border-b border-white/20 pb-4">

    <p className="text-xl font-bold">
      {user.name}
    </p>

    <p className="text-sm text-gray-200">
      {user.nim}
    </p>

    <p className="text-sm text-gray-300 mt-1">
      Login sebagai {user.role}
    </p>

  </div>
)}

        <div className="flex flex-col gap-4">

          {user && user.role === "pembeli" && (
            <>
              <Link
                to="/marketplace"
                className="bg-white text-blue-600 px-5 py-3 rounded-2xl font-semibold"
              >
                Marketplace
              </Link>

              <Link
                to="/print"
                className="bg-white text-blue-600 px-5 py-3 rounded-2xl font-semibold"
              >
                Jasa Print
              </Link>

              <Link
                to="/jastip"
                className="bg-white text-blue-600 px-5 py-3 rounded-2xl font-semibold"
              >
                Jastip
              </Link>

              <Link
                to="/sewa"
                className="bg-white text-blue-600 px-5 py-3 rounded-2xl font-semibold"
              >
                Sewa Barang
              </Link>

              <Link
                to="/my-orders"
                className="bg-white text-blue-600 px-5 py-3 rounded-2xl font-semibold"
              >
                Pesanan Saya
              </Link>
            </>
          )}

          {user?.role === "penjual" && (
            <Link
              to="/dashboard"
              className="bg-yellow-400 text-black px-5 py-3 rounded-2xl font-bold"
            >
              Dashboard
            </Link>
          )}

          {!user && (
            <Link
              to="/"
              className="bg-white text-blue-600 px-5 py-3 rounded-2xl font-bold"
            >
              Masuk / Daftar
            </Link>
          )}

          {user && (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/");
              }}
              className="bg-red-500 py-3 rounded-2xl font-bold"
            >
              Keluar
            </button>
          )}

        </div>

      </div>
    )}

  </div>
</nav>
);
}

export default Navbar;