const { response } = require('express');
const { DetalleCerveza } = require('../models');

const obtenerDetallesCervezas = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, detallesCervezas] = await Promise.all([
        DetalleCerveza.countDocuments(query),
        DetalleCerveza.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('tipoCerveza', 'nombre')

    ]);

    res.json({
        ok: true,
        total,
        detallesCervezas
    });
}

const crearDetalleCerveza = async (req, res = response) => {

    const { estado, usuario, ...body } = req.body;

    try {

        const detalleCerveza = new DetalleCerveza({ usuario, ...body });
        // Guardar en BD
        await detalleCerveza.save();



        res.status(201).json({
            ok: true,
            detalleCerveza
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
}

const actualizarDetalleCerveza = async (req, res = response) => {

    const { id } = req.params;
    const { estado, cerveza, ...data } = req.body;

    const detalleCerveza = await DetalleCerveza.findByIdAndUpdate(id, data, { new: true });

    await detalleCerveza
        .populate('tipoCerveza', 'nombre')
        .execPopulate();

    res.status(200).json({
        ok: true,
        detalleCerveza
    });

}

const borrarDetalleCerveza = async (req, res = response) => {

    const { id } = req.params;
    const detalleCervezaBorrada = await DetalleCerveza.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(200).json({
        ok: true,
        detalleCervezaBorrada
    });
}






module.exports = {
    obtenerDetallesCervezas,
    crearDetalleCerveza,
    actualizarDetalleCerveza,
    borrarDetalleCerveza,

};