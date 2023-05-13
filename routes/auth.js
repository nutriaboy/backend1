const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');


const { login, googleSignin, validarTokenUsuario, loginAdmin } = require('../controllers/auth');


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

router.post('/google',[
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignin );


router.get('/',[
    validarJWT
], validarTokenUsuario );



module.exports = router;