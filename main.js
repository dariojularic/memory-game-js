import './style.css'

const grid = document.querySelector(".grid");
const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".difficulty-controller");

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
    this.numberOfSquares = 9
  }

  getNumberOfSquares() {
    return this.numberOfSquares
  }

  setNumberOfSquares(squareNum) {
    this.numberOfSquares = squareNum;
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
    for (let c = 0; c < levelMode; c++) {
      const square = new Square(randomColor(levelMode));
      this.addSquare(square)
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

function randomColor() {
  const letters = '0123456789ABCDEF';
  let randomColor = '#';
  for (let i = 0; i < 6; i++) {
    randomColor += letters[Math.floor(Math.random() * 16)];
  }
  return randomColor
}

function displayResult() {
  result.textContent = `Squares clicked:
  ${sqareManager.clickCounter}/${sqareManager.getNumberOfSquares()}`
}

function styleGrid(btnValue) {
    grid.style.setProperty("grid-template-columns", `repeat(${btnValue}, 1fr)`);
    grid.style.setProperty("grid-template-rows", `repeat(${btnValue}, 1fr)`);
}

const sqareManager = new SquareManager();
sqareManager.fillArray(sqareManager.getNumberOfSquares())
sqareManager.renderSquares()
displayResult()

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
    
    if(sqareManager.clickCounter >= sqareManager.getNumberOfSquares()) {
      sqareManager.restartGame()
      alert("You win! Play again!")
      displayResult()
    }
  }
})

buttons.forEach(button => {
  button.addEventListener("click", (event) => {
    sqareManager.setNumberOfSquares(event.target.getAttribute("data-number"));
    sqareManager.emptyArray()
    sqareManager.fillArray(sqareManager.getNumberOfSquares())
    grid.innerHTML = "";
    styleGrid(event.target.value)
    sqareManager.renderSquares()
    sqareManager.resetCounter()
    displayResult()
  })
})