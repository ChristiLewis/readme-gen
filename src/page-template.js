//ENTIRE description SECTION IN OR OUT
const generateDescription = descriptionText => {
    if (!descriptionText) {
        return '';
    }

    return `
    # Description
      ${descriptionText}
    `;
};

const generateUsage = examplesArr => {
    return `
    # Usage
        ${examplesArr
            .filter(({ feature }) => feature)
            .map(({ name, description, tableOfContents, link }) => {
                return `
            ${name}
            ${description}
            ${tableOfContents.join(', ')}
            ${link}
            `;
            })
            .join('')}
  
        ${examplesArr
            .filter(({ feature }) => !feature)
            .map(({ name, link }) => {
                return `
            ${name}
            ${link}   
          `;
            })
            .join('')}     
    `;
};

//MULTILINE TEMPLATE LITERALS - USE CURLY BRACKS AND RETURN with a BACKTICK CLOSE WITH BACKTICK SEMICOLON
module.exports = templateData => {
    //console.log(templateData);
    //DESTRUCTURE examples AND description DATA FROM TEMPLATEDATA BASED ON THEIR PROPERTY KEY NAMES
    const { title, overview, ...header } = templateData;

    return `
    # Title

    ## Description

    ## Installation

    ## Usage
    * JavaScript developers worldwide.

![quizmo logo](assets/images/screenshot-quizmo.png)
\ [quizmo](https://christilewis.github.io/quizmo/)

    ## Credits
    * This is Christi Lewis' project assignment submitted for review [UM's Coding Bootcamp](https://bootcamp.miami.edu/coding/)

    ## License
    * Contents are credited as inspired by the bootcamp mentioned above. UM Coding Bootcamp content it primarily MIT license, open source.

    ## Badges
    * There are no badges generated at this time. For more information: [shields.io](https://shields.io/) 

    ## Features

    * Node.js README.md wizard

    ## Contribute
    * Any recommendations?  Please see [contributorCovenant](https://www.contributor-covenant.org)

    ## Tests
    * There are no tests at this time, we are open to suggestions.

    ${generateDescription(description)}
    ${generateUsage(examples)}
    ${new Date().getFullYear()} by ${header.name}
   
    `;
};

  //module.exports = generatePage;