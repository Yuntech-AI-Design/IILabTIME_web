const fs = require('fs');
const path = require('path');

const currentDirectory = __dirname; // Gets the directory of the current script
const scriptFilePath = __filename; // Gets the full path of the current script file
const outputFilePath = path.join(currentDirectory, 'checklist.md'); // Define the output file path

let outputLines = []; // Array to store output lines
const existingCheckedItems = new Set(); // Set to store names of previously checked items

// --- Read existing checklist to preserve checked state ---
try {
    if (fs.existsSync(outputFilePath)) {
        const existingContent = fs.readFileSync(outputFilePath, 'utf8');
        const lines = existingContent.split('\n');
        // Regex to find checked items: captures the filename after '[x] '
        const checkedItemRegex = /\[x\] (.*\.md)$/;
        lines.forEach(line => {
            const match = line.trim().match(checkedItemRegex);
            if (match && match[1]) {
                // Add the filename (e.g., "myFile.md") to the set
                existingCheckedItems.add(match[1]);
            }
        });
        console.log('Found existing checked items:', existingCheckedItems);
    }
} catch (readErr) {
    console.error(`Error reading existing checklist file ${outputFilePath}:`, readErr);
    // Continue without preserving checks if reading fails
}
// --- End reading existing checklist ---

outputLines.push(`## Checklist Tree for .md files.\n`);
outputLines.push("```");

function findMdFiles(dir, prefix = '') {
    let items;
    try {
        items = fs.readdirSync(dir).sort((a, b) => {
            // Sort items: directories first, then files, alphabetically
            const pathA = path.join(dir, a);
            const pathB = path.join(dir, b);
            try {
                const statA = fs.statSync(pathA);
                const statB = fs.statSync(pathB);
                if (statA.isDirectory() && !statB.isDirectory()) return -1;
                if (!statA.isDirectory() && statB.isDirectory()) return 1;
                return a.localeCompare(b); // Alphabetical sort for items of the same type
            } catch (statErr) {
                console.error(`Error getting stats during sort for ${pathA} or ${pathB}:`, statErr);
                return 0;
            }
        });
    } catch (readErr) {
        console.error(`Error reading directory ${dir}:`, readErr);
        return; // Stop processing this directory if read fails
    }

    // Filter out the output file itself before determining the last item
    const validItems = items.filter(item => path.join(dir, item) !== outputFilePath && path.join(dir, item) !== scriptFilePath);


    validItems.forEach((item, index) => {
        const itemPath = path.join(dir, item);
        const isLast = index === validItems.length - 1;
        const connector = isLast ? '└── ' : '├── ';
        const childPrefix = prefix + (isLast ? '    ' : '│   ');

        try {
            const stats = fs.statSync(itemPath);

            if (stats.isDirectory()) {
                // Add directory name with connector to output
                outputLines.push(`${prefix}${connector}${item}/`);
                // Recursively search in subdirectories
                findMdFiles(itemPath, childPrefix);
            } else if (stats.isFile() && path.extname(item) === '.md') {
                 // Determine checkbox state based on existing checked items
                const checkbox = existingCheckedItems.has(item) ? '[x]' : '[ ]';
                // Add file with checkbox, connector, and indentation to output
                outputLines.push(`${prefix}${connector}${checkbox} ${item}`);
            }
        } catch (statErr) {
            // Log error for specific item but continue with others
            console.error(`Error getting stats for ${itemPath}:`, statErr);
            // Optionally add an error marker in the tree to the output
            outputLines.push(`${prefix}${connector}[!] Error accessing ${item}`);
        }
    });
}

// Start the search from the current directory
findMdFiles(currentDirectory);

outputLines.push("```");
outputLines.push('\n*Checklist generated automatically.*');

// Write the collected output lines to the markdown file
try {
    fs.writeFileSync(outputFilePath, outputLines.join('\n'));
    console.log(`Checklist successfully updated and saved to ${outputFilePath}`);
} catch (writeErr) {
    console.error(`Error writing checklist file ${outputFilePath}:`, writeErr);
}
