import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );
      alert(res.data.message);
    } catch (err) {
  console.log("FULL ERROR:", err); // shows full error
  console.log("SERVER RESPONSE:", err.response); // shows backend response
  alert(err.response?.data?.message || err.message);
}
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
      /><br />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      /><br />

      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
      /><br />

      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

export default Register;