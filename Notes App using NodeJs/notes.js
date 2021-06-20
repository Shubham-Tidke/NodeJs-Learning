const fs = require('fs')
const chalk = require('chalk');
// const getNotes = () => { 
//     return "shubham@gmail.com";
// }

//-- ADDING NOTES USING TITLE AND BODY
const addNotes = (title, body) => {
    const notes = loadNotes(); //parsing existing data 
    //function to void duplicate entries
    const duplicateNotes = notes.find((note) => note.title === title)
    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);//sending string data to save in JSON
        console.log(chalk.green.inverse("New note added!!"));
    }
    else
        console.log(chalk.red.inverse("title already used,try again!!"));
}
// --REMOVING NOTES USING TITLE--
const removeNotes = (title) => {
    const notes = loadNotes();
    //saving new notesexcept the one which needs to be deleted
    const notesToKeep = notes.filter(function (note) {
        return note.title != title;
    })
    saveNotes(notesToKeep);
    if (notes.length > notesToKeep.length)
        console.log(chalk.green.inverse("note removed!!"));
    else
        console.log(chalk.red.inverse("Nothing to remove!!"));
}
// --LISTING ALL NOTES--
const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.magentaBright.inverse("--Your Notes--"));
    //  console.log(notes);
    notes.forEach(element => {
        console.log(element.title + " : " + element.body); //logging only titles of notes
    });
}
// --READING NOTES USING TITLE--
const readNotes = (title) => {
    const notes = loadNotes();
    const findNote = notes.find((note) => note.title === title)
    if (findNote) {
        console.log(chalk.magentaBright.inverse("--Note found!!--"));
        console.log(chalk.yellow.inverse(findNote.title + " : " + findNote.body));
    }
    else
        console.log(chalk.red.inverse("note not found!!"));
}
//-- FUNCTION TO CREATE JSON DATA NOTES
const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
}
// FUNCTION TO RESTORE PREVIOUS NOTES TO AVOID OVERWRITE
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')//reading file
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);//return the parsed data[JSON to OBJ]
    } catch (error) {
        return [];  //if file doenot exists,return null array
    }
}


module.exports = {
    removeNotes: removeNotes,
    addNotes: addNotes,
    listNotes: listNotes,
    readNotes: readNotes
}