const { Schema, model } = require('mongoose');

const TipoUsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
    }

});


module.exports = model( 'TipoUsuario', TipoUsuarioSchema );
