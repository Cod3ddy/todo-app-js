const express = require('express');
const app = express();
const DataStore = require("nedb");

// create local server
app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});

//serve public folder
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new DataStore("database.db");
database.loadDatabase((err) => {
  if (err) {
    console.log("Error loading database");
  }
  // console.log(database);
  console.log("Database loaded successfully");
});

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/api", (request, response) => {
  const data = request.body;
  const timeStamp = Date.now();
  data.timeStamp = timeStamp;

  // insert new data
  database.insert(data, (err, newDoc) => {
    if (err) {
      response.status(500).send(err);
      return;
    }
    response.json(newDoc);
  });
});