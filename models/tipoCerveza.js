const { Schema, model } = require('mongoose');

const TipoCervezaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
    }

});

TipoCervezaSchema.methods.toJSON = function() {
    const { __v, _id, ...tipoCerveza  } = this.toObject();
    tipoCerveza.id = _id;
    return tipoCerveza;
}

module.exports = model( 'TipoCerveza', TipoCervezaSchema );
