const { response } = require('express');
const { DetalleCompra, Cerveza } = require('../models');

const obtenerDetallesCompras = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, detallesCompras] = await Promise.all([
        DetalleCompra.countDocuments(query),
        DetalleCompra.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('tipoCerveza', 'nombre')

    ]);

    res.json({
        ok: true,
        total,
        detallesCompras
    });
}
// Sumar Cervezas (+)
const crearDetalleCompra = async (req, res = response) => {

    const { estado, cerveza, cantidad, ...body } = req.body;
    const {stock} = await Cerveza.findById(cerveza);
    try {
        
        if ( stock >= 0){
            await Cerveza.findByIdAndUpdate(cerveza, { stock : stock + cantidad }, { new: true });
        }


        const detalleCompra = new DetalleCompra({cerveza, cantidad,...body });
        // Guardar en BD
        await detalleCompra.save();



        res.status(201).json({
            ok: true,
            detalleCompra
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
}

const actualizarDetalleCompra = async (req, res = response) => {

    const { id } = req.params;
    const { estado, compra, ...data } = req.body;

    const detalleCompra = await DetalleCompra.findByIdAndUpdate(id, data, { new: true });

    await detalleCompra
        .populate('cerveza', 'nombre marca precioUnit')
        .execPopulate();

    res.status(200).json({
        ok: true,
        detalleCompra
    });

}

const borrarDetalleCompra = async (req, res = response) => {

    const { id } = req.params;
    const detalleCompraBorrada = await DetalleCompra.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(200).json({
        ok: true,
        detalleCompraBorrada
    });
}






module.exports = {
    obtenerDetallesCompras,
    crearDetalleCompra,
    actualizarDetalleCompra,
    borrarDetalleCompra,

};