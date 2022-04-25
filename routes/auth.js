const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');


router.post(
    '/new', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe der de 6 caracteres o mas').isLength({min: 6}),
        validarCampos
    ],
    crearUsuario
)

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe der de 6 caracteres o mas').isLength({min: 6}),
        validarCampos
    ],
    loginUsuario
)

router.get('/renew', validarJwt, revalidarToken)

module.exports = router;