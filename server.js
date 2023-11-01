// 4) Start the server
const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env'});


mongoose
 .connect(process.env.DATABASE_LOCAL , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((error) => console.error('DB connection error:', error));


const Tour = require('./models/tourModel');
const tour = new Tour({
  name: "Around Europe",
  rating: 5,
  price: 200
})



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
