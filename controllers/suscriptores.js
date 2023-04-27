const { response } = require('express');
const { Suscriptor } = require('../models');
/*

const obtenerSuscriptor = async(req, res = response ) => {

    const { id } = req.params;
    const suscriptor = await Suscriptor.findById( id )
                           

    res.json( suscriptor );

}
*/
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

const crearSuscriptor = async(req, res = response) => {
    
    const { usuario, ...body } = req.body;

    try {
        const [suscriptorDB] = await Suscriptor.find({ usuario: usuario})
        
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

module.exports = {
    obtenerSuscriptores,
    crearSuscriptor,

};


