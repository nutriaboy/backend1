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
    rut: {
        type: String,
        required: true,
        unique: true
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

ProveedorSchema.methods.toJSON = function() {
    const { __v, _id, ...proveedor  } = this.toObject();
    proveedor.uid = _id;
    return proveedor;
}

module.exports = model( 'Proveedor', ProveedorSchema );
