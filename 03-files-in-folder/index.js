const fs = require('fs/promises');
const path = require('path');
const {stat} = require('fs');

const pathToDir = path.join(__dirname, 'secret-folder');

fs.readdir(pathToDir, {withFileTypes: true})
  .then( files => {
    files.forEach( file => {

      if ( file.isFile() ){

        const pathToReadingFile = path.join(__dirname, 'secret-folder', file.name);

        stat(pathToReadingFile, (err, stats) => {
          if (err){
            throw err;
          }
          const fileName = file.name.split('.').slice(0, 1).join('');
          const fileExtname = path.extname(pathToReadingFile).slice(1);
          const fileSize = (stats.size / 1024).toFixed(3);
          console.log(`${fileName} - ${fileExtname} - ${fileSize}kb`);
        });
      }
    });
  });

