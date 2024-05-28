const Clientes = require('../models/clientes.js')

const httpClientes = {

    // Get : listar todos 

    listarClientes: async (req, res) => {
        try {
            const Cliente = await Clientes.find();
            res.json({ Cliente });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get: listar por un id
    obtenerClientePorId: async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await Clientes.findById(id);
            if (cliente)
                res.json({ cliente });
            else
                res.status(404).json({ msg: "Cliente no encontrado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //  Get :listar activos

    listarClientesActivos: async (req, res) => {
        try {
            const clientesActivos = await Clientes.find({ estado: 1 });
            res.json({ clientesActivos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    // Get1 listar inactivos

    listarClientesInactivos: async (req, res) => {
        try {
            const clientesInactivos = await Clientes.find({ estado: 0 });
            res.json({ clientesInactivos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Post: insertar 

    insertarCliente: async (req, res) => {

        const { nombre, direccion, telefono, email, documento, fecha_compra } = req.body;

        try {
            const nuevoCliente = new Clientes({ nombre, direccion, telefono, email, documento, fecha_compra });
            await nuevoCliente.save();

            res.json({ msg: "Cliente insertado correctamente", cliente: nuevoCliente });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //put//modificar

    modificarCliente: async (req, res) => {

        const { id } = req.params;
        const { nombre, direccion, telefono, email, documento, fecha_compra } = req.body;

        try {
            const cliente = await Clientes.findById(id);

            if (!cliente) {
                return res.status(404).json({ msg: "Cliente no encontrado" });
            }

            cliente.nombre = nombre;
            cliente.direccion = direccion;
            cliente.telefono = telefono;
            cliente.email = email;
            cliente.documento =documento;
            cliente.fecha_compra =fecha_compra;


            await cliente.save();
            res.json({ msg: "Cliente modificado correctamente", cliente });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //put//activar 

    activarCliente: async (req, res) => {
        const { id } = req.params;
        try {
            await Clientes.findByIdAndUpdate(id, { estado: 1 });
            res.json({ msg: "Usuario activado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //put//desactivar /

    desactivarProductos: async (req, res) => {
        const { id } = req.params;
        try {
            await Clientes.findByIdAndUpdate(id, { estado: 0 });
            res.json({ msg: "Usuario desactivado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

};

module.exports = {httpClientes}
