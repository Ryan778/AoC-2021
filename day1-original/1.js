const fs = require('fs'); 
let input = fs.readFileSync('1.txt', 'utf-8'); 
let output = input;

output = output.split('\n').map(r => parseInt(r)); 

let count = -1, prev = -1; 
for (let i = 0; i < output.length; i++) {
  if (output[i] > prev) {
    count ++; 
  }
  prev = output[i]; 
}

console.log(count); 