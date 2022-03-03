// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) { }

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) { }

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) { }

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.titleInput}
  
  ## ${data.table - of - contents}

  ### ${data.description}
  * ${data.descriptionQ1}
  * ${data.descriptionQ2}
  * ${data.descriptionQ3}
  * ${data.descriptionQ4}
  * ${data.descriptionQ5}

  
   

`;
}

module.exports = generateMarkdown;
