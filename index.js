const { Command } = require("commander");
const program = new Command();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

// Define las opciones de línea de comandos
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

// Parsea los argumentos de la línea de comandos
program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts()
        .then((contacts) => console.log("Contactos:", contacts))
        .catch((err) => console.error("Error al listar los contactos:", err));
      break;

    case "get":
      getContactById(id)
        .then((contact) => {
          if (contact) {
            console.log("Contacto encontrado:", contact);
          } else {
            console.log("Contacto no encontrado");
          }
        })
        .catch((err) => console.error("Error al obtener el contacto:", err));
      break;

    case "add":
      addContact(name, email, phone)
        .then(() => console.log("Contacto agregado exitosamente"))
        .catch((err) => console.error("Error al agregar el contacto:", err));
      break;

    case "remove":
      removeContact(id)
        .then(() => console.log("Contacto eliminado exitosamente"))
        .catch((err) => console.error("Error al eliminar el contacto:", err));
      break;

    default:
      console.warn("\x1B[31m Tipo de acción desconocido!");
  }
}

invokeAction(argv);
