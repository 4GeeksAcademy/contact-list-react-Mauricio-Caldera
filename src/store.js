export const initialStore = () => {
  return {
    message: null,
    contacts: [], // Iniciamos con una lista de contactos vacia
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_contacts":
      return {
        ...store,
        contacts: action.payload,
      };
    case "add_contact":
      return {
        ...store,

        contacts: [...store.contacts, action.payload],
      };

    case "delete_contact":
      return {
        ...store,

        contacts: store.contacts.filter(
          (contact) => contact.id !== action.payload,
        ),
      };

    case "edit_contact":
      return {
        ...store,

        contacts: store.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact,
        ),
      };

    // Aquí iremos agregando más casos luego (como 'add_contact' o 'delete_contact')

    default:
      throw Error("Unknown action.");
  }
}
