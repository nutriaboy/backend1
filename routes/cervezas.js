const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerCervezas, crearCerveza, actualizarCerveza, borrarCerveza } = require('../controllers/cervezas');
const {  existeCervezaPorId, existeTipoCervezaPorId } = require('../helpers');
const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');

/*
    path: '/api/cervezas'
*/

const router = Router();

router.get('/', obtenerCervezas);

router.post('/',[
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('marca', 'El nombre es obligatorio').not().isEmpty(),
    check('tipoCerveza', 'No es un id de Mongo válido').isMongoId(),
    check('tipoCerveza').custom( existeTipoCervezaPorId ),
    validarCampos
], crearCerveza );


router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCervezaPorId ),

    check('tipoCerveza', 'No es un id de Mongo válido').if((value, {req}) => req.body.proveedor).isMongoId(),
    check('tipoCerveza').if((value, {req}) => req.body.proveedor).custom( existeTipoCervezaPorId ),
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