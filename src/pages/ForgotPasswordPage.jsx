import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [nim, setNim] = useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleCheckUser = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/auth/check-user",
        { nim }
      );

      setStep(2);

    } catch (error) {

      alert("User tidak ditemukan");
    }
  };

  const handleResetPassword = async (e) => {

    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return alert(
        "Konfirmasi password tidak sama"
      );
    }

    try {

      const res = await axios.put(
        "http://localhost:5000/api/auth/forgot-password",
        {
          nim,
          newPassword,
        }
      );

      alert(res.data.message);

      navigate("/login");

    } catch (error) {

      alert("Gagal reset password");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          Lupa Password
        </h1>

        {step === 1 && (

          <form onSubmit={handleCheckUser}>

            <input
              type="text"
              placeholder="Masukkan NIM"
              value={nim}
              onChange={(e) =>
                setNim(e.target.value)
              }
              className="w-full border p-4 rounded-xl mb-6"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl"
            >
              Cek Akun
            </button>

          </form>
        )}

        {step === 2 && (

          <form onSubmit={handleResetPassword}>

            <input
              type="password"
              placeholder="Password Baru"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              className="w-full border p-4 rounded-xl mb-4"
            />

            <input
              type="password"
              placeholder="Konfirmasi Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full border p-4 rounded-xl mb-6"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-4 rounded-xl"
            >
              Ganti Password
            </button>

          </form>
        )}

      </div>

    </div>
  );
}

export default ForgotPasswordPage;