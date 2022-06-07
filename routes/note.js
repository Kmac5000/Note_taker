const notes = require("express").Router();
const fs = require("fs");
const path = require("path");

function newNote(body, notesArray) {
  const note = body;
  notesArray.push(note);

  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

function validateNote(note) {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  return true;
}

notes.get("/api/notes", (req, res) => {
  res.json(notes);
});

notes.post("/api/notes", (req, res) => {
  req.body.id = notes.length.toString();
  if (validateNote(req.body)) {
    const note = newNote(req.body, notes);
    res.json(note);
  }
});

notes.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

notes.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

module.exports = notes;
