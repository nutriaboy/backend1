const { Schema, model } = require('mongoose');

const DetalleVentaSchema = Schema({
    venta: {
        type: Schema.Types.ObjectId,
        ref: 'Venta',
        required: true,
        unique: false,
    },
    cerveza: {
        type: Schema.Types.ObjectId,
        ref: 'Cerveza',
        required: true,
        unique: false,
    },
    estado: {
        type: Boolean,
        default: true,
    },
    cantidad: {
        type: Number,
        required: true,
        default: 1,
    },
    precio: {
        type: Number,
        required: true,
        default: 0,
    },
});

DetalleVentaSchema.methods.toJSON = function() {
    const { __v, _id, ...detalleVenta  } = this.toObject();
    detalleVenta.id = _id;
    return detalleVenta;
}

module.exports = model( 'DetalleVenta', DetalleVentaSchema );