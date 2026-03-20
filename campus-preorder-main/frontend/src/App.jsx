import { useEffect, useMemo, useState } from "react";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Register from "./pages/Register";
import SelectCampus from "./pages/SelectCampus";
import Vendors from "./pages/Vendors";
import { get, post } from "./services/api";
import "./styles.css";

const emptyFeedback = { type: "", text: "" };

export default function App() {
  const [campuses, setCampuses] = useState([]);
  const [selectedCampusId, setSelectedCampusId] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [menu, setMenu] = useState([]);
  const [authFeedback, setAuthFeedback] = useState(emptyFeedback);
  const [orderFeedback, setOrderFeedback] = useState(emptyFeedback);
  const [isLoadingCampuses, setIsLoadingCampuses] = useState(true);
  const [isLoadingVendors, setIsLoadingVendors] = useState(false);
  const [isLoadingMenu, setIsLoadingMenu] = useState(false);
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  const isAuthenticated = Boolean(token);

  useEffect(() => {
    const loadCampuses = async () => {
      try {
        const data = await get("/campuses");
        setCampuses(data);

        if (data.length > 0) {
          setSelectedCampusId((current) => current || data[0].id);
        }
      } catch (error) {
        setAuthFeedback({
          type: "error",
          text: error.message || "Unable to load campuses.",
        });
      } finally {
        setIsLoadingCampuses(false);
      }
    };

    loadCampuses();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setVendors([]);
      setSelectedVendor(null);
      setMenu([]);
      return;
    }

    const loadVendors = async () => {
      setIsLoadingVendors(true);

      try {
        const data = await get("/vendors", { token });
        setVendors(data);
        setSelectedVendor((current) => data.find((vendor) => vendor.id === current?.id) || data[0] || null);
      } catch (error) {
        setOrderFeedback({
          type: "error",
          text: error.message || "Unable to load vendors.",
        });
      } finally {
        setIsLoadingVendors(false);
      }
    };

    loadVendors();
  }, [isAuthenticated, token]);

  useEffect(() => {
    if (!selectedVendor || !token) {
      setMenu([]);
      return;
    }

    const loadMenu = async () => {
      setIsLoadingMenu(true);

      try {
        const data = await get(`/menus/${selectedVendor.id}`, { token });
        setMenu(data);
      } catch (error) {
        setOrderFeedback({
          type: "error",
          text: error.message || "Unable to load menu.",
        });
      } finally {
        setIsLoadingMenu(false);
      }
    };

    loadMenu();
  }, [selectedVendor, token]);

  const canRegister = useMemo(
    () => campuses.length > 0 && Boolean(selectedCampusId),
    [campuses.length, selectedCampusId],
  );

  const handleRegister = async (form) => {
    setIsSubmittingAuth(true);
    setAuthFeedback(emptyFeedback);

    try {
      const response = await post("/auth/register", {
        ...form,
        campusId: selectedCampusId,
      });

      setAuthFeedback({
        type: "success",
        text: response.message || "Registration complete. You can log in now.",
      });
    } catch (error) {
      setAuthFeedback({
        type: "error",
        text: error.message || "Registration failed.",
      });
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleLogin = async (form) => {
    setIsSubmittingAuth(true);
    setAuthFeedback(emptyFeedback);

    try {
      const response = await post("/auth/login", form);
      localStorage.setItem("token", response.token);
      setToken(response.token);
      setAuthFeedback({
        type: "success",
        text: "Logged in successfully.",
      });
    } catch (error) {
      setAuthFeedback({
        type: "error",
        text: error.message || "Login failed.",
      });
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setOrderFeedback(emptyFeedback);
    setAuthFeedback(emptyFeedback);
  };

  const handlePlaceOrder = async (items) => {
    if (!selectedVendor) {
      return;
    }

    setIsSubmittingOrder(true);
    setOrderFeedback(emptyFeedback);

    try {
      const response = await post(
        "/orders",
        {
          vendorId: selectedVendor.id,
          items,
        },
        { token },
      );

      setOrderFeedback({
        type: "success",
        text: `Order placed successfully. Order id: ${response.id}`,
      });
    } catch (error) {
      setOrderFeedback({
        type: "error",
        text: error.message || "Order failed.",
      });
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Deploy-ready demo</p>
        <h1>Campus Preorder</h1>
        <p className="hero-copy">
          Students can register with their campus email, browse cafeteria vendors, and place
          prepaid pickup orders without relying on localhost-only config.
        </p>
      </section>

      <section className="panel-grid">
        <div className="panel">
          <h2>1. Choose a campus</h2>
          <SelectCampus
            campuses={campuses}
            selectedCampusId={selectedCampusId}
            setCampus={setSelectedCampusId}
            isLoading={isLoadingCampuses}
          />
        </div>

        <div className="panel">
          <h2>2. Create account</h2>
          <Register
            disabled={!canRegister || isSubmittingAuth}
            onRegister={handleRegister}
            selectedCampusId={selectedCampusId}
          />
          <Login disabled={isSubmittingAuth} onLogin={handleLogin} />
          {authFeedback.text ? (
            <p className={`feedback ${authFeedback.type}`}>{authFeedback.text}</p>
          ) : null}
          {isAuthenticated ? (
            <button className="secondary-button" onClick={handleLogout} type="button">
              Log out
            </button>
          ) : null}
        </div>
      </section>

      <section className="panel-grid">
        <div className="panel">
          <h2>3. Browse vendors</h2>
          <Vendors
            vendors={vendors}
            selectedVendorId={selectedVendor?.id || ""}
            onSelectVendor={(vendorId) =>
              setSelectedVendor(vendors.find((vendor) => vendor.id === vendorId) || null)
            }
            isLoading={isLoadingVendors}
            isAuthenticated={isAuthenticated}
          />
        </div>

        <div className="panel">
          <h2>4. Place an order</h2>
          <Order
            menu={menu}
            vendor={selectedVendor}
            onPlaceOrder={handlePlaceOrder}
            isAuthenticated={isAuthenticated}
            isLoading={isLoadingMenu}
            isSubmitting={isSubmittingOrder}
          />
          {orderFeedback.text ? (
            <p className={`feedback ${orderFeedback.type}`}>{orderFeedback.text}</p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
