const { Router } = require('express');
const { check, oneOf } = require('express-validator');
const { obtenerCervezas, crearCerveza, actualizarCerveza, borrarCerveza } = require('../controllers/cervezas');
const { existeProveedorPorId, existeCervezaPorId } = require('../helpers');
const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');

/*
    path: '/api/cervezas'
*/

const router = Router();

router.get('/', obtenerCervezas);

router.post('/',[
    validarJWT,
    esAdminRole,
    check('proveedor', 'No es un id de Mongo válido').isMongoId(),
    check('proveedor').custom( existeProveedorPorId ),
    validarCampos
], crearCerveza );


router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCervezaPorId ),
    check('proveedor', 'No es un id de Mongo válido').if((value, {req}) => req.body.proveedor).isMongoId(),
    check('proveedor').if((value, {req}) => req.body.proveedor).custom( existeProveedorPorId ),
    validarCampos
], actualizarCerveza);

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCervezaPorId ),
    validarCampos
], borrarCerveza);


module.exports = router;