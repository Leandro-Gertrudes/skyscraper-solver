let grid = Array.from({ length: 4 }, () => Array(4).fill(0));

// Visibilitys
function getVisibilityValues() {
    return {
      top: Array.from(document.getElementById('top').value).map(Number),
      bottom: Array.from(document.getElementById('bottom').value).map(Number),
      left: Array.from(document.getElementById('left').value).map(Number),
      right: Array.from(document.getElementById('right').value).map(Number)
    };
}

// tester
function checkVisibility(arr) {
  let visibleCount = 0;
  let maxHeight = 0;
  for (let num of arr) {
    if (num > maxHeight) {
      visibleCount++;
      maxHeight = num;
    }
  }
  return visibleCount;
}

// tester
function checkAllVisibility(grid, visibility) {
    for (let i = 0; i < 4; i++) {
      if (
        checkVisibility(grid.map(row => row[i])) !== visibility.top[i] ||
        checkVisibility([...grid].reverse().map(row => row[i])) !== visibility.bottom[i] ||
        checkVisibility(grid[i]) !== visibility.left[i] ||
        checkVisibility([...grid[i]].reverse()) !== visibility.right[i]
      ) {
        return false;
      }
    }
    return true;
  }

// double numbers?
function isValid(grid) {
  for (let i = 0; i < 4; i++) {
    let rowSet = new Set(), colSet = new Set();
    for (let j = 0; j < 4; j++) {
      if (rowSet.has(grid[i][j]) || colSet.has(grid[j][i]))
            return false;

      if (grid[i][j]) rowSet.add(grid[i][j]);
      if (grid[j][i]) colSet.add(grid[j][i]);
    }
  }
  return true;
}

// Backtracking
function solve(grid, visibility) {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 4; num++) {
          grid[row][col] = num;
          if (isValid(grid) && solve(grid, visibility)) {
            return true;
          }
          grid[row][col] = 0;
        }
        return false;
      }
    }
  }
  return checkAllVisibility(grid, visibility);
}

// started function 
function solveSudoku() {
  const visibility = getVisibilityValues();
  if (solve(grid, visibility)) {
    document.getElementById('result').textContent = grid.map(row => row.join(' ')).join('\n');

    document.querySelector(".solve").style.display = 'none';
    document.querySelector(".new").style.display = 'inline';
    document.querySelectorAll('.visibility-inputs input').forEach(input => {
        input.readOnly = true;
        input.style.opacity = 0.3
      });
      
} else {
    document.getElementById('result').textContent = 'Error: Invalid input or solution not found.';
  }
}

function refresh(){
    window.location.reload();
}

//Dream of Californicaaattiooooooon