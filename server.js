var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');

var config = {
  user: 'snehithakrishna2',
  database:'snehithakrishna2',
  host: 'db.imad.hasura-app.io',
  port:'5432',
  password:process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return hashed.toString('hex');
}

app.get('/hash/:input',function (req, res) {
  var hashedString=hash(req.params.input,'this-is-charmy');
  res.send(hashedString);
});


var pool = new Pool(config);
app.get('/test-db', function (req, res) {
   pool.query('SELECT * FROM test',function(err,result){
 if(err){
     res.status(500).send(err.toString());
 }else{
     res.send(JSON.stringify(result.rows));
 }
   });
 });

app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'about.html'));
});
app.get('/admin', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'admin.html'));
});
app.get('/contact', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'contact.html'));
});
app.get('/parking', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'parking.html'));
});
app.get('/catering', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'catering.html'));
});
app.get('/decorations', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'decorations.html'));
});
app.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'register.html'));
});
app.get('/security', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'security.html'));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
