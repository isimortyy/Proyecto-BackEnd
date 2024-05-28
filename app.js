const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv/config');
const mongoose =require('mongoose')

const productos= require('./src/routes/productos');
const usuarios = require('./src/routes/usuarios');
const cliente=require('./src/routes/clientes')
const ventas=require('./src/routes/ventas')
const detalleVenta=require('./src/routes/detalle_venta')
const carrito=require('./src/routes/carrito') 


const app = express();


// Middleware global
app.use(cors());
app.use(express.json());

// Rutas
 app.use('/api/productos/',productos)
app.use('/api/usuarios/', usuarios); 
app.use('/api/clientes/',cliente)
app.use('/api/ventas/',ventas)
app.use('/api/detalle_venta/',detalleVenta)
app.use('/api/carrito/',carrito)


app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto${process.env.PORT}`);
    mongoose.connect('mongodb://127.0.0.1:27017/test')
        .then(() => console.log('Connected!')); 
});
