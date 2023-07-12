const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');


const { login, validarTokenUsuario, loginAdmin } = require('../controllers/auth');


const router = Router();

// Login User
router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );

// Login Admin
router.post('/admin',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],loginAdmin );

router.get('/',[
    validarJWT
], validarTokenUsuario );



module.exports = router;