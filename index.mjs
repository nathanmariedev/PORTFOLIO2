let header = document.getElementById('header');
let menu = document.getElementsByClassName('menu')[0];
let about = document.getElementById('about');
let button = document.getElementById('scroll-btn');
let conso = document.getElementsByClassName('console')[0];
header.style.justifyContent = 'center';

button.addEventListener('click', () => {
  console.log('click');
  about.classList.remove('hidden');
  about.scrollIntoView({ behavior: 'smooth' })
});

window.addEventListener('reload', () => {
  console.log('reload');
  header.classList.add('hidden');
  about.classList.add('hidden');
});

console.log(header);

window.addEventListener('scroll', () => {
  console.log('scroll');
  if (window.scrollY >= window.innerHeight) {
    header.classList.remove('center');
    header.classList.add('hidden');
    menu.classList.remove('hidden');
    about.classList.remove('hidden');
  }
});

// Array.from(conso.children).forEach((item) => {
//     console.log(item.tagName); // Print the tag type
//     if (item.tagName === 'DIV') {
//         item.innerHTML = "björn@veldstra ~$ " + item.innerHTML;
//     }
// });

var consoleText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate pariatur labore veritatis tempore dolorem enim, doloribus ullam. Reprehenderit maxime minus dicta, nesciunt officia enim repudiandae libero alias quia, neque non.";
// var textSpan = document.querySelector('.console .text');
// var cursorSpan = document.querySelector('.console .cursor');
// var animation = "blink .5s infinite alternate";

// let printConsole = () => {
//     var visible = true;
//     var con = document.getElementsByClassName('console')[0];
//     var letterCount = 1;
//     var x = 1;
//     var waiting = false;
//     var target = document.getElementById("text")
//     window.setInterval(function () {
//         if (letterCount === 0 && waiting === false) {
//             waiting = true;
//             target.innerHTML = consoleText.substring(0, letterCount)
//             window.setTimeout(function () {
//                 x = 1;
//                 letterCount += x;
//                 waiting = false;
//             }, 1000)
//         } else if (letterCount === consoleText.length + 1 && waiting === false) {
//             waiting = true;
//             window.setTimeout(function () {
//                 x = -1;
//                 letterCount += x;
//                 waiting = false;
//             }, 1000)
//         } else if (waiting === false) {
//             target.innerHTML = consoleText.substring(0, letterCount)
//             letterCount += x;
//         }
//     }, 120)
//     window.setInterval(function () {
//         if (visible === true) {
//             cursorSpan.style.classList = "cursor";
//             visible = false;

//         } else {
//             cursorSpan.style.classList = "cursor no";

//             visible = true;
//         }
//     }, 400)
// }

// printConsole();

// COMPUTER SCREEN

let screen = document.getElementById('computer');
let folders = document.getElementsByClassName('folder');
let files = document.getElementsByClassName('file');
let movables = Array.from(folders).concat(Array.from(files));
let windows = document.getElementById('window');

const draggables = movables
const gridSize = 100; // Size of the grid
let lastClickTimestamp = 0;

let isDragging = false;
let selectedIcon = null;
let initialX, initialY;
let canSelect = true;

draggables.forEach(draggable => {
  draggable.addEventListener('mousedown', selectIcon);
});

let startX, startY, endX, endY;
let isSelecting = false;
const selectionRectangle = document.getElementById('selection-rectangle');

// SELECTION RECTANGLE

screen.addEventListener('mousedown', (event) => {
  if (!canSelect) return;
  console.log("SELECTION mousedown")
  draggables.forEach(draggable => {
    draggable.classList.remove("selected")
  }
  );
  startX = event.clientX - screen.getBoundingClientRect().left;
  startY = event.clientY - screen.getBoundingClientRect().top;
  isSelecting = true;
  selectionRectangle.style.display = 'block'; 
  selectionRectangle.style.left = `${startX}px`;
  selectionRectangle.style.top = `${startY}px`;
});

