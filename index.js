const express = require("express");
const router = require("./routes/routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Online");
});

app.use("/data", router);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
