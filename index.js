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
            message: "What are your instalation instructions?"
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
        // {
        //     type: "input",
        //     name: "license",
        //     message: "Enter your licence for README."
        // },
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

function generateHTML(answers) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">${answers.title}</h1>
    <h2 class="lead">${answers.description}.</h2>
    <ul class="list-group">
        <h3>Table of Contents</h3>
      <li>Title</li>
      <li>Description</li>
      <li>Installation</li>
      <li>Usage</li>
      <li>License</li>
      <li>Contributing</li>
      <li>Tests</li>
      <li>Questions</li>
    </ul>
  </div>
  <div>
  <p>Usage: ${answers.usage}</p>
  <p>Installation Instructions: ${answers.install}</p>
  <p>Licence: ${answers.license}</p>
  <p>Contributing: ${answers.contributing}</p>
  <p>Tests: ${answers.tests}</p>
  <p>Questions: <a href="https://www.github.com/" + ${answers.question1}>Visit my repository!</a>
  Email me at ${answers.question2}
  </p>

  </div>
</div>
</body>
</html>`;
}

promptUser()
    .then(function (answers) {
        const html = generateHTML(answers);

        return writeFileAsync("index.html", html);
    })
    .then(function () {
        console.log("Successfully wrote to index.html");
    })
    .catch(function (err) {
        console.log(err);
    });
