import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const EditContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const currentContact = store.contacts.find((c) => c.id === parseInt(id));

    if (currentContact) {
      setName(currentContact.name);
      setEmail(currentContact.email);
      setPhone(currentContact.phone);
      setAddress(currentContact.address);
    }
  }, [id, store.contacts]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedContact = {
      name: name,
      email: email,
      phone: phone,
      address: address,
    };

    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/mauricio/contacts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContact),
        },
      );

      if (response.ok) {
        const data = await response.json();

        dispatch({
          type: "edit_contact",
          payload: data,
        });

        navigate("/");
      } else {
        console.log("Error al actualizar:", response.status);
      }
    } catch (error) {
      console.log("Error de conexión:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Edit Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-2">
          Update
        </button>
        <Link to="/">or get back to contacts</Link>
      </form>
    </div>
  );
};
