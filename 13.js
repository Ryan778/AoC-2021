// Day 13

const rl = require('./rl-tools'); 
// Important, commonly used functions
const range = rl.array.range; 
const sum = rl.array.sum; 

// First part
exports.silverStar = function(inpArr, inpStr) {
  // let input = [...inpArr].map(r => r.split('')); // If each line is an input
  let input = inpStr.split('\n\n')[0].split('\n').map(r => r.split(',').map(r => parseFloat(r))); // If first line is input
  // input = inpArr.map(r => parseInt(r)); // Convert entries to ints
  
  // let xm = Math.max(...input.map(r => r[0])), ym = Math.max(...input.map(r => r[1]));
  // console.log(xm, ym); 

  let pts = new Set(); 
  for (let pt of input) {
    pts.add(pt.join(',')); 
  }

  let ins = inpStr.split('\n\n')[1].split('\n').map(r => r.slice(r.lastIndexOf(' ')+1).split('=')); 
  // console.log(ins); 
  for (let i of [ins[0]]) {
    let d = i[0], c = parseInt(i[1]); 
    for (let pt of pts) {
      pt = pt.split(',').map(r => parseInt(r)); 
      if (d === 'x') {
        if (pt[0] > c) {
          pts.delete(pt.join(',')); 
          pts.add([2*c - pt[0], pt[1]].join(',')); 
        }
      } else {
        if (pt[1] > c) {
          pts.delete(pt.join(',')); 
          pts.add([pt[0], 2*c - pt[1]].join(',')); 
        }
      }
    }
  }

  // console.log([...pts].sort().map(r => `(${r})`).join(', ')); 

  return pts.size;
}; 

// Second part
exports.goldStar = function(inpArr, inpStr) {
  // let input = [...inpArr].map(r => r.split('')); // If each line is an input
  let input = inpStr.split('\n\n')[0].split('\n').map(r => r.split(',').map(r => parseFloat(r))); // If first line is input
  // input = inpArr.map(r => parseInt(r)); // Convert entries to ints
  
  // let xm = Math.max(...input.map(r => r[0])), ym = Math.max(...input.map(r => r[1]));
  // console.log(xm, ym); 

  let pts = new Set(); 
  for (let pt of input) {
    pts.add(pt.join(',')); 
  }

  let ins = inpStr.split('\n\n')[1].split('\n').map(r => r.slice(r.lastIndexOf(' ')+1).split('=')); 
  // console.log(ins); 
  for (let i of ins) {
    let d = i[0], c = parseInt(i[1]); 
    for (let pt of pts) {
      pt = pt.split(',').map(r => parseInt(r)); 
      if (d === 'x') {
        if (pt[0] > c) {
          pts.delete(pt.join(',')); 
          pts.add([2*c - pt[0], pt[1]].join(',')); 
        }
      } else {
        if (pt[1] > c) {
          pts.delete(pt.join(',')); 
          pts.add([pt[0], 2*c - pt[1]].join(',')); 
        }
      }
    }
  }

  console.log([...pts].sort().map(r => `(${r})`).join(', ')); 

  return pts.size;
}; 