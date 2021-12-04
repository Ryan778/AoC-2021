require('dotenv').config(); 

const YEAR = process.env.AOC_YEAR;
const fetch = require('node-fetch'); 

const fs = require('fs'); 
const colors = require('colors'); 

console.log(`[Advent of Code]`.green); 

let pnum = process.argv[2] ? parseInt(process.argv[2]) : 0; 

if (pnum === 0) {
  let day = new Date(Date.now() + (7200000)).getDate(); 
  console.log(`Day "0" provided, using today's day (${day})`.cyan)
  pnum = day;
}

console.log(`Running Day ${pnum}:`.cyan); 

if (!fs.existsSync(`${pnum}.js`)) {
  console.error(`Error: Script ${pnum}.js not found`.red)
  process.exit(1); 
}

if (!fs.existsSync(`${pnum}.txt`)) {
  // console.error(`Error: Input file ${pnum}.txt not found`.red)
  // process.exit(1); 
  console.info(`Input file ${pnum}.txt not found, attempting to download...`.yellow); 
  fetchInput(pnum); 
} else {
  let input = fs.readFileSync(`${pnum}.txt`, 'utf-8'); 
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
  }); 
  /*.then(r => {
    r => r.text(); 
  }).then(body => {
    console.log(body); 
  });*/
  let text = await resp.text(); 
  console.log(`Done. `); 
  fs.writeFileSync(`${day}.txt`, text, 'utf-8'); 
  runCode(day, text); 
}

function runCode(day, input) {
  let inputArr = input.split('\n'); 
  console.log(`Input loaded: ${input.length} chars, ${inputArr.length} lines`);
  let firstLine = input.slice(0, input.indexOf('\n')); 
  console.log(`First line: ${firstLine.yellow} ${`(${firstLine.length} char(s))`.green}`); 
  let script = require(`./${day}.js`); 
  console.log(`<Task 1>`.cyan); 
  console.log(script.silverStar(inputArr, input)); 
  console.log(`<Task 2>`.cyan); 
  console.log(script.goldStar(inputArr, input)); 
}