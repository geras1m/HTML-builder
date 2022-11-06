const fsPromises = require('fs/promises');
const path = require('path');
const fs = require('fs');

const pathToDir = path.join(__dirname, 'styles');
const pathToCopyFile = path.join(__dirname, 'project-dist','bundle.css');
const writeableStream = fs.createWriteStream(pathToCopyFile, 'utf8');

const bundleOfStyles = async () => {

  await fsPromises.readdir(pathToDir, {withFileTypes: true})
    .then( files => {
      files.forEach( file => {
        const pathToReadingFile = path.join(__dirname, 'styles', file.name);
        const fileExtname = path.extname(pathToReadingFile);

        if ( file.isFile() && fileExtname === '.css'){
          const readableStream = fs.createReadStream(pathToReadingFile, 'utf8');
          readableStream.pipe(writeableStream);

        }
      });

    });
  console.log('\n"bundle.css" created.\n');
};

bundleOfStyles();

