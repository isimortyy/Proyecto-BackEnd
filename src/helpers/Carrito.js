const Carrito = require ('../models/carrito')

const carritoHelpers={

    existeCarritoID: async (id, req) => {
        const existe = await Carrito.findById(id)
        if (!existe) {
            throw new Error(`Registro no existe ${id}`)
        }

        req.req.carritobd = existe

    },

}

module.exports={carritoHelpers}