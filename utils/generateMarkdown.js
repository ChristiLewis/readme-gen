// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) { 
  if(!license === true) {
    return '';
  } else {
    return `[license](https://img.shields.io/badge/license ${license} -blue.svg)`;
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) { 
  if(!license === true) {
    return '';
  } else {
    return `[license](https://img.shields.io/badge/license ${license} -blue.svg)`;
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if(!license === true) {
    return '';
  } else {
    return `[license](https://img.shields.io/badge/license ${license} -blue.svg)`;
  }
}
 

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  console.log(data);
  return `
  # Title
  ${data.title}
  
  ## Overview 
  >${data.overview}>

  <!--GO AHEAD AND MANUALLY FIX THIS MARKDOWN FILE SO THE TABLE OF CONTENTS AND THE INSTALLATION NOTES LOOK LIKE A LIST.  I'M TRYING TO SOLVE PRINTING THE CHOICES ARRAY FROM THE INDEX.JS FILE AS AN OBJECT SO IT LOOKS MORE LIKE A LIST- IS IT A PARSE FUNCTION? FOUND https://www.w3schools.com/js/js_json_parse.asp OR IS IT A STRING  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString-->

  ## Contents
  ${data.contents}

  ## Description
  <!--${data.confirmDescription} hidden class-->
  * ${data.descriptionQ1}
  * ${data.descriptionQ2}
  * ${data.descriptionQ3}
  * ${data.descriptionQ4}
  * ${data.descriptionQ5}

  ## Installation
  <!--* ${data.node}-->
  ${data.nodeInput}
  <!--* ${data.notes}-->

  ## Usage
  * [Preview Image](./${data.media})
  * ${data.link}
  <!--* ${data.feature}-->
  <!--* ${data.confirmAddUsage}-->
  
  ## Credits
  * ${data.credits}
  * ${data.github}

  ## License
  * ${data.license}
  
  ## Badges
  * ${data.badges = renderLicenseBadge(license)}

  ## Features
  * ${data.features}

  ## Contribute
  * ${data.contribute}

  ## Tests
  * ${data.tests}

  ## Contact
  * ${data.contact}
`;
}

module.exports = generateMarkdown;
