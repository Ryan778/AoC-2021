// Day 8

const rl = require('./rl-tools'); 

// First part
exports.silverStar = function(inp, inpStr) {
  // let l = inp[0].length, inp2 = [...inp]; // Helper variables

  let input = inp.map(r => r.split('|')); // If first line is input
  // input = inpArr.map(r => parseInt(r)); // Convert entries to ints
  if (input.length > 200) {return 1;} // Run only test case

  let c = 0; 
  for (let i of input) {
    let str = i[1].split(' ').map(r => r.length); 
    for (let j of str) {
      if ([2, 3, 4, 7].indexOf(j) !== -1) {
        c++; 
      }
    }
  }

  return c;
}; 

// Second part
exports.goldStar = function(inp, inpStr) {
  // let l = inp[0].length, inp2 = [...inp]; // Helper variables

  let input = inp.map(r => {
    let p = r.split('|'); 
    p[0] += p[1]; 
    return p; 
  }); // If first line is input
  // input = inpArr.map(r => parseInt(r)); // Convert entries to ints
  // if (input.length > 20) {return 1;} // Run only test case

  let c = 0; 
  for (let i of input) {
    let vals = []; 
    let str = i[0].split(' ').map(r => r.split('').sort()); 
    for (let j of str) {
      switch(j.length) {
        case 2: 
          vals[1] = j; 
          break; 
        case 3: 
          vals[7] = j; 
          break; 
        case 4: 
          vals[4] = j; 
          break; 
        case 7: 
          vals[8] = j; 
          break; 
      }
    }
    for (let j of str) {
      switch(j.length) {
        case 5: 
          var k = [...j]; 
          k.push(...vals[1]);
          var dups = k.filter((e, i, a) => a.indexOf(e) !== i); 
          // console.log(dups); 

          if (dups.length === 2) {
            vals[3] = j; 
          } else {
            var k = [...j]; 
            k.push(...vals[4]);
            var dups = k.filter((e, i, a) => a.indexOf(e) !== i); 
            // console.log(dups); 
            if (dups.length === 3) {
              vals[5] = j; 
            } else {
              vals[2] = j; 
            }
          }
          break; 
        case 6: 
          var k = [...j]; 
          k.push(...vals[1]);
          var dups = k.filter((e, i, a) => a.indexOf(e) !== i); 
          // console.log(dups); 
          if (dups.length === 1) {
            vals[6] = j; 
          }
          else {
            let k = [...j]; 
            k.push(...vals[4]);
            let dups = k.filter((e, i, a) => a.indexOf(e) !== i); 
            // console.log(dups); 
            if (dups.length === 4) {
              vals[9] = j; 
            } else {
              vals[0] = j; 
            }
          }
          break;
      }
    }
    // console.log(vals); 

    let str2 = i[1].split(' ').map(r => r.split('').sort().join('')); 
    vals = vals.map(r => r.join('')); 
    // console.log(vals); 
    // console.log(str2); 
    str2 = str2.map(r => vals.indexOf(r).toString());
    if (str2.length === 5) {
      str2 = str2.slice(1); // idk why this happens lol
    }
    str2 = parseInt(str2.join('')); 
    c += str2; 
  }

  return c;
}; 