screen.addEventListener('mousemove', (event) => {
  if (!canSelect) return;
  if (!isSelecting) return;
  console.log("SELECTION mousemove")

  endX = event.clientX - screen.getBoundingClientRect().left;
  endY = event.clientY - screen.getBoundingClientRect().top;

  const width = Math.abs(endX - startX);
  const height = Math.abs(endY - startY);

  selectionRectangle.style.width = `${width}px`;
  selectionRectangle.style.height = `${height}px`;
  selectionRectangle.style.left = `${Math.min(endX, startX)}px`;
  selectionRectangle.style.top = `${Math.min(endY, startY)}px`;

  // Sélectionner les fichiers/dossiers dans la zone de sélection
  const selectedElements = document.querySelectorAll('.file, .folder');
  selectedElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.left < Math.max(startX, endX) && rect.right > Math.min(startX, endX) &&
      rect.top < Math.max(startY, endY) && rect.bottom > Math.min(startY, endY)) {
      element.classList.add('selected');
    } else {
      element.classList.remove('selected');
    }
  });
});

screen.addEventListener('mouseup', () => {
  if (!canSelect) return;
  console.log("SELECTION mouseup")
  if (!isSelecting) {
    draggables.forEach(draggable => {
      draggable.classList.remove("selected")
    });
  }
  isSelecting = false;
  // Réinitialiser la taille et la position du rectangle de sélection
  selectionRectangle.style.width = '0';
  selectionRectangle.style.height = '0';
  selectionRectangle.style.display = 'none';
});


// MOVING FILES AND FOLDERS

function selectIcon(event) {
  if (lastClickTimestamp + 200 > new Date().getTime()) {
    console.log("DOUBLE CLICK")
    windows.style.display = 'block'; // Ouverture fichier txt
  } else {
    lastClickTimestamp = new Date().getTime();
  }
  console.log("ICON selected")
  draggables.forEach(draggable => {
    draggable.classList.remove("selected")
  });

  selectedIcon = this;
  selectedIcon.classList.add("selected")
  isDragging = true;
  canSelect = false;
  
  initialX = event.clientX - selectedIcon.style.left.split('px')[0]; // Mouse position relative to the draggable element
  initialY = event.clientY - selectedIcon.style.top.split('px')[0]; // Mouse position relative to the draggable element

  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);
}

function drag(event) {
  if (isDragging) {
    console.log("ICON dragged")
    canSelect = false;
    const boundingRect = document.getElementById('computer').getBoundingClientRect();
    const mouseX = event.clientX; // Mouse X position relative to the parent element
    const mouseY = event.clientY; // Mouse Y position relative to the parent element
    const newX = mouseX - initialX; // Calculate new X position relative to the parent element
    const newY = mouseY - initialY; // Calculate new Y position relative to the parent element
    selectedIcon.style.left = newX + 'px';
    selectedIcon.style.top = newY + 'px';
  }
}

function stopDrag() {
  console.log("ICON stop drag")
  isDragging = false;
  selectedIcon = null;
  canSelect = true;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
  draggables.forEach(draggable => {
    draggable.addEventListener('mousedown', selectIcon);
  });
}

// MOVIDING WINDOWS
document.getElementById('window').addEventListener('mousedown', selectWindow);  
document.getElementsByClassName('close')[0].addEventListener('click', () => { 
  windows.style.display = 'none';
  console.log("WINDOW closed")
 } );
let selectedWindow = null;

function selectWindow(event) {
  console.log("WINDOW selected")

  selectedWindow = this;
  isDragging = true;
  canSelect = false;
  
  initialX = event.clientX - selectedWindow.style.left.split('px')[0]; // Mouse position relative to the draggable element
  initialY = event.clientY - selectedWindow.style.top.split('px')[0]; // Mouse position relative to the draggable element

  document.addEventListener('mousemove', dragWindow);
  document.addEventListener('mouseup', stopDragWindow);
}

function dragWindow(event) {
  if (isDragging) {
    console.log("WINDOW dragged")
    canSelect = false;
    const mouseX = event.clientX; // Mouse X position relative to the parent element
    const mouseY = event.clientY; // Mouse Y position relative to the parent element
    const newX = mouseX - initialX; // Calculate new X position relative to the parent element
    const newY = mouseY - initialY; // Calculate new Y position relative to the parent element
    selectedWindow.style.left = newX + 'px';
    selectedWindow.style.top = newY + 'px';
  }
}

function stopDragWindow() {
  console.log("WINDOW stop drag")
  isDragging = false;
  selectedIcon = null;
  canSelect = true;
  document.removeEventListener('mousemove', dragWindow);
  document.removeEventListener('mouseup', stopDragWindow);
}