let count = 0;
let current = 0;
let selectedAppIcon = null;
let dragBox;
let apps = [];
let appId = 0;
let imgDir = 'portfolio-images/';

function getApps() {
  let dragBox = document.querySelectorAll('.ui-medium, .ui-large');
  dragBox.forEach(element => {
      dragElement(element);
  });

}

getApps();

function dragElement(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    element.style.position = "absolute";
    element.style.cursor = "move";

    changeAppPanelColor(element.dataset.id);
    changeAppBackgroundColor(element.dataset.id);

    current = parseInt(element.style.zIndex) || 0;
    element.style.zIndex = count;
    count++;

    pos3 = e.clientX;
    pos4 = e.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    element.style.cursor = "initial";
  }
}

function appPanelFocus(appDataId) {
  let openApps = document.querySelectorAll("[data-id='" + appDataId + "'], div.app-panel");
  openApps.forEach(currentApp => {
    if (currentApp.dataset.id === appDataId) {
      
      // change z-index of app to count
      currentApp.style.zIndex = count;
      count++;

      // change panel background to gray 
      if (currentApp.className === 'app-panel') {
        currentApp.style.backgroundColor = 'lightgray';
        changeAppBackgroundColor(currentApp.dataset.id);  
      }

    } else {
      if (currentApp.className === 'app-panel')
      currentApp.style.backgroundColor = 'gray'
    }
  });
}

function changeAppBackgroundColor(dataid) {
  let appWindow = document.querySelectorAll('div.top-controls');
  
  appWindow.forEach(app => {
    if (app.parentElement.dataset.id === dataid) {
      app.style.backgroundColor = 'blue';
    } else {
      app.style.backgroundColor = '#777';
    }
  });
}

function changeAppPanelColor(dataid) {
  let appPanel = document.querySelectorAll('.app-panel');
  
  appPanel.forEach(panel => {
    if (panel.dataset.id === dataid) {
      panel.style.backgroundColor = 'lightgray';      
    } else {
      panel.style.backgroundColor = 'gray';      
    }

  });
}

function addAppToPanel(appName) {
  let appPanel = document.createElement('div');
  appPanel.className = 'app-panel';
  appPanel.dataset.id = appId;
  appPanel.innerText = appName;
  appPanel.onclick = function() {
    appPanelFocus(appPanel.dataset.id);
  };

  let panel = document.querySelector('.panel');
  panel.appendChild(appPanel);
}

function closeApp(app) {
  console.log("deleting app id: " + app.dataset.id);
  let selectedApps = document.querySelectorAll('[data-id="' + app.dataset.id + '"]');
  selectedApps.forEach(elem => {
    elem.remove();
    console.log('removed');
  });
  appId--;
}

function appIconClicked(btn) {
  btn.style.background = "rgb(0, 0, 0, 0.1)";
  selectedAppIcon = btn;

  let otherApp = document.querySelectorAll('.app-icon');
  otherApp.forEach(appIco => {
    if (appIco != btn) {
      appIco.style.background = 'transparent';
    }
  });
}

function createTopControl(name, container) {
  let appName = document.createElement('h3');
  appName.innerText = name;

  let topCtrl = document.createElement('div');
  topCtrl.className = 'top-controls';
  
  let closeBttn = document.createElement('div');
  closeBttn.className = 'close-bttn';

  let closeIcon = document.createElement('img');
  closeIcon.src = imgDir + '/close-icon.png';
  closeBttn.onclick = function() {closeApp(container);};
  closeBttn.appendChild(closeIcon);

  topCtrl.appendChild(appName);
  topCtrl.appendChild(closeBttn);  

  return topCtrl;
}

function addImg(path, type) {
  let imgContainer = document.createElement('div');
  
  if (type === undefined) {
    imgContainer.className = 'img-normal';
  } else {
    imgContainer.className = type;
  }

  let img = document.createElement('img');
  img.src = path;
  imgContainer.appendChild(img);

  return imgContainer;
}

function imageAndParagraph(imgName, imgType, imgSrc, paragraph) {
  let container = document.createElement('div');
  container.className = 'content-flex';

  let projectImg1 = addImg(imgDir + imgName, imgType);
  
  let imgTextContainer = document.createElement('div');
  imgTextContainer.className = 'text-content-center';

  let imgsrc = document.createElement('h3');
  imgsrc.innerText = imgSrc;

  let imgParagraph = document.createElement('p');
  imgParagraph.innerText = paragraph;

  imgTextContainer.appendChild(imgsrc);
  imgTextContainer.appendChild(imgParagraph);

  container.appendChild(projectImg1);
  container.appendChild(imgTextContainer);

  return container;
}

function startBtnClicked(btn) {
  btn.style.background = "darkgray";
  setTimeout(() => {btn.style.background = "gray";}, 100);
}

