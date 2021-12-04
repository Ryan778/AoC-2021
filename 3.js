const rl = require('./rl-tools'); 

// First part
exports.silverStar = function(inp, inpStr) {
  inp = inp.filter(r => r != ''); 

  let out = inp.reduce((p, c) => {
    c = c.split(''); 
    return p.map((v, i) => v + (c[i]=='1'?1:0)); 
  }, new Array(inp[0].length).fill(0)); 

  out = out.map(n => n>inp.length/2?1:0).join(''); 
  let n1 = parseInt(out, 2); 
  let n2 = n1 ^ (2**inp[0].length - 1); 

  console.log(n1, n2); 
  return n1 * n2; 
}; 

// Second part
exports.goldStar = function(inp, inpStr) {
  let l = inp[0].length; 
  let inp2 = [...inp]; 

  for (let i = 0; i < l; i++) {
    let c0 = 0, c1 = 0; 
    for (let num of inp) {
      num.charAt(i) === '0' ? c0++ : c1++; 
    }
    if (c1 < c0) {
      inp = inp.filter(num => num.charAt(i) === '1'); 
    } else {
      inp = inp.filter(num => num.charAt(i) === '0'); 
    }

    if (inp.length === 1) {
      break; 
    }
  }

  console.log(inp[0]); 
  let o1 = parseInt(inp[0], 2); 

  inp = [...inp2]; 
  for (let i = 0; i < l; i++) {
    let c0 = 0, c1 = 0; 
    for (let num of inp) {
      num.charAt(i) === '0' ? c0++ : c1++; 
    }
    if (c1 >= c0) {
      inp = inp.filter(num => num.charAt(i) === '1'); 
    } else {
      inp = inp.filter(num => num.charAt(i) === '0'); 
    }

    if (inp.length === 1) {
      break; 
    }
  }

  console.log(inp[0]); 
  let o2 = parseInt(inp[0], 2); 

  console.log(o1, o2); 
  return o1*o2; 
}; 