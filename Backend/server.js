const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

const app = express();

//db
mongoose
  .connect(process.env.DATABASE_CLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));
//routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const ticketRoutes = require("./routes/ticket");
const vehicleRoutes = require("./routes/vehicle");

//app-middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
// app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "images")));

//middlewares
app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/vehicle", vehicleRoutes);

app.get("/", (req, res) => {
  res.send("Hello!");
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`API is running on port ${port}`));
