const { response } = require('express');
const { TipoCerveza } = require('../models');


const obtenerTiposCervezas = async(req, res = response ) => {

        const { limite = 5, desde = 0 } = req.query;
        const query = { estado: true };
    
        const [ total, tipoCervezas ] = await Promise.all([
            TipoCerveza.countDocuments(query),
            TipoCerveza.find(query)
                .skip( Number( desde ) )
                .limit(Number( limite ))
        ]);
    
        res.json({
            ok: true,
            total,
            tipoCervezas
        });
}

const crearTipoCerveza = async(req, res = response) => {
    
    const { estado,...body } = req.body;

    try {
        const tipoCerveza = new TipoCerveza({ ...body });
        // Guardar en BD
        await tipoCerveza.save();
        
        res.status(201).json({
            ok: true,
            tipoCerveza
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
}

const actualizarTipoCerveza = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, ...data } = req.body;

    const tipoCerveza = await TipoCerveza.findByIdAndUpdate(id, data, { new: true });

        
    res.status(200).json({
        ok: true,
        tipoCerveza
    });

}

const borrarTipoCerveza = async(req, res = response ) => {

    const { id } = req.params;
    const tipoCervezaBorrado = await TipoCerveza.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.status(200).json({
        ok: true,
        tipoCervezaBorrado
    });
}

module.exports = {
    obtenerTiposCervezas,
    crearTipoCerveza,
    actualizarTipoCerveza,
    borrarTipoCerveza
    

};


