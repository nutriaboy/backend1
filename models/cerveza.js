const { Schema, model } = require('mongoose');

const CervezaSchema = Schema({
    tipoCerveza: {
        type: Schema.Types.ObjectId,
        ref: 'TipoCerveza',
        required: true,
        unique: false,
    },
    nombre: {
        type: String,
        required: true,
    },
    marca: {
        type: String,
        required: true,
    },
    estado: {
        type: Boolean,
        default: true,
    },
    precioUnit: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        default: 0,
    },
    
});

CervezaSchema.methods.toJSON = function() {
    const { __v, _id, ...cerveza  } = this.toObject();
    cerveza.id = _id;
    return cerveza;
}


module.exports = model('Cerveza', CervezaSchema);
