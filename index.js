// TODO: Include packages needed for this application
//ADD NPM
const inquirer = require('inquirer');
const fs = require('fs');
const { writeFile, copyFile } = require('./utils/generateMarkdown.js');
///THIS IS A DESTINATION FILE TO RECEIVE THE LOCAL MODULE PAGE-TEMPLATE
const generatePage = require('./src/page-template.js');


// TODO: Create an array of questions for user input

const questions = [
        {
            type: 'input',
            name: 'title',
            message: 'How should we title your README.md file? (Required)',
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
            type: 'input',
            name: 'overview',
            message: 'Now provide a brief summary of the project. (Required)',
            //ANSWER FOR README-GENIE = AS A CLI(COMMAND LINE INTERFACE) TOOL, README-GENIE WALKS THE USER THROUGH THEIR PROJECT TO ORGANIZE AND COMMUNICATE TO THE COMMUNITY WHAT THEY PLANNED, COMPLETED, AND WISH TO DEVELOP FURTHER.
            validate: overviewInput => {
                if (overviewInput) {
                    return true;
                } else {
                    console.log('You need to summarize the project as an introduction and overview!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'contents',
            message: 'Please check all headings that apply for your Table of Contents.',
            //ANSWER FOR README-GENIE = SELECT ALL
            choices: [
                '[Title](#title)',
                '[Overview](#overview)',
                '[Description](#description)',
                '[Installation](#installation)',
                'Usage',
                'Credits',
                'License',
                'Badges',
                'Features',
                'Contribute',
                'Tests'
            ]
        },
        {
            type: 'confirm',
            name: 'confirmDescription',
            message: 'Would you like to answer some questions about your project for a "description" section? ',
            //ANSWER FOR README-GENIE = OK
        },              
        {
            type: 'input',
            name: 'descriptionQ1',
            message: 'What inspired and motivated you to start this development project? (Required)',
            //ANSWER FOR README-GENIE = DRY - DON'T REPEAT YOURSELF MEANS TO ME WHENEVER YOU REFER TO AN OLD EXAMPLE TO MAKE A NEW ONE, YOU CAN WRITE CODE FOR THAT INSTEAD. THEN, YOU CAN CONCENTRATE ON NEW CONTENT.
            when:(answers) => answers.confirmDescription === true,
            validate: descriptionQ1Input => {
                if (descriptionQ1Input) {
                    return true;
                } else {
                    console.log('You need to answer the question!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'descriptionQ2',
            message: 'Why did you build this project? (Required)',
            //ANSWER FOR README-GENIE = AFTER SPENDING A FEW HOURS ON A DETAILED README FILE, IT SEEMED WORTH IT TO AUTOMATE IT SO THAT THE MOST DETAILED README WOULD NOT TAKE MORE THAN AN HOUR TO GENERATE.
            when:(answers) => answers.confirmDescription === true,
            validate: descriptionQ2Input => {
                if (descriptionQ2Input) {
                    return true;
                } else {
                    console.log('You need to answer the question!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'descriptionQ3',
            message: 'What problem does it solve? (Required)',
            //ANSWER FOR README-GENIE = README FILES ARE TEDIOUS, SO OFTEN DONE WITH THE BARE BONE MINIMUM. THE GENIE KEEPS THE ORGANIZATION AND COMMUNICATION BENEFIT OF PRODUCING A DETAILED README FILE IN A FRACTION OF THE TIME.
            when:(answers) => answers.confirmDescription === true,
            validate: descriptionQ3Input => {
                if (descriptionQ3Input) {
                    return true;
                } else {
                    console.log('You need to answer the question!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'descriptionQ4',
            message: 'What did you learn? (Required)',
            //ANSWER FOR README-GENIE = I LEARNED EVERYONE SEEMS TO PROCRASTINATE THEIR README FILE, SO A CLI TOOL THAT HELPS TO QUICKLY SPECIFY A HIGH QUALITY PRESENTATION IS A WIN-WIN.
            when:(answers) => answers.confirmDescription === true,
            validate: descriptionQ4Input => {
                if (descriptionQ4Input) {
                    return true;
                } else {
                    console.log('You need to answer the question!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'descriptionQ5',
            message: 'What makes your project standout? (Required)',
            //ANSWER FOR README-GENIE = THE BEST DETAIL OF THIS CLI TOOL IS THAT IF YOU ARE REALLY IN A BIND, YOU CAN DEFER THE MOST TIME CONSUMING DESCRIPTION PART THAT YOU ARE READING RIGHT NOW, AND TEND TO IT AT A LATER DATE. SO IT HELPS REDUCE PROCRASTINATING A TEDIOUS CHORE AND YET ACCEPTS DIFFERENT LEVELS OF DETAIL TO BE AS USER FRIENDLY AS POSSIBLE.
            when:(answers) => answers.confirmDescription === true,
            validate: descriptionQ5Input => {
                if (descriptionQ5Input) {
                    return true;
                } else {
                    console.log('You need to answer the question!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'installation',
            message: 'Please confirm you already have node.js installed on your computer.',
            validate: installationInput => {
                if (installationInput) {
                    return true;
                } else {
                    console.log('Please visit https://nodejs.org/en/download to download the latest node. js LTS Version that includes npm.');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'installation',
            message: 'Please check all the software and command line inputs that are required to use and install your node.js software. To use the README-GENIE: git clone git@github.com:ChristiLewis/readme-gen.git ',
            //ANSWER FOR README-GENIE = SELECT ALL
            choices: [
                'In your root directory clone the <project directory name> repository: git clone git@github.com:<userName>/<project directory name>.git ',
                'Make sure you are in the root directory of the project you just cloned: cd <project directory name>',
                'Check your version of node.js: node -v',
                'Check your version of npm included in node.js: npm -v',
                'Install a node package manager or npm named inquirer: npm i inquirer',
                'Install another npm named file system or fs: npm i fs',
                'Initiate npm: npm init -y',
                'Verify your npm packages are installed: ls node_modules',
                'Add a .gitignore file to spare your GitHub repository uploading all npm modules with each commit: touch .gitignore',
                'Open the .gitignore file and add on line 1: node_modules/',
                'On line 2 .gitignore file add for mac users: .DS_Store/',
                'From the command line, run the node.js app: node index.js',
                'Follow the command line instructions, and after you are happy with your result, uninstall the npm packages to not clog your computer: npm uninstall inquirer',
                'Unistall the fs package too: npm uninstall fs',
                'See below for additional or alternate installation instructions.'
            ]
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Add any additional installation requirements not included in the above checklist here:',
            //ANSWER FOR README-GENIE = TO MAKE A NEW README.MD FILE IN THE FUTURE, FOLLOW THE STEPS TO REINSTALL THE MODULES AGAIN AND RUN THE README-GENIE AGAIN.  TO MAKE MINOR EDITS, OPEN YOUR EXISTING README.MD FILE AND MAKE CHANGES DIRECTLY. THIS SECTION ALLOWS ANY ONE TO PROVIDE INSTALLATION INSTRUCTIONS WHEN THEY ARE NOT RUNNING A NODE.JS APP.
            default: null
        },
    ];
;

// //promptUser().then(answers => console.log(answers));
// const promptUsage = readmeData => {
//     console.log(`
// =======================
// Add a New Usage Example
// =======================
// `);
//     if (!readmeData.examples) {
//         readmeData.examples = [];
//     }
//     return inquirer.prompt([
//         {
//             type: 'input',
//             name: 'title',
//             message: 'What is the title of your project? (Required)',
//             validate: titleInput => {
//                 if (titleInput) {
//                     return true;
//                 } else {
//                     console.log('You need to enter your project title!');
//                     return false;
//                 }
//             }
//         },


//         {
//             type: 'input',
//             name: 'link',
//             message: 'Enter the GitHub link to your project. (Required)',
//             validate: linkInput => {
//                 if (linkInput) {
//                     return true;
//                 } else {
//                     console.log('You need to enter the GitHub link to your project!');
//                     return false;
//                 }
//             }
//         },
//         {
//             type: 'confirm',
//             name: 'feature',
//             message: 'Would you like to feature this example?',
//             default: false
//         },
//         {
//             type: 'confirm',
//             name: 'confirmAddUsage',
//             message: 'Would you like to enter another example?',
//             default: false
//         },
//         {
//             type: 'input',
//             name: 'github',
//             message: 'What is your GitHub Username? (Required)',
//             validate: githubInput => {
//                 if (githubInput) {
//                     return true;
//                 } else {
//                     console.log('Please enter your GitHub username!');
//                     return false;
//                 }
//             }
//         },
//     ])

//     .then(usageData => {
//         readmeData.examples.push(usageData);
//         if (usageData.confirmAddUsage) {
//             return promptUsage(readmeData);
//         } else {
//             return readmeData;
//         }
//     });
// };


// // // TODO: Create a function to write README file
// // function writeToFile(fileName, data) { }

// promptUser()
//     .then(promptUsage)
//     .then(readmeData => {
//         return generatePage(readmeData);
//         //REFACTORED USING GENERATE-SITE.JS        
//     })
//     .then(pageHTML => {
//         return writeFile(pageHTML);
//     })
//     .then(writeFileResponse => {
//         console.log(writeFileResponse);
//         return copyFile();
//     })
//     .then(copyFileResponse => {
//         console.log(copyFileResponse);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// // TODO: Create a function to initialize app
// function init() { }

// // Function call to initialize app
// init();

//A TEST THAT WORKS ONCE THE LOCAL MODULE PAGE-TEMPLATE IS PRESENT
// fs.writeFile('README.md',
//     `# ${data.titleInput}
  
//     ## ${data.table - of - contents}

//     ### ${data.description}
//     * ${data.descriptionQ1}
//     * ${data.descriptionQ2}
//     * ${data.descriptionQ3}
//     * ${data.descriptionQ4}
//     * ${data.descriptionQ5}
//     RE`,

//     (err) => {
//         //PREP FOR ERROR
//         if (err) {
//             console.error(err)
//             return
//         }
//         //MESSAGE FOR SUCCESS
//         console.log('Your message has been successfully written to the file.');
//     })
inquirer.prompt(questions).then((answers) => {
    console.log(JSON.stringify(answers, null, '  '));
});