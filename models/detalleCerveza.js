const { Schema, model } = require('mongoose');

const DetalleCervezaSchema = Schema({

    cerveza: {
        type: Schema.Types.ObjectId,
        ref: 'Cerveza',
        required: true,
        unique: false,
    },
    tipoCerveza: {
        type: Schema.Types.ObjectId,
        ref: 'TipoCerveza',
        required: true,
        unique: false,
    },
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        default: 1,
    },
    precio: {
        type: Number,
        default: 0,
    },
    estado: {
        type: Boolean,
        default: true,
    }


});


module.exports = model('DetalleCerveza', DetalleCervezaSchema);
