const DetalleVenta=require('../models/detalle_venta')

const detalleVentaHelpers = {

    existedetalleVentaID: async (id, req) => {
        const existe = await DetalleVenta.findById(id)
        if (!existe) {
            throw new Error(`Registro no existe ${id}`)
        }

        req.req.detalleVentabd = existe
    },

}

module.exports ={detalleVentaHelpers}