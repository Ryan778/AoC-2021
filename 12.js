// Day 12

/** Comments: 
 * First part went well! Set up a simple recursive function to traverse through the graph, got the problem pretty quickly. 
 * Second part did not go as well due to me making a really small bug that took about 20 minutes to catch: When I marked a path as "small cave visited twice", I marked it for not just that branch but also every other branch (i.e., "start,A,c,A,b,A,c,A,end" would get missed because at "start,A,c,A", choosing "c" next would mark BOTH "start,A,c,A,c" and (erroneously) "start,A,c,A,b" as having "already visited a small cave twice"). Not fun to debug!
 * The broken implementation can be seen (commented out) on lines 113-115, the fixed implementation can be seen on lines 117 and 119 (only marking that specific path as "already visited a small cave twice" rather than every path left in the array "ar"). 
 */

 const rl = require('./rl-tools'); 
 // Important, commonly used functions
 const range = rl.array.range; 
 const sum = rl.array.sum; 
 
 // First part
 exports.silverStar = function(inpArr, inpStr) {
   let input = [...inpArr]; // If each line is an input
   // let input = inpStr.split(','); // If first line is input
   // input = inpArr.map(r => parseInt(r)); // Convert entries to ints

  //  if (input.length > 10) return 1; 
   
   let paths = {}; 
   for (let i of input) {
    let [s, f] = i.split('-'); 
    if (paths[s]) {
      paths[s].push(f); 
    } else {
      paths[s] = [f]; 
    }
    if (paths[f]) {
      paths[f].push(s); 
    } else {
      paths[f] = [s]; 
    }
    
   }

   let tr = new Set(); 
   function next(cur, chain) {
    if (cur === 'end') {
      chain += '(end)'; 
      tr.add(chain); 
      return; 
    }

    let ar = paths[cur]; 
    chain = chain + (`(${cur})`);
    // console.log(chain, cur); 
    for (let p of ar) {
      if (p.toLowerCase() === p) {
        if (chain.indexOf(`(${p})`) !== -1) {
          continue; 
        }
      }
      next(p, chain); 
    }
   }
   next('start', '(_s)'); 

   let pc = 0; 

  //  console.log(tr); 
 
   return tr.size;
 }; 
 
 // Second part
 exports.goldStar = function(inpArr, inpStr) {
  let input = [...inpArr]; // If each line is an input
  // let input = inpStr.split(','); // If first line is input
  // input = inpArr.map(r => parseInt(r)); // Convert entries to ints

  // if (input.length > 10) return 1; 
  
  let paths = {}; 
  for (let i of input) {
   let [s, f] = i.split('-'); 
   if (paths[s]) {
     paths[s].push(f); 
   } else {
     paths[s] = [f]; 
   }
   if (paths[f]) {
     paths[f].push(s); 
   } else {
     paths[f] = [s]; 
   }
   
  }

  let tr = new Set(); 
  function next(cur, chain) {
   if (cur === 'end') {
     chain += '(end)'; 
    //  chain = chain.replaceAll(')(', ',').replace(')','').replace('_s', '').replace('!','').replace('(,', '');
     tr.add(chain); 
     return; 
   }

   let ar = paths[cur]; 
   chain = chain + (`(${cur})`);
   // console.log(chain, cur); 
   for (let p of ar) {

    // if (chain.indexOf('(start)(A)(b)(A)(c)(A)') !== -1) {console.log(9, chain, p, ar)}
    //  console.log(p); 
     if (p.toLowerCase() === p) {
       if (p === 'start') continue; 
      //  if (chain.indexOf('(start)(A)(c)(A)(b)') !== -1) console.log(3, chain, p)
       if (chain.indexOf(`(${p})`) !== -1) {
        //  if (rl.string.count(chain, `(${p})`) === 1 && chain.slice(0, 1) !== '!') {
        if (chain.slice(0, 1) !== '!') {
          // if (chain.indexOf(`(${p})`)) {
          //   chain = '!' + chain; 
          // }
          // console.log(2, chain, p)
          next(p, '!'+chain); 
          // return;
          continue;
         }
         else {
          // if (chain.indexOf('(start)(A)(c)(A)(b)') !== -1) console.log(1, chain, p)
          continue; 
         }
       }
     } else {
      //  console.log(5, chain, p)
     }
     next(p, chain); 
   }
  }
  next('start', ''); 

  let pc = 0; 

  // console.log(tr); 

  return tr.size;
 }; 