import './style.css'

const grid = document.querySelector(".grid");
const start = document.querySelector(".start");


class Square{
  constructor(color) {
    this.color = color;
    this.clicked = false;
  }

  isClicked() {
    this.clicked = true;
  }
}

class SquareManager{
  sqareArray;
  constructor() {
    this.sqareArray = [];
  }

  addSqare(square) {
    this.sqareArray.push(square);
  }

  renderSqares() {
    this.sqareArray.forEach(sqare => {
      const cell = document.createElement("div")
      cell.style.backgroundColor = sqare.color;
      grid.appendChild(cell);
    })
  }

  shuffleSquares() {
    let currentIndex = this.sqareArray.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.sqareArray[currentIndex], this.sqareArray[randomIndex]] = [this.sqareArray[randomIndex], this.sqareArray[currentIndex]];
    }
  }

  makeGrid() {
    grid.style.setProperty("grid-template-columns", "1fr 1fr 1fr 1fr");
    grid.style.setProperty("grid-template-rows", "1fr 1fr 1fr");
    for (let c = 0; c < 12; c++) {
      const cell = document.createElement("div");
      cell.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      grid.appendChild(cell).className = "grid-cell";
    }
  }
}

const sqareManager = new SquareManager();
sqareManager.makeGrid() 

start.addEventListener("click", ()  => {

})

grid.addEventListener("click", (event) => {
  if (event.target.className === "grid-cell") {

  }
})