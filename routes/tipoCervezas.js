const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerTiposCervezas, crearTipoCerveza, actualizarTipoCerveza, borrarTipoCerveza } = require('../controllers/tipoCervezas');
const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');
const { existeTipoCervezaPorId } = require('../helpers');

/*
    tipoCervezas:    '/api/tipoCervezas',
*/


const router = Router();

//Obtener los tipos de cerveza
router.get('/', obtenerTiposCervezas);

//Crear tipo de cerveza
router.post('/',[
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearTipoCerveza);

//Actualizar tipo de cerveza
router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeTipoCervezaPorId ),
    validarCampos
], actualizarTipoCerveza);

//Eliminar tipo de cerveza
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeTipoCervezaPorId ),
    validarCampos
], borrarTipoCerveza);

module.exports = router;