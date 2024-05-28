const { Router } = require("express")
const {httpCarrito} = require('../controllers/carrito.js')
const {check} = require('express-validator');
const {validarCampos } = require("../middleware/validarCampos.js")
const {carritoHelpers}= require('../helpers/Carrito.js')
const {clienteHelper  } = require('../helpers/clientes.js')
const {productoHelper} = require('../helpers/productos.js')

const router = Router()

router.get("/listarCarrito/:clienteId",[
    check ('cliente','No es un id valido' ).isMongoId(),
    check ('cliente', 'El id del cliente no existe').custom(clienteHelper.existeClienteID),
    validarCampos
],httpCarrito.listarCarritoPorCliente)

router.post("/insertarCarrito",[
    check ('idproducto', 'No es valido el ID').isMongoId(),
    check ('idproducto').custom(productoHelper.existeProductoID),
    check ('idcliente','No es un id valido' ).isMongoId(),
    check ('idcliente').custom(clienteHelper .existeClienteID),
    check ('cantidad', 'Este campo es obligatorio').notEmpty(),
    check ('cantidad', 'La cantidad no es valida').isNumeric(),
    check ('valor', ' Este campo es obligatorio').notEmpty(),
    check ('valor', 'El valor no es valido').isNumeric(),
    validarCampos
],httpCarrito.insertarcarrito)



router.delete("/EliminarCarrito/:id",[
    check ('id', 'El id no es valido').isMongoId(),
    check ('id', 'El ID del carrito no existe' ).custom(carritoHelpers.existeCarritoID),
    validarCampos
],httpCarrito.eliminarElementoCarrito)


module.exports = router