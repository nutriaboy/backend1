const { Schema, model } = require('mongoose');

const CervezaSchema = Schema({
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
}, {
    timestamps: true
});


module.exports = model('Cerveza', CervezaSchema);
