const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers');

//TODO: Crear Endpoint de Admin, luego crear nueva Route de admin!

const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        ok: true,
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {

    let { nombre, apellido, correo, rut, password, rol, telefono, direccion, genero, ciudad } = req.body;

    try {
        const [usuarioRut] = await Usuario.find({ rut })
        console.log(usuarioRut)

        if (usuarioRut) {
            return res.status(400).json({
                ok: false,
                msg: 'El rut del usuario ya se encuentra registrado'
            });
        }

        correo = correo.toLowerCase();


        const usuario = new Usuario({ nombre, apellido, correo, rut, password, rol, telefono, direccion, genero, ciudad });

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        // Guardar en BD
        await usuario.save();

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.status(201).json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, correo, estado, rut, rol, ...resto } = req.body;

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.status(200).json({
        ok: true,
        usuario
    });
}

const editarRolUsuario = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, correo, estado, rut, ...resto } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.status(200).json({
        ok: true,
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });


    res.json({
        ok: true,
        usuario
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    editarRolUsuario,
    usuariosPatch,
    usuariosDelete,
}