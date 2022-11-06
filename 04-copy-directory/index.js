const fsPromises = require('fs/promises');
const path = require('path');

const pathToDir = path.join(__dirname, 'files');
const pathToCopyDir = path.join(__dirname, 'files-copy');

const copyDir = async () => {

  await fsPromises.rm(pathToCopyDir, { recursive: true, force: true }, (err) => {
    if (err){
      throw err;
    }
  });

  await fsPromises.mkdir(pathToCopyDir, { recursive: true }, (err) => {
    if (err){
      throw err;
    }
  });

  fsPromises.readdir(pathToDir, {withFileTypes: true})
    .then( files => {
      files.forEach( file => {
        fsPromises.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name));
      });
    });
  console.log('\nThe files are copied to the folder.\n');
};

copyDir();