const { Router } = require("express")
const { httpDetalleVenta } = require('../controllers/detalle_venta.js')
const { validarCampos } = require("../middleware/validarCampos.js");
const { check } = require('express-validator');
const { detalleVentaHelpers } =require("../helpers/detalle_venta.js")
const { productoHelper } = require('..//helpers/productos.js')
const { ventasHelpers }= require('../helpers/ventas.js')

const router =Router()

router.get("/listarDetalleID/:idVenta",[
    check('idVenta', 'El idVenta es obligatorio').not().isEmpty(),
    check('idVenta').custom(ventasHelpers.existeVentasID),
    validarCampos,
],httpDetalleVenta.listarDetallesPorIdVenta)



router.post("/insertarDetalle",[
    check('idVenta', 'El idVenta es obligatorio').notEmpty().isMongoId(),
    check('idVenta').custom(ventasHelpers.existeVentasID),
    check('idProducto','No es un ID valido').isMongoId(),
    check('idProducto').custom(productoHelper.existeProductoID),
    check('cantidad', 'Este campo es obligatorio').notEmpty(),
    check('cantidad','La cantidad no es valida').isNumeric(),
    check ('descuento', 'El descuento no es valido').isNumeric(),
    validarCampos,
],httpDetalleVenta.insertarCliente)


router.put("/ModificarDetalle",[

    check('id', 'El idVenta es obligatorio').notEmpty().isMongoId(),
    check('id').custom(detalleVentaHelpers.existedetalleVentaID),
    check('cantidad', 'Este campo es obligatorio').notEmpty(),
    check('cantidad', 'Este campo no es valido').isNumeric(),
    check('descuento', 'Este campo es obligatorio').notEmpty(),
    check('descuento', 'Este campo no es valido').notEmpty(),
    validarCampos
],httpDetalleVenta.modificarCliente)

module.exports = router