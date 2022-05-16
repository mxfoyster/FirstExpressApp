const express = require('express');
const app = express();
const port = process.env.PORT ||3000;

// respond with "hello world" when a GET request is made to the homepage
app.use(express.static('public'))

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

//lets handle our error pages
app.use( (req, res) => {
    res.redirect('/404.html')
 });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});