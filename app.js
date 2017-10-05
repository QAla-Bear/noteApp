const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs
.command("add", "Adding a new note", {
  title: {
    describe: "Title of the note.",
    demand: true,
    alias: 't'
  },
  body:{
    describe: "Body of the note.",
    demand: true,
    alias: 'b'
  }
})
.command("list", "List all nodes.")
.command("read", "Read a specific note.", {
  title: {
    describe: "Title of the note to look for.",
    demand: true,
    alias: 't'
  }
})
.command("remove", "Remove a specific note.", {
  title: {
    describe: "The note of the title to be removed.",
    demand: true,
    alias: 't'
  }
})
.help()
.argv;
var command = argv._[0];

if(command === "add") {
  console.log('Adding new note.');
  var note = notes.addNote(argv.title, argv.body);
  if (note === undefined) {
    console.log("There is already a note with that title. Note won't be saved.");
  } else {
    notes.logNote(note);
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => {
    notes.logNote(note);
  });
} else if (command === 'read') {
  var note = notes.read(argv.title);
  if(note){
    notes.logNote(note);
  }

} else if (command === 'remove') {
  if(notes.remove(argv.title)) {
    console.log("Note removed successfully.");
  }
  else {
    console.log("No note found with that title.");
  }
} else {
  console.log('Command not recognized');
}
