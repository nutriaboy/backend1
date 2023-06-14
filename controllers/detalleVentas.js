const { response } = require('express');
const { DetalleVenta, Cerveza } = require('../models');



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

// Restar Cervezas (-)
const crearDetalleVenta = async (req, res = response) => {

    const { estado, cerveza, cantidad, ...body } = req.body;
    const {stock} = await Cerveza.findById(cerveza);
    try {
        if (stock < cantidad){
            return res.status(400).json({
                ok: false,
                msg: 'No tienes suficiente stock'
            });
        }

        if ( stock > 0){
            await Cerveza.findByIdAndUpdate(cerveza, { stock : stock - cantidad }, { new: true });
        }


        const detalleVenta = new DetalleVenta({cerveza,cantidad, ...body });
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
    const { estado, venta, ...data } = req.body;

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