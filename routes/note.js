const note = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

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
  // const news = req.body;
  // news.id = uuidv4();
  // console.log(news, news.id);
  // req.body.id = notes.length.toString();
  if (validateNote(req.body)) {
    const note = newNote(req.body, notes);
    res.json(note);
  }
});

// note.delete("/:id", (req, res) => {
//   console.log("req params", req.params.id);
//   notes.splice(req.params.id, 1);
// });

module.exports = note;
