const { Schema, model } = require('mongoose');

const CompraSchema = new Schema({ 
    proveedor: {
        type: Schema.Types.ObjectId,
        ref: 'Proveedor',
        required: true,
        unique: false,
    },
    estado: {
        type: Boolean,
        default: true,
    },
    precioTotal: {
        type: Number,
        required: true,
        default: 0
    }

},{
        timestamps: true
});


CompraSchema.methods.toJSON = function() {
    const { __v, _id, ...compra  } = this.toObject();
    compra.id = _id;
    return compra;
}


module.exports = model( 'Compra', CompraSchema );