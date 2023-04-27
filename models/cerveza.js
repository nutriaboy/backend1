const { Schema, model } = require('mongoose');

const CervezaSchema = Schema({
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
}, {
    timestamps: true
});


module.exports = model('Cerveza', CervezaSchema);
