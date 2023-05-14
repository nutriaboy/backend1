const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProveedores, crearProveedor, actualizarProveedor, borrarProveedor } = require('../controllers/proveedores');
const { validarCampos, esAdminRole, validarJWT } = require('../middlewares');
const { existeProveedorPorId } = require('../helpers');

// routes :'/api/proveedores',



const router = Router();

router.get('/', obtenerProveedores);

router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('rut', 'El rut es obligatorio').not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
    check('direccion', 'la dirección es obligatoria').not().isEmpty(),
    validarCampos
], crearProveedor);


router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProveedorPorId ),
    validarCampos
], actualizarProveedor);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProveedorPorId ),
    validarCampos
], borrarProveedor)


module.exports = router;