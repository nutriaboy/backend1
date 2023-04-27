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

SuscriptorSchema.methods.toJSON = function() {
    const { __v, _id, ...suscriptor  } = this.toObject();
    suscriptor.idSuscriptor = _id;
    return suscriptor;
}


module.exports = model( 'Suscriptor', SuscriptorSchema );
