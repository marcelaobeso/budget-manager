const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.static("public"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes

// auth, login, create
app.use("/api/auth", require("./routes/auth"));
app.use("/api/expense", require("./routes/expense"));
app.use("/api/account", require("./routes/account"));
// CRUD

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
