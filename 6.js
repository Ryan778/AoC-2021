// Day 6

const rl = require('./rl-tools'); 

// First part
exports.silverStar = function(inp, inpStr) {
  // if (inp.length > 20) {return 1;} // Run only test case

  let val = inpStr.split(',').map(r => parseInt(r)); 
  for (let i = 0; i < 80; i++) {
    let nf = 0; 
    val = val.map(r => {
      r --; 
      if (r < 0) {
        r = 6; 
        nf ++; 
      }
      return r; 
    }); 
    for (let i = 0; i < nf; i++) {
      val.push(8); 
    }
    // console.log(val); 
  }
  
  return val.length;
}; 

// Second part
exports.goldStar = function(inp, inpStr) {
  // if (inp.length > 20) {return 1;} // Run only test case

  let days = rl.array.new(9, 0); 

  let val = inpStr.split(',').map(r => parseInt(r)); 
  for (let v of val) {
    days[v] ++; 
  }

  for (let i = 0; i < 256; i++) {
    // if (i < 5) console.log(days); 
    for (let j = 0; j < 9; j++) {
      if (j === 0) {
        days[99] = days[0]; 
        days[9] = days[0]; 
        // console.log('hatch: ', days[0])
      } else {
        days[j-1] = days[j]; 
      }
    }
    days[8] = days[9]; 
    days[9] = 0; 
    days[6] += days[99]; 
    days[99] = 0; 
  }
  
  console.log(days); 
  return rl.array.sum(days);
}; 