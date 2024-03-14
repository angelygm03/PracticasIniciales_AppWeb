const express = require('express');
const morgan = require('morgan')
const exphbs = require ('express-handlebars');
const path = require('path');

//inicializaciones
const app = express();

//settings
app.set('port', process.env.PORT || 4000);


//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Variables globales
app.use((req, res, next) => {
    next();
});

//Routes
app.use(require('./routes'));
app.use(require('./routes/auth'));

//Public
app.use(express.static(path.join(__dirname, 'public')));


//Corriendo el servidor
app.listen(app.get('port'), () => {
    console.log('Server listening on port ', app.get('port'));
});