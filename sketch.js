const container = document.getElementById('container');
const padSize = 512;
container.style.width = padSize;
let currentSize = 1;
let totalBoxes = currentSize ** 2;
let filledBoxes = 0;

// current colour
let r = 255;
let g = 170;
let b = 170;

const progressBar = document.getElementById('progress-bar');

const autoGrow = document.getElementById('auto');

function populateBoxes(size) {
  for (i = 0; i < size; i++) {
    let row = document.createElement('div');
    row.className = "row";
    for (j = 0; j < size; j++) {
      let cell = document.createElement('div');
      cell.className = "cell";
      let cellSize = padSize / size;
      cell.setAttribute('style', `width: ${cellSize}px; height: ${cellSize}px`);
      let x = i;
      let y = j;
      cell.addEventListener('mouseenter', function (e) {
        if (!cell.classList.contains("hovered")) {
          filledBoxes += 1;
          cell.style.backgroundColor = getNewRGB();
          if (filledBoxes === totalBoxes && autoGrow.checked) {
            restart(currentSize + 1);
          }
        }
        cell.classList.add("hovered");
        //console.log("moused " + x + " " + y);
      });

      row.appendChild(cell);
    }
    container.appendChild(row);
  }
}

function restart(size = 0) {
  let newSize = size;
  if (size > 0) {
    newSize = size;
  }
  else {
    newSize = parseInt(prompt("New grid size (max 100):"));
  }
  if (typeof newSize === 'number' && newSize > 0 && newSize < 101) {
    while (container.lastChild) {
      container.removeChild(container.lastChild);
    }
    currentSize = newSize;
    filledBoxes = 0;
    r = 255;
    g = 170;
    b = 170;
    progressBar.style.width = "0%";
    totalBoxes = newSize ** 2;
    populateBoxes(newSize);
  }
  else {
    console.log(newSize);
    alert("Please try again with a number between 1 and 100");
  }
}

// start 255, 170 , 170
// 0   > 33%  - adding G                @33%  255, 255, 0
// 33% > 66%  - removing R, adding B    @66%  0,   255, 255
// 66% > 100% - removing G              @100% 0,   0,   255
function getNewRGB() {
  let percent = Math.ceil(filledBoxes / totalBoxes * 100);
  let increment = 255 / totalBoxes;
  if (percent <= 33) {
    g = Math.min(g + increment, 255);
  }
  else if (percent <= 66) {
    r = Math.max(r - increment, 0);
    //g = Math.min(g + increment, 255);
    b = Math.min(b + increment, 255);
  }
  else if (percent <= 100) {
    //r = Math.max(r - increment, 0);
    g = Math.max(g - increment, 0);
    //b = Math.min(b + increment, 255);
  }
  console.log(`rgb(${r}, ${g}, ${b})`);
  console.log(percent);
  progressBar.style.width = `${percent}%`;
  progressBar.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  return `rgb(${r}, ${g}, ${b})`;
}

const resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', () => {
  restart();
});

populateBoxes(currentSize);