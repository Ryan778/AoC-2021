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

// Array tests
test(rl.array.new, [5, 0], [0, 0, 0, 0, 0]); 
test(rl.array.new, [4, 'a'], ['a', 'a', 'a', 'a']); 

test(rl.array.sum, [[1, 2, 'aaa', 3, 4, 'b', 5, 'c']], 15); 
test(rl.array.sum, [[1, 2, ['aaa', 3, [4, 'b']], 5, [['c']]]], 15); 

// Number tests
test(rl.number.isPrime, [97], true); 
test(rl.number.isPrime, [169], false); 

// String tests
test(rl.string.count, ['hello world', 'l'], 3); 
test(rl.string.count, ['aaaaaabaaab', 'aa'], 4); 

test(rl.string.fullTrim, ['   1  2    3       4 5 '], '1 2 3 4 5'); 
test(rl.string.fullTrim, ['1      2 3.4 5.6 78   9'], '1 2 3.4 5.6 78 9'); 

// Node v16.6.0+ (replace all, negative indexing)
try {
  assert.equal('Hello World!'.at(-1), '!'); 
  assert.equal('Hello World!'.replaceAll('l', ''), 'Heo Word!'); 
  passed += 2; total += 2; 
} catch (err) {
  console.error(err); 
}

console.log(`Passed ${passed}/${total} tests.`); 