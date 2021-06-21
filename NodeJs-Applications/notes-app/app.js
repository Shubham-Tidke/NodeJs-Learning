const yargs = require('yargs');
const notes = require('./notes');
const validator = require('validator');
const chalk = require('chalk');

//command to add a note
yargs.command({
    command: 'add',
    describe: 'Adding note',
    builder: {           //to get the title and body[parameters] of note!
        title: {
            describe: 'title of notes!',
            demandOption: true, //compulsory asking for title
            type: 'string'
        },
        body: {
            describe: 'body of notes!!',
            demandOption: true,
            type: 'string'
        }
    },
    //handler to implement the command logic
    handler: function (argv) {  //argv used to access command line input provided by user
        notes.addNotes(argv.title, argv.body)
    }
});
//command to remove a note
yargs.command({
    command: 'remove',
    describe: 'removing note!!',
    builder: {           //to get the title and body[parameters] of note!
        title: {
            demandOption: true, //compulsory asking for title
            type: 'string'
        },
        body: {
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNotes(argv.title);
    }

});
yargs.command({
    command: 'list',
    describe: 'listing notes',
    handler: function () {
        notes.listNotes();
    }
})
yargs.command({
    command: 'read',
    describe: 'describe the note!!',
    builder: {
        title: {
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.readNotes(argv.title);
    }
})
yargs.parse();

