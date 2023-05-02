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

CervezaSchema.methods.toJSON = function() {
    const { __v, _id, ...cerveza  } = this.toObject();
    cerveza.id = _id;
    return cerveza;
}


module.exports = model('Cerveza', CervezaSchema);
