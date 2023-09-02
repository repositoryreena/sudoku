let solvedGrid = [];

function generateSudoku() {
    const size = 9;
    const grid = Array.from({ length: size }, () => Array(size).fill(0));

    function canPlaceNumber(row, col, num) {
        for (let i = 0; i < size; i++) {
            if (grid[row][i] === num || grid[i][col] === num) {
                return false;
            }
        }

        const boxStartRow = Math.floor(row / 3) * 3;
        const boxStartCol = Math.floor(col / 3) * 3;
        for (let i = boxStartRow; i < boxStartRow + 3; i++) {
            for (let j = boxStartCol; j < boxStartCol + 3; j++) {
                if (grid[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    function solveSudoku() {
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (grid[row][col] === 0) {
                    for (let num = 1; num <= size; num++) {
                        if (canPlaceNumber(row, col, num)) {
                            grid[row][col] = num;
                            if (solveSudoku()) {
                                return true;
                            }
                            grid[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    const startRow = Math.floor(Math.random() * size);
    const startCol = Math.floor(Math.random() * size);
    grid[startRow][startCol] = Math.floor(Math.random() * size) + 1;
    solveSudoku();

    const numCluesToRemove = 45;
    for (let i = 0; i < numCluesToRemove; i++) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        grid[row][col] = 0;
    }

    solvedGrid = JSON.parse(JSON.stringify(grid));
    return grid;
}

function displaySudokuGrid() {
    const sudokuTable = document.getElementById("sudoku-grid");
    sudokuTable.innerHTML = "";

    const grid = generateSudoku();

    for (let row = 0; row < 9; row++) {
        const tr = document.createElement("tr");
        for (let col = 0; col < 9; col++) {
            const td = document.createElement("td");
            if (grid[row][col] !== 0) {
                td.textContent = grid[row][col];
                td.classList.add("fixed");
            } else {
                const input = document.createElement("input");
                input.type = "text";
                input.maxLength = 1;
                input.classList.add("editable");
                td.appendChild(input);
            }
            tr.appendChild(td);
        }
        sudokuTable.appendChild(tr);
    }
}

function checkSudokuSolution() {
    const inputs = document.querySelectorAll(".editable");
    const userGrid = [];
    inputs.forEach((input, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        const value = input.value ? parseInt(input.value) : 0;
        userGrid[row] = userGrid[row] || [];
        userGrid[row][col] = value;
    });

    // Compare the user's input against the solved grid
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const userValue = userGrid[row][col];
            const solvedValue = solvedGrid[row][col];
            if (userValue !== solvedValue) {
                alert("Sorry, that's not the correct solution. Please check your numbers.");
                return;
            }
        }
    }

    alert("Congratulations! You've solved the Sudoku puzzle.");
}

window.addEventListener('load', () => {
    displaySudokuGrid();
    const checkButton = document.getElementById("check-button");
    checkButton.addEventListener("click", checkSudokuSolution);

    const generateButton = document.getElementById("generate-button");
    generateButton.addEventListener("click", displaySudokuGrid);
});
