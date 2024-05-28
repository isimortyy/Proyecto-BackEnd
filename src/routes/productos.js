const { Router } = require("express")
const {httpProductos} = require('../controllers/productos.js')
const { validarCampos } = require("../middleware/validarCampos.js");
const { check } = require('express-validator');
const { productoHelper } =require("../helpers/productos.js")
const { usuarioHelper } = require("../helpers/usuarios.js")
const { validarJWT } = require('../middleware/validarJWT.js')

const router = Router()

router.get("/listarProductos",[ 
    validarJWT
],httpProductos.listarProductos)

router.get("/ProductosActivos",[
    validarJWT
],httpProductos.listarProductosActivos)

router.get("/ProductosInactivos",[
    validarJWT
],httpProductos.listarProductosInactivos)



router.get('/listarProductosID/:id',[
    validarJWT,
    check ('id','El id no es valido').isMongoId(),
    check ('id').custom(productoHelper.existeProductoID),
    validarCampos
],httpProductos.obtenerProductoPorId)



router.get("/DebajoStockminimo",[
    validarJWT,
],httpProductos.obtenerProductosBajoStockMinimo)


router.get("/PorEncimadelPrecio",[
    validarJWT,
],httpProductos.listarProductosPorEncimaDePrecio)



router.post("/insertar",[
    check ('usuarioid','El id es valido').isMongoId(),
    check ('usuarioid').custom(usuarioHelper.existeUsuarioID),
    check ('nombre','El nombre es obligatorio').notEmpty(),
    check ('precio','El precio es obligatorio').notEmpty(), 
    check ('precio','El precio no es valido').isNumeric(),
    check ('cantidad','La cantidad es obligatoria').notEmpty(), 
    check ('cantidad','La cantidad no es valida').isNumeric(),
    check ('stockminimo','El stock es obligatorio').notEmpty(), 
    check ('stockminimo','El stock no es valido').isNumeric(),
    validarCampos
],httpProductos.insertarProducto)




router.put("/ModificarProducto/:id",[
    validarJWT,
    check ('id','El id no es valido').isMongoId(),
    check ('id').custom(productoHelper.existeProductoID),
    check ('nombre','El nombre es obligatorio').notEmpty(), // Cambiado de isEmpty() a notEmpty()
    check ('nombre').custom(productoHelper.verificarNombreProducto),
    check ('precio','El precio es obligatorio').notEmpty(), // Cambiado de isEmpty() a notEmpty()
    check ('precio','El precio no es valido').isNumeric(),
    check ('cantidad','La cantidad es obligatoria').notEmpty(), // Cambiado de isEmpty() a notEmpty()
    check ('cantidad','La cantidad no es valida').isNumeric(),
    check ('stockminimo','El stock es obligatorio').notEmpty(), // Cambiado de isEmpty() a notEmpty()
    check ('stockminimo','El stock no es valido').isNumeric(),
    validarCampos
],httpProductos.modificarProducto)




router.put("/activar/:id",[
    validarJWT,
    check ('id','El id no es valido').isMongoId(),
    check ('id').custom(productoHelper. existeProductoID),
    validarCampos

],httpProductos.activarProducto)



router.put("/DesactivarProductos/:id",[
    validarJWT,
    check ('id','El id no es valido').isMongoId(),
    check ('id').custom(productoHelper. existeProductoID),
    validarCampos

],httpProductos.desactivarProductos)

module.exports = router