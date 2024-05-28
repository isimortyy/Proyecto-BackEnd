const mongoose = require('mongoose')

const detalleventaSchema = new mongoose.Schema({
    idproducto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    idventa: { type: mongoose.Schema.Types.ObjectId, ref: 'Venta' },
    valor: { type: Number, default: 0 },
    cantidad: { type: Number, default: 0 },
    descuento: {type:Number, default:0}
}, { timestamps: true });

module.exports = mongoose.model("DetalleVenta", detalleventaSchema);