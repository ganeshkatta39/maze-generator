let cols, rows
let slider
let w = 40
let grid = []
let current
let stack = []
let start = false
let button
let invert
let colour = 255

function setup() {
  createCanvas(windowWidth, windowHeight -40);

  button = createButton('start')
  button.mousePressed(() => {
    start = true
    grid = []
    stack = []
    current = grid[0]
    initialization()
  })
  
  invert = createButton('dark')
  invert.mousePressed(()=>{
    colour = colour * -1
  })
  slider = createSlider(10, 100, 40, 10)
}


function draw() {
  w = slider.value()
  background(colour);
  
  for (var i = 0; i < grid.length; i++) {
    grid[i].show()
  }


  if (start) {

    current.highlight()
    current.visited = true
    let next = current.checkNeighbors()

    if (next) {
      next.visited = true
      stack.push(current)
      removeWalls(current, next)
      current = next
    } else if (stack.length > 0) {
      current = stack.pop()
    }
  }
}


// this func is an initilization step

function initialization() {
  cols = floor(width / w)
  rows = floor(height / w)

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j)
      grid.push(cell)
    }
  }
  current = grid[0]
}


// this func is to get the index of the elements in 1d array

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols
}



// this func is to remove walls

function removeWalls(a, b) {
  let x = a.i - b.i
  let y = a.j - b.j
  if (x === 1) {
    a.walls[3] = false
    b.walls[1] = false
  } else if (x === -1) {
    a.walls[1] = false
    b.walls[3] = false
  }
  if (y === 1) {
    a.walls[0] = false
    b.walls[2] = false
  } else if (y === -1) {
    a.walls[2] = false
    b.walls[0] = false
  }
}