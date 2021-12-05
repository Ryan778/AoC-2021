exports.array = {
  /**
   * Creates and returns a filled array
   * @param {integer} size - size of array to create
   * @param {*} val - what to fill the array with
   * @returns {array}
   */
  new: (size=1, val) => {
    return new Array(size).fill(val); 
  }, 
  /**
   * Returns the sum of all integers in an array (or nested array). Ignores non-number values.
   * @param {array} input 
   * @returns number
   */
  sum: function (input) {
    input = input.flat(Infinity); // Flatten array
    return input.reduce((a, c) => {
      if (typeof c === 'number') return a + c; 
      return a; 
    }, 0); 
  }
}

exports.string = {
  /**
   * Counts how many times (substr) occurs in (input)
   * @param {string} input - input string
   * @param {string} substr - what string to look for
   * @returns {number}
   */
  count: (input, substr) => {
    let res = 0, nextInd = input.indexOf(substr); 
    while (nextInd !== -1) {
      res ++; 
      input = input.slice(nextInd + substr.length); 
      nextInd = input.indexOf(substr);
    }
    return res; 
  }, 
  /**
   * Removes leading spaces, trailing spaces, and extra spaces (2+) from a string
   * @param {string} input - input string
   * @returns {string}
   */
  fullTrim: (input) => {
    input = input.replace(/\ \ +/g, ' '); 
    return input.trim(); 
  }
}

exports.number = {
  /**
   * Checks whether a given input is prime
   * @param {integer} n - integer to test
   * @returns {boolean}
   */
  isPrime: (n) => {
    let sn = Math.floor(Math.sqrt(n)); 
    for(let i = 2; i <= sn; i++) {
      if(n % i === 0) return false;
    }
    return n > 1;
  }
}