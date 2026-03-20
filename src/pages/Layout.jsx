import { useEffect } from "react";
import { Outlet } from "react-router-dom/dist";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Layout = () => {
  const { dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(
          "https://playground.4geeks.com/contact/agendas/mauricio/contacts",
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Datos de la API:", data);

          dispatch({
            type: "set_contacts",
            payload: data.contacts,
          });
        } else {
          console.log("Error cargando los contactos:", response.status);
        }
      } catch (error) {
        console.log("Error de conexión:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <ScrollToTop>
      <Outlet />
    </ScrollToTop>
  );
};
