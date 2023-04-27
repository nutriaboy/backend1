const { Schema, model } = require('mongoose');

const DetalleVentaSchema = Schema({
    detalleCerveza: {
        type: Schema.Types.ObjectId,
        ref: 'DetalleCerveza',
        required: true,
        unique: false,
    },
    estado: {
        type: Boolean,
        default: true,
    },
});


module.exports = model( 'DetalleVenta', DetalleVentaSchema );