import {
  Routes,
  Route,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import MarketplacePage from "./pages/MarketplacePage";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/PenjualPage";
import PrintPage from "./pages/PrintPage";
import JastipPage from "./pages/JastipPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import SewaalatPage from "./pages/SewaalatPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function App() {
  return (
     <>
      <ScrollToTop />

    <Routes>

      <Route
        path="/marketplace"
        element={<MarketplacePage />}
      />  

      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/my-orders"
        element={<MyOrdersPage />}
      />

      <Route
        path="/jastip"
        element={<JastipPage />}
      />

      <Route
        path="/sewa"
        element={<SewaalatPage/>}
      />

      <Route
        path="/print"
        element={<PrintPage />}
      />

      <Route
        path="/home"
        element={<HomePage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
  path="/forgot-password"
  element={<ForgotPasswordPage />}
/>

    </Routes>
    </>
  );
}

export default App;