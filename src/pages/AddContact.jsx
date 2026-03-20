import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContact = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newContact = {
      name: name,
      email: email,
      phone: phone,
      address: address,
    };

    try {
      const response = await fetch(
        "https://playground.4geeks.com/contact/agendas/mauricio/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newContact),
        },
      );

      if (response.ok) {
        const data = await response.json();

        dispatch({
          type: "add_contact",
          payload: data,
        });

        navigate("/");
      } else {
        console.log("Error al crear:", response.status);
      }
    } catch (error) {
      console.log("Error de conexión:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add a new contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-2">
          Save
        </button>
        <Link to="/">or get back to contacts</Link>
      </form>
    </div>
  );
};
