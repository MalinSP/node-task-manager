const express = require("express");
const app = express();
const tasks = require("./public/routes/tasks");
const connectDB = require("./public/db/connect");
require("dotenv").config();
const notFound = require("./public/middleware/not-found");
const errorHandlerMiddleware = require("./public/middleware/error-handler");

app.use(express.static("./public"));
app.use(express.json());

// app.get("/hello", (req, res) => {
//   res.send("Task Manager App");
// });

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
