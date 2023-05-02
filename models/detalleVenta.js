const { Schema, model } = require('mongoose');

const DetalleVentaSchema = Schema({
    venta: {
        type: Schema.Types.ObjectId,
        ref: 'Venta',
        required: true,
        unique: false,
    },
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

DetalleVentaSchema.methods.toJSON = function() {
    const { __v, _id, ...detalleVenta  } = this.toObject();
    detalleVenta.id = _id;
    return detalleVenta;
}

module.exports = model( 'DetalleVenta', DetalleVentaSchema );