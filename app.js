//express modules
const express = require('express');
var cors = require('cors') // we need this for embedded messenger

//my modules
const routes = require('./routes'); 

const app = express();
app.use(cors());
const port = process.env.PORT ||3000;

//pug pages
app.set('view engine', 'pug');
app.locals.pretty = true; //format rendered html neatly
app.use(routes.pugRoutes);

//our REST routes
routes.restRoutes(app, express);

// static pages using just express
app.use(express.static('public'));

//static routing for justnode 
app.use("/justnode", express.static(__dirname + "/justnode"));

//static routing for express demo
app.use("/express", express.static(__dirname + "/express"));


//lets handle our error pages
app.use( (req, res) => {
    res.redirect('/404.html')
 });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});