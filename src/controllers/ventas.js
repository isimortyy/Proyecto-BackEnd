const Clientes = require('../models/clientes.js');
const Ventas = require('../models/ventas.js')
const Productos= require('../models/productos.js')

const httpVentas = {

    //listar todo get

    listarVentas: async (req, res) => {
        try {
            const ventas = await Ventas.find();
            res.json({ ventas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },



    //listar por un id

    obtenerVentasPorId: async (req, res) => {
        const { id } = req.params;
        try {
            const ventas = await Ventas.findById(id);
            if (ventas)
                res.json({ ventas });
            else
                res.status(404).json({ msg: "venta no encontrado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // listar activos

    listarVentasActivas: async (req, res) => {
        try {
            const ventasActivos = await Ventas.find({ estado: 1 });
            res.json({ ventasActivos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // listar inactivos

    listarVentasInactivos: async (req, res) => {
        try {
            const ventasInactivos = await Ventas.find({ estado: 0 });
            res.json({ ventasInactivos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    // listar ventas del cliente xxx

    listarVentasPorCliente: async (req, res) => {
        const clienteId = req.params.clienteId; // Suponiendo que el ID del cliente viene en los parámetros de la solicitud
        try {
            const ventasCliente = await Ventas.find({ idcliente: clienteId });
            res.json({ ventasCliente });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    // listar todas las ventas entre dos fechas

    listarVentasEntreFechas: async (req, res) => {
        const { fechaInicio, fechaFin } = req.body; // Suponiendo que las fechas de inicio y fin vienen en el cuerpo de la solicitud
        try {
            const ventasEntreFechas = await Ventas.find({
                fecha: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) }
            });
            res.json({ ventasEntreFechas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    // listar ventas con un valor superior a 100.000

    listarVentasSuperiores: async (req, res) => {
        try {
            const ventasSuperiores = await Ventas.find({ valor: { $gt: 100000 } });
            res.json({ ventasSuperiores });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },



    // total de ventas entre dos fechas

    calcularTotalVentasEntreFechas: async (req, res) => {
        const { fechaInicio, fechaFin } = req.body; // Suponiendo que las fechas de inicio y fin vienen en el cuerpo de la solicitud
        try {
            const totalVentas = await Ventas.aggregate([
                {
                    $match: {
                        fecha: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$valor" }
                    }
                }
            ]);
            res.json({ totalVentas: totalVentas.length > 0 ? totalVentas[0].total : 0 });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    //total descuento

    calcularTotalDescuento: async (req, res) => {
        try {
            const totalDescuento = await Ventas.aggregate([
                {
                    $group: {
                        _id: null,
                        totalDescuento: { $sum: "$descuento" }
                    }
                }
            ]);
            res.json({ totalDescuento: totalDescuento.length > 0 ? totalDescuento[0].totalDescuento : 0 });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },



    //post//insertar

    insertarVenta: async (req, res) => {
        const { idproducto, idcliente, fecha, descuento } = req.body;
    
        try {
            const productoVendido = await Productos.findById(idproducto);
            if (!productoVendido) {
                return res.status(404).json({ message: 'El producto no existe' });
            }
    
            const valor = productoVendido.precio;
    
            const cliente = await Clientes.findById(idcliente);
            if (!cliente) {
                return res.status(404).json({ message: 'El cliente no existe' });
            }
    
            const total = descuento ? valor - (valor * (descuento / 100)) : valor;
    
            const nuevaVenta = new Ventas({
                idproducto,
                idcliente,
                fecha,
                valor,
                total,
                descuento: descuento || 0
            });
    
            await nuevaVenta.save();
    
            res.status(201).json(nuevaVenta);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    //put//modificar

    modificarVentas: async (req, res) => {

        const { id } = req.params;
        const { idproducto, fecha, valor } = req.body;

        try {
            const ventas = await Ventas.findById(id);

            if (!ventas) {
                return res.status(404).json({ msg: "Producto no encontrado" });
            }

            ventas.idproducto = idproducto;
            ventas.fecha = fecha;
            ventas.valor = valor;
            
            await ventas.save();
            res.json({ msg: "ventas modificado correctamente", ventas });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    //put//activar

    activarVenta: async (req, res) => {
        const { id } = req.params;
        try {
            await Ventas.findByIdAndUpdate(id, { estado: 1 });
            res.json({ msg: "Venta activada correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    //put//desactivar

    desactivarVentas: async (req, res) => {
        const { id } = req.params;
        try {
            await Ventas.findByIdAndUpdate(id, { estado: 0 });
            res.json({ msg: "Ventas desactivadas correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


};

module.exports={httpVentas}