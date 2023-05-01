const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerSuscriptores, crearSuscriptor, actualizarSuscriptor, borrarSuscriptor } = require('../controllers/suscriptores');
const { existeUsuarioPorId, existeSuscriptorPorId } = require('../helpers');
const { validarCampos, esAdminRole } = require('../middlewares');

// ruta '/api/suscriptores',


const router = Router();

router.get('/', obtenerSuscriptores );


// crearSuscriptor
router.post('/',[
    check('usuario', 'No es un id de Mongo válido').isMongoId(),
    check('usuario').custom( existeUsuarioPorId ),
    validarCampos
], crearSuscriptor );

// actualizarSuscriptor
router.put('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeSuscriptorPorId ),
    validarCampos
], actualizarSuscriptor );

//borrarSuscriptor
router.delete('/:id', [
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeSuscriptorPorId ),
    validarCampos
], borrarSuscriptor);


module.exports = router;