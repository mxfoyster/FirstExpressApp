//node modules
const nodePath = require('path');
//const bodyParser = require('body-parser');
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
 function restRoutes(app, express){ 
    app.use(express.json()); //without this, Express won't import body at all!
    //Review (Has to be query, no body!)
    app.get('/data', (req, res) => {
        res.send("Getting (Review): " + req.query.data);
    });
    
    //Create (All the rest, we can look at our body)
    app.post('/data', (req, res) => {
        res.send("Posting (Create): " + req.body.data);
    });
    
    //Update
    app.put('/data', (req, res) => {
        res.send("Putting (Update): " + req.body.data);
    });
    
    //Delete
    app.delete('/data', (req, res) => {
        res.send("Deleting: " + req.body.data);
    });
 }

 module.exports = {pugRoutes, restRoutes};