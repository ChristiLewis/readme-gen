// TODO: Include packages needed for this application
//ADD NPM
const inquirer = require('inquirer');
const fs = require('fs');
const markdown = require('./utils/generateMarkdown.js');
///THIS IS A DESTINATION FILE TO RECEIVE THE LOCAL MODULE PAGE-TEMPLATE I HAD THE COMMENTED OUT BELOW- MY CLASSMATE KARLTUN MORENO https://github.com/karltunmoreno CONTRIBUTED HERE AND INIT
// const generatePage = require('./src/page-template.js');

const generatePage = require('./src/page-template.js');


// TODO: Create an array of questions for user input
//INSTEAD OF COLLECTING THE NEW OBJECTS IN A NEW ARRAY THAT IS INSIDE THE PROMPT METHOD, WE DIRECTLY USE QUESTIONS TO MAKE AN ARRAY OF ANSWERS.

const questions = [
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of your project or title for this README.md our Genie is generating? (Required)',
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
            //ANSWER FOR README-GENIE = As a CLI (Command Line Interface) tool, README-GEN-IE walks the user through their project to organize and communicate to the community what they planned, completed, and wish to develop further.
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
                '\ [Overview](#overview)',
                '\_ [Table of Contents](#contents)\_',
                '\ [Description](#description)',
                '-[] [Installation](#installation)',
                '-[] [Notes](#notes)',
                '* [Usage](#usage)',
                '* [Credits](#credits)',
                '1) [License](#license)',
                '2) [Badges](#badges)',
                '[Features](#features)',
                '[Contribute](#contribute)',
                '    [Tests](#tests)',
            ]
        },
        {
            type: 'confirm',
            name: 'description',
            message: 'Would you like to answer some questions about your project for a "description" section? ',
            //ANSWER FOR README-GENIE = OK
        },              
        {
            type: 'input',
            name: 'descriptionQ1',
            message: 'What inspired and motivated you to start this development project? (Required)',
            //ANSWER FOR README-GENIE = DRY - DON'T REPEAT YOURSELF MEANS TO ME WHENEVER YOU REFER TO AN OLD EXAMPLE TO MAKE A NEW ONE, YOU CAN WRITE CODE FOR THAT INSTEAD. THEN, YOU CAN CONCENTRATE ON NEW CONTENT.
            when:(answers) => answers.description === true,
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
            when:(answers) => answers.description === true,
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
            when:(answers) => answers.description === true,
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
            when:(answers) => answers.description === true,
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
            when:(answers) => answers.description === true,
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
            name: 'node',
            message: 'Please confirm your project does not require node.js.',
            validate: nodeInput => {
                if (!nodeInput) {
                    return null;
                } else {
                    console.log('In order to run this node application, you will need node.js. If you do not have it yet, please visit https://nodejs.org/en/download to download the latest node. js LTS Version that includes npm.');
                    
                }
            }
        },
        {
            type: 'checkbox',
            name: 'nodeInput',
            message: 'Please check all the software and command line inputs that are required to use and install your node.js software. To use the README-GENIE: git clone git@github.com:ChristiLewis/readme-gen.git ',
            when:(answers) => answers.node !== true,
            validate: nodeInputCheckbox => {
                if (nodeInputCheckbox) {
                    return true;
                } else {
                    console.log('You need to check some boxes!');
                    return false;
                }
            },
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
            name: 'notes',
            message: 'Add any additional notes or installation requirements here:',
            //ANSWER FOR README-GENIE = TO MAKE A NEW README.MD FILE IN THE FUTURE, FOLLOW THE STEPS TO REINSTALL THE MODULES AGAIN AND RUN THE README-GENIE AGAIN.  TO MAKE MINOR EDITS, OPEN YOUR EXISTING README.MD FILE AND MAKE CHANGES DIRECTLY. THIS SECTION ALLOWS ANY ONE TO PROVIDE INSTALLATION INSTRUCTIONS WHEN THEY ARE NOT RUNNING A NODE.JS APP.
            when:(answers) => answers.node === true,
            validate: notesInput => {
                if (notesInput) {
                    return true;
                } else {
                    console.log('You need to at least say, Thank you for taking the time to look at my project!');
                    return false;
                }
            },
            default: null
        },
        {
            type: 'input',
            name: 'media',
            message: 'What is the file name and extension of the media you want to post? (Required)',
            validate: mediaInput => {
                if (mediaInput) {
                    return true;
                } else {
                    console.log('You need to enter a visualization of your project!');
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
            name:'confirmAddUsage',
            message: 'Would you like to enter another example?',
            default: false
        },
        {
            type: 'input',
            name: 'credits',
            message: 'Who or what organization helped you build this project?',
            validate: creditsInput => {
                if (creditsInput) {
                    return true;
                } else {
                    console.log('You can put yourself if no one else has helped!');
                    return false;
                }
            }
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
        {
            type: 'confirm',
            name: 'license',
            message: 'Please confirm your organization has, or your intent is to obtain an MIT open source license for this project. (Recommended)',

            validate: licenseConfirm => {
                if (licenseConfirm) {
                    console.log('This project is indirectly licensed and/or intends to be licensed with one of the following:> MIT license \ Apache License 2.0, or \ GNU General Public License v3.0>')
                    return true;
                } else {
                    console.log('To learn more, please visit [GitHub](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository)');
                    return false;
                }
            }            
        },
        {
            type: 'confirm',
            name: 'badges',
            message: 'Do you want to add any badges that your project may have?',
            validate: badgesConfirm => {
                if (badgesConfirm === true) {
                    renderLicenseBadge(licenseConfirm)
                    return true;
                } else {
                    console.log('Coming Soon!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'features',
            message: 'Please describe any special features your project may have.',
            validate: featuresInput => {
                if (featuresInput) {
                    return true;
                } else {
                    console.log('Coming Soon!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name:'contribute',
            message: 'Would you like to invite contributions to your project?', 
            validate: contributeConfirm => {
                if (contributeConfirm) {
                    console.log('* Any recommendations?  Please see [contributorCovenant](https://www.contributor-covenant.org)')
                    return true;
                } else {
                    console.log('We will be open to contributors soon! See the link below to send us an email and we will get back to you ASAP.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Please describe any tests that your project may have used or will use in the future.',
            validate: featuresInput => {
                if (featuresInput) {
                    return true;
                } else {
                    console.log('Coming Soon!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'contact',
            message: 'If it is ok for users to contact you privately about your project, please provide an email address here.',
            validate: contactInput => {
                if (contactInput) {
                    console.log('Please feel free to email [Contact me]('+ contactInput + ')Thank you for your consideration.  As the UM Bootcamp says, "Happy Coding!"');
                    return true;
                } else {
                    console.log('Coming Soon!');
                    return false;
                }
            }
        },
    ];
;
//promptUser().then(answers => console.log(answers));
const promptUsage = readmeData => {
    console.log(`
=======================
Add a New Usage Example
=======================
`);
    if (!readmeData.examples) {
        readmeData.examples = [];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'media',
            message: 'What is the file name and extension of the media you want to post? (Required)',
            validate: mediaInput => {
                if (mediaInput) {
                    return true;
                } else {
                    console.log('You need to enter a visualization of your project!');
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
            name:'confirmAddUsage',
            message: 'Would you like to enter another example?',
            default: false
        },
        {
            type: 'input',
            name: 'credits',
            message: 'Who or what organization helped you build this project?',
            validate: creditsInput => {
                if (creditsInput) {
                    return true;
                } else {
                    console.log('You can put yourself if no one else has helped!');
                    return false;
                }
            }
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
        {
            type: 'confirm',
            name: 'license',
            message: 'Please confirm your organization has, or your intent is to obtain an MIT open source license for this project. (Recommended)',

            validate: licenseConfirm => {
                if (licenseConfirm) {
                    console.log('This project is indirectly licensed and/or intends to be licensed with one of the following:> MIT license \ Apache License 2.0, or \ GNU General Public License v3.0>')
                    return true;
                } else {
                    console.log('To learn more, please visit [GitHub](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository)');
                    return false;
                }
            }            
        },
        {
            type: 'confirm',
            name: 'badges',
            message: 'Do you want to add any badges that ' + titleInput +' may have?',
            validate: badgesConfirm => {
                if (badgesConfirm === true) {
                    renderLicenseBadge(licenseConfirm)
                    return true;
                } else {
                    console.log('Coming Soon!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'features',
            message: 'Please describe any special features ' + titleInput +' may have.',
            validate: featuresInput => {
                if (featuresInput) {
                    return true;
                } else {
                    console.log('Coming Soon!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name:'contribute',
            message: 'Would you like to invite contributions to ' + titleInput + '?', 
            validate: contributeConfirm => {
                if (contributeConfirm) {
                    console.log('* Any recommendations?  Please see [contributorCovenant](https://www.contributor-covenant.org)')
                    return true;
                } else {
                    console.log('We will be open to contributors soon! See the link below to send us an email and we will get back to you ASAP.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Please describe any tests that ' + titleInput +' may have used or will use in the future.',
            validate: featuresInput => {
                if (featuresInput) {
                    return true;
                } else {
                    console.log('Coming Soon!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'contact',
            message: 'If it is ok for users to contact you privately about ' + titleInput +' please provide it here.',
            validate: contactInput => {
                if (contactInput) {
                    console.log('Please feel free to email [' + titleInput + ']('+ contactInput + ')Thank you for your consideration.  As the UM Bootcamp says, "Happy Coding!"');
                    return true;
                } else {
                    console.log('Coming Soon!');
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
function writeToFile(fileName, data) {
    console.log(writeToFile);
    return fs.writeFile(fileName, data)
}
//CLASSMATE KARLTUN MORENO https://github.com/karltunmoreno CONTRIBUTED 
// TODO: Create a function to initialize app
function init() { 
    console.log(markdown);
    inquirer.prompt(questions).then((answers) => {
        console.log(JSON.stringify(answers, null, '  '));
// CLASSMATE KARLTON MORENO SUGGESTED BELOW
    // inquirer.prompt(questions).then((answers) => {

// CLASSMATE KARLTON MORENO SUGGESTED BELOW INSTEAD OF THE ABOVE
        fs.writeFileSync("README.md", markdown({...answers}))
    })
}

//A TEST THAT WORKED ONCE THE LOCAL MODULE PAGE-TEMPLATE WAS PRESENT
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

// Function call to initialize app
init();