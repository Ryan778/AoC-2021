// Day 17

/** Comments: 
 * Very easy and straightforward. 
 * Probably could've worked something out other than hardcoding bounds, but a quick peek at the input made it seem like hardcoding would've been efficient enough to do this quickly (it was). 
 * Started three minutes late, in hindsight that was a mistake -- as I could've leaderboarded if I wasn't three minutes late :')
 */

const rl = require('./rl-tools'); 
// Important, commonly used functions
const range = rl.array.range; 
const sum = rl.array.sum; 

// First part
exports.silverStar = function(inpArr, inpStr) {
  // let input = [...inpArr]; // If each line is an input
  // let input = inpStr.split(','); // If first line is input
  // input = inpArr.map(r => parseInt(r)); // Convert entries to ints
  
  let input = inpStr.split(' '); 
  // console.log(input); 
  let targetX = input[2].slice(2).split('..').map(r => parseInt(r)); 
  let targetY = input[3].slice(2).split('..').map(r => parseInt(r)); 

  function test(xvel, yvel) {
    let posx = 0, posy = 0, maxy = 0; 
    while (posy >= targetY[0] && posx <= targetX[1]) {
      posx += xvel; 
      posy += yvel; 

      if (posy > maxy) maxy = posy; 

      if (posx >= targetX[0] && posx <= targetX[1] && posy >= targetY[0] && posy <= targetY[1]) {
        return [true, maxy]; 
      }

      if (xvel > 0) xvel --; 
      else if (xvel < 0) xvel ++; 
      yvel --; 
    }
    return [false, maxy]; 
  }

  console.log(targetX, targetY);
  // console.log(test(6, 9)); 

  let maxheight = 0; 
  for (let i of range(0, 1000)) {
    for (let j of range(0, 1000)) {
      let res = test(i, j); 
      if(res[0]) {
        if (res[1] > maxheight) {
          maxheight = res[1]; 
        }
      }
    }
  }

  return maxheight;
}; 

// Second part
exports.goldStar = function(inpArr, inpStr) {
  let input = inpStr.split(' '); 
  // console.log(input); 
  let targetX = input[2].slice(2).split('..').map(r => parseInt(r)); 
  let targetY = input[3].slice(2).split('..').map(r => parseInt(r)); 

  function test(xvel, yvel) {
    let posx = 0, posy = 0, maxy = 0; 
    while (posy >= targetY[0] && posx <= targetX[1]) {
      posx += xvel; 
      posy += yvel; 

      if (posy > maxy) maxy = posy; 

      if (posx >= targetX[0] && posx <= targetX[1] && posy >= targetY[0] && posy <= targetY[1]) {
        return [true, maxy]; 
      }

      if (xvel > 0) xvel --; 
      else if (xvel < 0) xvel ++; 
      yvel --; 
    }
    return [false, maxy]; 
  }

  console.log(targetX, targetY);
  // console.log(test(6, 9)); 

  let maxheight = 0, poscount = 0;; 
  for (let i of range(0, 1000)) {
    for (let j of range(-1000, 1000)) {
      let res = test(i, j); 
      if(res[0]) {
        poscount ++; 
        if (res[1] > maxheight) {
          maxheight = res[1]; 
        }
      }
    }
  }

  return poscount;
}; 