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
    const { examples, description, ...header } = templateData;

    return `
    # Title

    ## Description

    ## Installation

    ## Usage

    ## Credits

    ## License

    ## Badges

    ## Features

    ${generateDescription(description)}
    ${generateUsage(examples)}
    ${new Date().getFullYear()} by ${header.name}
   
    `;
};

  //module.exports = generatePage;