let about_me = "Au cours de mes trois années d’IUT, j'ai eu l’occasion de travailler sur de nombreux projets variés tels que des applications web, des logiciels (Java, Kotlin) ou bien encore la création et la maintenance de serveurs Apache. De plus, lors de mon stage de deuxième année chez WeCraftApps en tant que développeur web fullstack, j'ai pu approfondir mes compétences en développement web en réalisant des mises à jour et en implémentant de nouvelles fonctionnalités sur un site web d’agence immobilière."

let menu = document.getElementsByClassName('menu')[0];
let about = document.getElementById('about');
let button = document.getElementById('scroll-btn');
let conso = document.getElementsByClassName('console')[0];
let home = document.getElementById('home');

button.addEventListener('click', () => {
  console.log('click');
  about.classList.remove('hidden');
  about.scrollIntoView({ behavior: 'smooth' })
  // Define a function to handle the scroll event
  const scrollHandler = () => {
    // Remove the event listener to avoid multiple console logs
    window.removeEventListener('scroll', scrollHandler);

    // Print message after a short delay to ensure scrolling has finished
    setTimeout(() => {
      home.style.display = 'none';
    }, 800); // Adjust the delay (in milliseconds) as needed
  };

  // Add scroll event listener to detect when scrolling has finished
  window.addEventListener('scroll', scrollHandler, { once: true });
});

