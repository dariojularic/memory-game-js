import './style.css'

const grid = document.querySelector(".grid");
const result = document.querySelector(".result");
const easyMode = document.querySelector(".easy-mode");
const mediumMode = document.querySelector(".medium-mode");
const hardMode = document.querySelector(".hard-mode");

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
    this.numberOfSquaresEasy = 9;
    this.numberOfSquaresMedium = 16;
    this.numberOfSquaresHard = 25;
    this.difficultyLevel = "easy"
  }

  setDifficultyLevelEasy() {
    this.difficultyLevel = "easy"
  }
  
  setDifficultyLevelMedium() {
    this.difficultyLevel = "medium"
  }

  setDifficultyLevelHard() {
    this.difficultyLevel = "hard"
  }

  incrementCounter() {
    this.clickCounter++;
  }

  resetCounter() {
    this.clickCounter = 0;
  }

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
    const colors = ["#ff0000", "#ffff00", "#00ff00", "#0000ff", "#800080", "#dc143c", "#ffd700", "#c0c0c0", "#008080", "#a52a2a", "#ee82ee", "#ff007f", "#40ffff", "#00ffff", "#808000", "#ff00ff", "#4b0082", "#000000", "#ffffff", "#ff9999", "#00bfff", "#90ee90", "#2e8b57", "#ff69b4", "#ffa500"];
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

function displayResultEasy() {
  result.textContent = `Squares clicked: ${sqareManager.clickCounter}/${sqareManager.numberOfSquaresEasy}`
}

function displayResultMedium() {
  result.textContent = `Squares clicked: ${sqareManager.clickCounter}/${sqareManager.numberOfSquaresMedium}`
}

function displayResultHard() {
  result.textContent = `Squares clicked: ${sqareManager.clickCounter}/${sqareManager.numberOfSquaresHard}`
}

const sqareManager = new SquareManager();
sqareManager.fillArray(sqareManager.numberOfSquaresEasy)
sqareManager.renderSquares()

grid.addEventListener("click", (event) => {
  if (event.target.className === "grid-cell") {
    const cell = sqareManager.findSquare(event.target.getAttribute("data-id"))
    if (cell.clicked === false) {
      cell.setIsClicked()
      sqareManager.incrementCounter();
      result.textContent = `Squares clicked: ${sqareManager.clickCounter}/12`;
      sqareManager.shuffleArray(sqareManager.squareArray);
      grid.innerHTML = "";
      sqareManager.renderSquares()
    } else {
      sqareManager.restartGame()
      result.textContent = `Squares clicked: ${sqareManager.clickCounter}/12`;
      alert("You lose! Try again!");
    }
    
    if(sqareManager.clickCounter >= 12) {
      sqareManager.restartGame()
      alert("You win! Play again!")
    }
  }
})

easyMode.addEventListener("click", () => {
  sqareManager.emptyArray()
  sqareManager.fillArray(sqareManager.numberOfSquaresEasy)
  // sqareManager.restartGame()
  grid.innerHTML = "";
  grid.style.setProperty("grid-template-columns", "repeat(3, 1fr)");
  grid.style.setProperty("grid-template-rows", "repeat(3, 1fr)");
  sqareManager.renderSquares()
  sqareManager.resetCounter()
  displayResultEasy()
})

mediumMode.addEventListener("click", () => {
  sqareManager.emptyArray()
  sqareManager.fillArray(sqareManager.numberOfSquaresMedium)
  // sqareManager.restartGame()
  grid.innerHTML = "";
  sqareManager.renderSquares()
  grid.style.setProperty("grid-template-columns", "repeat(4, 1fr)");
  grid.style.setProperty("grid-template-rows", "repeat(4, 1fr)");
  sqareManager.resetCounter()
  displayResultMedium()
  
})

hardMode.addEventListener("click", () => {
  sqareManager.emptyArray()
  sqareManager.fillArray(sqareManager.numberOfSquaresHard);
  // sqareManager.restartGame()
  grid.innerHTML = "";
  sqareManager.renderSquares()
  grid.style.setProperty("grid-template-columns", "repeat(5, 1fr)");
  grid.style.setProperty("grid-template-rows", "repeat(5, 1fr)");
  sqareManager.resetCounter()
  displayResultHard()
})