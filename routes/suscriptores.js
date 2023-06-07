const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerSuscriptores, crearSuscriptor, actualizarSuscriptor, borrarSuscriptor, obtenerSuscriptor } = require('../controllers/suscriptores');
const { existeUsuarioPorId, existeSuscriptorPorId } = require('../helpers');
const { validarCampos, esAdminRole, validarJWT } = require('../middlewares');

// path: '/api/suscriptores',


const router = Router();

router.get('/', obtenerSuscriptores );

router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeSuscriptorPorId ),
    validarCampos,
], obtenerSuscriptor );


// crearSuscriptor
router.post('/',[
    validarJWT,
    check('usuario', 'No es un id de Mongo válido').isMongoId(),
    check('usuario').custom( existeUsuarioPorId ),
    validarCampos
], crearSuscriptor );

// actualizarSuscriptor
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeSuscriptorPorId ),
    validarCampos
], actualizarSuscriptor );

//borrarSuscriptor
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeSuscriptorPorId ),
    validarCampos
], borrarSuscriptor);


module.exports = router;