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
    marca: {
        type: String,
        required: true
    },
    precioUnit: {
        type: Number,
        default: 0,
    },
    estado: {
        type: Boolean,
        default: true,
    }


});


module.exports = model('DetalleCerveza', DetalleCervezaSchema);
