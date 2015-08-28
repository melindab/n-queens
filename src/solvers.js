/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = [];

  for (var i = 0; i < n; i++) {
    solution[i] = [];
    for (var j = 0; j < n; j++) {
      if (i === j) {
        solution[i][j] = 1;
      } else {
        solution[i][j] = 0;
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1; 
  for (var i = 1; i <= n; i++) {
    solutionCount *= i;
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var rows = [];
  var cols = [];
  var majors = [];
  var minors = [];
  
  var generateBoard = function() {
    solution = new Board({n:n}).rows();
    for (var i = 0; i < n; i++) {
      var row = rows[i];
      var col = cols[i];
      solution[row][col] = 1;
    }
  };
  
  var findBoard = function() {
    for (var i = 0; i < n; i++) {
      if (rows.indexOf(i) >= 0) {
        continue;
      }
      for (var j = 0; j < n; j++) {
        if (cols.indexOf(j) >= 0 ||
          majors.indexOf(j - i) >= 0 ||
          minors.indexOf(j + i) >= 0
          ) {
          continue;
        }
        rows.push(i);
        cols.push(j);
        majors.push(j - i);
        minors.push(j + i);
        if (rows.length === n) {
          generateBoard();
          return;
        }
        findBoard();
        rows.pop();
        cols.pop();
        majors.pop();
        minors.pop();
      }
    }
    solution = new Board({n:n}).rows();
  };
  
  findBoard();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var rows = [];
  var cols = [];
  var majors = [];
  var minors = [];
  
  var countBoards = function() {
    for (var i = 0; i < n; i++) {
      if (rows.indexOf(i) >= 0) {
        continue;
      }
      for (var j = 0; j < n; j++) {
        if (cols.indexOf(j) >= 0 ||
          majors.indexOf(j - i) >= 0 ||
          minors.indexOf(j + i) >= 0
          ) {
          continue;
        }
        rows.push(i);
        cols.push(j);
        majors.push(j - i);
        minors.push(j + i);
        if (rows.length === n) {
          solutionCount++;
          console.log(rows);
          console.log(cols);
          return;
        }
        countBoards();
        rows.pop();
        cols.pop();
        majors.pop();
        minors.pop();
      }
    }
  };

  countBoards();

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
