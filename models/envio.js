const { Schema, model } = require('mongoose');

const EnvioSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
        unique: false,
    },
    venta: {
        type: Schema.Types.ObjectId,
        ref: 'Venta',
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


EnvioSchema.methods.toJSON = function() {
    const { __v, _id, ...envio  } = this.toObject();
    envio.id = _id;
    return envio;
}


module.exports = model( 'Envio', EnvioSchema );