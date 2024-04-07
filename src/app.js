const express = require('express');
const path = require('path');

const indexRouter = require('./routes/other.routes');

const moviesRoutes = require('./routes/movies.Routes');
const genresRoutes = require('./routes/genres.Routes');
const app = express();

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/', indexRouter);
app.use(moviesRoutes);
app.use(genresRoutes);

app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
