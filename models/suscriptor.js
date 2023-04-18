const { Schema, model } = require('mongoose');

const SuscriptorSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
        unique: false,
    },
    estado: {
        type: Boolean,
        default: true,
    }
});


module.exports = model( 'Suscriptor', SuscriptorSchema );
