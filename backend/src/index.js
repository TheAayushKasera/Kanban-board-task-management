// Import required packages and modules
const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();
const bodyparser = require("body-parser");

// Configure middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

const port = process.env.PORT || 8000;
// Load environment variables from a .env file
require("dotenv").config();

// MongoDB connection URL with credentials from environment variables
const connecturl =
  "mongodb+srv://" +
  process.env.user +
  ":" +
  process.env.pass +
  "@cluster0.5nzpozy.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(connecturl)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log("Failed to connect");
    console.log(err);
  });

// Define the Mongoose schema for tasks
const TasksSchema = new mongoose.Schema({
  title: String,
  desc: String,
  progress: String,
});

// Create a Mongoose model based on the schema
const TaskModel = new mongoose.model("tasks", TasksSchema);

// Define a function to fetch data from the database
const getData = async () => {
  const result = await TaskModel.find();

  return result;
};

// Define a function to update task progress by ID
const updatebyid = async (_id, progress) => {
  await TaskModel.updateOne({ _id: _id }, { $set: { progress: progress } })
    .then(function () {
      console.log("Data updated"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
};

// Define a function to update a task by ID
const updatetask = async (_id, title, desc) => {
  await TaskModel.updateOne(
    { _id: _id },
    { $set: { title: title, desc: desc } }
  )
    .then(() => {
      console.log("Data updated"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
};

// Define a function to insert new data into the database
const postData = async (title, desc) => {
  try {
    const data = new TaskModel({ title: title, desc: desc, progress: "to_do" });
    const result = await data.save();
    console.log(result);
  } catch (error) {
    console.log(error); // Failure
  }
};

// Define a function to delete data by ID
const deletebyId = async (id) => {
  try {
    const result = await TaskModel.deleteOne({ _id: id });
    console.log(result);
  } catch (err) {
    console.log(err); // Failure
  }
};

// Define routes
app.get("/", function (req, res) {
  res.send("Hello");
});

app.put("/api/updateprogress", async (req, res) => {
  const _id = req.body._id;
  const progress = req.body.progress;
  await updatebyid(_id, progress);
  res.send("data updated");
});

app.get("/api/getdata", async (req, res) => {
  const result = await getData();
  res.send(result);
});
app.get("/api/corn-job", (req, res) => {
  console.log("Corn-job api called");
  res.send("backend works");
});
app.post("/api/postdata", async (req, res) => {
  const title = req.body.title;
  const desc = req.body.desc;
  await postData(title, desc);
  res.send("data posted");
});

app.delete("/api/deletedata", async (req, res) => {
  await deletebyId(req.body._id);
  res.send("data deleted");
});

app.put("/api/updatetask", async (req, res) => {
  await updatetask(req.body._id, req.body.title, req.body.desc);
  res.send("data updated");
});

// Start the server on port 8000
app.listen(port, () => {
  console.log("listening on port" + port);
});
