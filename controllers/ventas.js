const { response } = require('express');
const { Ventas } = require('../models');


const obtenerVentas = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, ventas] = await Promise.all([
        Ventas.countDocuments(query),
        Ventas.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario','nombre apellido')

    ]);

    res.json({
        ok: true,
        total,
        ventas
    });
}

const crearVenta = async (req, res = response) => {

    const { estado, ...body } = req.body;

    try {
        const venta = new Ventas({ ...body });
        // Guardar en BD
        await venta.save();


        res.status(201).json({
            ok: true,
            venta
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
}

const actualizarVenta = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    const venta = await Ventas.findByIdAndUpdate(id, data, { new: true });

    await venta
        .populate('usuario', 'nombre apellido ')
        .execPopulate();

    res.status(200).json({
        ok: true,
        venta
    });

}

const borrarVenta = async (req, res = response) => {

    const { id } = req.params;
    const ventaBorada = await Ventas.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(200).json({
        ok: true,
        ventaBorada
    });
}

module.exports = {
    obtenerVentas,
    crearVenta,
    actualizarVenta,
    borrarVenta

};
