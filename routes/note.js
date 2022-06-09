const note = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const notes = require("../db/db.json");

function newNote(body, notes) {
  const note = body;

  const news = body;
  note.id = uuidv4();
  console.log("this is the spot" + news + "  the next  " + note.id);

  notes.push(note);
  console.log("newNote " + note);

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
      // console.log(noteReturn);
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

note.delete("/:id", (req, res) => {
  // console.log("req params", req.params.id);
  // let noteId = req.params.id;
  // console.log("note id  " + noteId);
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedNotes = JSON.parse(data);
      const noteToDelete = parsedNotes.filter(
        (note) => note.id === req.params.id
      )[0];
      const upDatedNote = parsedNotes.filter(
        (note) => note.id !== req.params.id
      );
      fs.writeFile(
        "./db/db.json",
        JSON.stringify(upDatedNote, null, 4),
        (err) =>
          err ? console.log(error) : console.log("Successfully deleted note!")
      );
      const successData = {
        status: "Success",
        msg: "Note deleted",
        body: noteToDelete,
      };

      console.log(successData);
      res.json(successData);
    }
  });
});

module.exports = note;
