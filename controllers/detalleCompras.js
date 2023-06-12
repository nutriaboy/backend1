const { response } = require('express');
const { DetalleCompras } = require('../models');

const obtenerDetallesCompras = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, detallesCompras] = await Promise.all([
        DetalleCompras.countDocuments(query),
        DetalleCompras.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('tipoCerveza', 'nombre')

    ]);

    res.json({
        ok: true,
        total,
        detallesCervezas: detallesCompras
    });
}

const crearDetalleCompra = async (req, res = response) => {

    const { estado, usuario, ...body } = req.body;

    try {

        const detalleCompra = new DetalleCompras({ usuario, ...body });
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
    const { estado, cerveza, ...data } = req.body;

    const detalleCompra = await DetalleCompras.findByIdAndUpdate(id, data, { new: true });

    await detalleCompra
        .populate('tipoCerveza', 'nombre')
        .execPopulate();

    res.status(200).json({
        ok: true,
        detalleCompra
    });

}

const borrarDetalleCompra = async (req, res = response) => {

    const { id } = req.params;
    const detalleCompraBorrada = await DetalleCompras.findByIdAndUpdate(id, { estado: false }, { new: true });

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