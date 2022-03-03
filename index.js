// TODO: Include packages needed for this application
//ADD NPM
const inquirer = require('inquirer');
const fs = require('fs');
const { writeFile, copyFile } = require('./utils/generateMarkdown.js');
///THIS IS A DESTINATION FILE TO RECEIVE THE LOCAL MODULE PAGE-TEMPLATE
const generatePage = require('./src/page-template.js');


// TODO: Create an array of questions for user input

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of your project to be used as a title for your new README.md file? (Required)',
            //ANSWER FOR THIS PROJECT = README-GENIE
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log('Please enter the project title!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'table-of-contents',
            message: 'Please check all headings that apply for your Table of Contents.',
            //ANSWER FOR README-GENIE = SELECT ALL
            choices: ['Description', 'Installation', 'Usage', 'Credits', 'License', 'Badges', 'Features','Contribute', 'Tests']
        },
        {
            type: 'confirm',
            name: 'confirmDescription',
            message: 'Would you like to enter some information about your project for a "description" section? ',
            //ANSWER FOR README-GENIE = OK
            default: true
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide an overview of your project: (Required)',
            //ANSWER FOR README-GENIE = AS A CLI(COMMAND LINE INTERFACE) TOOL, README-GENIE WALKS THE USER THROUGH THEIR PROJECT TO ORGANIZE AND COMMUNICATE TO THE COMMUNITY WHAT THEY PLANNED, COMPLETED, AND WISH TO DEVELOP FURTHER.
            when: ({ confirmdescription }) => confirmdescription
        },
        {
            type: 'input',
            name: 'description-question-1',
            message: 'What inspired and motivated you to start this development project? (Required)',
            //ANSWER FOR README-GENIE = DRY - DON'T REPEAT YOURSELF MEANS TO ME WHENEVER YOU REFER TO AN OLD EXAMPLE TO MAKE A NEW ONE, YOU CAN WRITE CODE FOR THAT INSTEAD. THEN, YOU CAN CONCENTRATE ON NEW CONTENT.
            when: ({ confirmdescription }) => confirmdescription
        },
        {
            type: 'input',
            name: 'description-question-2',
            message: 'Why did you build this project? (Required)',
            //ANSWER FOR README-GENIE = AFTER SPENDING A FEW HOURS ON A DETAILED README FILE, IT SEEMED WORTH IT TO AUTOMATE IT SO THAT THE MOST DETAILED README WOULD NOT TAKE MORE THAN AN HOUR TO GENERATE.
            when: ({ confirmdescription }) => confirmdescription
        },
        {
            type: 'input',
            name: 'description-question-3',
            message: 'What problem does it solve? (Required)',
            //ANSWER FOR README-GENIE = README FILES ARE TEDIOUS, SO OFTEN DONE WITH THE BARE BONE MINIMUM. THE GENIE KEEPS THE ORGANIZATION AND COMMUNICATION BENEFIT OF PRODUCING A DETAILED README FILE IN A FRACTION OF THE TIME.
            when: ({ confirmdescription }) => confirmdescription
        },
        {
            type: 'input',
            name: 'description-question-4',
            message: 'What did you learn? (Required)',
            //ANSWER FOR README-GENIE = I LEARNED EVERYONE SEEMS TO PROCRASTINATE THEIR README FILE, SO A CLI TOOL THAT HELPS TO QUICKLY SPECIFY A HIGH QUALITY PRESENTATION IS A WIN-WIN.
            when: ({ confirmdescription }) => confirmdescription
        },
        {
            type: 'input',
            name: 'description-question-5',
            message: 'What makes your project standout? (Required)',
            //ANSWER FOR README-GENIE = THE BEST DETAIL OF THIS CLI TOOL IS THAT IF YOU ARE REALLY IN A BIND, YOU CAN DEFER THE MOST TIME CONSUMING DESCRIPTION PART THAT YOU ARE READING RIGHT NOW, AND TEND TO IT AT A LATER DATE. SO IT HELPS REDUCE PROCRASTINATING A TEDIOUS CHORE AND YET ACCEPTS DIFFERENT LEVELS OF DETAIL TO BE AS USER FRIENDLY AS POSSIBLE.
            when: ({ confirmdescription }) => confirmdescription
        },
        {
            type: 'confirm',
            name: 'installation',
            message: 'Please confirm you have node.js installed on your computer',
            validate: installationInput => {
                if (installationInput) {
                    return true;
                } else {
                    console.log('Please visit https://nodejs.org/en/download to download the latest node. js LTS Version that includes npm');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'installation',
            message: 'Please check all the software and command line inputs that are required to use and install this README-GENIE.',
            //ANSWER FOR README-GENIE = SELECT ALL
            choices: ['In your root directory clone the README-GENIE repository: git clone git@github.com:ChristiLewis/readme-gen.git', 'Make sure you are in the README-GENIE directory: cd readme-gen','Check your version of node.js: node -v', 'Check your version of npm installed with your node.js: npm -v', 'Install the node.js node package manager or npm called inquirer: npm i inquirer', 'Install another npm called fs that is short for file system: npm i fs','Initiate npm: npm init -y', 'Check to see if your npm packages are installed: ls node_modules', 'Add a .gitignore file to spare your GitHub repository from uploading all the modules with each commit: touch .gitignore', 'Open the .gitignore file and add on line 1: node_modules/', 'On line 2 .gitignore file add the following for apple users: .DS_Store/', 'Go back to the command line and run the node.js app: node index.js', 'Follow the command line instructions, and after you are happy with your result, uninstall the npm packages to not clog your computer: npm uninstall inquirer', 'Unistall the fs package too: npm uninstall fs', , 'See below for more installation instructions.']
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Add any additional installation requirements not included in the above checklist here:',
            //ANSWER FOR README-GENIE = TO MAKE A NEW README.MD FILE IN THE FUTURE, FOLLOW THE STEPS TO REINSTALL THE MODULES AGAIN AND RUN THE README-GENIE AGAIN.  TO MAKE MINOR EDITS, OPEN YOUR EXISTING README.MD FILE AND MAKE CHANGES DIRECTLY. THIS SECTION ALLOWS ANY ONE TO PROVIDE INSTALLATION INSTRUCTIONS WHEN THEY ARE NOT RUNNING A NODE.JS APP.
            default: null
        },
    ]);
};

