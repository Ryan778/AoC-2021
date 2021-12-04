import rl from './rl-tools.js'; 
import { strict as assert } from 'assert';

let passed = 0, total = 0; 
function test(func, args, expected) {
  try {
    assert.deepEqual(func(...args), expected);
    passed ++; 
  } catch (err) {
    console.error(err); 
  }
  total ++; 
}

test(rl.array.new, [5, 0], [0, 0, 0, 0, 0]); 
test(rl.array.new, [4, 'a'], ['a', 'a', 'a', 'a']); 

test(rl.number.isPrime, [97], true); 
test(rl.number.isPrime, [169], false); 

test(rl.string.count, ['hello world', 'l'], 3); 
test(rl.string.count, ['aaaaaabaaab', 'aa'], 4); 

console.log(`Passed ${passed}/${total} tests.`); 