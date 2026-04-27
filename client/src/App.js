import { useState, useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // check login status on reload
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
      setPage("services");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setPage("login");
  };

  return (
  <div>
    <h1>Service Booking App</h1>

    <div>
      {!isLoggedIn ? (
        <>
          <button onClick={() => setPage("register")}>Register</button>
          <button onClick={() => setPage("login")}>Login</button>
        </>
      ) : (
        <>
          <button onClick={() => setPage("services")}>Services</button>
          <button onClick={() => setPage("booking")}>Booking</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>

    <div>
      {page === "register" && <Register />}
      {page === "login" && <Login setIsLoggedIn={setIsLoggedIn} setPage={setPage} />}
      {page === "services" && <Services />}
      {page === "booking" && <Booking />}
    </div>
  </div>
);
}

export default App;