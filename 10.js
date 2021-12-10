// Day 10

/** Comments: 
 * The variable named queue is actually a stack. Oops. Had the idea of a stack in my head, but proceeded to write down queue, and then confused myself by treating the queue like a queue and wondering why it wasn't working :)
 * Overall not too terrible, making that mistake three time(!) before realizing why I was making that mistake did cost me several minutes unfortunately. 
*/ 

const rl = require('./rl-tools'); 
// Important, commonly used functions
const range = rl.array.range; 
const sum = rl.array.sum; 

// First part
exports.silverStar = function(inpArr, inpStr) {
  let input = [...inpArr]; // If each line is an input
  // let input = inpStr.split(','); // If first line is input
  input = inpArr.map(r => r.split('')); // Convert entries to ints
  
  let c1 = ['(','[','{','<']; 
  let c2 = [')',']','}','>']
  let score = 0; 
  for (let line of input) {
    let queue = []; 
    for (let c of line) {
      if (c1.indexOf(c) !== -1) {
        queue.push(c); 
      } else {
        if (c2[c1.indexOf(queue[queue.length-1])] === c) {
          queue.pop(); 
        } else {
          let pts = [3, 57, 1197, 25137]; 
          // console.log(score); 
          let pv = pts[c2.indexOf(c)];
          // console.log(c, pv); 
          score += pv;  
          break; 
        }
      }
    }
  }

  return score;
}; 

// Second part
exports.goldStar = function(inpArr, inpStr) {

  let input = [...inpArr]; // If each line is an input
  // let input = inpStr.split(','); // If first line is input
  input = inpArr.map(r => r.split('')); // Convert entries to ints
  
  let c1 = ['(','[','{','<']; 
  let c2 = [')',']','}','>']
  let scores = []; 
  for (let line of input) {
    let queue = []; 
    for (let c of line) {
      if (c1.indexOf(c) !== -1) {
        queue.push(c); 
      } else {
        if (c2[c1.indexOf(queue[queue.length-1])] === c) {
          queue.pop(); 
        } else {
          queue = []; 
          break; 
        }
      }
    }
    if (queue.length > 0) {
      queue = queue.reverse(); 
      let pts = 0; 
      for (let c of queue) {
        pts *= 5; 
        pts += (c1.indexOf(c) + 1); 
      }
      // console.log(pts); 
      scores.push(pts); 
    }
  }

  scores = scores.sort((a, b) => b-a);
  console.log(scores); 
  return scores[Math.floor(scores.length/2)];
  
}; 