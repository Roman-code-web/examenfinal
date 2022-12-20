const e = require('express');
const express=require('express');
const router=express.Router();

//importamos el model Productos
const Carrito = require('../models/carrito');
//solicitud para mostrar
router.get('/carrito', async(req,res)=>{
    try {
        var carritosArraydb= await Carrito.find();//esperemos la respuesta de los datos encontrados de Productos 
        res.render("carrito.ejs" ,{
            carritoArray:carritosArraydb
        });

    } catch (error) {
        console.log(error);
    }
});
//insertar carrito
router.post('/', async(req, res)=>{

    try {
        const body=req.body;
        var codigo=body.codigo;
        var carritototal= await Carrito.findOne({codigo:codigo});
        if(carritototal){
            var cantidad=carritototal.cantidad;
            body.cantidad=cantidad + body.cantidad;
            body.total= parseFloat( body.cantidad *body.precio).toFixed(2) ;
            var carritoDB= await Carrito.updateOne({codigo:codigo},{$set:body});
        }else{
            const carritoDB= new Carrito(body);
            await carritoDB.save();
        }
        
        res.send({
            estado:true
        });

    } catch (error) {
        console.log(error);
    }
});

//editar
router.put('/:codigo', async(req, res)=>{
    const codigo=req.params.codigo;
    const body=req.body;
    try {
        var carritototal= await Carrito.findOne({codigo:codigo});
        if(carritototal){
            if(!body.restar){
                var cantidad=carritototal.cantidad;
                body.cantidad=cantidad + body.cantidad;
                body.total= parseFloat( body.cantidad * body.precio).toFixed(2) ;
                var carritoDB= await Carrito.updateOne({codigo:codigo},{$set:body});
            }else{
                body.total= parseFloat( body.cantidad * body.precio).toFixed(2) ;
                var carritoDB= await Carrito.updateOne({codigo:codigo},{$set:body});
            }
            
        }else{
            var carritoDB= new Carrito(body);
            await carritoDB.save();
        }    
        
        if(carritoDB){
            res.json({
                estado:true,
                mensaje:'Editado'
            })
        }else{
            res.json({
                estado:false,
                mensaje:'Registro no editado...'
            })
        }
    } catch (error) {
        console.log("error editar carrito"+ error);
    }
})
//eliminar
router.delete('/:codigo',async(req,res)=>{
    const codigo=req.params.codigo;
    try {
        const carritoDB=await Carrito.deleteOne({codigo:codigo});
        if(carritoDB){
           res.json({
            estado:true,
            mensaje:'eliminado'
           });
        }else{
            res.json({
                estado:false,
                mensaje:'error al eliminar...'
            });
        }
    } catch (error) {
        console.log("error ruta eliminar" + error)
    }
});   


module.exports=router;