// Day 18

/** Comments
 * Problem wasn't too hard, but I unfortunately went down a really poor rabbit hole where I tried to parse the array as an actual array. That was NOT the best approach. 
 * I initially tried to then convert the array into a string to do string manipulation (to avoid having to traverse through brackets), but bug after bug appeared and I ultimately fixed enough bugs to pass [1,1]...[6,6] but not the example immediately below. That one started throwing really weird errors (a bracket got chopped off, or I somehow got numbers so big they were represented in scientific notation, etc.), and I'm not going to try to debug/fix it. 
 * After spending about 2.5 hours day-of and giving up (you can see the original, not working code under original-scripts/18.js), I went to bed and woke up with a new approach in mind: Treat it as a flat array! 
 * The new approach (combined with actually understanding the problem) worked great, and took about 45 minutes to solve part 1 (in an organized format prioritizing code readability over speed). Had I done this first day-of, I would've gotten first on the Mines private leaderboard and almost top 100 globally :p
 */

const rl = require('./rl-tools'); 
// Important, commonly used functions
const range = rl.array.range; 
const sum = rl.array.sum; 

function parseSnail(line) {
  let nums = line.match(/\d+/g).map(r => parseInt(r)); 
  line = line.replace(/\d+/g, '*').split(''); 
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '*') line[i] = nums.shift(); 
  }
  return line; 
}

function add(a, b) {
  return ['[', ...a, ',', ...b, ']']; 
}

function snailToArray(line) {
  return JSON.parse(line.join('')); 
}

function findExplode(line) {
  let bracketStack = 0; 
  for (let i = 0; i < line.length; i++) {
    let c = line[i]; 
    if (c === '[') bracketStack ++; 
    else if (c === ']') bracketStack --;
    else if (c !== ',' && bracketStack > 4) {
      return i; 
    }
  }
  return -1;
}

function trySplit(line) {
  for (let i = 0; i < line.length; i++) {
    let c = line[i]; 
    if (typeof c === 'number' && c >= 10) {
      line.splice(i, 1, '[', Math.floor(c/2), ',', Math.ceil(c/2),']'); 
      return true;
    }
  }
  return false; 
}

function findMatch(array, char, startPos=0, dir=1) {
  for (let i of range(startPos, dir ? array.length : 0)) {
    if (array[i] === char || (char === '_n' && typeof array[i] === 'number')) {
      return i; 
    }
  }
  return -1;
}

function explode(line, pos) {
  // Find bounding brackets
  let leftBound = findMatch(line, '[', pos, 0); 
  let rightBound = findMatch(line, ']', pos, 1); 
  // Remove the bracket, replace with 0
  let removed = line.splice(leftBound, rightBound - leftBound + 1, 0);
  removed = removed.filter(r => typeof r === 'number'); 
  // Perform overflow addition if applicable
  let leftNum = findMatch(line, '_n', leftBound - 1, 0); 
  let rightNum = findMatch(line, '_n', leftBound + 1, 1); 
  if (leftNum) line[leftNum] += removed[0]; 
  if (rightNum) line[rightNum] += removed[1]; 
}

function reduce(line) {
  let needExplode = -1; 
  do {
    needExplode = findExplode(line); 
    if (needExplode !== -1) {
      explode(line, needExplode); 
      // console.log('EX'.magenta, line.join(''));
    } else {
      let hasSplit = trySplit(line); 
      if (hasSplit) {
        // console.log('SP'.green, line.join('')); 
        needExplode = 1; // Must attempt explode again after split 
      }
    }
  } while (needExplode !== -1); 
  return line; 
}

function calcMagnitude(input) {
  if (Array.isArray(input)) {
    return 3 * calcMagnitude(input[0]) + 2 * calcMagnitude(input[1]);
  } else {
    return input; 
  }
}

// First part
exports.silverStar = function(inpArr, inpStr) {
  let input = inpArr.map(r => parseSnail(r)); // If each line is an input

  output = input[0]; 
  for (let i = 1; i < input.length; i++) {
    let ar = input[i]; 
    output = add(output, ar); 

    // console.log(output); 
    console.log(`T${i}`.blue, output.join('')); 
    output = reduce(output); 
  }

  console.log('FINAL'.yellow, output.join('')); 
  return calcMagnitude(snailToArray(output));
}; 

// Second part
exports.goldStar = function(inpArr, inpStr) {
  let input = inpArr.map(r => parseSnail(r)); // If each line is an input


  let maxMag = 0; 
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i+1; j < input.length; j++) {
      let out1 = reduce(add(input[i], input[j])); 
      let out2 = reduce(add(input[j], input[i])); 
      let mag1 = calcMagnitude(snailToArray(out1)); 
      let mag2 = calcMagnitude(snailToArray(out2)); 
      if (mag1 > maxMag) maxMag = mag1; 
      if (mag2 > maxMag) maxMag = mag2;
    }
  }

  // console.log('FINAL'.yellow, output.join('')); 
  return maxMag;
}; 