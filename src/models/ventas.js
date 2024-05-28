const mongoose = require('mongoose');

const ventasSchema = new mongoose.Schema({
    idcliente:{type:mongoose.Schema.Types.ObjectId,ref:'Clientes'},
    idventa:{type: mongoose.Schema.Types.ObjectId,ref:'Venta'},
    idproducto: { type: mongoose.Schema.Types.ObjectId,ref:'Producto' },
    fecha:{ type: Date, required: true},
    valor: { type: Number, default: 0 },
    estado:{type: Number, required: true, default: 1},
    descuento:{type:Number,default:0}
}, { timestamps: true })

module.exports= mongoose.model("Venta", ventasSchema)