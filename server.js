// Dependencies 
require("dotenv").config();
const { PORT = 3000, DATABASE_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

// Database Connection
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected to mongoose"))
    .on("error", () => console.log(error));

// SCHEMA
const CoffeeSchema = new mongoose.Schema({
    coffeeName: String,
    typeOfCoffee: String,
    hotIce: String,
    rating: Number,
    comments: String
});

// const ShopSchema = new mongoose.Schema({
//     shopName: String
// })

const Coffee = mongoose.model("Coffee", CoffeeSchema);
// const Shop = mongoose.model("Shop", ShopSchema)

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Welcome to the Coffee App");
});

// Coffee Index Route
app.get("/coffee", async (req, res) => {
    res.json(await Coffee.find({}));
});

// Coffee Create Route
app.post("/coffee", async (req, res) => {
    res.json(await Coffee.create(req.body));
});

// Coffee Update Route
app.put("/coffee/:id", async (req, res) => {
    res.json(await Coffee.findByIdAndUpdate(req.params.id, req.body, {new: true}));
})

// Coffee Delete Route
app.delete("/coffee/:id", async (req, res) => {
    res.json(await Coffee.findByIdAndRemove(req.params.id));
})

// Coffee Show Route
app.get("/coffee/:id", async (req, res) => {
    res.json(await Coffee.findById(req.params.id));
});


app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))