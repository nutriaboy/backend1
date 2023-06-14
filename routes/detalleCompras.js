const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('../middlewares');
const { existeCervezaPorId, existeTipoCervezaPorId, existeDetalleCompraPorId, existeCompraPorId } = require('../helpers');
const { obtenerDetallesCompras, crearDetalleCompra, actualizarDetalleCompra, borrarDetalleCompra } = require('../controllers/detalleCompras');

/*
    detalleCompras: '/api/detalleCompras',
*/

const router = Router();

router.get('/', obtenerDetallesCompras);

router.post('/',[
    validarJWT,
    check('compra', 'No es un ID válido').isMongoId(),
    check('compra').custom( existeCompraPorId ),
    check('cerveza', 'No es un ID válido').isMongoId(),
    check('cerveza').custom( existeCervezaPorId ),
    check('cantidad', 'El precioUnit es obligatorio').not().isEmpty(),
    validarCampos
], crearDetalleCompra);



router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeDetalleCompraPorId ),
    check('cerveza', 'No es un id de Mongo válido').if((value, {req}) => req.body.tipoCerveza).isMongoId(),
    check('cerveza').if((value, {req}) => req.body.tipoCerveza).custom( existeCervezaPorId ),
    validarCampos
], actualizarDetalleCompra);

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeDetalleCompraPorId ),
    validarCampos
], borrarDetalleCompra);

module.exports = router;
