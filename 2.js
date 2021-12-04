// Day 2

// First part
exports.silverStar = function(inp, inpStr) {
  let hor = 0, dep = 0; 
  for (let line of inp) {
    let val = line.split(' '); 
    val[1] = parseFloat(val[1]); 
    if (val[0] === 'forward') {
      hor += val[1]; 
    } else if (val[0] === 'down') {
      dep += val[1]; 
    } else if (val[0] === 'up' ) {
      dep -= val[1]; 
    }
  }

  console.log(hor, dep); 

  return hor*dep; 
}; 

// Second part
exports.goldStar = function(inp, inpStr) {
  let hor = 0, dep = 0, aim = 0; 
  for (let line of inp) {
    let val = line.split(' '); 
    val[1] = parseFloat(val[1]); 
    if (val[0] === 'forward') {
      // hor += val[1]; 
      hor += val[1]; 
      dep += aim * val[1]; 
    } else if (val[0] === 'down') {
      // dep += val[1]; 
      aim += val[1]; 
    } else if (val[0] === 'up' ) {
      // dep -= val[1]; 
      aim -= val[1]; 
    }
  }

  console.log(hor, dep); 

  return hor*dep; 
}; 