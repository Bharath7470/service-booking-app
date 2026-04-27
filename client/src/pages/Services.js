import React, { useState, useEffect } from "react";
import axios from "axios";

function Services() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: ""
  });

  const fetchServices = async () => {
    const res = await axios.get("http://localhost:5000/api/services");
    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.price <= 0) {
      alert("Price must be positive");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/services/add", form);
      alert("Service added");
      fetchServices();
    } catch (err) {
      alert(err.response?.data?.error || "Error");
    }
  };

  return (
    <div>
      <h2>Services</h2>

      {/* Add Service */}
      <input name="title" placeholder="Title" onChange={handleChange} /><br />
      <input name="description" placeholder="Description" onChange={handleChange} /><br />
      <input name="price" placeholder="Price" onChange={handleChange} /><br />
      <button onClick={handleSubmit}>Add Service</button>

      <hr />

      {/* Search */}
      <input
        placeholder="Search services..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Services List */}
      {services
        .filter((s) =>
          s.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((s) => (
          <div
            key={s._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: "white",
              margin: "10px auto",
              width: "250px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <p><b>₹{s.price}</b></p>
          </div>
        ))}
    </div>
  );
}

export default Services;