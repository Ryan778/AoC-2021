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
  console.log('yay')
  return 3; 
}; 