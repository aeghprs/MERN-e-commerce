const mongoose = require('mongoose');
const app = require('../app')
require('dotenv').config();

const connectDatabase = () => {
    const dbURI = 'mongodb+srv://aeghprs:aeghprs@cluster0.b9cgb.mongodb.net/buynow?retryWrites=true&w=majority'
 mongoose.connect(process.env.DB_LOCAL_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen((process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} and DB connected.`)
})))
  .catch((err) => console.log(err)); 
}

module.exports = connectDatabase