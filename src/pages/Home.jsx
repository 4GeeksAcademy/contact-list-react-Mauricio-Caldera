import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactCard } from "../components/ContactCard.jsx";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store } = useGlobalReducer();

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add-contact" className="btn btn-success">
          Add new contact
        </Link>
      </div>

      <div className="list-group">
        {store.contacts && store.contacts.length > 0 ? (
          store.contacts.map((contacto) => (
            <ContactCard key={contacto.id} contact={contacto} />
          ))
        ) : (
          <div className="text-center">
            <p>No hay contactos. ¡Añade uno nuevo!</p>
          </div>
        )}
      </div>
    </div>
  );
};
