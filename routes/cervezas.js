const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

router.get('/', usuariosGet );

router.post('/',[]);


router.put('/:id',[]);

router.delete('/:id',[]);


module.exports = router;
