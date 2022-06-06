const express = require("express");
const path = require("path");
const fs = require("fs");
const notesJS = require("./public/routes/notesJS");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
// app.use("./api", api);
// app.use("./public/routes/notesJS", notesJS);
const { notes } = require("./db/db.json");

function newNote(body, userInput) {
  let note = body;
  userInput.push(note);

  fs.writeFileSync(path.join(__dirname, "./db/db.json")),
    JSON.stringify({ notes: notesArray }, null, 2);

  return note;
}

app.get("/api/notes", (req, res) => {
  req.body.id = notes.length.toString();

  const note = newNote(req.body, notes);

  res.json(note);
});

app.post("/api/notes", (req, res) => {
  const note = newNote(req.body, notes);
  res.json(note);
});

// route to homepage

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "notes.html"))
);
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

module.exports = app;
