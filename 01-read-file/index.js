const fs = require('fs');
const path = require('path');

const pathToReadingFile = path.join(__dirname, 'text.txt' );

const readableStream = fs.createReadStream(pathToReadingFile, 'utf8');

readableStream.on('data', (chunk) => console.log(chunk));