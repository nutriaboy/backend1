const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerDetallesVentas, crearDetalleVenta, actualizarDetalleVenta, borrarDetalleVenta } = require('../controllers/detalleVentas');
const { existeDetalleCervezaPorId, existeVentaPorId, existeDetalleVentaPorId } = require('../helpers');
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
    check('detalleCerveza', 'No es un ID válido').isMongoId(),
    check('detalleCerveza').custom(existeDetalleCervezaPorId),
    validarCampos
], crearDetalleVenta);

//TODO: Realizar una validacion de no permitr actualizar ID de Venta

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeDetalleVentaPorId),
    check('detalleCerveza', 'No es un id de Mongo válido').if((value, {req}) => req.body.detalleCerveza).isMongoId(),
    check('detalleCerveza').if((value, {req}) => req.body.detalleCerveza).custom( existeDetalleCervezaPorId ),
    validarCampos
], actualizarDetalleVenta);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeDetalleVentaPorId),
    validarCampos
], borrarDetalleVenta);

module.exports = router;
