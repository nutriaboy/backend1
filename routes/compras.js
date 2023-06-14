const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerCompras, crearCompra, actualizarCompra, eliminarCompra } = require('../controllers/compras');
const { existeProveedorPorId, existeCompraPorId } = require('../helpers');
const { esAdminRole, validarJWT, validarCampos } = require('../middlewares');


/*
    path: '/api/compras'
*/

const router = Router();

router.get('/', obtenerCompras);

router.post('/', [ 
    validarJWT,
    esAdminRole,
    check('proveedor', 'No es un id de Mongo válido').isMongoId(),
    check('proveedor').custom( existeProveedorPorId ),
    validarCampos
], crearCompra );

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCompraPorId ),
    validarCampos
], actualizarCompra );

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCompraPorId ),
], eliminarCompra);

module.exports = router;
