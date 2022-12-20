//2.conexion a mongodb
const mongoose=require('mongoose');

const user="examen";
const pass="blh8wr31WXfkJfMJ";
const nombredb="tiendavirtual";
const uri=`mongodb+srv://${user}:${pass}@cluster0.ywbahps.mongodb.net/${nombredb}?retryWrites=true&w=majority`;
const db= async ()=>{
    mongoose.set('strictQuery', true);
    await    mongoose.connect(uri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (error)=>{
            if(error){
                console.log("conexion "+error);
            }else 
                console.log("conexion exitosa PLIS v3");
        });
}

module.exports=db;