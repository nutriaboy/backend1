const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerDetallesVentas, crearDetalleVenta, actualizarDetalleVenta, borrarDetalleVenta } = require('../controllers/detalleVentas');
const { existeCervezaPorId, existeVentaPorId, existeDetalleVentaPorId } = require('../helpers');
const { validarJWT, validarCampos } = require('../middlewares');

/*

    detalleVentas :  '/api/detalleVentas',
*/

const router = Router();

router.get('/', obtenerDetallesVentas);

router.post('/', [
    validarJWT,
    check('venta', 'No es un ID válido').isMongoId(),
    check('venta').custom(existeVentaPorId),
    check('cerveza', 'No es un ID válido').isMongoId(),
    check('cerveza').custom(existeCervezaPorId),
    validarCampos
], crearDetalleVenta);


router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeDetalleVentaPorId),
    check('cerveza', 'No es un id de Mongo válido').if((value, {req}) => req.body.cerveza).isMongoId(),
    check('cerveza').if((value, {req}) => req.body.cerveza).custom( existeCervezaPorId ),
    validarCampos
], actualizarDetalleVenta);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeDetalleVentaPorId),
    validarCampos
], borrarDetalleVenta);

module.exports = router;
