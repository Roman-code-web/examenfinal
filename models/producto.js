//creamos un esquema de la tabla cliente
const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const productoEsquema = new Schema({//parametros o estructura de la coleccion
    codigo: String,
    nombre:String,
    precio:String,
    stock:Number,
    detalle:String,
    marca:String,
    carritoadd:Boolean,
    img:String,
},{collection:'productos'});

// creamos el modelo 
const Producto= mongoose.model('Producto',productoEsquema);//nombre del modelo y el esquema creado

//exportamos el module

module.exports= Producto;
