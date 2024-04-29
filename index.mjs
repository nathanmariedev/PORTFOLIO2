let about_me = "Au cours de mes trois années d’IUT, j'ai eu l’occasion de travailler sur de nombreux projets variés tels que des applications web, des logiciels (Java, Kotlin) ou bien encore la création et la maintenance de serveurs Apache. De plus, lors de mon stage de deuxième année chez WeCraftApps en tant que développeur web fullstack, j'ai pu approfondir mes compétences en développement web en réalisant des mises à jour et en implémentant de nouvelles fonctionnalités sur un site web d’agence immobilière."

let header = document.getElementById('header');
let menu = document.getElementsByClassName('menu')[0];
let about = document.getElementById('about');
let button = document.getElementById('scroll-btn');
let conso = document.getElementsByClassName('console')[0];
let home = document.getElementById('home');
header.style.justifyContent = 'center';

button.addEventListener('click', () => {
  console.log('click');
  header.style.display = 'none';
  about.classList.remove('hidden');
  about.scrollIntoView({ behavior: 'smooth' })
});

window.addEventListener('reload', () => {
  console.log('reload');
  about.classList.add('hidden');
});

console.log(header);

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
let resizeSection = document.getElementById('resizeSection');
let finder = document.getElementById('finder')

const draggables = movables
const gridSize = 100; // Size of the grid
let lastClickTimestamp = 0;
let lastWindowPosition = {
  x: 20,
  y: 20,
  width: 200,
  height: 150
};

let isDragging = false;
let selectedIcon = null;
let initialX, initialY;
let canSelect = true;
let isFullScreen = false;

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
    const computerElement = document.getElementById('computer');
    const computerRect = computerElement.getBoundingClientRect();
    const computerTop = computerRect.top + window.pageYOffset;
    const computerLeft = computerRect.left + window.pageXOffset;

    let fileNames = ['musicProduction.als', 'VsCode', 'about_me.txt'];
    let fileName = event.target.innerText
    console.log(fileName)

    switch (fileName) {
      case "about_me.txt":
        windows.children[1].innerText = about_me;
        break;

      case "VsCode":
        windows.children[1].innerText = "Unfortunately, I didn't managed to recreate VsCode in JS... Sorry 😓";
        break;

      case "musicProduction.als":
        windows.children[1].innerText = "This window was made for txt content... But after all, let make a JS DAW!";
        break;
    }

    if (event.target.innerText == "IMG") {
      finder.style.display = "flex";
      windows.style.left = `${computerLeft + event.clientX}px`;
      windows.style.top = `${computerTop + event.clientY}px`;
    } else {
      // Set the position of the window relative to the computer element
      windows.style.display = 'block'; // Open text file
      windows.style.left = `${computerLeft + event.clientX}px`;
      windows.style.top = `${computerTop + event.clientY}px`;
    }

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
document.getElementsByClassName('windowHeader')[0].addEventListener('mousedown', selectWindow);
document.getElementsByClassName('close')[0].addEventListener('click', () => {
  windows.style.display = 'none';
  console.log("WINDOW closed")
});
document.getElementsByClassName('minimize')[0].addEventListener('click', () => {
  windows.style.display = 'none';
  console.log("WINDOW closed")
});
document.getElementsByClassName('maximize')[0].addEventListener('click', () => {
  canSelect = false;
  const computerElement = document.getElementById('computer');
  const computerRect = computerElement.getBoundingClientRect();
  const windows = document.getElementById('window');
  isDragging = false;

  if (!isFullScreen) {
    lastWindowPosition = {
      x: windows.style.left.split('px')[0],
      y: windows.style.top.split('px')[0],
      width: windows.getBoundingClientRect().width,
      height: windows.getBoundingClientRect().height
    };
    windows.style.left = `${computerRect.left}px`;
    console.log(home.getBoundingClientRect().height)
    windows.style.top = `${computerRect.top + home.getBoundingClientRect().height}px`;
    windows.style.width = `${computerRect.width}px`;
    windows.style.height = `${computerRect.height}px`;

  } else {
    windows.style.left = `${lastWindowPosition.x}px`;
    windows.style.top = `${lastWindowPosition.y}px`;
    windows.style.width = `${lastWindowPosition.width}px`;
    windows.style.height = `${lastWindowPosition.height}px  `;
  }
  console.log("WINDOW maximized")
  isFullScreen = !isFullScreen;
});
let selectedWindow = null;

function selectWindow(event) {
  console.log("WINDOW selected")

  selectedWindow = windows;
  isDragging = true;
  canSelect = false;

  initialX = event.clientX - selectedWindow.style.left.split('px')[0]; // Mouse position relative to the draggable element
  initialY = event.clientY - selectedWindow.style.top.split('px')[0]; // Mouse position relative to the draggable element
  console.log(initialX, initialY)

  document.addEventListener('mousemove', dragWindow);
  document.addEventListener('mouseup', stopDragWindow);
}

function dragWindow(event) {
  if (isDragging) {
    console.log("WINDOW dragged");
    canSelect = false;

    const computerElement = document.getElementById('computer');
    const computerRect = computerElement.getBoundingClientRect();

    // Calculate the maximum allowed positions
    const maxX = computerRect.right - selectedWindow.offsetWidth;
    const maxY = (computerRect.bottom + home.getBoundingClientRect().height) - selectedWindow.offsetHeight;

    // Calculate the new position within the bounds
    let newX = event.clientX - initialX;
    let newY = event.clientY - initialY;
    newX = newX < computerRect.left ? computerRect.left : newX;
    newY = newY < computerRect.top + home.getBoundingClientRect().height ? computerRect.top + home.getBoundingClientRect().height : newY;

    newX = newX > maxX ? maxX : newX;
    newY = newY > maxY ? maxY : newY;

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

let isResizing = false;
let startWindowsX;
let startWindowsY;

resizeSection.addEventListener('mousedown', startResize);

function startResize(event) {
  canSelect = false;
  isResizing = true;
  startWindowsX = event.clientX;
  startWindowsY = event.clientY;
  window.addEventListener('mousemove', resizeWindow);
  window.addEventListener('mouseup', stopResize);
}

function resizeWindow(event) {
  if (isResizing) {
    // Calculate maximum allowed width and height
    const computerElement = document.getElementById('computer');
    const computerRect = computerElement.getBoundingClientRect();
    const windowRect = windows.getBoundingClientRect();
    const maxWidth = computerRect.right - windows.offsetLeft;
    const maxHeight = computerRect.bottom - windowRect.top;

    // Calculate new width and height
    let newWidth = windows.offsetWidth + (event.clientX - startWindowsX);
    let newHeight = windows.offsetHeight + (event.clientY - startWindowsY);

    // Ensure new width and height are within the maximum allowed
    newWidth = Math.min(Math.max(200, newWidth), maxWidth);
    newHeight = Math.min(newHeight, maxHeight);

    // Set new width and height
    windows.style.width = `${newWidth}px`;
    windows.style.height = `${newHeight}px`;

    startWindowsX = Math.min(event.clientX, computerRect.right);
    startWindowsY = Math.min(Math.max(event.clientY, windowRect.bottom), computerRect.bottom);
    console.log(computerRect)

  }
}

function stopResize() {
  isResizing = false;
  window.removeEventListener('mousemove', resizeWindow);
  window.removeEventListener('mouseup', stopResize);
}

resizeSection.addEventListener('click', (event) => {
  console.log("RESIZE clicked")
}
);