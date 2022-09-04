const app = require('./app')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv');

const cors = require("cors");
app.use(cors());

dotenv.config({path:'config/config.env'});
const server = app.listen(process.env.PORT, ()=>{
  connectDatabase();
});





