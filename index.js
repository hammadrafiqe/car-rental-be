const express = require("express");
const path = require("path");
const app = express();
const data = require("./data.json");
const cors = require("cors");

app.use(cors());

app.get("/car", (req, res) => {
  console.log("getting all cars");
  const resData = {
    status: "success",
    message: "cars fetched",
    data: Object.values(data),
  };
  res.status(200).json(resData);
});

app.get("/car/:id", (req, res) => {
  if (!req.params.id) {
    console.log("id not found in request");
    return res
      .status(400)
      .json({ status: "fail", message: "id not found", data: null });
  }
  if (!data[req.params.id]) {
    console.log("car not found with id", req.params.id);
    return res.status(400).json({
      status: "fail",
      message: "car not found with id " + req.params.id,
      data: null,
    });
  }
  console.log("car found with id", req.params.id);
  res.status(200).json({
    status: "success",
    message: "car found",
    data: data[req.params.id],
  });
});

app.use(express.static(path.join(__dirname + "/public")));

app.listen(process.env.PORT, () => {
  console.log("running in port", process.env.PORT);
});