//promptUser().then(answers => console.log(answers));
const promptUsage = readmeData => {
    console.log(`
====================
Add a New Usage
====================
`);
    if (!readmeData.examples) {
        readmeData.examples = [];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project? (Required)',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log('You need to enter your project title!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('You need to enter a project description!');
                    return false;
                }
            }
        },
  
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('You need to enter the GitHub link to your project!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this example?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddUsage',
            message: 'Would you like to enter another example?',
            default: false
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub Username? (Required)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub username!');
                    return false;
                }
            }
        },
    ])

        .then(usageData => {
            readmeData.examples.push(usageData);
            if (usageData.confirmAddUsage) {
                return promptUsage(readmeData);
            } else {
                return readmeData;
            }
        });
};


// TODO: Create a function to write README file
function writeToFile(fileName, data) { }

promptUser()
    .then(promptUsage)
    .then(readmeData => {
        return generatePage(readmeData);
        //REFACTORED USING GENERATE-SITE.JS        
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });

// TODO: Create a function to initialize app
function init() { }

// Function call to initialize app
init();

//A TEST THAT WORKS ONCE THE LOCAL MODULE PAGE-TEMPLATE IS PRESENT
fs.writeFile('README.md', '# Title', (err) => {
    //PREP FOR ERROR
    if (err) {
        console.error(err)
        return
    }
    //MESSAGE FOR SUCCESS
    console.log('Your message has been successfully written the file.');
})