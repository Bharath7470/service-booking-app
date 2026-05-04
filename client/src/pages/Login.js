import React, { useState } from "react";
import axios from "axios";

function Login({ setIsLoggedIn, setPage }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      // ✅ Store userId
      localStorage.setItem("userId", res.data.userId);

      // ✅ Update app state
      setIsLoggedIn(true);
      setPage("services");

      alert(res.data.message);

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      /><br />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      /><br />

      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}

export default Login;