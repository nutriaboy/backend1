const { Schema, model } = require('mongoose');

const VentaSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
        unique: false,
    },
    estado: {
        type: Boolean,
        default: true,
    },
},{
        timestamps: true
});

VentaSchema.methods.toJSON = function() {
    const { __v, _id, ...venta  } = this.toObject();
    venta.id = _id;
    return venta;
}


module.exports = model( 'Venta', VentaSchema );