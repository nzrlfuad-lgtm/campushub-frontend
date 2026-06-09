import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate();

   const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    nim: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

    alert("Berhasil Masuk");

    if (data.user.role === "penjual") {
       navigate("/dashboard");
    } else {
      navigate("/home");
    }

    } catch (error) {

      console.log(error);

      alert("Gagal Masuk!!!");
    }
  };

  return (

  <div className="min-h-screen flex">

<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white flex-col justify-center px-16">

  <h1 className="text-6xl font-extrabold mb-6">
     CampusHub
  </h1>

  <p className="text-xl text-blue-100 mb-10">
    Platform kebutuhan mahasiswa dalam satu tempat.
  </p>

  <div className="space-y-5">

    <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
      🛒 Marketplace Mahasiswa
    </div>

    <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
      🖨️ Jasa Print Kampus
    </div>

    <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
      🍔 Jastip Jajanan
    </div>

    <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
      🧰 Sewa Barang Mahasiswa
    </div>

  </div>

</div>

<div className="flex-1 flex items-center justify-center bg-gray-100 p-6">

  <form
    onSubmit={handleSubmit}
    className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10"
  >

    <div className="text-center mb-8">

      <div className="text-5xl mb-3">
        👋
      </div>

      <h2 className="text-4xl font-bold text-gray-800">
        Selamat Datang
      </h2>

      <p className="text-gray-500 mt-2">
        Masuk ke akun CampusHub
      </p>

    </div>

    <input
      type="text"
      name="nim"
      placeholder="NIM"
      value={formData.nim}
      onChange={handleChange}
      className="w-full border border-gray-300 p-4 rounded-xl mb-4"
   />
    <div className="relative mb-4">

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    className="w-full border p-3 rounded-lg pr-14"
  />
  
  <button
    type="button"
    onClick={() =>
      setShowPassword(!showPassword)
    }
    className="
      absolute right-4 top-1/2
      -translate-y-1/2
      text-gray-500 hover:text-blue-600
      transition
    "
  >
    {showPassword ? "🙈" : "👁️"}
  </button>

</div>

    <div className="text-right mb-4">
  <span
    onClick={() => navigate("/forgot-password")}
    className="text-sm text-blue-600 cursor-pointer hover:underline"
  >
    Lupa Password?
  </span>
</div>

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:scale-105 transition"
    >
      Masuk
    </button>

    <p className="text-center text-gray-500 mt-6">
      Belum punya akun?
      <span
        onClick={() => navigate("/register")}
        className="text-blue-600 font-semibold ml-1 cursor-pointer"
      >
        Daftar
      </span>
    </p>

  </form>

</div>
```

  </div>
  );
}

export default LoginPage;