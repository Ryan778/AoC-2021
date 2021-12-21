// Day 20

/** Comments
 * Part 1 went quite well!
 * Part 2 didn't! I couldn't read, and it didn't occur to me that three dice were rolled each turn (despite that literally being the premise of part 1). 
 * Once I figured that out, it only took about 15 minutes to solve. Sadly, a bug (that arose as an artifact from my previous messing around -- line 109 had "[opts[i]]"" instead of "opts[i]") -- took another ~10-15 minutes to find and fix.
 * Note that for this problem, input values are HARD CODED and not read from the files. 
 */

const rl = require('./rl-tools'); 
// Important, commonly used functions
const range = rl.array.range; 
const sum = rl.array.sum; 

// First part
exports.silverStar = function(inpArr, inpStr) {
  // let input = [...inpArr]; // If each line is an input
  // let input = inpStr.split(','); // If first line is input
  // input = inpArr.map(r => parseInt(r)); // Convert entries to ints
  
  let n = 0, rc = 0; 
  function roll() {
    n++; rc++; 
    return n; 
  }

  function move(cur, roll) {
    // let s = 0; 
    cur += roll; 
    while (cur > 10) {
      cur -= 10; 
    }
    return cur; 
  }

  let p1 = 4, s1 = 0; 
  let p2 = 9, s2 = 0; 
  let turn = 1; 
  while (s1 < 1000 && s2 < 1000) {
    let dist = roll(); 
      dist += roll(); 
      dist += roll(); 
    // console.log(p1, dist); 
    if (turn === 1) {
      turn = 2; 
      p1 = move(p1, dist); 
      s1 += p1; 
    } else {
      turn = 1; 
      p2 = move(p2, dist); 
      s2 += p2; 
    }
  }

  console.log(rc, s1, s2); 
  return rc * Math.min(s1, s2);
}; 

// Second part
exports.goldStar = function(inpArr, inpStr) {
  let n = 0, rc = 0; 
  function roll() {
    n++; rc++; 
    return n; 
  }

  function move(cur, roll) {
    // let s = 0; 
    // console.log(c++); 
    cur += roll; 
    while (cur > 10) {
      cur -= 10; 
    }
    return cur; 
  }

  let p1 = 4, p2 = 9; 
  
  let pos = [1, 3, 6, 7, 6, 3, 1]; 
  let opts = [3, 4, 5, 6, 7, 8, 9];
  let uniwins = [0, 0]; 
  function simulate(roll, count, turn = 1, pp1 = p1, pp2 = p2, s1 = 0, s2 = 0) {
    let r = roll;
    if (turn === 1) {
      turn = 2; 
      pp1 = move(pp1, r); 
      s1 += pp1; 
      if (s1 >= 21) {
        uniwins[0] += count; 
        return; 
      }
    } else {
      turn = 1; 
      pp2 = move(pp2, r); 
      s2 += pp2; 
      if (s2 >= 21) {
        uniwins[1] += count; 
        return; 
      }
    }

    // console.log(s1, s2, pp1, pp2); 
    for (let i of range(0, 7)) {
      simulate(opts[i], count * pos[i], turn, pp1, pp2, s1, s2); 
    }
  }

  for (let i of range(0, 7)) {
    simulate(opts[i], pos[i]); 
  }


  console.log(uniwins); 
  return Math.max(...uniwins);

  // console.log(r1, r2); 
}; 