const inquirer = require('inquirer');
const fs = require('fs');


const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter the text of your logo.(only three letters)',
        validate: (input) => {
            if (input.length !== 3) {
                return 'Text must be three characters long';
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter the text color.(e.g., red, #FF0000)',
        default: '#000000'
    },
    {
        type: 'list',
        name: 'shape',
        message: 'What shape do you want your logo to be?',
        choices: ['Circle', 'Square', 'Triangle']
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the shape color.(e.g., red, #FF0000)',
        default: '#000000'
    },
];

function init() {
    inquirer.prompt(questions).then(answers => {
        generateLogo(answers);
    });
}

function generateLogo({text, textColor, shape, shapeColor}) {
    const width = 300;
    const height = 200;
    let logoShape = '';

    switch (shape) {
        case 'Circle' :
            logoShape = `
            <circle cx="${width / 2}" cy="${height / 2}" r="60" fill="${shapeColor}" />`
            break;
        case 'Square':
            logoShape = `
            <rect x="${(width - 120) / 2}" y="${(height - 120) / 2}" width="120" height="120" fill="${shapeColor}" />`
            break;
        case 'Triangle':
            logoShape = `
            <polygon points="${width / 2},${(height - 100) / 2} ${(width - 100) / 2},${(height + 100) / 2} ${(width + 100) / 2},${(height + 100) / 2}" fill="${shapeColor}" />`
            break;
    }

    const svgContent =  `
    <svg width="${width}" height="${height}" xmlns="https://www.w3.org/2000/svg">
    ${logoShape}
    <text x="${width / 2}" y="${height / 2}" font-size="20" text-anchor="middle" fill="${textColor}" dy=".3em">${text}</text>
    </svg>
    `;

    fs.writeFile('logo.svg', svgContent, (err) => {
        if (err) throw err;
        console.log('Generated logo.svg');
      });
};

init()
