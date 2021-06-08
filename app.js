const express = require('express');
const session = require('express-session');//instalé "npm install express-session" y ahora lo requiero
const cookies = require('cookie-parser');
const app = express();


const methodOverride = require('method-override');

const port = process.env.PORT

const multer = require('multer');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');


app.use(cookies());



app.use(session({secret: 'Secreto!!', resave: false,saveUninitialized : false })); //la hago global a toda mi app
//Para indicarle express la carpeta donde se encuentran los archivos estáticos
// Necesitamos indicarle a Express que todo lo que está en la capeta public
// es contenido estático, es decir que no pasa por el sistema de rutas

app.use(userLoggedMiddleware);

app.use(express.static('public'));

//Debemos indicar cual es el motor de plantillas que estamos usando EJS
app.set('view engine', 'ejs')


//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
//Middleware de aplicación el cual se encargue de controlar la posibilidad de usar otros métodos diferentes al GET y al POST, en nuestros formularios
app.use(methodOverride('_method'));


//Para indicarle express el requerimiento de rutas
const homeRouter = require('./routes/homeRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

//Para usar las rutas 

app.use('/', homeRouter);

app.use('/user', userRouter);
// Recordar que el prefijo /products
// antecede a todas las rutas del controlador correspondiente
app.use('/products', productRouter);



//Levantando el servidor 
app.listen(port || 8000, () => {
    console.log('Example app listening on port arranco el 8000 ');
});




