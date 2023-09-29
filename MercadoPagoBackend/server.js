const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./Routes/Routes")

app.use(express.json());
app.use(cors());
app.use(router);


const port = 8080

app.listen(port, () => {
  console.log("the server is now running on port 8080");
});




