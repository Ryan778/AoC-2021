// Day 18

// This was written day of, and doesn't work. Rather than try and debug it, I'm restarting with a new (more organized) approach.

const rl = require('./rl-tools'); 
// Important, commonly used functions
const range = rl.array.range; 
const sum = rl.array.sum; 

// First part
exports.silverStar = function(inpArr, inpStr) {
  // let input = [...inpArr]; // If each line is an input
  // let input = inpStr.split(','); // If first line is input
  // input = inpArr.map(r => parseInt(r)); // Convert entries to ints
  
  let input = eval(`[${inpStr.split('\n').join(',')}]`); 
  let output = []; 

  function add(a, b) {
    return [a, b]; 
  }

  // function checkNesting(arr) {
  //   for (let i of arr) {
  //     if (!Array.isArray(i)) continue; 
  //     for (let j of i) {
  //       if (!Array.isArray(j)) continue; 
  //       for (let k of j) {
  //         if (!Array.isArray(k)) continue; 
  //         for (let l=0; l < k.length; l++) {
  //           if (Array.isArray(k[l])) {
  //             return {pos: l, arr: k}; 
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return false; 
  // }
  function checkNesting(arr) {
    for (let i of range(0, arr.length)) {
      let ia = arr[i]; 
      if (!Array.isArray(ia)) continue; 
      for (let j of range(0, ia.length)) {
        let ja = ia[j]; 
        if (!Array.isArray(ja)) continue; 
        for (let k of range(0, ja.length)) {
          let ka = ja[k]; 
          if (!Array.isArray(ka)) continue; 
          for (let l of range(0, ka.length)) {
            if (Array.isArray(ka[l])) {
              // Nested inside four pairs
              return {pos: l, arr: ka, source: arr, path: [i, j, k, l]}; 
            }
          }
        }
      }
    }
    return false;
  }

  /*function explode(arrLoc) {
    let {pos} = arrLoc; 
    let left = pos - 1 < 0 ? 0 : arrLoc.arr[pos-1]; 
    let right = arrLoc.arr[pos+1] ? arrLoc.arr[pos+1] : 0; 
    let val = arrLoc.arr.splice(pos, 1)[0]; 
    console.log(pos, left, right, val); 
    // console.log(arrLoc.arr); 
    arrLoc.arr[0] = left > 0 ? left + val[0] : 0; 
    arrLoc.arr[1] = right > 0 ? right + val[1] : 0;
    // arrLoc.arr = [left > 0 ? left + val[0] : 0, right > 0 ? right + val[1] : 0];
  }*/

  /*function explode(arrLoc) {
    let {pos} = arrLoc; 
    let val = arrLoc.arr.splice(pos, 1)[0]; 
    // console.log(pos, val); 
    let left = pos - 1 < 0 ? -1 : arrLoc.arr[pos-1]; 
    let right = arrLoc.arr[pos] ? arrLoc.arr[pos] : -1; 
    // if (Array.isArray(right)) right = -1; 
    arrLoc.arr[0] = left > -1 ? left + val[0] : 0; 
    arrLoc.arr[1] = right > -1 ? right + val[1] : 0;
    let out = arrLoc.source;
    if (left === -1) {
      let tmp = arrLoc.arr[0]; 
      arrLoc.arr[0] = '*'; 
      // console.log(arrLoc.source); 
      let str = JSON.stringify(out); 
      let substr = str.slice(0, str.indexOf('"*"')); 
      let nums = substr.match(/\d+/g);
      // console.log(substr); 
      // console.log(nums); 
      if (nums && nums.length > 0) {
        let ind = substr.lastIndexOf(nums[nums.length-1]); 
        str = str.slice(0, ind) + (parseInt(nums[nums.length-1]) + val[0]) + str.slice(ind + nums[nums.length-1].length); 
        // console.log(str); 
      }
      str = str.replace('"*"', tmp); 
      out = JSON.parse(str); 
    } 

    if (right === -1) {
      let tmp = arrLoc.arr[1]; 
      arrLoc.arr[1] = '*'; 
      // console.log(arrLoc.source); 
      let str = JSON.stringify(out); 
      let substr = str.slice(str.indexOf('"*"') + 3); 
      let nums = substr.match(/\d+/g);
      // console.log(substr); 
      // console.log(nums); 
      if (nums && nums.length > 0) {
        let ind = substr.indexOf(nums[0]); 
        str = str.slice(0, str.indexOf('"*"') + 3 + ind) + (parseInt(nums[0]) + val[1]) + str.slice(str.indexOf('"*"') + 3 + ind + nums[nums.length-1].length); 
        // console.log(str); 
      }
      str = str.replace('"*"', tmp); 
      out = JSON.parse(str); 
    }

    // console.log(9, JSON.stringify(out)); 
    return out; 
  }/**/

  function explode(arrLoc) {
    let {pos} = arrLoc; 
    let val = arrLoc.arr.splice(pos, 1, 999)[0]; 
    let out = arrLoc.source;
    if (true) {
      // console.log(arrLoc.source); 
      let str = JSON.stringify(out); 
      let substr = str.slice(0, str.indexOf('999')); 
      let nums = substr.match(/\d+/g);
      // console.log(substr); 
      // console.log(nums); 
      if (nums && nums.length > 0) {
        let ind = substr.lastIndexOf(nums[nums.length-1]); 
        str = str.slice(0, ind) + (parseInt(nums[nums.length-1]) + val[0]) + str.slice(ind + nums[nums.length-1].length); 
        // console.log(str); 
      }
      out = JSON.parse(str); 
    }

      // console.log(arrLoc.source); 
      let str = JSON.stringify(out); 
      let substr = str.slice(str.indexOf('999') + 3); 
      let nums = substr.match(/\d+/g);
      // console.log(substr); 
      // console.log(nums); 
      if (nums && nums.length > 0) {
        let ind = substr.indexOf(nums[0]); 
        str = str.slice(0, str.indexOf('999') + 3 + ind) + (parseInt(nums[0]) + val[1]) + str.slice(str.indexOf('999') + 3 + ind + nums[nums.length-1].length); 
        // console.log(str); 
      }
      str = str.replace('999', '0'); 
      out = JSON.parse(str); 
    

    // console.log(9, JSON.stringify(out)); 
    return out; 
  }

  function checkSplit(arr) {
    for (let i = 0; i < arr.length; i++) {
      let v = arr[i]; 
      if (Array.isArray(v)) {
        let res = checkSplit(v); 
        if (res) {
          return true; 
        }
      } else if (v >= 10) {
        // console.log(v, arr, i); 
        arr[i] = [Math.floor(v/2), Math.ceil(v/2)]; 
        return true; 
      }
    }
    return false; 
  }

  /*
  function reduce(arr) {
    let needExplode = checkNesting(arr); 
    while (needExplode !== false) {
      arr = explode(needExplode); 
      needExplode = checkNesting(arr); 
      let needSplit = checkSplit(arr); 
      while (needSplit && needExplode === false) {
        // console.log(JSON.stringify(arr)); 
        
        needExplode = checkNesting(arr); 
        if (!needExplode) needSplit = checkSplit(arr); 
      }
    }
    return arr; 
  }*/
  function reduce(arr) {
    let done = false; 
    while (!done) {
      let needExplode = checkNesting(arr); 
      if (needExplode) {
        arr = explode(needExplode); 
        needExplode = checkNesting(arr); 
      } else {
        let needSplit = checkSplit(arr); 
        if (!needSplit) done = true; 
      }
    }
    return arr; 
  }

  // console.log('ok'); 
  // let test = [[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]];
  // let test = [[[[[9,8],1],2],3],4];  
  // // let test = [[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]; 
  // console.log('S', JSON.stringify(test)); 
  // test = reduce(test); 
  // console.log('F', JSON.stringify(test)); 
  // return 1; 

  if (input.length > 10) return 1;

  output = input[0]; 
  for (let i = 1; i < input.length; i++) {
    let ar = input[i]; 
    output = add(output, ar); 

    // console.log(output); 
    output = reduce(output); 
    console.log(i, JSON.stringify(output)); 
  }

  console.log(JSON.stringify(output)); 

  return  1;
}; 

// Second part
exports.goldStar = function(inpArr, inpStr) {
  
}; 