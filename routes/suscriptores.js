const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerSuscriptores, crearSuscriptor } = require('../controllers/suscriptores');
const { existeUsuarioPorId } = require('../helpers');
const { validarCampos } = require('../middlewares');

// ruta '/api/suscriptores',


const router = Router();

router.get('/', obtenerSuscriptores );

// crearSuscriptor

router.post('/',[
    check('usuario', 'No es un id de Mongo válido').isMongoId(),
    check('usuario').custom( existeUsuarioPorId ),
    validarCampos
], crearSuscriptor );




module.exports = router;