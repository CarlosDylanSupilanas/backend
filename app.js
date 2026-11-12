import express from "express";
import cors from "cors";

import bookRoutes from "./routes/bookRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import userRoutes from "./routes/userRoutes.js";

let corsOptions = {
  origin: "http://localhost:5173",
};

//Create Express App
const app = express();

//to parse incomingf data
app.use(express.json());
app.use(cors(corsOptions));

app.use("/book", bookRoutes);
app.use("/user", userRoutes);
app.use("/student", studentRoutes);

try {
  const port = 3000; //Define port Variable
  app.listen(port, () => {
    console.log(`listening to port ${port}...`);
  });
} catch (e) {
  console.log(e);
}
