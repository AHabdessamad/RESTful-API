//Modules import
const express = require('express');
const morgan = require('morgan'); 


const tourRouter = require('./Routes/toursRoutes');


const app = express();

// 1) Midddlewares : Middleware function that modify the incoming request data (req/res)

app.use(express.json());

// to run the file system in browser mode static
app.use(express.static(`${__dirname}/public`));


//gives infos about the request dev colors state code but 'tiny' no color diff order
if(process.env.NODE_ENV !== 'production'){  // === 'development
  app.use(morgan('dev')); 
}

// Time middleware
app.use((req, res, next ) =>{
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();  //pass to the next middleware
})

// 3) ROUTES :Mounting

app.use('/api/v1/tours' ,tourRouter);



module.exports = app;