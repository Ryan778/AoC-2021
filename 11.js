// Day 11

/** Comments: 
 * Very mediocre day today. Got hung up for several minutes on why my numbers were off only to discover I used "t < 1" and "u < 1" instead of "t <= 1" and "u <= 1". 
 * There's also a lot of unnecessary for loops here from me thinking my mistake with values not behaving correctly had to do with traversal order. As it turns out that's not the case; I simply wasn't forcing the lights to stay at 0 after flashing. (This was ultimately fixed by setting flashed lights to -1)
 */

const rl = require('./rl-tools'); 
// Important, commonly used functions
const range = rl.array.range; 
const sum = rl.array.sum; 

// First part
exports.silverStar = function(inpArr, inpStr) {
  // let input = [...inpArr]; // If each line is an input
  let input = inpStr.split('\n').map(r => r.split('').map(r => parseInt(r))); // If first line is input
  // input = inpArr.map(r => parseInt(r)); // Convert entries to ints
  
  let fc = 0; 
  function flash(i, j) {
    fc++; 
    input[i][j] = -1; 
    for (let t = -1; t <= 1; t++) {
      for (let u = -1; u <= 1; u++) {
        if (input?.[i+t]?.[j+u] !== null && input?.[i+t]?.[j+u] !== undefined) {
          // console.log(i+t, j+u); 
          if (t !== 0 || u !== 0) {
            if (input[i+t][j+u] !== -1) input[i+t][j+u] ++; 
          }
          if (input[i+t][j+u] > 9) {
            input[i+t][j+u] = 0; 
            if (t !== 0 || u !== 0) {
              flash(i+t, j+u); 
              // input[i][j] = 0; 
              // input[i+t][j+u] = 0; 
            } 
          }
        }
      }
    }
    // input[i][j] = 0; 
  }

  for (let c = 0; c < 100; c++) {
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        input[i][j] ++; 
      }
    }
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        // input[i][j] ++; 
        if (input[i][j] > 9) {
          // input[i][j] --; 
          // fc++;
          flash(i, j); 
        }
      }
    }
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        // input[i][j] ++; 
        if (input[i][j] === -1) {
          input[i][j] = 0; 
        }
      }
    }
  }

  // console.log(input); 
  return fc;
}; 

// Second part
exports.goldStar = function(inpArr, inpStr) {
  // let input = [...inpArr]; // If each line is an input
  let input = inpStr.split('\n').map(r => r.split('').map(r => parseInt(r))); // If first line is input
  // input = inpArr.map(r => parseInt(r)); // Convert entries to ints
  
  let fc = 0; 
  function flash(i, j) {
    fc++; 
    input[i][j] = -1; 
    for (let t = -1; t <= 1; t++) {
      for (let u = -1; u <= 1; u++) {
        if (input?.[i+t]?.[j+u] !== null && input?.[i+t]?.[j+u] !== undefined) {
          // console.log(i+t, j+u); 
          if (t !== 0 || u !== 0) {
            if (input[i+t][j+u] !== -1) input[i+t][j+u] ++; 
          }
          if (input[i+t][j+u] > 9) {
            input[i+t][j+u] = 0; 
            if (t !== 0 || u !== 0) {
              flash(i+t, j+u); 
              // input[i][j] = 0; 
              // input[i+t][j+u] = 0; 
            } 
          }
        }
      }
    }
    // input[i][j] = 0; 
  }

  let f = 0;
  while (true) {
    f++; 
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        input[i][j] ++; 
      }
    }
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        // input[i][j] ++; 
        if (input[i][j] > 9) {
          // input[i][j] --; 
          // fc++;
          flash(i, j); 
        }
      }
    }
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        // input[i][j] ++; 
        if (input[i][j] === -1) {
          input[i][j] = 0; 
        }
      }
    }
    let isSync = true; 
    
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        if (input[i][j] !== 0) {
          isSync = false; 
        }
      }
    }
    if (isSync) break; 
  }

  // console.log(input); 
  return f;
}; 