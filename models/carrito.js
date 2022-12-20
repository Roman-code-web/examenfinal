//creamos un esquema de la tabla cliente
const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const carritoEsquema = new Schema({//parametros o estructura de la coleccion
    codigo: String,
    nombre:String,
    img:String,
    precio:String,
    cantidad:Number,
    total:String,
},{collection:'carrito'});

// creamos el modelo 
const Carrito= mongoose.model('Carrito',carritoEsquema);//nombre del modelo y el esquema creado

//exportamos el module

module.exports= Carrito;
