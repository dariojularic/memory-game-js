import './style.css'

const grid = document.querySelector(".grid");

class Square{
  constructor(color) {
    this.color = color;
  }
}

class SquareManager{
  sqareArray;
  constructor() {
    this.sqareArray = [];
    this.numOfColumns = 4;
    this.numOfRows = 3;
  }

  addSqare(square) {
    this.sqareArray.push(square);
  }

  mixSquares() {
    this.sqareArray.forEach(cell => {
      cell.style.setProperty("grid-column", `1 / span 1`)
      cell.style.setProperty("grid-row", `1 / span 1`)
    })
  }


}



function makeGrid() {
  grid.style.setProperty("grid-template-columns", "1fr 1fr 1fr 1fr");
  grid.style.setProperty("grid-template-rows", "1fr 1fr 1fr");
  for (let c = 0; c < 12; c++) {
    const cell = document.createElement("div");
    cell.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    grid.appendChild(cell).className = "grid-cell";
  }
}

makeGrid()