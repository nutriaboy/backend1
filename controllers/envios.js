const { response } = require('express');
const { Envio } = require('../models');

const obtenerEnvios = async (req, res) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, envios] = await Promise.all([
        Envio.countDocuments(query),
        Envio.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre apellido')
    ]);

    res.json({
        ok: true,
        total,
        envios
    })
}

const crearEnvio = async (req, res) => {
    const { estado, ...body } = req.body;
    try {
        const envio = new Envio({ ...body });
        await envio.save();

        res.status(201).json({
            ok: true,
            envio
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
}

const actualizarEnvio = async (req, res) => {
    const { id } = req.params;
    const { estado, venta, usuario, ...data } = req.body;
    try {
        const envio = await Envio.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json({
            ok: true,
            envio
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
}

const eliminarEnvio = async (req, res) => {
    const { id } = req.params;
    const envio = await Envio.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.status(200).json({
        ok: true,
        envio
    });
}

module.exports = {
    obtenerEnvios,
    crearEnvio,
    actualizarEnvio,
    eliminarEnvio
};