// Day 4

const rl = require('./rl-tools'); 

function isBingo(board) {
  // for (let i = 0; i < 5; i++) {
  //   // if (board[i] === rl.array.new(5, 'X')) {
  //   //   return true; 
  //   // }
    let n = [0, 1, 2, 3, 4]; 
  //   let rc = 0; 
  //   for (let row of n) {
  //     if ()


  //     let col = true; 
  //     if (board[row][i] === 'X') {
  //       col = false; 
  //     }
  //     if (col) return true; 
  //   }
  // }
  // return false; 
  for (let i of [0, 1, 2, 3, 4]) {
    let m = 1, m2 = 1; 
    for (let j of n) {
      if (board[i][j] !== 'X') {
        m = 0; 
      } 
      if (board[j][i] !== 'X') {
        m2 = 0; 
      }
    }
    if (m || m2) {
      return true; 
    }
  }
  return false; 
}

// First part
exports.silverStar = function(inp, inpStr) {
  let l = inp[0].length; 
  let inp2 = [...inp]; 

  inpStr = inpStr.slice(0, -1); 
  let boards = inpStr.split('\n\n').slice(1) ; 
  boards = boards.map(r => r.split('\n').map(r =>r.replace(/\W{2}/g, ' ').replace(/^\W/, '').split(' ').map(r => parseInt(r)))); 

  // console.log(boards); 

  let moves = inp[0].split(','); 

  let bf = false; 
  for (let move of moves) {
    move = parseInt(move); 
    for (let board of boards) {
      for (let row of board) {
        // console.log(row); 
        if (row.indexOf(move) !== -1) {
          row[row.indexOf(move)] = 'X'; 
        } 
      }
      if (isBingo(board)) {
        console.log('BINGO! '); 
        console.log('called: ', move); 
        console.log(board); 

        let val = board.reduce((a, c) => {
          return a + c.reduce((a2, c2) => {
            
            return a2 + ((c2 !== 'X') ? c2 : 0); 
          }, 0); 
        }, 0); 

        console.log(val); 
        return val*move; 

        bf = true; 
        break; 
      }
      if (bf) break; 
    }
    if (bf) break; 
  }

  // console.log(boards); 

  return  ;
}; 

// Second part
exports.goldStar = function(inp, inpStr) {
  let l = inp[0].length; 
  let inp2 = [...inp]; 

  inpStr = inpStr.slice(0, -1); 
  let boards = inpStr.split('\n\n').slice(1) ; 
  boards = boards.map(r => r.split('\n').map(r =>r.replace(/\W{2}/g, ' ').replace(/^\W/, '').split(' ').map(r => parseInt(r)))); 

  // console.log(boards); 

  let moves = inp[0].split(','); 

  let bf = false; 
  for (let move of moves) {
    move = parseInt(move); 
    for (let i = 0; i < boards.length; i++) {
      let board = boards[i]; 

      for (let row of board) {
        // console.log(row); 
        if (row.indexOf(move) !== -1) {
          row[row.indexOf(move)] = 'X'; 
        } 
      }
      if (isBingo(board)) {
        // console.log('BINGO! '); 
        // console.log('called: ', move); 
        // console.log(board); 

        if (boards.length > 1) {
          // console.log(boards[i]); 
          boards.splice(i, 1); 
          i -= 1; 
          continue; 
          // continue; 
        } else {
          console.log('LAST BINGO'); 
          // console.log(board); 

          console.log('called: ', move); 
          console.log(board); 
  
          let val = board.reduce((a, c) => {
            return a + c.reduce((a2, c2) => {
              
              return a2 + ((c2 !== 'X') ? c2 : 0); 
            }, 0); 
          }, 0); 
  
          console.log(val); 
          return val*move; 
        }
        
      }
    }
  }

  // console.log(boards); 

  return  ;
}; 