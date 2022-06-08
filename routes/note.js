const note = require("express").Router();
const fs = require("fs");
const path = require("path");

const notes = require("../db/db.json");

function newNote(body, notes) {
  const note = body;
  notes.push(note);

  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(notes, null, 2)
  );
  return note;
}

function validateNote(note) {
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  return true;
}

note.get("/", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const noteReturn = JSON.parse(data);
      console.log(noteReturn);
      return res.json(noteReturn);
    }
  });
});

note.post("/", (req, res) => {
  console.log("note functionsssss");
  // req.body.id = notes.length.toString();
  if (validateNote(req.body)) {
    const note = newNote(req.body, notes);
    res.json(note);
  }
});

module.exports = note;
