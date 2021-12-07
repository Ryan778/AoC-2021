// Day #

const rl = require('./rl-tools'); 

// First part
exports.silverStar = function(inp, inpStr) {
  let l = inp[0].length, inp2 = [...inp]; // Helper variables
  // if (inp.length > 20) {return 1;} // Run only test case

  let input = inpStr.split(',').map(r => parseInt(r)); 
  
  let minCost = 999999999; 
  for (let i = 0; i < Math.max(...input); i++) {
    let cost = 0; 
    for (let crab of input) {
      cost += Math.abs(i - crab); 
    }
    if (cost < minCost) {
      minCost = cost; 
    }
  }

  return minCost;
}; 

// Second part
exports.goldStar = function(inp, inpStr) {
  let l = inp[0].length, inp2 = [...inp]; // Helper variables
  // if (inp.length > 20) {return 1;} // Run only test case

  let input = inpStr.split(',').map(r => parseInt(r)); 
  
  let minCost = 999999999; 
  for (let i = 0; i < Math.max(...input); i++) {
    let cost = 0; 
    for (let crab of input) {
      let c2 = Math.abs(i - crab); 
      cost += c2 * (c2+1) / 2; 
    }
    if (cost < minCost) {
      minCost = cost; 
    }
  }

  return minCost;
}; 