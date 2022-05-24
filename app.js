//express modules
const express = require('express');

//my modules
const routes = require('./routes'); 

const app = express();

const port = process.env.PORT ||3000;

//pug pages
app.set('view engine', 'pug');
app.locals.pretty = true; //format rendered html neatly
app.use(routes.pugRoutes);
//app.use(routes.expressDemoRoutes);

// static pages using just express
app.use(express.static('public'));

//our REST routes
routes.restRoutes(app, express);

//lets handle our error pages
app.use( (req, res) => {
    res.redirect('/404.html')
 });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});