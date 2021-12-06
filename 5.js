// Day 5

const rl = require('./rl-tools'); 

// function addPts(map, x, y) {

// }

// First part
exports.silverStar = function(inp, inpStr) {
  // inp.splice(inp.length-1, 1); inpStr = inpStr.slice(0, -1); // Remove trailing newline
  let l = inp[0].length, inp2 = [...inp]; // Helper variables

  // if (inp.length > 100) {return 1;}

  let pts = new Map(); 

  inp = inp.map(r => {
    return r.split(' -> ').map(r => r.split(',').map(r => parseInt(r))); 
  })

  let max = 0; 
  console.log(inp.length); 
  for (let cds of inp) {
    // [[0, 0], [0, 10]]
    // console.log(cds); 
    if (cds[0][0] === cds[1][0]) {
      // let diff = cds[0][0] - cds[1][0], sign = diff/diff; 
      let x = cds[0][0]; 
      let y = [cds[0][1], cds[1][1]].sort((a, b) => a-b); 
      // console.log(x, y); 
      for (let i = y[0]; i <= y[1]; i++) {
        // console.log(x, i); 
        let str = `${x},${i}`; 
        pts.has(str) ? pts.set(str, pts.get(str) + 1) : pts.set(str, 1); 
        // if (pts[x][i] > max) max = pts[x][i]; 
      }
    }
    else if (cds[0][1] === cds[1][1]) {
      // let diff = cds[0][0] - cds[1][0], sign = diff/diff; 
      let y = cds[0][1]; 
      let x = [cds[0][0], cds[1][0]].sort((a, b) => a-b); 
      // console.log(x, y); 
      for (let i = x[0]; i <= x[1]; i++) {
        // console.log(i, y); 
        let str = `${i},${y}`; 
        pts.has(str) ? pts.set(str, pts.get(str) + 1) : pts.set(str, 1); 
        // pts[i][y] ++; 
        // if (pts[i][y] > max) max = pts[i][y]; 
      }
    }
  }

  let c = 0; 
  pts.forEach((v => {
    if (v >= 2) {
      c++; 
    }
  }))
  return c; 

  // console.log(pts); 
  // let fl = pts.flat(2); 
  // let max = Math.max(...fl); 
  // console.log(fl, max); 

  // fl = fl.filter(r => r >= 2); 
  // console.log(fl); 

  return  fl.length; 
}; 

// Second part
exports.goldStar = function(inp, inpStr) {
  let l = inp[0].length, inp2 = [...inp]; // Helper variables

  // if (inp.length > 100) {return 1;}

  let pts = new Map(); 

  inp = inp.map(r => {
    return r.split(' -> ').map(r => r.split(',').map(r => parseInt(r))); 
  })

  let max = 0; 
  console.log(inp.length); 
  
  for (let cds of inp) {
    // [[0, 0], [0, 10]]
    // console.log(cds); 
    if (cds[0][0] === cds[1][0]) {
      // let diff = cds[0][0] - cds[1][0], sign = diff/diff; 
      let x = cds[0][0]; 
      let y = [cds[0][1], cds[1][1]].sort((a, b) => a-b); 
      // console.log(x, y); 
      for (let i = y[0]; i <= y[1]; i++) {
        // console.log(x, i); 
        let str = `${x},${i}`; 
        pts.has(str) ? pts.set(str, pts.get(str) + 1) : pts.set(str, 1); 
        // if (pts[x][i] > max) max = pts[x][i]; 
      }
    }
    else if (cds[0][1] === cds[1][1]) {
      // let diff = cds[0][0] - cds[1][0], sign = diff/diff; 
      let y = cds[0][1]; 
      let x = [cds[0][0], cds[1][0]].sort((a, b) => a-b); 
      // console.log(x, y); 
      for (let i = x[0]; i <= x[1]; i++) {
        // console.log(i, y); 
        let str = `${i},${y}`; 
        pts.has(str) ? pts.set(str, pts.get(str) + 1) : pts.set(str, 1); 
        // pts[i][y] ++; 
        // if (pts[i][y] > max) max = pts[i][y]; 
      }
    } else {
      let x1 = cds[0][0], x2 = cds[1][0], y1 = cds[0][1], y2 = cds[1][1]; 
      
      if (Math.abs(y2-y1) === Math.abs(x2 - x1)) {
        // Diagonal!
        let sorted = cds.sort((a,b) => {return a[0] - b[0]}); 
        // console.log(sorted); 
        // let ydir = xs[]
        let dir = sorted[0][1] < sorted[1][1] ? 1 : -1; 
        let j = 0; 
        for (let i = sorted[0][1]; i != sorted[1][1] + dir; i += dir) {
          let str = `${sorted[0][0] + j},${i}`
          // console.log(str); 
          pts.has(str) ? pts.set(str, pts.get(str) + 1) : pts.set(str, 1); 
          j++; 
        }
      } else {
        console.log('nd', cds); 
      }

      /*
      if (x2 > x1 && y2 > y1) {
        for (let x = x1; x <= x2; x++) {
          let str = `${x},${y1+(x-x1)}`; 
          pts.has(str) ? pts.set(str, pts.get(str) + 1) : pts.set(str, 1); 
        }
      }
      if (x2 < x1 && y2 > y1) {
        for (let x = x1; x >= x2; x--) {
          let str = `${x},${y1+(x1-x)}`; 
          pts.has(str) ? pts.set(str, pts.get(str) + 1) : pts.set(str, 1); 
        }
      }
      if (x2 < x1 && y2 < y1) {
        for (let x = x2; x <= x1; x++) {
          let str = `${x},${y2+(x-x2)}`; 
          pts.has(str) ? pts.set(str, pts.get(str) + 1) : pts.set(str, 1); 
        }
      }
      if (x2 > x1 && y2 < y1) {
        for (let x = x1; x <= x2; x++) {
          let str = `${x},${y1+(x1-x)}`; 
          pts.has(str) ? pts.set(str, pts.get(str) + 1) : pts.set(str, 1); 
        }
      }*/
    }
  }

  let c = 0; 
  pts.forEach((v => {
    if (v >= 2) {
      c++; 
    }
  }))
  
  // console.log(pts); 
  return c; 
  // let fl = pts.flat(2); 
  // let max = Math.max(...fl); 
  // console.log(fl, max); 

  // fl = fl.filter(r => r >= 2); 
  // console.log(fl); 

  return  fl.length; 
}; 