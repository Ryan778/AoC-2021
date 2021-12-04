const fs = require('fs'); 
let input = fs.readFileSync('1.txt', 'utf-8'); 
let output = input;

output = output.split('\n').map(r => parseInt(r)); 

let count = -1, prev = -1; 
for (let i = 2; i < output.length; i++) {
  let sum = output[i] + output[i-1] + output[i-2]; 
  if (sum > prev) {
    count ++; 
  }
  prev = sum; 
}

console.log(count); 

// console.log(output); 