const express=require('express');
const router=express.Router();

//importamos el model Productos
const Productos = require('../models/producto');
const Carrito = require('../models/carrito');
//encontrar un registro
router.get('/:cod',async(req, res)=>{
    const idcod=req.params.cod;
    try {
        const productoDB=await Productos.findOne({codigo:idcod});
        const carritoDB=await Carrito.find()
        
        if(productoDB){
            res.render('detalle.ejs',{
                productoArray:productoDB,
                carritoArray:carritoDB,
                errorDetalle:false
            })
        }else{
            res.render('detalle.ejs',{
                errorDetalle:true,
                mensaje:'Producto no encontrado'
            }) 
        }
       
    } catch (error) {
        console.log("detalle error " + error);
        
    }
})



module.exports=router;