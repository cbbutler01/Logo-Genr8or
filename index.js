const inquirer = require('inquirer');
const fs = require('fs');


const questions = [

];

inquirer.createPromptModule(questions).then(answers => {
    generateLogo(answers);
});

function generateLogo({text, textColor, shape, shapeColor}) {

};
