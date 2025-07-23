const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoutes = require('./routes/userRoutes');
const connectDB = require("./config/db");
const cors = require("cors")

dotenv.config();
app.use(cors());
connectDB();

app.use(express.json());
app.get("/" , (req,res)=>{
    res.send("ello")
})
app.use('/api/users', userRoutes);
app.listen(5000, ()=>{console.log("running")})