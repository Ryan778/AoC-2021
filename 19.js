// Day #

const rl = require('./rl-tools'); 
// Important, commonly used functions
const range = rl.array.range; 
const sum = rl.array.sum; 

function listAllRotations(input) {
  let output = []; 
  for (let i of input) {
    for (let x of range(0, 2)) {
      for (let y of range(0, 2)) {
        for (let z of range(0, 2)) {
          if (x === 0) x = -1; 
          if (y === 0) y = -1; 
          if (z === 0) z = -1; 
          output.push([x*i[0], y*i[1], z*i[2], [x, y, z, 0]]); 
          output.push([x*i[1], y*i[2], z*i[0], [x, y, z, 1]]); 
          output.push([x*i[2], y*i[0], z*i[1], [x, y, z, 2]]); 
        }
      }
    }
  }
  return output; 
}

function restoreOriginal(tr) {
  switch (tr[3][3]) {
    case 0: 
      return [tr[0]*tr[3][0], tr[1]*tr[3][1], tr[2]*tr[3][2], tr[3]];
    case 1: 
      return [tr[2]*tr[3][2], tr[0]*tr[3][0], tr[1]*tr[3][1], tr[3]];
    case 2: 
      return [tr[1]*tr[3][1], tr[2]*tr[3][2], tr[0]*tr[3][0], tr[3]];
  }
}

// function transform(tr) {
//   switch (tr[3][3]) {
//     case 0: 
//       return [tr[0]*tr[3][0], tr[1]*tr[3][1], tr[2]*tr[3][2], tr[3]];
//     case 1: 
//       return [tr[1]*tr[3][1], tr[2]*tr[3][2], tr[0]*tr[3][0], tr[3]];
//     case 2: 
//       return [tr[2]*tr[3][2], tr[0]*tr[3][0], tr[1]*tr[3][1], tr[3]];
//   }
// }

function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

let foundOffsets = new Set(); // skip duplicate offsets
function findOverlapBeacon(scanner, others) {
  let orientedBeacons = []; 
  for (let other of others) {
    let poss = listAllRotations(other); // all possibilities
    let diffs = {}; 
    for (let pos of poss) { // individual coordinate possibility
      for (let org of scanner) { // beacon from reference scanner
        let [x1, y1, z1] = org; 
        let [x2, y2, z2, tr] = pos; 
        let diff = [x2 - x1, y2 - y1, z2 - z1]; 
        let diffstr = diff.join(','); 
        if (diffs[diffstr]) diffs[diffstr].push({org, pos}); 
        else diffs[diffstr] = [{org, pos}]; 
      }
    }
    let diffList = Object.values(diffs).filter(r => r.length >= 3); 
    // console.log(diffList.length); 
    if (diffList.length >= 1) {
      for (let i = 0; i < diffList.length; i++) {
        let diffMatch = diffList[i][0]; 
        // let npos = restoreOriginal(diffMatch.pos);
        // console.log(diffMatch, npos); 
        
        let [x1, y1, z1] = diffMatch.org; 
        let [x2, y2, z2, tr] = diffMatch.pos; 

        let scdiff = [x1 - x2, y1 - y2, z1 - z2]; 

        // if (foundOffsets.has(scdiff.join(','))) continue; // already found
        // foundOffsets.add(scdiff.join(','));
        console.log('match!', scdiff); 
        // console.log(diffList[0]); 
        // console.log(other); 

        let orientedCoords = []; 
        for (let pos of poss) {
          if (arrayEquals(tr, pos[3])) {
            let [x1, y1, z1] = scdiff; 
            let [x2, y2, z2] = pos; 
            orientedCoords.push([x1 + x2, y1 + y2, z1 + z2]);
          }
        }
        
        // console.log(scdiff); 
        // console.log(orientedCoords); 
        orientedBeacons.push(orientedCoords); 
      }
    }
  }
  return orientedBeacons; 
}

