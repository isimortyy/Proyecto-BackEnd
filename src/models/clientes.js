const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true},
    direccion: { type: String, required: true ,max:50},
    telefono: { type: Number, required: true ,default:0},
    email : { type: String, required: true, unique: true},
    documento : { type: Number, required: true ,unique:true},
    fecha_compra: { type: Date, required: true},
}, { timestamps: true })


module.exports= mongoose.model("Clientes", clienteSchema)