const express = require("express");
const morgan = require("morgan");
const path = require("path");
const authrouter = require("./router/authrouter.js");
const categoryRouter = require("./router/categoryRouter.js");
const productrouter = require("./router/productRoute.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectToDatabase = require('./config/db.js');
const PORT = 5000;

// Connect to the database
connectToDatabase();

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({
  origin: "*",
  credentials: true
}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// API routes
app.use("/user", authrouter);
app.use("/category", categoryRouter);
app.use("/product", productrouter);

// All other GET requests not handled before will return the React app

app.use("*", function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
