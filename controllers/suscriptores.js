const { response } = require('express');
const { Suscriptor } = require('../models');


const obtenerSuscriptores = async(req, res = response ) => {

        const { limite = 5, desde = 0 } = req.query;
        const query = { estado: true };
    
        const [ total, suscriptores ] = await Promise.all([
            Suscriptor.countDocuments(query),
            Suscriptor.find(query)
                .skip( Number( desde ) )
                .limit(Number( limite ))
        ]);
    
        res.json({
            ok: true,
            total,
            suscriptores
        });
}

const obtenerSuscriptor = async(req, res = response ) => {

    const { usuario } = req.params;
    const suscriptor = await Suscriptor.findOne({ usuario: usuario })
                                        .populate('usuario', 'nombre apellido');
    // const suscriptor = await Suscriptor.findById( id )
    //                         .populate('usuario', 'nombre apellido');
    if (!suscriptor ) {
        return res.status(400).json({
            ok: false,
            msg: 'No se encuentra Suscrito'
        });
    }

    if ( suscriptor && !suscriptor.estado ) {
        return res.status(400).json({
            ok: false,
            msg: 'No se encuentra Suscrito - estado: false'
        });
    }                        

    res.json({
            ok: true,
            suscriptor
        });

}

const crearSuscriptor = async(req, res = response) => {
    
    const { estado, usuario, ...body } = req.body;

    try {
        const [suscriptorDB] = await Suscriptor.find({ usuario: usuario})
        
        if ( suscriptorDB && !suscriptorDB.estado ){
            const { _id: id} = suscriptorDB
            const suscriptor = await Suscriptor.findByIdAndUpdate( id, { estado: true }, {new: true });
            return res.status(202).json({
                ok: true,
                suscriptor
            });
        }

        if ( suscriptorDB ){
            return res.status(400).json({
                ok: false,
                msg: 'El Suscriptor ya se encuentra registrado'
            });
        }

        const suscriptor = new Suscriptor({ usuario, ...body });
        // Guardar en BD
        await suscriptor.save();
        
        
        
        res.status(201).json({
            ok: true,
            suscriptor
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
}

const actualizarSuscriptor = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    const suscriptor = await Suscriptor.findByIdAndUpdate(id, data, { new: true });

    await suscriptor
        .populate('usuario', 'nombre apellido ')
        .execPopulate();
        
    res.status(200).json({
        ok: true,
        suscriptor
    });

}

const borrarSuscriptor = async(req, res = response ) => {

    const { id } = req.params;
    const suscriptorBorrado = await Suscriptor.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.status(200).json({
        ok: true,
        suscriptorBorrado
    });
}

module.exports = {
    obtenerSuscriptores,
    obtenerSuscriptor,
    crearSuscriptor,
    actualizarSuscriptor,
    borrarSuscriptor,

};


