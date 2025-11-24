// Function to display contacts
function displayContacts(contacts) {
    contacts.forEach(contact => {
        console.log(`Name: ${contact.name}, Phone: ${contact.phone}`);
    });
}

// Function to delete a contact by name
function deleteContact(contacts, name) {
    const index = contacts.findIndex(contact => contact.name === name);
    if (index !== -1) {
        contacts.splice(index, 1);
        console.log(`Contact ${name} deleted.`);
    } else {
        console.log(`Contact ${name} not found.`);
    }
}

/**
 * Edita un contacto existente
 * @param {array} contacts - Array de contactos
 * @param {string} name - Nombre del contacto a editar
 * @param {object} updates - Objeto con los campos a actualizar
 * @returns {object|null} El contacto actualizado o null si no se encontró
 */
function editContact(contacts, name, updates) {
    const contact = contacts.find(c => c.name === name);
    
    if (!contact) {
        console.error(`Contact ${name} not found.`);
        return null;
    }

    // Validar email si se proporciona
    if (updates.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(updates.email)) {
            console.error('Invalid email format.');
            return null;
        }
    }

    // Actualizar los campos proporcionados
    Object.keys(updates).forEach(key => {
        if (key in contact) {
            contact[key] = updates[key];
        }
    });

    console.log(`Contact ${name} updated successfully.`, contact);
    return contact;
}