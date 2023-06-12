const { response } = require('express');
const { DetalleVenta } = require('../models');



const obtenerDetallesVentas = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, detallesVentas] = await Promise.all([
        DetalleVenta.countDocuments(query),
        DetalleVenta.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('cerveza', 'nombre marca precioUnit')

    ]);

    res.json({
        ok: true,
        total,
        detallesVentas
    });
}

const crearDetalleVenta = async (req, res = response) => {

    const { estado, cerveza, ...body } = req.body;

    try {
        const cervezaDB = await DetalleVenta.findOne({ cerveza })


        if (cervezaDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No se puede duplicar Detalle de Cerveza'
            });
        }


        const detalleVenta = new DetalleVenta({cerveza, ...body });
        // Guardar en BD
        await detalleVenta.save();



        res.status(201).json({
            ok: true,
            detalleVenta
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
}

const actualizarDetalleVenta = async (req, res = response) => {

    const { id } = req.params;
    const { estado, ...data } = req.body;

    const detalleVenta = await DetalleVenta.findByIdAndUpdate(id, data, { new: true });

    await detalleVenta
        .populate('cerveza', 'nombre marca precioUnit')
        .execPopulate();

    res.status(200).json({
        ok: true,
        detalleVenta
    });

}

const borrarDetalleVenta = async (req, res = response) => {

    const { id } = req.params;
    const detalleVentaBorrada = await DetalleVenta.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(200).json({
        ok: true,
        detalleVentaBorrada
    });
}




module.exports = {
    obtenerDetallesVentas,
    crearDetalleVenta,
    actualizarDetalleVenta,
    borrarDetalleVenta,



};