// First part
exports.silverStar = function(inpArr, inpStr) {
  let input = inpStr.split('\n\n').map(r => r.split('\n').slice(1).map(r => r.split(',').map(r => parseInt(r)))); 

  if (input.length > 20) return 1; 
  
  // console.log(input); 
  
  // let goodBeacons = [input[0]]; 
  // let curi = 0; 
  // while (goodBeacons.length < input.length) {
  //   console.log('finding: ', curi)
  //   let newbeaconset = findOverlapBeacon(goodBeacons[curi], input.slice(curi+1)); 
  //   if (newbeaconset.length === 0) {
  //     curi++; 
  //     if (curi >= goodBeacons.length) {
  //       console.log('uh oh, something went wrong')
  //       return -1; 
  //     }
  //   } else {
  //     goodBeacons.push(...newbeaconset); 
  //     curi++; 
  //   }
  // }

  // let goodBeacons = [input[0]]; 
  // let curi = 0; 
  // while (goodBeacons.length < input.length) {
  //   let cleaninput = input.slice(curi+1); 
  //   // console.log(cleaninput); 
  //   for (let i = 0; i < cleaninput.length; i++) {
  //     let compinp = cleaninput[i]; 
  //     console.log('finding: ', curi, curi + 1 + i)
  //     let newbeaconset = findOverlapBeacon(goodBeacons[curi], [compinp]); 
  //     // console.log(newbeaconset); 
  //     if (newbeaconset.length === 0) {
  //       curi++; 
  //       if (curi >= goodBeacons.length) {
  //         console.log('uh oh, something went wrong')
  //         return -1; 
  //       }
  //     } else {
  //       goodBeacons.push(...newbeaconset); 
  //     }
  //   }
  //   curi++; 
  // }

  // let goodBeacons = [input[0]]; 
  // let expected = input.length; 
  // input.splice(0, 1); 
  // let curi = 0;
  // while (input.length > 0) {
  //   for (let i = 0; i < input.length; i++) {
  //     let compinp = input[i]; 
  //     console.log('finding: ', curi, curi + 1 + i)
  //     let newbeaconset = findOverlapBeacon(goodBeacons[curi], [compinp]); 
  //     // console.log(newbeaconset); 
  //     if (newbeaconset.length > 0) {
  //       goodBeacons.push(...newbeaconset); 
  //       input.splice(i, 1); 
  //       // console.log(input); 
  //       i -= 1;
  //     }
  //   }
  //   curi ++; 
  //   if (curi >= goodBeacons.length) {
  //     return -1; 
  //   }
  // }

  
  let gb = [input[0]]; 
  // console.log(gb); 
  let r1 = findOverlapBeacon(gb[0], [input[1]]); 
  gb.push(...r1); 
  let r2 = findOverlapBeacon(gb[1], [input[3]]); 
  // console.log(r2);
  gb.push(...r2); 
  let r3 = findOverlapBeacon(gb[1], [input[4]]); 
  gb.push(...r3); 
  // console.log(gb.length); 
  // let r4 = findOverlapBeacon(input[4], [input[2]]); 
  // console.log(r4);
  console.log(findOverlapBeacon(input[0], [input[2]])); 
  console.log(findOverlapBeacon(input[1], [input[2]])); 
  console.log(findOverlapBeacon(input[3], [input[2]])); 
  console.log(findOverlapBeacon(input[4], [input[2]])); 
  // console.log(gb); */

  goodBeacons = gb; 

  let beacons = new Set(); 
  for (let beaconSet of goodBeacons) {
    for (let beacon of beaconSet) {
      beacons.add(beacon.join(',')); 
    }
  }

  // let newbeaconset = findOverlapBeacon(input[0], input.slice(1)); 
  // console.log(newbeaconset); 

  // console.log();
  // let lor = listAllRotations([[8, 0, 7]]); 
  // for (i of lor) console.log(restoreOriginal(i));

  // console.log(transform(restoreOriginal([1, 2, 3, [-1, 1, -1, 1]])))

  return beacons.size;
}; 

// Second part
exports.goldStar = function(inpArr, inpStr) {
  
}; 