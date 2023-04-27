const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
    },
},{
        timestamps: true
});