const { response } = require('express');
const { Evento } = require('../models');


const obtenerEventos = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, eventos] = await Promise.all([
        Evento.countDocuments(query),
        Evento.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        ok: true,
        total,
        eventos
    });
}

const crearEvento = async (req, res = response) => {

    const { estado, usuario, ...body } = req.body;

    try {
        const [eventoDB] = await Evento.find({ ...body })

        if (eventoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'El evento ya se encuentra registrado'
            });
        }

        const evento = new Evento({ ...body });
        // Guardar en BD
        await evento.save();



        res.status(201).json({
            ok: true,
            evento
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
}

const actualizarEvento = async (req, res = response) => {

    const { id } = req.params;
    const { estado, nombre, ...data } = req.body;

    const evento = await Evento.findByIdAndUpdate(id, data, { new: true });

    // await evento
    //     .populate('usuario', 'nombre apellido ')
    //     .execPopulate();

    res.status(200).json({
        ok: true,
        evento
    });

}

const borrarEvento = async (req, res = response) => {

    const { id } = req.params;
    const eventoBorrado = await Evento.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(200).json({
        ok: true,
        eventoBorrado
    });
}

module.exports = {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento

};
