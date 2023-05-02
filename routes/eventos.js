const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerEventos, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/eventos');
const { validarJWT, validarCampos } = require('../middlewares');
const { existeEventoPorId } = require('../helpers');

/*
    eventos:         '/api/eventos',
*/

const router = Router();


router.get('/', obtenerEventos );

//Crear Evento
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    validarCampos
], crearEvento);

//Actualizar Evento
router.put('/:id',[
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeEventoPorId ),
    validarCampos
], actualizarEvento);


//Eliminar Evento
router.delete('/:id',[
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeEventoPorId ),
    validarCampos
], borrarEvento);

module.exports = router;