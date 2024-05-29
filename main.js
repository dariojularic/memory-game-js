import './style.css'

const grid = document.querySelector(".grid");
const result = document.querySelector(".result");
const easyMode = document.querySelector(".easy-mode");
const mediumMode = document.querySelector(".medium-mode");
const hardMode = document.querySelector(".hard-mode");
// const gridCells = document.querySelectorAll(".grid-cell");

class Square{
  constructor(color) {
    this.id = self.crypto.randomUUID();
    this.color = color;
    this.clicked = false;
  }
  
  setIsClicked() {
    this.clicked = true;
  }
}

class SquareManager{
  squareArray;
  constructor() {
    this.squareArray = [];
    this.clickCounter = 0;
    this.difficultyLevel = "easy"
  }

  numberOfSquares(difficultyLevel) {
    if (difficultyLevel === "easy") return 9
    if (difficultyLevel === "medium") return 16
    if (difficultyLevel === "hard") return 25
  }

  setDifficultyLevel(btnValue) {
    if (btnValue === "easy") this.difficultyLevel = "easy"
    if (btnValue === "medium") this.difficultyLevel = "medium"
    if (btnValue === "hard") this.difficultyLevel = "hard"
  } 

  incrementCounter() {
    this.clickCounter++;
  }
  
  resetCounter() {
    this.clickCounter = 0;
  }
  // ovu funkciju ne koristim, jel je mogu koristit u fillArray()?
  addSquare(square) {
    this.squareArray.push(square);
  }
  
  renderSquares() {
    this.squareArray.forEach(square => {
      const cell = document.createElement("div")
      cell.style.backgroundColor = square.color;
      cell.classList.add("grid-cell");
      cell.setAttribute("data-id", square.id)
      grid.appendChild(cell);
    })
  }

  findSquare(squareId) {
    return this.squareArray.find(square => square.id === squareId)
  }
  
  shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
  }
  
  fillArray(levelMode) {
    const colors = ["#ff0000", "#ffff00", "#00ff00", "#0000ff", "#800080", "#dc143c", "#ffd700", "#c0c0c0", "#008080", "#a52a2a", "#ee82ee", "#ff007f", "#30d6d6", "#00ffff", "#808000", "#ff00ff", "#4b0082", "#000000", "#e6e6e6", "#ff9999", "#00bfff", "#90ee90", "#2e8b57", "#ff69b4", "#ffa500"];
    for (let c = 0; c < levelMode; c++) {
      const square = new Square(c);
      square.color = colors[c];
      this.squareArray.push(square);
    }
  }
  
  emptyArray() {
    this.squareArray = []
  }
  
  restartGame() {
    this.squareArray.forEach(square => square.clicked = false)
    this.clickCounter = 0;
  }
}

function displayResult() {
  result.textContent = `Squares clicked:
  ${sqareManager.clickCounter}/${sqareManager.numberOfSquares(sqareManager.difficultyLevel)}`
}

function styleGrid(difficultyLevel) {
  if (difficultyLevel === "easy") {
    grid.style.setProperty("grid-template-columns", "repeat(3, 1fr)");
    grid.style.setProperty("grid-template-rows", "repeat(3, 1fr)");
  } else if (difficultyLevel === "medium") {
    grid.style.setProperty("grid-template-columns", "repeat(4, 1fr)");
    grid.style.setProperty("grid-template-rows", "repeat(4, 1fr)"); 
  } else {
    grid.style.setProperty("grid-template-columns", "repeat(5, 1fr)");
    grid.style.setProperty("grid-template-rows", "repeat(5, 1fr)");
  }
}

const sqareManager = new SquareManager();
sqareManager.fillArray(sqareManager.numberOfSquares(sqareManager.difficultyLevel))
sqareManager.renderSquares()
displayResult()
// jel ok ovdje stavit querySelector? ako je prije renderSquares, ne radi
// const gridCells = document.querySelectorAll(".grid-cell");

// dovrsit ovu finkciju -- problem je sto na renderSqares() idu novi divovi
// gridCells.forEach(cellDiv => {
//   cellDiv.addEventListener("click", () => {
//     console.log(cellDiv)
//     console.log(gridCells)
//   })
// })

grid.addEventListener("click", (event) => {
  if (event.target.className === "grid-cell") {
    const cell = sqareManager.findSquare(event.target.getAttribute("data-id"))
    if (cell.clicked === false) {
      cell.setIsClicked()
      sqareManager.incrementCounter();
      sqareManager.shuffleArray(sqareManager.squareArray);
      grid.innerHTML = "";
      sqareManager.renderSquares()
      displayResult()
    } else {
      sqareManager.restartGame()
      displayResult()
      alert("You lose! Try again!");
    }
    
    if(sqareManager.clickCounter >= sqareManager.numberOfSquares(sqareManager.difficultyLevel)) {
      sqareManager.restartGame()
      alert("You win! Play again!")
      displayResult()
    }
  }
})

easyMode.addEventListener("click", (event) => {
  sqareManager.setDifficultyLevel(event.target.value)
  sqareManager.emptyArray()
  sqareManager.fillArray(sqareManager.numberOfSquares(sqareManager.difficultyLevel))
  grid.innerHTML = "";
  styleGrid(sqareManager.difficultyLevel)
  sqareManager.renderSquares()
  sqareManager.resetCounter()
  displayResult()
})

mediumMode.addEventListener("click", (event) => {
  sqareManager.setDifficultyLevel(event.target.value)
  sqareManager.emptyArray()
  sqareManager.fillArray(sqareManager.numberOfSquares(sqareManager.difficultyLevel))
  grid.innerHTML = "";
  sqareManager.renderSquares()
  styleGrid(sqareManager.difficultyLevel)
  sqareManager.resetCounter()
  displayResult()
})

hardMode.addEventListener("click", (event) => {
  sqareManager.setDifficultyLevel(event.target.value)
  sqareManager.emptyArray()
  sqareManager.fillArray(sqareManager.numberOfSquares(sqareManager.difficultyLevel));
  grid.innerHTML = "";
  sqareManager.renderSquares()
  styleGrid(sqareManager.difficultyLevel)
  sqareManager.resetCounter()
  displayResult()
})