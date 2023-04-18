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


module.exports = model( 'TipoCerveza', TipoCervezaSchema );
