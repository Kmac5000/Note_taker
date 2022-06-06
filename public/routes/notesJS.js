const notesJS = require("express").Router();
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helper/fsUtils");
const fs = require("fs");

// route for notes page
notesJS.get("/", (req, res) => res.sendFile(path.join(__dirname, "/notes")));

//Route for retrieving all of the feedback
notesJS.get("/read", (req, res) => {
  console.info(`${req.method} request received for note`);

  readFromFile("../db/db.json").then((data) => res.json(JSON.parse(data)));
});

notesJS.post("/", (req, res) => {
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

module.export = notesJS;
