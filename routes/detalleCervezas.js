const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('../middlewares');
const { existeCervezaPorId, existeTipoCervezaPorId, existeDetalleCervezaPorId } = require('../helpers');
const { obtenerDetallesCervezas, crearDetalleCerveza, actualizarDetalleCerveza, borrarDetalleCerveza } = require('../controllers/detalleCervezas');

/*
    detalleCervezas: '/api/detalleCervezas',
*/

const router = Router();

router.get('/', obtenerDetallesCervezas);

router.post('/',[
    validarJWT,
    check('cerveza', 'No es un ID válido').isMongoId(),
    check('cerveza').custom( existeCervezaPorId ),
    check('tipoCerveza', 'No es un ID válido').isMongoId(),
    check('tipoCerveza').custom( existeTipoCervezaPorId ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('marca', 'La marca es obligatorio').not().isEmpty(),
    check('precioUnit', 'El precioUnit es obligatorio').not().isEmpty(),
    validarCampos
], crearDetalleCerveza);

//TODO: Realizar una validacion de no permitr actualizar ID de Cerveza

router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeDetalleCervezaPorId ),
    check('tipoCerveza', 'No es un id de Mongo válido').if((value, {req}) => req.body.tipoCerveza).isMongoId(),
    check('tipoCerveza').if((value, {req}) => req.body.tipoCerveza).custom( existeTipoCervezaPorId ),
    validarCampos
], actualizarDetalleCerveza);

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeDetalleCervezaPorId ),
    validarCampos
], borrarDetalleCerveza);

module.exports = router;
