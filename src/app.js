require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json()); //Middleware to parse JSON bodies

//connecting to database
const connectDB = require("./configs/database");
connectDB();

//Importing routes
const authRoutes = require("./routes/authRoute");
const menuRoutes = require("./routes/menuRoute");
const orderRoutes = require("./routes/orderRoute");
const inventoryRoutes = require("./routes/inventoryRoute");
const tableRoutes = require("./routes/tableRoute");
const errorHandler = require("./middleware/errorMiddleware");
app.use(errorHandler);

//Using Routes
app.use("/api", authRoutes);
app.use("/api", menuRoutes);
app.use("/api", orderRoutes);
app.use("/api", inventoryRoutes);
app.use("/api", tableRoutes);



app.get("/", (req,res)=>{
    res.status(200).json({status:"success", message:"welcome to restaurant management system"});
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});