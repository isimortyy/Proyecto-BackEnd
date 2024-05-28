const { Router } = require("express")
const {httpVentas} = require('../controllers/ventas.js')
const { check } = require('express-validator');
const { validarCampos } = require("../middleware/validarCampos.js");
const { ventasHelpers }=require('../helpers/ventas.js')
const { validarJWT } = require('../middleware/validarJWT.js')


const router = Router()

router.get("/listarTodos",[
    validarJWT
],httpVentas.listarVentas);

router.get("/VentasActivas",[
    validarJWT
],httpVentas.listarVentasActivas);

router.get("/ventasInactivas",[
    validarJWT
],httpVentas.listarVentasInactivos);

router.get("/VentasEntreFechas",[
    validarJWT
],httpVentas.listarVentasEntreFechas);

router.get("/TotalVentasEntreFechas",[
    validarJWT
],httpVentas.calcularTotalVentasEntreFechas);

router.get("/TotalDescuento",[
    validarJWT
],httpVentas.calcularTotalDescuento)

 
router.get("/VentaID/:id",[
    validarJWT,
    check('id','El id no es valido').isMongoId(),
    check('id').custom(ventasHelpers.existeVentasID),
    validarCampos
], httpVentas.obtenerVentasPorId);


router.get("/VentasCliente/:id",[
    validarJWT,
    check('idcliente','El id no es valido').isMongoId(),
    check('idcliente').custom(ventasHelpers.existeVentasID),
    validarCampos
],httpVentas.listarVentasPorCliente);


router.get("/VentasSuperiores/:id",[
    validarJWT,
    check('valor',"el valor es invalido").isNumeric(),
    validarCampos
],httpVentas.listarVentasSuperiores);


router.post("/InsertarVenta",[
    check ('idcliente','id no es valido').isMongoId(),
],httpVentas.insertarVenta);

router.put("/ModificarVenta",[
    validarJWT
],httpVentas.modificarVentas);

router.put("/ActivarVenta",[
    validarJWT
],httpVentas.activarVenta);

router.get("/Desactivar",[
    validarJWT
],httpVentas.desactivarVentas);


module.exports = router