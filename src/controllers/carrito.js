const Carrito = require('../models/carrito.js')

const httpCarrito = {


    //get listar carrrito x cliente

    listarCarritoPorCliente: async (req, res) => {
        const idCliente = req.params.idCliente; // Suponiendo que el ID del cliente viene en los parámetros de la solicitud
        try {
            const elementosCarrito = await Carrito.find({ idcliente: idCliente });
            res.json({ elementosCarrito });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    //post//insertar

    insertarcarrito: async (req, res) => {
        const { idproducto, idcliente,cantidad,estado,total } = req.body;
        try {
            const carrito = new Carrito ({ idproducto, idcliente,cantidad,estado,total});
            await carrito.save();
            res.json({ carrito });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },



    //delete//elimino

    eliminarElementoCarrito: async (req, res) => {
        const idElementoCarrito = req.params.idElementoCarrito; // Suponiendo que el ID del elemento del carrito viene en los parámetros de la solicitud
        try {
            const elementoEliminado = await Carrito.findByIdAndDelete(idElementoCarrito);
            if (!elementoEliminado) {
                return res.status(404).json({ mensaje: 'Elemento del carrito no encontrado' });
            }
            res.json({ mensaje: 'Elemento del carrito eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
 
module.exports={httpCarrito};






