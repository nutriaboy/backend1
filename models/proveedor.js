
const { Schema, model } = require('mongoose');

const ProveedorSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatoria'],
    },
   
    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio']
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    }
});