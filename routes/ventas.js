const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerVentas, crearVenta, actualizarVenta, borrarVenta } = require('../controllers/ventas');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { existeUsuarioPorId, existeVentaPorId } = require('../helpers');

/*
    ventas:          '/api/ventas'
*/


const router = Router();

router.get('/', obtenerVentas);

router.post('/',[
    validarJWT,
    check('usuario', 'No es un ID válido').isMongoId(),
    check('usuario').custom( existeUsuarioPorId ),
    validarCampos
], crearVenta);


router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeVentaPorId ),
    check('usuario', 'No es un id de Mongo válido').if((value, {req}) => req.body.usuario).isMongoId(),
    check('usuario').if((value, {req}) => req.body.usuario).custom( existeUsuarioPorId ),
    validarCampos
], actualizarVenta);

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeVentaPorId ),
    validarCampos
], borrarVenta);

module.exports = router;