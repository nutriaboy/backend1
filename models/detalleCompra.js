const { Schema, model } = require('mongoose');

const DetalleCompraSchema = Schema({

    cerveza: {
        type: Schema.Types.ObjectId,
        ref: 'Cerveza',
        required: true,
        unique: false,
    },
    compra: {
        type: Schema.Types.ObjectId,
        ref: 'Compra',
        required: true,
        unique: false,
    },
    cantidad: {
        type: Number,
        required: true,
        default: 0,
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

DetalleCompraSchema.methods.toJSON = function() {
    const { __v, _id, ...detalleCompra  } = this.toObject();
    detalleCompra.id = _id;
    return detalleCompra;
}


module.exports = model('DetalleCompra', DetalleCompraSchema);
