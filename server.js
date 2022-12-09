const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const dbconfig = require("./db");
const affiliateRoute = require("./routes/affiliate")

app.use(affiliateRoute)

app.get("/", (req, res) => res.send(`Server Running successfully.....!`));

const port = 5001;
app.listen(port, () => console.log(`server running on port ${port}`));
