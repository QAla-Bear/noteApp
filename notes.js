const fs = require('fs');
// console.log(module);
var fetchNotes = ()  => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    console.log("No notes file found of file is not JSON format.");
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  var duplicateNotes = notes.filter((note) => {
    return note.title === title;
  });

  if(duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  console.log('Getting all notes.');
  return fetchNotes();
};

var read = (title) => {
  console.log('Reading note.');
  var notes = fetchNotes();
  foundNotes = notes.filter(note => note.title === title);
  return foundNotes[0];
};

var remove = (title) => {
  var notes = fetchNotes();
  var cleanedNotes = notes.filter(note => note.title !== title);
    saveNotes(cleanedNotes);
    if(cleanedNotes.length < notes.length) {
    // console.log('Note has been removed.');
    return true;
  } else {
    // console.log("No note found with that title");
    return false;
  }
};

var logNote = (note) => {
  debugger;
  console.log("---------");
  console.log("Title: " + note.title);
  console.log("Body: " + note.body);
};
module.exports = {
  addNote,
  getAll,
  read,
  remove,
  logNote
};
