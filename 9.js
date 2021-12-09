// Day #

const rl = require('./rl-tools'); 
// Important, commonly used functions
const range = rl.array.range; 
const sum = rl.array.sum; 

// First part
exports.silverStar = function(inpArr, inpStr) {
  // console.log(inpArr, inpStr); 
  let input = inpStr.split('\n'); // If each line is an input
  // let input = inpStr.split(','); // If first line is input
  // input = inpArr.map(r => parseInt(r)); // Convert entries to ints
  input = input.map(r => r.split('').map(r => parseInt(r))); 
  // console.log(input)
  // if (inpStr.length > 100) return 1;

  // console.log(input); 
  let lpv = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      let sur = [[-1, 0], [0, -1], [1, 0], [0, 1]]; 
      let lp = true; 
      for (let co of sur) {
        let nc = [i+co[0], j+co[1]]; 
        if (input[nc[0]] !== undefined && input[nc[0]][nc[1]] !== undefined && input[i][j] >= input[nc[0]][nc[1]]) {
          lp = false; 
        }
      }
      if (lp) {
        lpv.push(1 + input[i][j]); 
      }
    }
  }

  console.log(lpv); 
  return rl.array.sum(lpv);
}; 

// Second part
exports.goldStar = function(inpArr, inpStr) {
  // console.log(inpArr, inpStr); 
  let input = inpStr.split('\n'); // If each line is an input
  // let input = inpStr.split(','); // If first line is input
  // input = inpArr.map(r => parseInt(r)); // Convert entries to ints
  input = input.map(r => r.split('').map(r => parseInt(r))); 
  // console.log(input)
  // if (inpStr.length > 100) return 1;

  let bspts = new Set(); 
  function findbs(i, j, c=0) {
    let cds = [i, j]; 
    bspts.add(cds.join(',')); 
    c++; 
    let sur = [[-1, 0], [0, -1], [1, 0], [0, 1]]; 
    for (let co of sur) {
      let nc = [i+co[0], j+co[1]]; 
      if (input[nc[0]] !== undefined && input[nc[0]][nc[1]] !== undefined && input[nc[0]][nc[1]] < 9) {
        if (!bspts.has([nc[0], nc[1]].join(','))) {
          c += findbs(nc[0], nc[1], 0); 
        }
      }
    }
    return c; 
  }

  // console.log(input); 
  let lpv = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      let sur = [[-1, 0], [0, -1], [1, 0], [0, 1]]; 
      let lp = true; 
      for (let co of sur) {
        let nc = [i+co[0], j+co[1]]; 
        if (input[nc[0]] !== undefined && input[nc[0]][nc[1]] !== undefined && input[i][j] >= input[nc[0]][nc[1]]) {
          lp = false; 
        }
      }
      if (lp) {
        // lpv.push(1 + input[i][j]); 
        let bs = findbs(i, j); 
        lpv.push(bs); 
      }
    }
  }

  // console.log(lpv); 
  lpv = lpv.sort((a, b) => b-a);
  lpv = lpv.slice(0, 3); 
  return (lpv.reduce((a, c) => a*c, 1));
}; 