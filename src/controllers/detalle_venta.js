const DetalleVenta = require('../models/detalle_venta.js')
const Productos= require('../models/productos.js')

const httpDetalleVenta={


    //get//listar por un id venta

    listarDetallesPorIdVenta: async (req, res) => {
        const idVenta = req.params.idVenta; // Suponiendo que el ID de la venta viene en los parámetros de la solicitud
        try {
            const detallesVenta = await DetalleVenta.find({ idventa: idVenta });
            res.json({ detallesVenta });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //post//insertar

    insertarCliente: async (req, res) => {

        const { idproducto, idventa, valor, cantidad } = req.body;

        try {
            const detalleVenta = new DetalleVenta ({ idproducto, idventa, valor, cantidad  });
            await detalleVenta.save();

            res.json({ msg: "Detalle Venta se a insertado correctamente", detalleVenta: detalleVenta });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //put//modificar

    modificarCliente:  async (req, res) => {
        const { id } = req.params;
        const { cantidad, descuento } = req.body;
        try {
            // Obtener el detalle de venta
            const detalleVenta = await DetalleVenta.findById(id);
            if (!detalleVenta) {
                return res.status(404).json({ message: 'Detalle de venta no encontrado' });
            }
            // Obtener el producto relacionado con el detalle de venta
            const producto = await Productos.findById(detalleVenta.idproducto);
            if (!producto) {
                return res.status(404).json({ message: 'El producto no existe' });
            }
            // Calcular los totales
            const totalsin = cantidad * producto.precio;
            const totalCondescuento = totalsin * (1 - descuento / 100);
            // Actualizar el detalle de venta
            const updatedDetalleVenta = await DetalleVenta.findByIdAndUpdate(id, { cantidad, totalCondescuento, totalsin }, { new: true });
            res.json(updatedDetalleVenta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports={httpDetalleVenta}