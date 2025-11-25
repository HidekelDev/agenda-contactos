// Cargar contactos del localStorage
let contactos = JSON.parse(localStorage.getItem('contactos')) || [];

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

    // Guardar en localStorage
    localStorage.setItem('contactos', JSON.stringify(contactos));

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
    localStorage.setItem('contactos', JSON.stringify(contactos));
    console.log('Contacto eliminado:', contactoEliminado[0]);
    return true;
}

/**
 * Busca contactos por nombre
 * @param {string} termino - Término de búsqueda
 * @returns {array} Contactos que coinciden
 */
function searchContact(termino) {
    const terminoMinuscula = termino.toLowerCase();
    return contactos.filter(c => 
        c.nombre.toLowerCase().includes(terminoMinuscula) ||
        c.email.toLowerCase().includes(terminoMinuscula)
    );
}