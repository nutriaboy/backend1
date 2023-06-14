const { response } = require('express');
const { Cerveza } = require('../models');



const obtenerCervezas = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, cervezas] = await Promise.all([
        Cerveza.countDocuments(query),
        Cerveza.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('tipoCerveza', 'nombre')
    ]);

    res.json({
        ok: true,
        total,
        cervezas
    });
}

const crearCerveza = async (req, res = response) => {

    const { estado, ...body } = req.body;

    try {
        const cerveza = new Cerveza({ ...body });
        // Guardar en BD
        await cerveza.save();



        res.status(201).json({
            ok: true,
            cerveza
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
}

const actualizarCerveza = async (req, res = response) => {

    const { id } = req.params;
    const { estado, ...data } = req.body;
    try {
        

        const cerveza = await Cerveza.findByIdAndUpdate(id, data, { new: true });

        await cerveza
            .populate('tipoCerveza', 'nombre')
            .execPopulate();

        res.status(200).json({
            ok: true,
            cerveza
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
}

const borrarCerveza = async (req, res = response) => {

    const { id } = req.params;
    const cervezaBorrada = await Cerveza.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(200).json({
        ok: true,
        cervezaBorrada,
    });
}

module.exports = {
    obtenerCervezas,
    crearCerveza,
    actualizarCerveza,
    borrarCerveza

};



