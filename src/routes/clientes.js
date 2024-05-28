const { Router } = require("express")
const { clienteHelper } = require("../helpers/clientes.js");
const { validarCampos } = require("../middleware/validarCampos.js");
const { check } = require('express-validator');
const { httpClientes } = require("../controllers/clientes.js");
const { validarJWT } = require('../middleware/validarJWT.js')


const router = Router()


router.get('/ListarTodos', [
    validarJWT
],httpClientes.listarClientes)

router.get("/ListarActivos", [
    validarJWT
],httpClientes.listarClientesActivos)

router.get("/ListarInactivos", [
    validarJWT
],httpClientes.listarClientesInactivos)



router.get('/ListarporID/:id', [
    validarJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(clienteHelper.existeClienteID),
    validarCampos
], httpClientes.obtenerClientePorId);


router.post('/insertarCliente', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('direccion', 'La direecion es obligatoria').notEmpty(),
    check('telefono', 'El telefono es obligatorio').notEmpty().isLength({ min: 10, max: 10 }),
    check('email', 'El email es obligatorio y no es valido').notEmpty().isEmail(),
    check('documento','El documento es obligatorio con 10 caracteres').notEmpty().isLength({ min: 10, max: 10 }),
    check('fecha_compra','la fecha de la compra es obligatoria').notEmpty(),
    validarCampos
], httpClientes.insertarCliente)



router.put("/ModificarCliente/:id",[
    validarJWT,
    check("id", "ID inválido").isMongoId(),
    check("id").custom(clienteHelper.existeClienteID),
    check("nombre").optional().notEmpty(), 
    check("documento").optional().notEmpty(),
    check("documento").optional().isLength({ min: 10, max: 10 }).withMessage("El documento debe tener exactamente 10 caracteres"),  
    check("direccion").optional().notEmpty(), 
    check("email").optional().notEmpty(), 
    check("email").optional().isEmail().withMessage("El email no es válido"), 
    check("fecha_compra").optional().notEmpty(), 
    validarCampos,
], httpClientes.modificarCliente)




router.put("/Activar/:id", [
    validarJWT,
    check ('id', 'Id no es valido').isMongoId(),
    check ('id').custom(clienteHelper.existeClienteID),
    validarCampos
],httpClientes.activarCliente)



router.put("/Desactivar/:id",[
    validarJWT,
    check ('id', 'Id no es valido').isMongoId(),
    check ('id').custom(clienteHelper.existeClienteID),
    validarCampos
], httpClientes.desactivarProductos)

module.exports = router