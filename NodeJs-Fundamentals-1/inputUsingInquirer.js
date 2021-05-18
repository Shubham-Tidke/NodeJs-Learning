const inquirer = require("inquirer");
inquirer
    .prompt([
        {
            type: "list",
            name: "Inputprovided using console",
            message: "Handling input,choose one of following",
            choices: ["first", "second", "third"]
        }
    ]).then(answer => {
        console.log(answer);
    })