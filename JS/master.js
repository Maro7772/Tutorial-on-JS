//Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color");

if(mainColors !== null) {
  // console.log('Local Storage Is Not Empty You Can Set it On Root Now');
  // console.log(localStorage.getItem("color"));

  document.documentElement.style.setProperty('--main-color',localStorage.getItem("color"));

  //Remove Active Class Form All Colors List Items
  document.querySelectorAll(".colors-list li").forEach(ele => {
    ele.classList.remove("active");

    //Add Active Class On Element With Data-color === Local Storage Item
    if(ele.dataset.color === mainColors) {
      
      //Add Active Class
      ele.classList.add('active');
    }
  
    });


}

//Random Background Option
let backgroundOption = true;

//Variable To Control The  Background Intervial
let BackgroundInterival;


//Check If There Is Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

//Check If Random Background Local Storage Is Not Empty
if(backgroundLocalItem !== null){

  if( backgroundLocalItem === 'true'){

    backgroundOption = true;

  } else {

    backgroundOption = false;

  }

  //Remove Active Class From All Spans
  document.querySelectorAll(".random-backgrounds span").forEach(ele => {

    ele.classList.remove("active");
  });

  if(backgroundLocalItem === 'true'){

    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {

    document.querySelector(".random-backgrounds .no").classList.add("active");

  }
}

//Click On Toggle Settings Gear
document.querySelector(".toggle-settings .fa-gear").onclick =function () {

  //Toggle Class Fa-spin For Rotation on Self
  this.classList.toggle("fa-spin");

  //Toggle Class Open on Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");

};

//Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

  //Loop On Every Items
colorsLi.forEach(li => {

  //Click On Every List Items
  li.addEventListener("click", (e) =>{

    //Set Color On Root
    document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
  
    //Set Color On Local Storage
    localStorage.setItem("color",e.target.dataset.color);

    handleActive(e);

  });

});
//Switch Random Background  Options
const randomback = document.querySelectorAll(".random-backgrounds span");

  //Loop On All Spans
randomback.forEach(span => {

  //Click On Every Span
  span.addEventListener("click", (e) =>{

    handleActive(e);

    if(e.target.dataset.background === "yes"){

      backgroundOption = true;

      randomizeImgs();

      localStorage.setItem("background_option", true);

    } else {

      backgroundOption = false;

      clearInterval(BackgroundInterival);

      localStorage.setItem("background_option", false);

    }
  });

});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

//Get Array of Images
let imgsArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];

//Function To Randomize Imgs
function randomizeImgs () {

  if(backgroundOption === true){
    
    BackgroundInterival = setInterval( () => {

      //Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
    
      // Change Background Image Url
      landingPage.style.backgroundImage = 'url("Images/' + imgsArray[randomNumber] + '")';
    
    },1000);

  }

}

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

  //Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  //Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  //Window Height
  let windowHeight = this.innerHeight;

  //Window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight) ) {

    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

    allSkills.forEach(skill => {

      skill.style.width = skill.dataset.progress;
    });

  }
};

//Create Image With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

  img.addEventListener('click', e => {

    //Create Overlay Element
    let overlay = document.createElement("div");

    //Add Class To Overlay
    overlay.className = 'popup-overlay';

    //Append Overlay to The Body
    document.body.appendChild(overlay);

    //Create The Popup
    let popupBox = document.createElement("div");

    //Add Class To The Popup Box
    popupBox.className = 'popup-box';

    if(img.alt !== null){

      //Create Heading
      let imgHeading = document.createElement('h3');

      //Create Text For Heading
      let imgText =document.createTextNode(img.alt);

      //Append The Text To Heading
      imgHeading.appendChild(imgText);

      //Append The Heading To The Box
      popupBox.appendChild(imgHeading);

    }

    //Create The Image
    let popupImage = document.createElement('img');

    //Set Image Source
    popupImage.src = img.src;

    //Add Image To Popup Box
    popupBox.appendChild(popupImage);

    //Append The Popup Box To Body
    document.body.appendChild(popupBox);

    //Create The Close Span
    let closeButton = document.createElement("span");

    //Create The Close Button Text
    let closeButtonText = document.createTextNode("X");

    //Append Text To Close Button
    closeButton.appendChild(closeButtonText);

    //Add Class To Close Button
    closeButton.className = 'close-button';

    //Add close Button To The Popup Box
    popupBox.appendChild(closeButton);

  });

});

//Close Popup
document.addEventListener('click', function (e) {

  if(e.target.className == 'close-button'){

    //Remove The Current Popup
    e.target.parentNode.remove();

    //Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }

});

//Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

//Select All Links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomeWhere (elements) {
  
  elements.forEach(ele => {

    ele.addEventListener('click', e => {
  
      e.preventDefault ();
  
      document.querySelector(e.target.dataset.section).scrollIntoView({
  
        behavior: 'smooth'
  
      });
  
    });
  
  });

}
scrollToSomeWhere (allBullets);
scrollToSomeWhere (allLinks);

//Handle Active State
function handleActive (ev) {
  ev.target.parentElement.querySelectorAll('.active').forEach(ele => {

    ele.classList.remove('active');

  });

  //Add Active Class On Self
  ev.target.classList.add('active');

}

let bulletSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector('.nav-bullets');

let bulletLocalItem = localStorage.getItem('bullets_option');

if(bulletLocalItem !== null) {

  bulletSpan.forEach( span => {

    span.classList.remove('active');

  });

  if(bulletLocalItem === 'block'){

    bulletsContainer.style.display = 'block';

    document.querySelector('.bullets-option .yes').classList.add('active');

  } else {

    bulletsContainer.style.display = 'none';

    document.querySelector('.bullets-option .no').classList.add('active');

  }

}

bulletSpan.forEach( span => {

  span.addEventListener('click', e => {

    if(span.dataset.display === 'show') {

      bulletsContainer.style.display = 'block';

      localStorage.setItem('bullets_option', 'block');

    } else {

      bulletsContainer.style.display = 'none';

      localStorage.setItem('bullets_option', 'none');

    }

    handleActive(e);

  });

});

//Reset Button
document.querySelector('.reset-option').onclick = function () {

  localStorage.clear();
  // localStorage.removeItem('color_option');
  // localStorage.removeItem('background_option');
  // localStorage.removeItem('bullets_option');
  
  //Reload Window
  window.location.reload();
}

//Toggle Menu
let toggleBtn = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');

toggleBtn.onclick = function (e) {

  //Stop Propagation
  e.stopPropagation();

  //Toggle Class "menu-active" On Button
  this.classList.toggle('menu-active');

  //Toggle Class "open" On Links
  tLinks.classList.toggle('open');

};
//Click Anywhere Outside Menu And Toggle Button
document.addEventListener('click', e => {

  if(e.target !== toggleBtn && e.target !== tLinks) {

    //Check If Menu Is Open
    if(tLinks.classList.contains("open")){

      toggleBtn.classList.toggle('menu-active');

      tLinks.classList.toggle('open');

    }

  }

});

tLinks.onclick = function (e) {

  e.stopPropagation();

}