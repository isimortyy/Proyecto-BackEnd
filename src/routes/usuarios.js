const { Router } = require("express")
const { usuarioHelper } = require("../helpers/usuarios.js");
const { validarCampos } = require("../middleware/validarCampos.js");
const { check } = require ('express-validator');
const {httpUsuarios} = require("../controllers/usuarios.js");
const { validarJWT } = require('../middleware/validarJWT.js')



const router = Router()

router.get("/listarTodos",[
    validarJWT
],httpUsuarios.listarUsuarios);

router.get("/listarActivos",[
    validarJWT
],httpUsuarios.listarUsuariosActivos)

router.get("/listarInactivos",[
    validarJWT,
],httpUsuarios.listarUsuariosInactivos)



router.get('/listar/:ID',[
    validarJWT,
    check ('id', 'Id no es valido').isMongoId(),
    check ('id').custom(usuarioHelper.existeUsuarioID),
    validarCampos
],httpUsuarios.obtenerUsuarioPorId)

router.post('/insertarUsuario',[
    check ('email', 'Email no es valido').notEmpty().isEmail(),
    check ('email').custom(usuarioHelper.existeEmail),
    check ('password', 'La contraseña no es valida').isLength({min:8, max:15}),
    validarCampos
],httpUsuarios.insertarUsuario)



router.post('/loginUsuario',[
    check ('email','Email es obligatorio').notEmpty(),
    check ('email').custom(usuarioHelper.verificarEmail),
    check ('password', 'La contraseña no es valida').notEmpty(),
    validarCampos

], httpUsuarios.login)



router.put('/cambioContra/:id',[
    validarJWT,
    check ('id', 'id es obligatorio').notEmpty(),
    check('id').custom(usuarioHelper.existeUsuarioID),
    check('password','La contraseña no es valida').isLength({min:8, max:15}),
    validarCampos
] ,httpUsuarios.cambiarContraseña)


router.put("/modificarUsuario/:id",[
    validarJWT,
    check ('id', 'Id no es valido').isMongoId(),
    check ('id').custom(usuarioHelper.existeUsuarioID),
    check ('email', 'Email es obligatorio y no es valido').notEmpty().isEmail(),
    check ('email').custom(usuarioHelper.existeEmail),
    validarCampos
],httpUsuarios.modificarUsuario)



router.put('/activarUsuario/:id',[
    validarJWT,
    check ('id', 'Id no es valido').isMongoId(),
    check ('id').custom(usuarioHelper.existeUsuarioID),
    validarCampos
],httpUsuarios.activarUsuario)



router.put('/desactivarUsuario/:id',[
    validarJWT,
    check ('id', 'Id no es valido').isMongoId(),
    check ('id').custom(usuarioHelper.existeUsuarioID),
    validarCampos
],httpUsuarios.desactivarUsuario)

module.exports = router

