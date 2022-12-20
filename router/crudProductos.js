const express=require('express');
const router=express.Router();

//importamos el model Productos
const Productos = require('../models/producto');

//solicitud para mostrar
router.get('/', async(req,res)=>{
    try {
        var productosArraydb= await Productos.find().sort({codigo:1}).limit(20);//esperemos la respuesta de los datos encontrados de Productos 
        res.render("crudProductos.ejs" ,{
            titulo:"CRUD productos",
            productosArray:productosArraydb
        });

    } catch (error) {
        console.log(error);
    }
});




router.get('/insertar',(req,res)=>{
    res.render('insertar.ejs');
});
//insertar datos
router.post('/', async(req, res)=>{
    const body=req.body;
    try {
        const productosDB= new Productos(body);
        await productosDB.save();

        res.redirect('/');

    } catch (error) {
        console.log(error);
    }
});

//encontrar un registro
router.get('/:codigo',async(req, res)=>{
    const codigo=req.params.codigo;
    try {
        const productoDB=await Productos.findOne({codigo:codigo});
        if(productoDB){
            res.render('editar',{
                producto:productoDB,
                errorEditar:false
            })
        }else{
            res.render('editar',{
                errorEditar:true,
                mensaje:'Producto no encontrado'
            }) 
        }
       
    } catch (error) {
        console.log("Editar error " + error);
        
    }
})
//editar
router.put('/:codigo', async(req, res)=>{
    const codigo=req.params.codigo;
    const body=req.body;
    try {
        const productoDB= await Productos.updateOne({codigo:codigo},{$set:body});

        if(productoDB){
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
        console.log("error editar"+ error);
    }
})

//eliminar
router.delete('/:codigo',async(req,res)=>{
    const codigo=req.params.codigo;
    try {
        const productoDB=await Productos.deleteOne({codigo:codigo});
        if(productoDB){
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