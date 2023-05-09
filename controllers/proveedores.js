const { response } = require('express');
const { Proveedor } = require('../models');


const obtenerProveedores = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, proveedores] = await Promise.all([
        Proveedor.countDocuments(query),
        Proveedor.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        ok: true,
        total,
        proveedores
    });
}

const crearProveedor = async (req, res = response) => {

    const { estado, nombre, correo, ...body } = req.body;

    try {

        const [[proveedorName], [proveedorEmail]] = await Promise.all([
            Proveedor.find({ nombre: nombre }),
            Proveedor.find({ correo: correo })
        ]);


        if (proveedorName) {
            return res.status(400).json({
                ok: false,
                msg: 'El proveedor ya se encuentra registrado'
            });
        }


        if (proveedorEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo del proveedor ya se encuentra registrado'
            });
        }

        const proveedor = new Proveedor({ nombre, correo, ...body });
        // Guardar en BD
        await proveedor.save();

        res.status(201).json({
            ok: true,
            proveedor
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
}

const actualizarProveedor = async (req, res = response) => {

    const { id } = req.params;
    const { estado, nombre, correo, ...data } = req.body;
    try {
        // const [[proveedorName], [proveedorEmail]] = await Promise.all([
        //     Proveedor.find({ nombre: nombre }),
        //     Proveedor.find({ correo: correo })
        // ]);


        // if (proveedorName) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'El proveedor ya se encuentra registrado'
        //     });
        // }
        // // Operador Ternario
        // (nombre) ? data.nombre = nombre : null;
    
        // if (proveedorEmail) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'El correo del proveedor ya se encuentra registrado'
        //     });
        // }
        // // Operador Ternario
        // (correo) ? data.correo = correo : null;
        

        const proveedor = await Proveedor.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            ok: true,
            proveedor
        });

    } catch (error) {

    }

}

const borrarProveedor = async (req, res = response) => {

    const { id } = req.params;
    const proveedorBorrado = await Proveedor.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(200).json({
        ok: true,
        proveedorBorrado
    });
}


module.exports = {
    obtenerProveedores,
    crearProveedor,
    actualizarProveedor,
    borrarProveedor

};