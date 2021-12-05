// Day 1

// First part
exports.silverStar = function(inp, inpStr) {
  let count = -1, prev = -1; 
  for (let i = 0; i < inp.length; i++) {
    if (inp[i] > prev) {
      count ++; 
    }
    prev = inp[i]; 
  }
  return count; 
}; 

// Second part
exports.goldStar = function(inp, inpStr) {
inp = inp.map(r => parseInt(r)); 

  let count = -1, prev = -1; 
  for (let i = 2; i < inp.length; i++) {
    let sum = inp[i] + inp[i-1] + inp[i-2]; 
    if (sum > prev) {
      count ++; 
    }
    prev = sum; 
  }

  return count; 
}; 