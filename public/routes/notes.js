const notes = require("express").Router();
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helper/fsUtils");

// route for notes page
notes.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);

//Route for retrieving all of the feedback
notes.get("/read", (req, res) => {
  console.info(`${req.method} request received for feedback`);

  readFromFile("../db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
  console.info(`${req.method} request recieved to submit note`);
  // deconstruct to assign items into body
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
    };

    readAndAppend(newNote, "../db/db.json");
    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("error posting note");
  }
});

module.export = notes;
