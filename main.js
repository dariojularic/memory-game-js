import './style.css'

const grid = document.querySelector(".grid");

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