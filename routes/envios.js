const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerEnvios, crearEnvio, actualizarEnvio, eliminarEnvio } = require('../controllers/envios');
const { validarJWT, validarCampos } = require('../middlewares');
const { existeUsuarioPorId, existeVentaPorId, existeEnvioPorId } = require('../helpers');

/*
    path: '/api/envios'
*/

const router = Router();

router.get('/', obtenerEnvios);

router.post('/', [
    validarJWT,
    check('usuario', 'No es un id de Mongo válido').isMongoId(),
    check('usuario').custom( existeUsuarioPorId ),
    check('venta', 'No es un id de Mongo válido').isMongoId(),
    check('venta').custom( existeVentaPorId ),
    validarCampos
], crearEnvio);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeEnvioPorId ),
    validarCampos
], actualizarEnvio)

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeEnvioPorId ),
    validarCampos
], eliminarEnvio);


module.exports = router;