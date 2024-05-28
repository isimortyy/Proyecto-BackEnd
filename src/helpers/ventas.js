const Ventas = require('../models/ventas.js')

const ventasHelpers={

    existeVentasID: async (id, req) => {
        const existe = await Ventas.findById(id)
        if (!existe) {
            throw new Error(`Registro no existe ${id}`)
        }

        req.req.ventabd = existe

    }
}

module.exports= {ventasHelpers}
