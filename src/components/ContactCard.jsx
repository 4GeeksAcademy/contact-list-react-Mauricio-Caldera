import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactCard = ({ contact }) => {
  const { dispatch } = useGlobalReducer();

  const [showModal, setShowModal] = useState(false);

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/mauricio/contacts/${contact.id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        dispatch({
          type: "delete_contact",
          payload: contact.id,
        });

        setShowModal(false);
      } else {
        console.log("Error al intentar borrar el contacto");
      }
    } catch (error) {
      console.log("Error de conexión:", error);
    }
  };

  return (
    <>
      {" "}
      <div className="card mb-3 w-100 shadow-sm">
        <div className="row g-0 align-items-center p-3">
          <div className="col-md-3 col-sm-12 d-flex justify-content-center">
            <img
              src={`https://i.pravatar.cc/150?u=${contact.id}`}
              className="rounded-circle"
              style={{ width: "110px", height: "110px", objectFit: "cover" }}
              alt="Profile"
            />
          </div>

          <div className="col-md-6 col-sm-12 text-center text-md-start mt-3 mt-md-0">
            <h5 className="card-title fs-4">{contact.name}</h5>
            <p className="card-text text-secondary mb-1">
              <i className="fa-solid fa-location-dot me-2"></i>{" "}
              {contact.address}
            </p>
            <p className="card-text text-secondary mb-1">
              <i className="fa-solid fa-phone me-2"></i> {contact.phone}
            </p>
            <p className="card-text text-secondary mb-1">
              <i className="fa-solid fa-envelope me-2"></i> {contact.email}
            </p>
          </div>

          <div className="col-md-3 col-sm-12 d-flex justify-content-center justify-content-md-end mt-3 mt-md-0">
            <Link
              to={`/edit-contact/${contact.id}`}
              className="btn btn-light me-4 text-dark fs-5"
            >
              <i className="fa-solid fa-pencil"></i>
            </Link>

            <button
              onClick={() => setShowModal(true)}
              className="btn btn-light text-danger fs-5"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="modal"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Are you sure?</h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>If you press the button the contact will be eliminated</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setShowModal(false)}
                >
                  cancelar
                </button>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={confirmDelete}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
