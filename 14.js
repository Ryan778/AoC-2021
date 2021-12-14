// Day 14

/** Comments: 
 * Silver was really good! 
 * Gold was not good! 
 * 
 * Silver went smoothly and w/o any problem, was able to finish and submit it really quickly. 
 * I manually did the subtraction rather than writing it out for this portion. 
 * 
 * On the gold one, I made a mistake with my initialization function that didn't take duplicate letter pairs into account, which meant the test case was perfect but the actual input subtly failed and deviated ever so slightly (and was very hard to catch, because all the pairs were present but in the wrong quantities!). 
 * This took about 20-25 minutes to debug and catch, as I thought I messed up the pair insertion (poly()) function and completely overlooked initialization.
 * Line 114 was my original, slightly buggy code, and lines 115-119 were my 30-second fix. 
 */

const rl = require('./rl-tools'); 
// Important, commonly used functions
const range = rl.array.range; 
const sum = rl.array.sum; 

// First part (Original)
exports.silverStar = function(inpArr, inpStr) {
  // let input = [...inpArr]; // If each line is an input
  // let input = inpStr.split(','); // If first line is input
  // input = inpArr.map(r => parseInt(r)); // Convert entries to ints
  
  let st = inpStr.split('\n\n')[0], rul = inpStr.split('\n\n')[1].split('\n').map(r => r.split(' -> ')); 

  let rules = {}; 
  for (let i of rul) {
    rules[i[0]] = i[1]; 
  }

  // console.log(st, rules); 
  function poly() {
    let nst = st.split(''); 
    for (let i = 1; i < nst.length; i+=2) {
      nst.splice(i, 0, rules[nst[i-1] + nst[i]]); 
    }
    st = nst.join('');
  }

  console.log(st); 
  for (let i of range(0, 10)) poly(); 
  let ct = {}; 
  for (let i of st.split('')) {
    if (ct[i]) ct[i] ++; 
    else ct[i] = 1;
  }

  console.log(ct); 

  return 1;
}; 

/* The following code was a modified, debug version of silver star function used while writing the gold star portion to help me figure out what was wrong with my gold star function. *//*

// First part
exports.silverStar = function(inpArr, inpStr) {
  // let input = [...inpArr]; // If each line is an input
  // let input = inpStr.split(','); // If first line is input
  // input = inpArr.map(r => parseInt(r)); // Convert entries to ints
  
  let st = inpStr.split('\n\n')[0], rul = inpStr.split('\n\n')[1].split('\n').map(r => r.split(' -> ')); 

  let rules = {}; 
  for (let i of rul) {
    rules[i[0]] = i[1]; 
  }

  // console.log(st, rules); 
  function poly() {
    let nst = st.split(''); 
    for (let i = 1; i < nst.length; i+=2) {
      nst.splice(i, 0, rules[nst[i-1] + nst[i]]); 
    }
    st = nst.join('');
    console.log(st.length);
  }

  console.log(st); 
  for (let i of range(0, 2)) poly(); 
  let ct = {}; 
  for (let i of st.split('')) {
    if (ct[i]) ct[i] ++; 
    else ct[i] = 1;
  }

  console.log(ct); 

  return 1;
}; 
*/

// Second part
exports.goldStar = function(inpArr, inpStr) {
  // let input = [...inpArr]; // If each line is an input
  // let input = inpStr.split(','); // If first line is input
  // input = inpArr.map(r => parseInt(r)); // Convert entries to ints
  
  let st = inpStr.split('\n\n')[0], rul = inpStr.split('\n\n')[1].split('\n').map(r => r.split(' -> ')); 

  let rules = {}; 
  for (let i of rul) {
    rules[i[0]] = i[1]; 
  }

  let mc = {}; 
  let schar = st.charAt(0), echar = st.charAt(st.length - 1); 

  // console.log(st, rules); 
  function ini() {
    let nst = st.split(''); 
    for (let i = 1; i < nst.length; i+=1) {
      // mc[nst[i-1] + nst[i]] = 1;
      if (mc[nst[i-1] + nst[i]]) {
        mc[nst[i-1] + nst[i]] ++; 
      } else {
        mc[nst[i-1] + nst[i]] = 1;
      }
    }
    st = nst.join('');
  }
  ini(); 

  // console.log(mc); 

  function poly() {
    let nca = Object.keys(mc); 
    // console.log(rl.array.sum(Object.values(mc))*2+1); 
    let nmc = {}; 
    for (let ct of nca) {
      if (mc[ct] === 0) continue; 
      let v = mc[ct]; 
      // mc[ct] = 0; 

      let n = ct.slice(0, 1) + rules[ct]; 
      if (nmc[n]) nmc[n] += v; 
      else nmc[n] = v;
      n = rules[ct] + ct.slice(1, 2); 
      if (nmc[n]) nmc[n] += v; 
      else nmc[n] = v;
    }
    mc = nmc; 
    // console.log(rl.array.sum(Object.values(mc))*2+1); 
  }

  // console.log(st); 
  for (let i of range(0, 40)) poly(); 
  let ct = {}; 
  for (let i of Object.keys(mc)) {
    let [l1, l2] = i.split(''); 
    let v = mc[i]; 
    // console.log(i, l1, l2, v); 
    if (ct[l1]) ct[l1] += 0.5*v; 
    else ct[l1] = 0.5*v; 
    if (ct[l2]) ct[l2] += 0.5*v; 
    else ct[l2] = 0.5*v; 
    // console.log(ct); 
  }

  ct[schar] += 0.5; 
  ct[echar] += 0.5;
  // for (let i of st.split('')) {
  //   if (ct[i]) ct[i] ++; 
  //   else ct[i] = 1;
  // }

  // console.log(mc); 
  console.log(ct); 
  let ctv = Object.values(ct); 
  return Math.max(...ctv) - Math.min(...ctv);
}; 