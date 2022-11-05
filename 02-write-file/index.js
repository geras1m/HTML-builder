const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');

const pathToWritingFile = path.join(__dirname, 'text.txt' );

const writeableStream = fs.createWriteStream(pathToWritingFile, 'utf8');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\nHi! enter some text, please!\n');

rl.on('line', (input) =>{
  if (input === 'exit'){
    rl.output.write('Program exit! Bye :)');
    rl.close();
  }else{
    writeableStream.write(`${input}\n`);
  }
});

rl.on('SIGINT', ()=> {
  rl.output.write('Program exit! Bye :)');
  rl.close();
});

