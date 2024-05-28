import './style.css'

const grid = document.querySelector(".grid");
const start = document.querySelector(".start");
const result = document.querySelector(".result");


// kako napunit array na pocetku?



class Square{
  constructor() {
    this.id = self.crypto.randomUUID();
    this.color = "#";
    this.clicked = false;
  }

  isClicked() {
    this.clicked = true;
  }
}

class SquareManager{
  squareArray;
  constructor() {
    this.squareArray = [];
    this.clickCounter = 0;
  }

  addSquare(square) {
    this.squareArray.push(square);
  }

  renderSquares() {
    grid.style.setProperty("grid-template-columns", "1fr 1fr 1fr 1fr");
    grid.style.setProperty("grid-template-rows", "1fr 1fr 1fr");
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

  // shuffleSquares(array) {
  //   let currentIndex = array.length;
  //   console.log(array.length)
  //   while (currentIndex != 0) {
  //     let randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;
  //     // console.log("before", array)
  //     // console.log("currentIndex", array[currentIndex])
  //     // console.log("randomIndex", array[randomIndex])
  //     [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  //     console.log("array", array)
  //   }
  // }
  
  // shuffleArray(array) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     const temp = array[i];
  //     array[i] = array[j];
  //     array[j] = temp;
  //     console.log("array", array)
  //   }
  // }

  shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
  }


  fillArray() {
    const colors = ["d72700", "140dda", "d99b52", "8a2be2", "0c0d0e", "77c4ff", "82ff77", "ff77bc", "77ffec", "d9ef48", "4894ef", "3e1010"];
    for (let c = 0; c < 12; c++) {
      const square = new Square();
      square.color += colors[c];
      this.squareArray.push(square);
    }
  }

  restartGame() {
    this.squareArray.forEach(square => square.clicked = false)
    this.clickCounter = 0;
  }

}

const sqareManager = new SquareManager();
sqareManager.fillArray()
sqareManager.renderSquares()

grid.addEventListener("click", (event) => {
  if (event.target.className === "grid-cell") {
    const cell = sqareManager.findSquare(event.target.getAttribute("data-id"))
    if (cell.clicked === false) {
      cell.isClicked()
      sqareManager.clickCounter++;
      result.textContent = `Squares clicked: ${sqareManager.clickCounter}/12`;
      sqareManager.shuffleArray(sqareManager.squareArray);
      grid.innerHTML = "";
      sqareManager.renderSquares()
    } else {
      alert("You lose! Try again!");
      sqareManager.restartGame()
    }
    
    if(sqareManager.clickCounter >= 12) {
      alert("You win! Play again!")
      sqareManager.restartGame()

    }
  }
})