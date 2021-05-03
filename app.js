const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const router = require('./router/Router');


app.set('views','views');
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));

app.use(methodOverride('_method'));

// setting body parser middleware (to parse POST body )
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
//using router
app.use(router);

app.listen(3232,()=>{
  console.log('Server starts at 3232'); 
});