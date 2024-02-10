const fs = require('fs');
const path = require('path');

// Check if the components directory is provided as a command-line argument
const componentsFolder = process.argv[2] || './components/ui/';

const importsFile = 'ui-imports.tsx';

// Get a list of all component files in the folder
const componentFiles = fs.readdirSync(componentsFolder)
  .filter(file => file.endsWith('.tsx') && file !== importsFile);

if (componentFiles.length === 0) {
  console.error(`Error: No component files found in ${componentsFolder}. Make sure the ui-imports.tsx file exists.`);
  process.exit(1);
}

// Generate import statements for each component
const importStatements = componentFiles.map(file => {
  const componentName = path.basename(file, '.tsx');
  const capitalizedComponentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  return `import { ${capitalizedComponentName} } from './${componentName}';`;
});

// Create the export statement
const exportStatement = `export {\n  ${componentFiles.map(file => {
  const componentName = path.basename(file, '.tsx');
  const capitalizedComponentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  return capitalizedComponentName;
}).join(',\n  ')}\n};`;

// Combine import statements and export statement
const content = `${importStatements.join('\n')}\n\n${exportStatement}\n`;

// Write the content to the ui-imports.tsx file
fs.writeFileSync(path.join(componentsFolder, importsFile), content);

console.log(`Imports updated successfully in ${path.join(componentsFolder, importsFile)}.`);
