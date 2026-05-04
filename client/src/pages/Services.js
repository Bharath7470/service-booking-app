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
    // validation
    if (!form.title || !form.description || !form.price) {
      alert("All fields are required");
      return;
    }

    if (form.price <= 0) {
      alert("Price must be positive");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/services/add", form);
      alert("Service added");

      setForm({ title: "", description: "", price: "" }); // reset form
      fetchServices();
    } catch (err) {
      alert(err.response?.data?.error || "Error");
    }
  };

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto", padding: "10px" }}>
      <h2 style={{ color: "#2c3e50" }}>Available Services</h2>

      {/* Add Service Form */}
      <div style={{ marginBottom: "10px" }}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 15px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Add Service
      </button>

      <hr />

      {/* Search */}
      <input
        placeholder="Search services..."
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "15px 0",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      {/* Services List */}
      {filteredServices.length === 0 ? (
        <p style={{ color: "gray" }}>No services found</p>
      ) : (
        filteredServices.map((s) => (
          <div
            key={s._id}
            style={{
              border: "1px solid #e0e0e0",
              padding: "15px",
              borderRadius: "10px",
              backgroundColor: "white",
              margin: "10px 0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}
          >
            <h3 style={{ marginBottom: "5px" }}>{s.title}</h3>
            <p style={{ color: "#555" }}>{s.description}</p>
            <p style={{ fontWeight: "bold", color: "#2c3e50" }}>
              ₹{s.price}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Services;
