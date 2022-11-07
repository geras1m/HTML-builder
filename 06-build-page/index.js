const fsPromises = require('fs/promises');
const path = require('path');
const fs = require('fs');


const pathToProjectDist = path.join(__dirname, 'project-dist');
const pathToAssets = path.join(pathToProjectDist, 'assets');
const pathToDirStyles = path.join(__dirname, 'styles');
const pathToCopyBundleStyle = path.join(__dirname, 'project-dist', 'style.css');
const writeableStream = fs.createWriteStream(pathToCopyBundleStyle, 'utf8');

// create project-dist
fs.mkdir(pathToProjectDist, {recursive: true}, (err) => {
  if (err) {
    throw err;
  }
});

// create assets
fs.mkdir(pathToAssets, {recursive: true}, (err) => {
  if (err) {
    throw err;
  }
});

// clean index.html
/*fs.unlink(path.join(__dirname, 'project-dist', 'index.html'), (err)=>{
  if (err){
    throw err;
  }
});*/

// create index.html
fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '', (err)=>{
  if (err){
    throw err;
  }
});

// STYLE.CSS

const bundleOfStyles = async () => {

  await fsPromises.readdir(pathToDirStyles, {withFileTypes: true})
    .then(files => {
      files.forEach(file => {
        const pathToReadingFile = path.join(__dirname, 'styles', file.name);
        const fileExtname = path.extname(pathToReadingFile);

        if (file.isFile() && fileExtname === '.css') {
          const readableStream = fs.createReadStream(pathToReadingFile, 'utf8');
          readableStream.pipe(writeableStream);

        }
      });

    });
  console.log('\n"style.css" created.');
};


// COPY assets

const copyDir = async () => {

  await fsPromises.readdir(path.join(__dirname, 'assets'), {withFileTypes: true})
    .then( files => {
      files.forEach( file => {
        // console.log(file);
        if (file.isDirectory()){

          fs.mkdir(path.join(pathToAssets, `${file.name}`), {recursive: true}, (err) => {
            if (err) {
              throw err;
            }
          });

          fsPromises.readdir(path.join(__dirname, 'assets', `${file.name}`), {withFileTypes: true})
            .then(internalFiles => {
              internalFiles.forEach( internalFile => {
                // console.log(internalFile);
                fsPromises.copyFile(path.join(__dirname, 'assets', `${file.name}`, internalFile.name), path.join(pathToAssets, `${file.name}`, internalFile.name));
              });
            });
        }
      });
      console.log('\n"assets" is copied to the "project-dist".');
    });
};


// HTML

const bundleOfHtml = async () => {

  const contentTemplateHtml = await fsPromises.readFile(path.join(__dirname, 'template.html'), 'utf8');

  let contentOfComponent = contentTemplateHtml;
  await fsPromises.readdir(path.join(__dirname, 'components'), {withFileTypes: true})
    .then(components => {
      // console.log(components);
      components.forEach(component => {

        if (component.isFile() && path.extname(component.name) === '.html'){

          fs.readFile(path.join(__dirname, 'components', `${component.name}`), 'utf-8', (err, data)=>{
            if (err){
              throw err;
            }
            contentOfComponent = contentOfComponent.replace(`{{${component.name.split('.').slice(0, 1).join('')}}}`, data);
            fsPromises.writeFile(path.join(pathToProjectDist, 'index.html'), contentOfComponent);
          });
        }
      });
    });
  console.log('\n"index.html" created.');
};

bundleOfStyles();
copyDir();
bundleOfHtml();