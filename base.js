require('dotenv').config(); 

const YEAR = process.env.AOC_YEAR;
const fetch = require('node-fetch'); 

const fs = require('fs'); 
const path = require('path'); 
const colors = require('colors'); 
const cheerio = require('cheerio'); 

console.log(`[Advent of Code]`.green.bold); 

let pnum = process.argv[2] ? parseInt(process.argv[2]) : 0; 

if (pnum === 0) {
  let day = new Date(Date.now() + (7500000)).getDate(); 
  console.log(`Day "0" provided, using today's day (${day})`.cyan)
  pnum = day;
}

console.log(`Running Day ${pnum}:`.cyan); 

if (!fs.existsSync(`${pnum}.js`)) {
  console.error(`Error: Script ${pnum}.js not found`.red)
  process.exit(1); 
}

if (!fs.existsSync(path.join('inputs', `${pnum}.txt`))) {
  console.info(`Input file ${pnum}.txt not found, attempting to download...`.yellow); 
  fetchInput(pnum); 
} else {
  let input = fs.readFileSync(path.join('inputs', `${pnum}.txt`), 'utf-8'); 
  runCode(pnum, input); 
}

async function fetchInput(day) {
  console.log(`Fetching... (https://adventofcode.com/${YEAR}/day/${day}/input)`)
  let resp = await fetch(`https://adventofcode.com/${YEAR}/day/${day}/input`, {
    "headers": {
      "cache-control": "max-age=0",
      "cookie": `session=${process.env.AOC_COOKIE}`
    },
    "body": null,
    "method": "GET"
  }).then(res => {
    if (res.status !== 200) {
      console.error(`Error: Failed to fetch input for day ${pnum} (status code ${res.status})`.red); 
      process.exit(1); 
    }
    return res; 
  }); 
  let text = await resp.text(); 
  console.log(`Done, success!`); 
  fs.writeFileSync(path.join('inputs', `${day}.txt`), text, 'utf-8'); 
  runCode(day, text); 
}

async function fetchTestInput(day) {
  console.log(`Fetching... (https://adventofcode.com/${YEAR}/day/${day})`)
  let resp = await fetch(`https://adventofcode.com/${YEAR}/day/${day}`, {
    "headers": {
      "cache-control": "max-age=0",
      "cookie": `session=${process.env.AOC_COOKIE}`
    },
    "body": null,
    "method": "GET"
  }).then(res => {
    if (res.status !== 200) {
      console.error(`Error: Failed to fetch test cases for day ${pnum} (status code ${res.status})`.red); 
      process.exit(1); 
    }
    return res; 
  }); 
  let text = await resp.text(); 
  console.log('Done, success!'); 

  let $ = cheerio.load(text); 
  let p1 = $('article.day-desc').first(), p2 = false; 
  if ($('article.day-desc').length >= 2) {
    p2 = $('article.day-desc').last(); 
  } 
  let codeBlocks1 = cheerio.load(p1.html())('code'); 
  // let sampleInput = codeBlocks1.first().text(); 
  let sampleInput = cheerio.load(p1.html())('pre code').first().text();
  let testOutput1 = codeBlocks1.last().text(); 
  let testOutput2 = false; 

  if (p2) {
    testOutput2 = cheerio.load(p2.html())('code').last().text(); 
  }

  return {
    input: sampleInput.trim(), 
    answers: [testOutput1, testOutput2]
  }
  // console.log(sampleInput, testOutput1, testOutput2); 
  // console.log(sampleInput); 
  // console.log(.first().text())
}

// fetchTestInput(1); 

async function getTestInput(day, type) {
  let data; 
  if (!fs.existsSync(path.join('inputs', `${day}t.txt`))) {
    data = await fetchTestInput(day); 
    fs.writeFileSync(path.join('inputs', `${day}t.txt`), `${data.answers[0]};${data.answers[1]?data.answers[1]:'<n/a>'}\n${data.input}`, 'utf-8'); 
  } else {
    let rawData = fs.readFileSync(path.join('inputs', `${day}t.txt`), 'utf-8'); 
    let fl = rawData.slice(0, rawData.indexOf('\n')); // first line
    data = {
      input: rawData.slice(rawData.indexOf('\n') + 1).trim(), 
      answers: fl.split(';')
    }; 
    if (data.answers[1] === '<n/a>') {
      if (type === 1) {
        data = await fetchTestInput(day); 
        fs.writeFileSync(path.join('inputs', `${day}t.txt`), `${data.answers[0]};${data.answers[1]?data.answers[1]:'<n/a>'}\n${data.input}`, 'utf-8'); 
      } else {
        data.answers[1] = false; 
      }
    }
  }
  return data; 
}

async function runCode(day, input) {
  input = input.trim(); // Remove whitespace if there is any

  let inputArr = input.split('\n'); 
  let inputArr2 = [...inputArr]; 

  console.log(`Input loaded: ${input.length} chars, ${inputArr.length} lines`);
  let firstLine = input.slice(0, input.indexOf('\n')); 
  console.log(`First line: ${firstLine.length < 512 ? firstLine.yellow : (firstLine.slice(0, 512) + '...').yellow} ${`(${firstLine.length} char(s))`.green}`); 

  let script = require(`./${day}.js`); 
  console.log(`<Task 1>`.cyan.underline); 
  
  let silver = script.silverStar(inputArr, input); 
  console.log(`${'Output:'.cyan} ${(typeof silver === 'string' || typeof silver === 'number') ? silver.toString().magenta : 'null'}`); 

  let testInput = await getTestInput(day, 0); 

  if (typeof silver === 'string' || typeof silver === 'number') {
    let testOutput = script.silverStar(testInput.input.split('\n'), testInput.input); 
    if (testOutput.toString() === testInput.answers[0]) {
      console.log(`${'[OK]'.green} ${'Test Case Passed'.cyan} ${`Expected and Got ${testOutput}`}`);
    } else {
      console.log(`${'[!!]'.red} ${'Test Case Failed'.cyan} ${`Expected: ${testInput.answers[0]}, Got: ${testOutput}`.red}`);
    }
  } else {
    console.log(`${'[OK]'.yellow} ${'Test Case Skipped'.cyan} (No Output)`);
  }
  
  console.log(`<Task 2>`.cyan.underline); 
  
  let gold = script.goldStar(inputArr2, input); 
  console.log(`${'Output:'.cyan} ${(typeof gold === 'string' || typeof gold === 'number') ? gold.toString().magenta : 'null'}`); 

  if (typeof gold === 'string' || typeof gold === 'number') {
    if(testInput.answers[1] === false) {
      testInput = await getTestInput(day, 1); 
    }
    let testOutput = script.goldStar(testInput.input.split('\n'), testInput.input); 
    if (testOutput.toString() === testInput.answers[1]) {
      console.log(`${'[OK]'.green} ${'Test Case Passed'.cyan} ${`Expected and Got ${testOutput}`}`);
    } else {
      console.log(`${'[!!]'.red} ${'Test Case Failed'.cyan} ${`Expected: ${testInput.answers[1]}, Got: ${testOutput}`.red}`);
    }
  } else {
    console.log(`${'[OK]'.yellow} ${'Test Case Skipped'.cyan} (No Output)`);
  }
}