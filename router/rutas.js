const express=require('express');
const router=express.Router();

//importamos el model Productos
const Productos = require('../models/producto');
const Carrito = require('../models/carrito');
//solicitud para mostrar
router.get('/', async(req,res)=>{
    try {
        var productosArraydb= await Productos.find().sort({codigo:1}).limit(20);//esperemos la respuesta de los datos encontrados de Productos
        const carritoDB=await Carrito.find()  
        res.render("index.ejs" ,{
            productosArray:productosArraydb,
            carritoArray:carritoDB
        });

    } catch (error) {
        console.log(error);
    }
});


module.exports=router;