import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { registerUser } from "../services/authService";

function RegisterPage() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
  name:"",
  nim: "",
  email: "",
  password: "",
  role: "pembeli",
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const res = await registerUser(formData);

    alert(res.message);

    navigate("/login");
  } catch (err) {
    alert(
      err.response?.data?.message ||
      "Gagal Mendaftarkan Akun!!!"
    );
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-6">

      <form
  onSubmit={handleRegister}
  className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
>

        <div className="text-center mb-8">


  <h2 className="text-4xl font-bold text-gray-800">
    CampusHub
  </h2>

  <p className="text-gray-500 mt-2">
    Daftar akun mahasiswa
  </p>

</div>
        <input
  type="text"
  name="name"
  placeholder="Nama Lengkap"
  value={formData.name}
  onChange={handleChange}
  className="w-full border p-3 rounded-lg mb-4"
/>

        <input
          type="text"
          name="nim"
          placeholder="NIM"
          value={formData.nim}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
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

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        >
         <option value="pembeli">
           Pembeli
         </option>

         <option value="penjual">
           Penjual
          </option>
        </select>

        <button
          type="submit"
          className="
          w-full
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          text-white
          py-4
          rounded-xl
          font-semibold
          text-lg
          hover:scale-105
          transition
          "
        >
          Daftar 
        </button>

      <p className="text-center text-gray-500 mt-6">
  Sudah punya akun?
  <span
    onClick={() => navigate("/login")}
    className="text-blue-600 font-semibold ml-1 cursor-pointer"
  >
    Masuk
  </span>
</p>

      </form>

    </div>
  );
}

export default RegisterPage;