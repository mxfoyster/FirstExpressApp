//node modules
const nodePath = require('path');
const fs = require('fs')


//here we handle our pug routing
function pugRoutes(req, res, next){
    //get the path, then the ectension
    let thisPath = req.path;
    let extName = nodePath.extname(thisPath);
    let thisFile = nodePath.basename(thisPath);
    //if it's a .pug file AND it exists, load it
    if (extName == ".pug"){
        if (fs.existsSync("views" + thisPath)){
            res.render(thisFile, {file: thisFile});
            return; //exit routing
            }
    }
    //if root url, load index
    else if(thisPath == '/'){
        res.render('index', {file: 'index'});
        return; //exit routing
    }
    next(); //no matches found, will continue looking!!
 }

//Routes for my REST demo
 function restRoutes(app){ 
//Review
app.get('/data', (req, res) => {
    res.send('hello world');
 });
 
 //Create
 app.post('/data', (req, res) => {
     res.send('Got a POST request');
 });
 
 //Update
 app.put('/data', (req, res) => {
     res.send('Got a PUT request at /user')
 });
 
 //Delete
 app.delete('/data', (req, res) => {
     res.send('Got a DELETE request at /user')
 });
 }

 module.exports = {pugRoutes, restRoutes};