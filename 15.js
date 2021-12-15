// Day 15

/** Comments: 
 * Oops! It turns out knowing only stacks, queues, sets, and maps isn't actually enough to solve all these problems! 
 * For the first 40 minutes, I didn't realize you could go left/up path wise, as the example only went right and down. After discovering that (with the help of my Mines AoC group politely pointing that out), the question became real hard real quick. My answer only went down from 365 down to 361 after implementing all of this backtracking left/up stuff, so technically speaking I would've "solved" this puzzle faster had I simply guessed n-1 each time. 
 * Background -- I've never taken any formal algorithms courses before (and thus don't really know any), with AP Computer Science A and Data Structures being the only two formal CS / programming-oriented courses I've taken up until now.
 * 
 * If I were to describe what my algorithm was doing to the best of my ability, it'd be: 
 * - Find the cost using only the costs above and to the left of each row/column, going from top left to bottom right
 * - If the cell to the left (when going right) or cell to the top (when going down) can now be reached from the current cell with a lower cost, then update that value and recursively go left/up to update all neighboring values.
 *   -(this part was implemented later after the full input case was taking too long to run) stop the recursion if there's no longer cost savings traversing left/up
 * - Continue going to the next row down and next column right, until hitting the bottom right cell
 */

const rl = require('./rl-tools'); 
// Important, commonly used functions
const range = rl.array.range; 
const sum = rl.array.sum; 

// First part
exports.silverStar = function(inpArr, inpStr) {
  let input = [...inpArr].map(r => r.split('').map(r => parseInt(r))); // If each line is an input
  // let input = inpStr.split(','); // If first line is input
  // input = inpArr.map(r => parseInt(r)); // Convert entries to ints
  input[0][0] = 0;
  let w = input.length, h = input[0].length;

  // if (input.length > 50) return 1; 

  let minpath = [], ct = 0; 
  // let hits = new Set(); 

  for (let i of range(0, h)) {
    minpath[i] = (i===0) ? [0] : [input[i][0] + minpath[i-1][0]];
  }
  for (let i of range(1, w)) {
    // console.log(input[0][i], minpath[0][i-1] )
    minpath[0][i] = input[0][i] + minpath[0][i-1];
  }
  function expand(x, y, spec) {
    ct++; 
    // if (hits.has([x,y].join(','))) return; 
    // hits.add([x,y].join(',')); 
    let v = input[x][y], t = minpath[x][y-1], l = minpath[x-1][y]; 
    if (spec === 1) l = minpath[x+1][y]; 
    if (spec === 2) t = minpath[x][y+1]; 
    let min; 
    if (v+t < v+l) {
      min = v+t; 
    } else {
      min = v+l; 
    }

    let curval = minpath[x][y]; 

    if (spec > 2 && curval <= min) {
      return;
    }

    minpath[x][y] = min; 

    // if (isNaN(min)) {
    //   // console.log(minpath);
    //   console.log(v, t, l); 
    //   console.log(minpath[x-1][y])
    //   console.log(x, y, spec); 

    //   console.log(minpath[1][32]);
    //   return -1; 
    // }

    if (spec) {
      // console.log(spec, x, y);
      if ((spec === 1 || spec === 3) && y < h-1) {
        expand(x, y+1, 3); 
      } else if ((spec === 2 || spec === 4) && x < w-1) {
        expand(x+1, y, 4); 
      }
    }

    // Check left
    // console.log(minpath[0][7]); 
    // console.log(x-1, y); 
    if (x > 0 && min + input[x-1][y] < minpath[x-1][y]) {
      minpath[x-1][y] = min + input[x-1][y]; 
      if (x > 1) expand(x-1, y, 1); 
    }
    if (y > 0 && min + input[x][y-1] < minpath[x][y-1]) {
      minpath[x][y-1] = min + input[x][y-1]; 
      if (y > 1) expand(x, y-1, 2); 
    }
  }
  for (let n of range(1, w)) {
    for (let i of range(n, w)) {
      let a = expand(n, i); 
      let b = expand(i, n); 
      if (a === -1 || b === -1) return -1;
    }
  }

  // console.log(minpath); 
  console.log(ct); 
  // return 1;
  return minpath[w-1][h-1];
}; 

// Second part
exports.goldStar = function(inpArr, inpStr) {
  let inputPre = [...inpArr].map(r => r.split('').map(r => parseInt(r))); // If each line is an input
  // let input = inpStr.split(','); // If first line is input
  // input = inpArr.map(r => parseInt(r)); // Convert entries to ints
  let input = [];
  let orgw = inputPre.length, orgh = inputPre[0].length;  
  for (let i of range(0, inputPre.length)) {
    for (let j of range(0, inputPre[0].length)) {
      for (let k of range(0, 5)) {
        for (let l of range(0, 5)) {
          let off = k + l; 
          if (!input[i+k*orgw]) input[i+k*orgw] = []; 
          let value = inputPre[i][j] + off; 
          if (value > 9) value -= 9; 
          input[i+k*orgw][j+l*orgh] = value; 
        }
      }
    }
  }
  input[0][0] = 0;
  let w = input.length, h = input[0].length;

  // if (inputPre.length > 50) return 1; 

  let minpath = [], ct = 0; 
  // let hits = new Set(); 

  for (let i of range(0, h)) {
    minpath[i] = (i===0) ? [0] : [input[i][0] + minpath[i-1][0]];
  }
  for (let i of range(1, w)) {
    // console.log(input[0][i], minpath[0][i-1] )
    minpath[0][i] = input[0][i] + minpath[0][i-1];
  }
  function expand(x, y, spec) {
    ct++; 
    // if (hits.has([x,y].join(','))) return; 
    // hits.add([x,y].join(',')); 
    let v = input[x][y], t = minpath[x][y-1], l = minpath[x-1][y]; 
    if (spec === 1) l = minpath[x+1][y]; 
    if (spec === 2) t = minpath[x][y+1]; 
    let min; 
    if (v+t < v+l) {
      min = v+t; 
    } else {
      min = v+l; 
    }

    let curval = minpath[x][y]; 

    if (spec > 2 && curval <= min) {
      return;
    }

    minpath[x][y] = min; 

    // if (isNaN(min)) {
    //   // console.log(minpath);
    //   console.log(v, t, l); 
    //   console.log(minpath[x-1][y])
    //   console.log(x, y, spec); 

    //   console.log(minpath[1][32]);
    //   return -1; 
    // }

    if (spec) {
      // console.log(spec, x, y);
      if ((spec === 1 || spec === 3) && y < h-1) {
        expand(x, y+1, 3); 
      } else if ((spec === 2 || spec === 4) && x < w-1) {
        expand(x+1, y, 4); 
      }
    }

    // Check left
    // console.log(minpath[0][7]); 
    // console.log(x-1, y); 
    if (x > 0 && min + input[x-1][y] < minpath[x-1][y]) {
      minpath[x-1][y] = min + input[x-1][y]; 
      if (x > 1) expand(x-1, y, 1); 
    }
    if (y > 0 && min + input[x][y-1] < minpath[x][y-1]) {
      minpath[x][y-1] = min + input[x][y-1]; 
      if (y > 1) expand(x, y-1, 2); 
    }
  }
  for (let n of range(1, w)) {
    for (let i of range(n, w)) {
      let a = expand(n, i); 
      let b = expand(i, n); 
      if (a === -1 || b === -1) return -1;
    }
  }

  // console.log(input); 
  // console.log(minpath); 
  console.log(ct); 
  // return 1;
  return minpath[w-1][h-1];
}; 