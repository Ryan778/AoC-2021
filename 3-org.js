// Day 3
// Original code used during competition -- it doesn't actually solve everything so you have to do some math on your own :)

// First part
exports.silverStar = function(inp, inpStr) {
  let c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 

  for (let line of inp) {
    // let val = line.split(' '); 
    line = line.split(''); 
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '0') {
        c[i] ++; 
      } else {
        d[i] ++; 
      }
    }
  }

  let out = ''; 
  for (let i = 0; i < 12; i++) {
    if (c[i] > d[i]) {
      out += '0'; 
    } else {
      out += '1';
    }
  }

  return out; 
}; 

// Second part
exports.goldStar = function(inp, inpStr) {
  // inp = inp.map(r => {
  //   r = parseInt(r); 
  // }); 
  let l = 12; 

  for (let i = 0; i < l; i++) {
    // console.log(inp.length); 
    // console.log(inp); 

    let c0 = 0, c1 = 0; 
    for (let num of inp) {
      if (num.slice(i, i+1) === '0') {
        c0 ++; 
      } else {
        c1 ++; 
      }
    }
    if (c1 < c0) {
      inp = inp.filter(num => num.slice(i, i+1) === '1'); 
    } else {
      inp = inp.filter(num => num.slice(i, i+1) === '0'); 
    }

    console.log(inp.length); 
    if (inp.length === 1) {
      break; 
    }
  }
  console.log(inp[0]); 
  let o1 = parseInt(inp[0], 2); 
  console.log(o1); 



}; 