window.addEventListener('reload', () => {
  console.log('reload');
  about.classList.add('hidden');
  home.style.display = 'flex';
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
let resizeSection = document.getElementById('resizeSection');
let finder = document.getElementById('finder')

let draggables = movables
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
let startX, startY, endX, endY;
let isSelecting = false;
const selectionRectangle = document.getElementById('selection-rectangle');

// SELECTION RECTANGLE

screen.addEventListener('mousedown', (event) => {
  if (!canSelect) return;
  console.log("SELECTION mousedown")

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
  draggables.forEach(draggable => {
    draggable.classList.remove("selected")
  }
  );
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
  draggables = Array.from(folders).concat(Array.from(files));
  if (lastClickTimestamp + 200 > new Date().getTime()) {
    console.log("DOUBLE CLICK")
    const computerElement = document.getElementById('computer');
    const computerRect = computerElement.getBoundingClientRect();
    const computerTop = computerRect.top + window.pageYOffset;
    const computerLeft = computerRect.left + window.pageXOffset;

    let fileName = event.target.innerText
    console.log(fileName)

    data.forEach((item) => {
      if (item.name === fileName) {
        if (item.type === "folder") {
          finder.style.display = "flex";
          canSelect = false;
          windows.style.left = `${computerLeft + event.clientX}px`;
          windows.style.top = `${computerTop + event.clientY}px`;
          actualPath.push(item.name);
          initFirstColumn();
          windows.style.display = 'none'; // Open folder
        } else {
          windows.style.display = 'block'; // Open text file
          windows.style.left = `${computerLeft + computerRect.width / 2 - windows.getBoundingClientRect().width / 2}px`;
          windows.style.top = `${computerTop + computerRect.height / 2 - windows.getBoundingClientRect().height / 2}px`;
          let content = windows.children[1];
          content.innerHTML = item.content;
        }
      }
    }
    );

    console.log(event)
  } else {
    lastClickTimestamp = new Date().getTime();
  }
  console.log("ICON selected")
  draggables.forEach(draggable => {
    if (draggable !== event.target) {
      draggable.classList.remove("selected")
    }
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
}



// MOVIDING WINDOWS
document.getElementsByClassName('windowHeader')[0].addEventListener('mousedown', selectWindow);
Array.from(document.getElementsByClassName('close')).forEach((close) => {
  close.addEventListener('click', (e) => {
    close.classList[1] === "win" ? windows.style.display = 'none' : finder.style.display = 'none';
  });

  close.addEventListener("mouseover", function(e) {
    console.log(close.children[0].style.display = "block");
    close.addEventListener("mouseleave", function(e) {
        e.target.children[0].style.display = "none";
    });
  });
})
Array.from(document.getElementsByClassName('minimize')).forEach((minimize) => {
  minimize.addEventListener('click', () => {
    minimize.classList[1] === "win" ? windows.style.display = 'none' : finder.style.display = 'none';
  });

  minimize.addEventListener("mouseover", function(e) {
    console.log(minimize.children[0].style.display = "block");
    minimize.addEventListener("mouseleave", function(e) {
        e.target.children[0].style.display = "none";
    });
  });
});

Array.from(document.getElementsByClassName('maximize')).forEach((maximize) => {
  maximize.addEventListener("mouseover", function(e) {
    console.log(maximize.children[0].style.display = "block");
    maximize.addEventListener("mouseleave", function(e) {
        e.target.children[0].style.display = "none";
    });
  });

  maximize.addEventListener('click', () => {
    canSelect = false;
    const computerElement = document.getElementById('computer');
    const computerRect = computerElement.getBoundingClientRect();
    let windows;
    if (maximize.classList[1] === "win") {
      windows = document.getElementById('window');
    } else {
      windows = document.getElementById('finder');
    }
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

// RESIZE Window

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
    const windowContentRect = windows.children[1].getBoundingClientRect();
    const windowContent = windows.children[1];
    const maxWidth = computerRect.right - windowContent.offsetLeft;
    const maxHeight = computerRect.bottom - windowContentRect.top;

    // Calculate new width and height
    let newWidth = windowContent.offsetWidth + (event.clientX - startWindowsX);
    let newHeight = windowContent.offsetHeight + (event.clientY - startWindowsY);

    // Ensure new width and height are within the maximum allowed
    newWidth = Math.min(Math.max(200, newWidth), maxWidth);
    newHeight = Math.min(newHeight, maxHeight);

    // Set new width and height
    windowContent.style.width = `${newWidth}px`;
    windowContent.style.height = `${newHeight}px`;

    startWindowsX = Math.min(event.clientX, computerRect.right);
    startWindowsY = Math.min(Math.max(event.clientY, windowContentRect.bottom), computerRect.bottom);
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

// RESIZE Column

let allResizeColumn = document.getElementsByClassName("resizeColumn")
let isResizingColumn = false;
let startColumnX = 0;
let resizingElement = null; // Variable pour suivre l'élément actuellement redimensionné


// Array.from(allResizeColumn).forEach((cc) => {
//   cc.addEventListener('mousedown', startResizeColumn);
// });

// function startResizeColumn(event) {
//   let columnId = parseInt(event.target.classList[1]); // Assurez-vous que columnId est un nombre entier
//   resizingElement = document.getElementsByClassName("allFilesFolders")[columnId - 1];
//   console.log(resizingElement);
//   console.log("start RESIZE COLUMN");
//   canSelect = false;
//   isResizingColumn = true;
//   startColumnX = event.clientX - resizingElement.getBoundingClientRect().right; // Utilisez clientX au lieu de mouseX

//   window.addEventListener('mousemove', resizeColumn);
//   window.addEventListener('mouseup', stopResizeColumn);
// }

// let lastX = 0;

// function resizeColumn(event) {
//   if (isResizingColumn && resizingElement) {
//     // Calculate new width
//     if (finder.getBoundingClientRect().left >= computer.getBoundingClientRect().left && finder.getBoundingClientRect().right <= computer.getBoundingClientRect().right){
//       let newWidth = resizingElement.offsetWidth + (event.clientX - resizingElement.getBoundingClientRect().right);
//       if (finder.getBoundingClientRect().right + (finder.getBoundingClientRect().width + newWidth) >= computer.getBoundingClientRect().right) {
//         newWidth = computer.getBoundingClientRect().right - finder.getBoundingClientRect().right - finder.getBoundingClientRect().width;
//       }

//       // Set new width
//       resizingElement.style.width = `${newWidth - 35}px`;
//       lastX = event.clientX;
//     } else if (event.clientX < lastX) {
//       let newWidth = resizingElement.offsetWidth + (event.clientX - resizingElement.getBoundingClientRect().right);

//       // Set new width
//       resizingElement.style.width = `${newWidth - 35}px`;
//       lastX = event.clientX;
//     }
//   }
// }

// function stopResizeColumn() {
//   isResizingColumn = false;
//   resizingElement = null; // Réinitialiser l'élément actuellement redimensionné
//   window.removeEventListener('mousemove', resizeColumn);
//   window.removeEventListener('mouseup', stopResizeColumn);
// }

// FOLDERS AND FILES
let actualPath = ["Nathan"];

const data = [
  {
    "name": "Applications",
    "type": "primary",
    "icon": "public/apps.svg",
    "path": null
  },
  {
    "name": "Documents",
    "type": "primary",
    "icon": "public/file.svg",
    "path": null
  },
  {
    "name": "Desktop",
    "type": "primary",
    "icon": "public/monitor.svg",
    "path": null
  },
  {
    "name": "Images",
    "type": "primary",
    "icon": "public/image.svg",
    "path": null
  },
  {
    "name": "Musique",
    "type": "primary",
    "icon": "public/music.svg",
    "path": null
  },
  {
    "name": "Spotify",
    "type": "file",
    "icon": "public/spotify.png",
    "path": "Applications",
    "content": "I use Spotify every days. I love music, especially rap, house and jazz music. Spotify allows me to discover new artists, create playlists, share my tastes with my friends..."
  },
  {
    "name": "hello.txt",
    "type": "file",
    "icon": "public/file.png",
    "path": "Desktop",
    "content": "Hello, Welcome to my portfolio.<br><br> I'm Nathan, and I'm a first year student at the Engineering School of IMT Atlantique. As a passionate about software development, I'm always looking for new challenges.<br><br> This portfolio takes the form of a desktop environment, my desktop environment. Feel free to explore it and discover more about me.<br> Wish you a good experience!🤠"
  },
  {
    "name": "Documents",
    "type": "folder",
    "icon": "public/folder.png",
    "path": "Desktop"
  },
  {
    "name": "about_me.txt",
    "type": "file",
    "icon": "public/file.png",
    "path": "Documents/ME",
    "content": about_me
  },
  {
    "name": "musicProduction.als",
    "type": "file",
    "icon": "public/abl.png",
    "path": "Musique",
    "content": "I have been using Ableton Live for a few years now. It's a powerful digital audio workstation (DAW) that allows me to create music. I use it to produce music, mix tracks, and even to create sound effects for my projects. <br><br> Before using Ableton Live, I used other DAWs such as FL Studio and Logic Pro. However, I found Ableton Live to be the most intuitive and flexible DAW for my needs."
  },
  {
    "name": "VsCode",
    "type": "file",
    "icon": "public/vscode.png",
    "path": "Applications",
    "content": "As a software developer, I use Visual Studio Code on a daily basis. It's a powerful and lightweight code editor that allows me to work on a wide range of projects. I use it for web development, mobile development, and even for writing scripts. <br><br> I have also installed a few extensions to improve my productivity, such as Live Server, Prettier..."
  },
  {
    "name": "Ableton",
    "type": "file",
    "icon": "public/ableton.png",
    "path": "Applications",
    "content": "I have been using Ableton Live for a few years now. It's a powerful digital audio workstation (DAW) that allows me to create music. I use it to produce music, mix tracks, and even to create sound effects for my projects. <br><br> Before using Ableton Live, I used other DAWs such as FL Studio and Logic Pro. However, I found Ableton Live to be the most intuitive and flexible DAW for my needs."
  },
  {
    "name": "Terminal",
    "type": "file",
    "icon": "public/terminal.png",
    "path": "Applications",
    "content": "I use the terminal on a daily basis to interact with my computer. I used to learn bash during my studies. I use it to navigate through directories, run scripts, and even to manage my projects using Git. <br><br> During my third year's internship at Natixis, I had the opportunity to create scripts to automate repetitive tasks. I used bash and Python to create these scripts. " 
  },
  {
    "name": "Linkedin",
    "type": "file",
    "icon": "public/linkedin.png",
    "path": "Applications",
    "content": "I'm quite active on LinkedIn, where I share some of my projects. I use LinkedIn to connect with other professionals, and stay in touch with my network. <br><br> Here is my LinkedIn profile: https://www.linkedin.com/in/nathan-marie/ <br><br> Feel free to connect with me!"
  },
  {
    "name": "CLion",
    "type": "file",
    "icon": "public/clion.png",
    "path": "Applications",
    "content": "CLion is an IDE developed by JetBrains, which is specialized in C and C++ development. I choosed to learn C and C++ during my studies at the CNAM de Bretagne to get a valuable certification (you can find it in Documents/EDUCATION/cnam_diploma.pdf), and I used CLion to develop my projects. As all JetBrains IDEs, CLion is very powerful and provides a lot of features to improve the development process."
  },
  {
    "name": "IntelliJ",
    "type": "file",
    "icon": "public/intell.png",
    "path": "Applications",
    "content": "IntelliJ IDEA is an IDE developed by JetBrains, which is specialized in Java/Kotlin development. I used IntelliJ IDEA to develop my Kotlin projects during my studies."
  },
  {
    "name": "SQLDeveloper",
    "type": "file",
    "icon": "public/sqldev.png",
    "path": "Applications",
    "content": "SQL Developer is a free integrated development environment that simplifies the development and management of Oracle Database. During my studies, I had the opportunity to learn SQL, and I used SQL Developer to practice my skills."
  },
  {
    "name": "Notion",
    "type": "file",
    "icon": "public/notion.png",
    "path": "Applications",
    "content": "Notion is an all-in-one workspace where you can write, plan, collaborate, and get organized. I use Notion to manage my projects, take notes for my professional and personal projects. <br><br> I think it's one of my most used applications when i'm working on a project. You can easily create pages, databases, and even embed content from other apps. I really like working with Notion, to improve my productivity"
  },
  {
    "name": "Android Studio",
    "type": "file",
    "icon": "public/androidstudio.png",
    "path": "Applications",
    "content": "I learned Android Developpement with Android studio. <br><br> My first Android project was a simple application that allow you to consult the weather of a city. I developped this application for a school project, and I learned a lot about Android developpement. This application was linked to a website developped with React. I had to reproduce the same features on the website and on the Android application, including the design, the API calls, and the user interactions."
  },
  {
    "name": "Figma",
    "type": "file",
    "icon": "public/figma.png",
    "path": "Applications",
    "content": "Honestly, I'm not a good designer, but I use Figma to create some icons and to design some interfaces. I am familiar with the basics of Figma, and i really like the tool when I have to create a simple design. <br><br> For all my group projects, we use Figma to create our interfaces. The developper tool provided by Figma is very useful to get the CSS properties of the elements, and to recreate the design in the code."
  },
  {
    "name": "Docker",
    "type": "file",
    "icon": "public/docker.png",
    "path": "Applications"
  },
  {
    "name": "ME",
    "type": "folder",
    "icon": "public/folder.png",
    "path": "Documents"
  },
  {
    "name": "EDUCATION",
    "type": "folder",
    "icon": "public/folder.png",
    "path": "Documents"
  },
  {
    "name": "PROJECTS",
    "type": "folder",
    "icon": "public/folder.png",
    "path": "Documents"
  },
  {
    "name": "portfolio",
    "type": "file",
    "icon": "public/file.png",
    "path": "Documents/PROJECTS",
    "content": "This portfolio is a project I developed to showcase my skills and experience. It's a desktop environment that allows you to explore my work, learn more about me, and even interact with some of the elements. You can open files (only text, I didn't managed to recreate apps like VsCode 😅), resize windows, interact with the file/folder explorer. Feel free to have a look! <br><br> I built this portfolio using HTML, CSS, and JavaScript. This project is a static website, but I'm thinking of adding some dynamic features in the future. <br><br> I hope you enjoy exploring my portfolio! You can find the source code on my GitHub repository 'PORTFOLIOs'."
  },
  {
    "name": "DEV",
    "type": "folder",
    "icon": "public/folder.png",
    "path": "Documents/PROJECTS"
  },
  {
    "name": "gaïaMedication",
    "type": "file",
    "icon": "public/file.png",
    "path": "Documents/PROJECTS/GAÏA-MEDICATION"
  },
  {
    "name": "GAÏA-MEDICATION",
    "type": "folder",
    "icon": "public/folder.png",
    "path": "Documents/PROJECTS"
  }
]
// Desktop

data.forEach((item) => {
  if (item.type === "primary") {
    return;
  }
  if (item.path.split('/')[0] === "Desktop") {
    let desktop = document.getElementById('computer');
    let element = document.createElement('div');
    item.type === "folder" ? element.classList.add('folder') : element.classList.add('file');
    let img = document.createElement('img');
    img.src = item.icon;
    let p = document.createElement('p');
    p.innerText = item.name;
    element.appendChild(img);
    element.appendChild(p);
    element.addEventListener('mousedown', selectIcon);
    desktop.appendChild(element);
  }
}
);

let primaryFolders = document.getElementsByClassName('list')[0];
/*
  LIST ELEMENT

  {<div class="listElement">
    <img src="public/home.svg">
    <p>Nathan</p>
  </div>
*/
data.forEach((item) => {
  if (item.type != "primary") {
    return;
  }
  let listElement = document.createElement('div');
  listElement.classList.add('listElement');
  let img = document.createElement('img');
  img.src = item.icon;
  let p = document.createElement('p');
  p.innerText = item.name;
  listElement.appendChild(img);
  listElement.appendChild(p);
  if (actualPath[0] === item.name) {
    listElement.classList.add('selected');
  }
  listElement.addEventListener('click', () => {
    // Supprimer colonnes en trop
    let allExistingColumns = document.getElementsByClassName('contentColumn');
    allExistingColumns = Array.from(allExistingColumns);
    allExistingColumns.forEach((column) => {
      if (parseInt(column.classList[1]) >= 2) {
        console.log("AAA")
        column.remove();
      }
    }
    );
    Array.from(primaryFolders.children).forEach((element) => {
      element.classList.remove('selected');
    });
    actualPath = [item.name];
    listElement.classList.add('selected');
    initFirstColumn();
  });
  primaryFolders.appendChild(listElement);
});

/* 
<div class="allFilesFolders 1">
  <div class="contentFile">
      <div class="label">
          <img src="public/abl.png">
          <p>musicProduction.als</p>
      </div>

  </div>
  <div class="contentFile">
      <div class="label">
          <img src="public/abl.png">
          <p>musicProduction.als</p>
      </div>

  </div>
  <div class="contentFile">
      <div class="label">
          <img src="public/abl.png">
          <p>musicProduction.als</p>
      </div>

  </div>
  <div class="contentFolder">
      <div class="label">
          <img src="public/folder.png">
          <p>musicProduction.als</p>
      </div>

      <img src="./public/chevron-right.svg">
  </div>
</div>

<div class="resizeColumn 1"></div>
*/
let allFilesFoldersPrimary = document.getElementsByClassName('contentColumn')[0];
let content = document.getElementById('content');

let initFirstColumn = () => {
  allFilesFoldersPrimary.innerHTML = "";

  let allFilesFolders = document.createElement('div');
  allFilesFolders.classList.add('allFilesFolders');
  allFilesFolders.classList.add('1');

  data.forEach((item) => {
    if (item.type === "primary") {
      return;
    }
    if (item.path.split('/')[0] === actualPath[0]) {

      let contentFile = document.createElement('div');
      item.type === "folder" ? contentFile.classList.add('contentFolder') : contentFile.classList.add('contentFile');
      let label = document.createElement('div');
      label.classList.add('label');
      let img = document.createElement('img');
      img.src = item.icon;
      let p = document.createElement('p');
      p.innerText = item.name;
      label.appendChild(img);
      label.appendChild(p);
      contentFile.appendChild(label);
      if (item.type === "folder") {
        let chevron = document.createElement('img');
        chevron.src = "public/chevron-right.svg";
        contentFile.appendChild(chevron);
        contentFile.addEventListener('click', () => {
          console.log(item)
          initNewColumn(2, item);
        });
      } else {
        contentFile.addEventListener('click', () => {
          openFile(item);
        });
      }
      allFilesFolders.appendChild(contentFile);


    }
  });
  allFilesFoldersPrimary.appendChild(allFilesFolders);
  let resizeColumn = document.createElement('div');
  resizeColumn.classList.add('resizeColumn');
  resizeColumn.classList.add('1');
  //resizeColumn.addEventListener('mousedown', startResizeColumn);
  allFilesFoldersPrimary.appendChild(resizeColumn);
}

let initNewColumn = (columnId, item) => {
  actualPath = actualPath.slice(0, columnId - 1);
  actualPath.push(item.name);

  // Supprimer colonnes en trop
  let allExistingColumns = document.getElementsByClassName('contentColumn');
  allExistingColumns = Array.from(allExistingColumns);
  allExistingColumns.forEach((column) => {
    if (parseInt(column.classList[1]) >= columnId) {
      column.remove();
    }
  }
  );

  console.log("EXISTING COLUMNS", allExistingColumns)
  console.log("ACTUAL PATH", actualPath)
  console.log("ITEM", item)

  let contentColumn = document.createElement('div');
  contentColumn.classList.add('contentColumn');
  contentColumn.classList.add(columnId);

  let allFilesFolders = document.createElement('div');
  allFilesFolders.classList.add('allFilesFolders');
  allFilesFolders.classList.add(columnId);

  let resizeColumn = document.createElement('div');
  resizeColumn.classList.add('resizeColumn');
  resizeColumn.classList.add(columnId);
  //resizeColumn.addEventListener('mousedown', startResizeColumn);

  contentColumn.appendChild(allFilesFolders);
  contentColumn.appendChild(resizeColumn);

  data.forEach((item) => {
    if (item.type === "primary") {
      return;
    }
    if (item.path === actualPath.join('/')) {
      let contentFile = document.createElement('div');
      item.type === "folder" ? contentFile.classList.add('contentFolder') : contentFile.classList.add('contentFile');
      let label = document.createElement('div');
      label.classList.add('label');
      let img = document.createElement('img');
      img.src = item.icon;
      let p = document.createElement('p');
      p.innerText = item.name;
      label.appendChild(img);
      label.appendChild(p);
      contentFile.appendChild(label);
      if (item.type === "folder") {
        let chevron = document.createElement('img');
        chevron.src = "public/chevron-right.svg";
        contentFile.appendChild(chevron);
        contentFile.addEventListener('click', () => {

          initNewColumn(columnId + 1, item);
        });
      } else {
        contentFile.addEventListener('click', () => {
          openFile(item);
        });
      }
      allFilesFolders.appendChild(contentFile);
    }
  });

  content.appendChild(contentColumn);
}

// open file on finder
let lastClickOpenFile = 0;

let openFile = (file) => {
  if (lastClickOpenFile + 200 > new Date().getTime()) {
    finder.style.display = "none";
    console.log("DOUBLE CLICK")
    windows.style.display = 'block'; // Open text file
    windows.style.left = `${computer.getBoundingClientRect().left + computer.getBoundingClientRect().width / 2 - windows.getBoundingClientRect().width / 2}px`;
    windows.style.top = `${computer.getBoundingClientRect().top + computer.getBoundingClientRect().height / 2 - windows.getBoundingClientRect().height / 2}px`;
    let content = windows.children[1];
    content.innerHTML = file.content;
  } else {
    lastClickOpenFile = new Date().getTime();
  }
}
