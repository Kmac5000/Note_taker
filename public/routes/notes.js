const notes = require("express").Router();

notes.post("../db/db.json", (req, res) => {
  console.info(`${req.method} request recieved to submit note`);
  // deconstruct to assign items into body
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
    };
  }
});
