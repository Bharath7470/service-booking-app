import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import "./App.css";

function App() {
  const [page, setPage] = useState("register");

  const navBtn = (active) => ({
    padding: "10px 16px",
    margin: "6px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: active ? "#1abc9c" : "#2c3e50",
    color: "white"
  });

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1 style={{ color: "#34495e" }}>Service Booking App</h1>

      <div style={{ marginBottom: "20px" }}>
        <button style={navBtn(page==="register")} onClick={() => setPage("register")}>Register</button>
        <button style={navBtn(page==="login")} onClick={() => setPage("login")}>Login</button>
        <button style={navBtn(page==="services")} onClick={() => setPage("services")}>Services</button>
        <button style={navBtn(page==="booking")} onClick={() => setPage("booking")}>Booking</button>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {page === "register" && <Register />}
        {page === "login" && <Login />}
        {page === "services" && <Services />}
        {page === "booking" && <Booking />}
      </div>
    </div>
  );
}

export default App;
