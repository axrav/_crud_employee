const express = require("express");
const router = require("./routes/routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  return res.status(200).json({
    status : "online"
  })
});

app.use("/data", router);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});