// Array de contactos en memoria (sin localStorage)
let contactos = [];

/**
 * Agrega un nuevo contacto a la agenda
 * @param {string} nombre - Nombre del contacto
 * @param {string} email - Email del contacto
 * @param {string} telefono - Teléfono del contacto
 * @param {string} notas - Notas adicionales (opcional)
 * @returns {object} El contacto agregado
 */
function addContact(nombre, email, telefono, notas = '') {
    // Validar que los campos requeridos no estén vacíos
    if (!nombre || !email || !telefono) {
        console.error('Error: Los campos nombre, email y teléfono son requeridos.');
        return null;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.error('Error: El email no es válido.');
        return null;
    }
    
    // Crear objeto de contacto
    const nuevoContacto = {
        id: Date.now(),
        nombre: nombre.trim(),
        email: email.trim(),
        telefono: telefono.trim(),
        notas: notas.trim(),
        fechaCreacion: new Date().toLocaleDateString('es-ES')
    };
    
    // Agregar a la lista
    contactos.push(nuevoContacto);
    
    console.log('Contacto agregado exitosamente:', nuevoContacto);
    return nuevoContacto;
}

/**
 * Obtiene todos los contactos
 * @returns {array} Lista de contactos
 */
function getContacts() {
    return contactos;
}

/**
 * Muestra todos los contactos en consola
 * @param {array} contacts - Array de contactos (opcional, usa contactos global si no se proporciona)
 */
function displayContacts(contacts = contactos) {
    if (contacts.length === 0) {
        console.log('No hay contactos para mostrar.');
        return;
    }
    
    contacts.forEach(contact => {
        console.log(`ID: ${contact.id}, Nombre: ${contact.nombre}, Email: ${contact.email}, Teléfono: ${contact.telefono}`);
    });
}

/**
 * Elimina un contacto por su ID
 * @param {number} id - ID del contacto a eliminar
 * @returns {boolean} true si se eliminó, false si no encontró el contacto
 */
function deleteContact(id) {
    const index = contactos.findIndex(c => c.id === id);
    
    if (index === -1) {
        console.error('Error: Contacto no encontrado.');
        return false;
    }
    
    const contactoEliminado = contactos.splice(index, 1);
    console.log('Contacto eliminado:', contactoEliminado[0]);
    return true;
}

/**
 * Edita un contacto existente
 * @param {number} id - ID del contacto a editar
 * @param {object} updates - Objeto con los campos a actualizar
 * @returns {object|null} El contacto actualizado o null si no se encontró
 */
function editContact(id, updates) {
    const contact = contactos.find(c => c.id === id);
    
    if (!contact) {
        console.error(`Error: Contacto con ID ${id} no encontrado.`);
        return null;
    }
    
    // Validar email si se proporciona
    if (updates.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(updates.email)) {
            console.error('Error: Formato de email inválido.');
            return null;
        }
    }
    
    // Actualizar los campos proporcionados
    Object.keys(updates).forEach(key => {
        if (key in contact && key !== 'id' && key !== 'fechaCreacion') {
            contact[key] = updates[key];
        }
    });
    
    console.log(`Contacto ${contact.nombre} actualizado exitosamente:`, contact);
    return contact;
}

/**
 * Busca contactos por nombre o email
 * @param {string} termino - Término de búsqueda
 * @returns {array} Contactos que coinciden
 */
function searchContact(termino) {
    if (!termino) {
        console.error('Error: Debe proporcionar un término de búsqueda.');
        return [];
    }
    
    const terminoMinuscula = termino.toLowerCase();
    const resultados = contactos.filter(c => 
        c.nombre.toLowerCase().includes(terminoMinuscula) ||
        c.email.toLowerCase().includes(terminoMinuscula)
    );
    
    console.log(`Se encontraron ${resultados.length} contacto(s):`, resultados);
    return resultados;
}

// Ejemplos de uso:
console.log('=== Sistema de Gestión de Contactos ===\n');

// Agregar contactos
addContact('Juan Pérez', 'juan@email.com', '809-555-1234', 'Cliente importante');
addContact('María García', 'maria@email.com', '809-555-5678', 'Proveedora');
addContact('Carlos López', 'carlos@email.com', '809-555-9012');

// Mostrar todos los contactos
console.log('\n--- Todos los contactos ---');
displayContacts();

// Buscar contacto
console.log('\n--- Búsqueda: "maria" ---');
searchContact('maria');

// Editar contacto (usar el ID del primer contacto)
console.log('\n--- Editar contacto ---');
const primerContacto = contactos[0];
editContact(primerContacto.id, { telefono: '809-555-0000', notas: 'VIP' });

// Mostrar contactos actualizados
console.log('\n--- Contactos después de editar ---');
displayContacts();

// Eliminar contacto
console.log('\n--- Eliminar contacto ---');
if (contactos.length > 1) {
    deleteContact(contactos[1].id);
}

// Mostrar contactos finales
console.log('\n--- Contactos finales ---');
displayContacts();