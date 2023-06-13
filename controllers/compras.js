const { response } = require('express');
const { Compra } = require('../models');




const obtenerCompras = async (req, res) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, compras] = await Promise.all([
        Compra.countDocuments(query),
        Compra.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate( 'proveedor', 'nombre' )
    ]);

    res.json({
        ok: true,
        total,
        compras
    });
}

const crearCompra = async (req, res) => {
    const { estado, ...body } = req.body;
    try {
        const compra = new Compra({ ...body });

        await compra.save();

        res.status(201).json({
            ok: true,
            compra
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
}

const actualizarCompra = async (req, res) => {
    const { id } = req.params;
    const { estado, proveedor, ...data } = req.body;

    try {
        const compra = await Compra.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            ok: true,
            compra
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
}

const eliminarCompra = async (req, res) => {
    const { id } = req.params;
    const compraBorrada = await Compra.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(200).json({
        ok: true,
        compraBorrada
    });
}

module.exports = {
    obtenerCompras,
    crearCompra,
    actualizarCompra,
    eliminarCompra
};