function contactApp() {
  let uiContainer = document.createElement('div');
  uiContainer.dataset.id = appId;
  uiContainer.className = 'ui-medium';
  uiContainer.style.left = (Math.floor(Math.random() * 50)) + "%";
  uiContainer.style.zIndex = count;
  count++;

  changeAppBackgroundColor(appId);

  let ctrl = createTopControl('Contact', uiContainer);
  uiContainer.appendChild(ctrl);

  let content = document.createElement('p');
  content.className = 'content-center';

  let contactIconContainer = document.createElement('div');
  contactIconContainer.className = 'img-normal';

  let contactIcon = document.createElement('img');
  contactIcon.src = 'portfolio-images/contact-icon.png';
  contactIconContainer.appendChild(contactIcon);

  let desc = document.createElement('p');
  desc.innerText = "I don't really use social media, so this is the only way you can contact me";
  let gmailAcc = document.createElement('h4');
  gmailAcc.innerText = 'Gmail account: shelodenina@.gmail.com';
  let githubAcc = document.createElement('a');
  githubAcc.innerText = 'Github account: ';
  githubAcc.href = 'https://github.com/tongaks';

  content.appendChild(contactIconContainer);
  content.appendChild(desc);
  content.appendChild(gmailAcc);
  content.appendChild(githubAcc);

  uiContainer.appendChild(content);
  document.body.appendChild(uiContainer);
  getApps();
  addAppToPanel('Contact');
  appId++;
}

function aboutMeApp() {
  let uiContainer = document.createElement('div');
  uiContainer.dataset.id = appId;
  uiContainer.className = 'ui-medium';
  uiContainer.style.left = (Math.floor(Math.random() * 50)) + "%";
  uiContainer.style.zIndex = count;
  count++;

  changeAppBackgroundColor(appId);

  let ctrl = createTopControl('About me', uiContainer);
  uiContainer.appendChild(ctrl);

  let content = document.createElement('div');
  content.className = 'content-center';

  let profileContainer = document.createElement('div');
  profileContainer.className = 'img-normal';

  let profile = document.createElement('img');
  profile.src = 'portfolio-images/mae-transparent.png'

  profileContainer.appendChild(profile);

  let textContainer = document.createElement('div');
  textContainer.className = 'text-content';

  let imgsrc = document.createElement('h3');
  imgsrc.innerText = 'Mae from Night in the woods game';

  let intro = document.createElement('p');
  intro.innerText = 'Hi, my name is Band2 (banditwo) and I like creating webpages but my real focus is in system programming and cybersecurity.';  

  content.appendChild(profileContainer);
  content.appendChild(imgsrc);
  textContainer.appendChild(intro);
  content.appendChild(textContainer);

  uiContainer.appendChild(content);
  
  document.body.appendChild(uiContainer);
  getApps();
  addAppToPanel('About me');
  appId++;
}

function skillsApp() {
  let uiContainer = document.createElement('div');
  uiContainer.dataset.id = appId;
  uiContainer.className = 'ui-medium';
  uiContainer.style.left = (Math.floor(Math.random() * 50)) + "%";
  uiContainer.style.zIndex = count;
  count++;

  changeAppBackgroundColor(appId);

  let ctrl = createTopControl('My skills', uiContainer);
  uiContainer.appendChild(ctrl);

  let content = document.createElement('div');
  content.className = 'content-center';

  let intro = document.createElement('h3');
  intro.innerText = 'This is my current skills.';

  let htmlSkill = imageAndParagraph('portfolio-images/html5-icon.png', 'img-small', 'HTML 5', 'html is the backbone of any webpages.');
  let cssSkill = imageAndParagraph('portfolio-images/css-icon.png', 'img-small', 'CSS', 'css is what designs the webpage.');
  let jsSkill = imageAndParagraph('portfolio-images/js-icon.png', 'img-small', 'JS', 'js allows some functions in the webpages.');
  let cppSkill = imageAndParagraph('portfolio-images/cpp-icon.png', 'img-small', 'C++', 'C++ is one of my main focus.');
  let rustSkill = imageAndParagrap('portfolio-images/rust-icon.png', 'img-small', 'RUST', 'I know a bit of rust. I like the memory safety feature.');
  let linuxSkill = imageAndParagraph('portfolio-images/linux-icon.png', 'img-small', 'LINUX', 'I use linux operating system.');

  content.appendChild(intro);
  content.appendChild(htmlSkill);
  content.appendChild(cssSkill);
  content.appendChild(jsSkill);
  content.appendChild(cppSkill);
  content.appendChild(rustSkill);
  content.appendChild(linuxSkill);

  uiContainer.appendChild(content);
  
  document.body.appendChild(uiContainer);
  getApps();
  addAppToPanel('About me');
  appId++;
}

function prjApp() {
  let uiContainer = document.createElement('div');
  uiContainer.dataset.id = appId;
  uiContainer.className = 'ui-large';
  uiContainer.style.left = (Math.floor(Math.random() * 50)) + "%";
  uiContainer.style.zIndex = count;
  count++;

  changeAppBackgroundColor(appId);

  let ctrl = createTopControl('Edutrack monitoring system', uiContainer);
  uiContainer.appendChild(ctrl);

  let ps = "This is the login page of the app. Users can create an account and reset their account password if forgotten. There's also a slideshow.";
  let projectImg1 = imageAndParagraph('prj1-pic1.png', 'img-large', 'Edutrack', ps);

  let projectImg2 = imageAndParagraph('/prj1-pic2.png', 'img-large', 'Edutrack', ps);

  uiContainer.appendChild(projectImg1);
  uiContainer.appendChild(projectImg2);
  
  document.body.appendChild(uiContainer);
  getApps();
  addAppToPanel('Project 1');
  appId++;
}
