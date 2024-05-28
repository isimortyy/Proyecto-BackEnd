const Productos = require('../models/productos.js')

const httpProductos = {

    //  Get: listar todo 

    listarProductos: async (req, res) => {
        try {
            const producto = await Productos.find();
            res.json({ producto });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get:listar productos por id

    obtenerProductoPorId: async (req, res) => {
        const { id } = req.params;
        try {
            const producto = await Productos.findById(id);
            if (producto)
                res.json({ producto });
            else
                res.status(404).json({ msg: "Producto no encontrado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get: Liste todos los productos por debajo del stok minimo
    
    obtenerProductosBajoStockMinimo: async (req, res) => {
        try {
            const productosBajoStock = await Productos.find({ $expr: { $lt: ["$cantidad", "$stockminimo"] } });
            res.json(productosBajoStock);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get: Listar todos los productos por encima del precio de $100.000


    listarProductosPorEncimaDePrecio: async (req, res) => {
        try {

            const productos = await Productos.find({ precio: { $gt: 100000 } });

            if (productos.length > 0) {
                res.json({ productos });
            } else {
                res.status(404).json({ msg: "No hay productos por encima del precio de $100,000." });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //  Get : listar activos 

    listarProductosActivos: async (req, res) => {
        try {
            const ProductosActivos = await Productos.find({ estado: 1 });
            res.json({ ProductosActivos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    // Get: listar inactivos

    listarProductosInactivos: async (req, res) => {
        try {
            const productosInactivos = await Productos.find({ estado: 0 });
            res.json({ productosInactivos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //  Put: insertar

    insertarProducto: async (req, res) => {
        const { usuarioid, nombre, precio, cantidad, stockminimo } = req.body;

        try {
            const nuevoProducto = new Productos({ usuarioid, nombre, precio, cantidad, stockminimo });
            await nuevoProducto.save();

            res.json({ msg: "Producto insertado correctamente", producto: nuevoProducto });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //  modificar put

    modificarProducto: async (req, res) => {

        const { id } = req.params;
        const { nombre, precio, cantidad, stockminimo, estado } = req.body;

        try {
            const producto = await Productos.findById(id);

            if (!producto) {
                return res.status(404).json({ msg: "Producto no encontrado" });
            }

            producto.nombre = nombre;
            producto.precio = precio;
            producto.cantidad = cantidad;
            producto.stockminimo = stockminimo;
            producto.estado = estado;

            await producto.save();
            res.json({ msg: "Producto modificado correctamente", producto });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    // activar producto put

    activarProducto: async (req, res) => {
        const { id } = req.params;
        try {
            await Productos.findByIdAndUpdate(id, { estado: 1 });
            res.json({ msg: "Usuario activado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Put: desactivar prodcutos

    desactivarProductos: async (req, res) => {
        const { id } = req.params;
        try {
            await Productos.findByIdAndUpdate(id, { estado: 0 });
            res.json({ msg: "Productos desactivados correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

};

module.exports = {httpProductos}


