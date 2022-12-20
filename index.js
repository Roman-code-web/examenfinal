//1.importamos express y mongoose
const express=require('express');
const db=require('./db/conexion');
const bodyParser = require('body-parser')
const app=express();//utilizamos
const PORT= process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


//4.motor de plantillas 
app.set('view engine','ejs');
app.set('views', __dirname +'/views');//indicamos el nombre  y la ruta de las vistas

//usar archivos estaticos
app.use(express.static(__dirname + '/public'));

//rutas index productos
app.use('/',require('./router/rutas'));
app.use('/productos',require('./router/productos'));
app.use('/detalle',require('./router/detalle'));
app.use('/',require('./router/carrito'));
app.use('/crud',require('./router/crudProductos'));

//3.servidor escucha las peticiones
app.listen(PORT,()=>{
    console.log("servidor iniciado");
    db();
});

