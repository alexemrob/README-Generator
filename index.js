const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is your project title?"
        },
        {
            type: "input",
            name: "description",
            message: "What is your README description?"
        },
        {
            type: "input",
            name: "usage",
            message: "What is your usage information?"
        },
        {
            type: "input",
            name: "install",
            message: "What are your installation instructions?"
        },
        {
            type: "input",
            name: "contributing",
            message: "Enter your contribution guidelines."
        },
        {
            type: "input",
            name: "tests",
            message: "Enter your tests instructions."
        },
        {
            type: "list",
            name: "license",
            choices: ["MIT", "ISC", "BSD", "Apache", "GPL", "GNU"],
            message: "Choose a license for your README."
        },
        {
            type: "input",
            name: "question1",
            message: "Enter your Github username."
        },
        {
            type: "input",
            name: "question2",
            message: "Enter your email address."
        }
    ]);
}

function generateMD(answers) {
    return `![GitHub license](https://img.shields.io/badge/license-${answers.license}-blue.svg)
# Table of Contents
- [Title](#Title)
- [Description](##Description)
- [Installation](##Installation)
- [Usage](##Usage)
- [License](##License)
- [Contributing](##Contributing)
- [Tests](##Tests)
- [Questions](##Questions)

# Title
${answers.title}
## Description
${answers.description}
## Usage
${answers.usage}
[Click here to view walk-through video](https://github.com/alexemrob/README-Generator/blob/master/assets/HW9recording.webm)
## License
This project is licensed under the ${answers.license} License.
## Installation Instructions
${answers.install}
## Contributing
${answers.contributing}
## Tests
${answers.tests}
## Questions

[Visit my repository!](https://www.github.com/${answers.question1})

For any further questions email me at ${answers.question2}`
}

promptUser()
    .then(function (answers) {
        const mdFile = generateMD(answers);

        return writeFileAsync("README.md", mdFile);
    })
    .then(function () {
        console.log("Successfully wrote to README.md");
    })
    .catch(function (err) {
        console.log(err);
    });
