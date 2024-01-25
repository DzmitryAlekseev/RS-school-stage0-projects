console.log("Вёрстка соответствует макету. Ширина экрана 768px: 22;" +'\n'+"Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется : 12;"+'\n' + "адаптивное меню: 12.")

//function realization burger menu
function toggleMenu() {
  let menuBox = document.querySelector('nav');
  let menuIcons= document.querySelector(".burger-menu__icons");

  let menuButton=document.querySelector('.burger-menu_button img')

  if(menuBox.style.display == "block") { // if is menuBox displayed, hide it
    menuBox.style.display = "none";
    menuIcons.style.background = "none";
  menuButton.src="../library/img/burgerbutton.svg" 
  menuButton.alt="button" 


  }
  else { // if is menuBox hidden, display it
    menuBox.style.display = "block";
    menuIcons.style.background = "#000000";
    menuButton.src="../library/img/burgercross.svg" 
    menuButton.alt="cross"
  }
}

//Profile-menu
let profileMenu=document.querySelector('.profile-menu');

function toggleProfile(){
  if (profileMenu.style.display=='none'){
    profileMenu.style.display="block";
  } else {
    profileMenu.style.display="none";
  }
}

//Modal Window Login

let modalWindowLogin=document.querySelector('.modal_window__login');

function openLoginWindow(){
  modalWindowLogin.style.display="block";
  profileMenu.style.display="none";
  modalWindowRegistration.style.display="none";
}

function closeLoginWindow(){
  modalWindowLogin.style.display="none";
}

//Modal Window Registration

let modalWindowRegistration=document.querySelector('.modal_window__registration');

function openRegistrationWindow(){
  modalWindowRegistration.style.display="block";
  profileMenu.style.display="none";
  modalWindowLogin.style.display="none";
}

function closeRegistrationWindow(){
  modalWindowRegistration.style.display="none";
}

function getData() {
let firstName = document.getElementById('firstname').value;
let lastName = document.getElementById('lastname').value;
let email = document.getElementById('email').value;
let password = document.getElementById('password').value;
let data={FirstName: firstName, LastName: lastName, Email: email, Password: password, Visits: 1 , Bonuses: 0, Books: 0, Number: 'F00234030'}
return data;
}

function sendToLS() {
let user=getData();
localStorage.setItem(user.Email,JSON.stringify(user));
closeRegistrationWindow();
let icon=user.FirstName[0]+user.LastName[0]
console.log(icon);
document.querySelector('.profile-menu_button').innerHTML="<div class='profile-menu_button_FL'><p>"+icon+"</p></div>";
profileMenu.querySelector('li:first-of-type').innerHTML='<a onclick="openProfileWindow()">My Profile</a>';
profileMenu.querySelector('li:last-of-type').innerHTML='<a onclick="logOut()">Log Out</a>';

userEmail=user.Email;

}




//Log In

let userEmail=null;

function getDataFromStorage(email){
let user=JSON.parse(localStorage.getItem(email));
return user;
}

function logIn(){
  let emailLogIn = document.getElementById('emailLI').value;
  let passwordLogIn = document.getElementById('passwordLI').value;
  let user = getDataFromStorage(emailLogIn);
  if (user == null){
    console.log("no email")
  } else if (user.Password !== passwordLogIn){
 console.log("wrong password")
  }
  else if (user.Password == passwordLogIn){
    closeLoginWindow();
  let icon=user.FirstName[0]+user.LastName[0];
  document.querySelector('.profile-menu_button').innerHTML="<div class='profile-menu_button_FL'><p>"+icon+"</p></div>";
  profileMenu.querySelector('li:first-of-type').innerHTML='<a onclick="openProfileWindow()">My Profile</a>';
  profileMenu.querySelector('li:last-of-type').innerHTML='<a onclick="logOut()">Log Out</a>';
  }
 
  userEmail=user.Email;

  let temp=JSON.parse(localStorage.getItem(userEmail));
  temp.Visits+=1;
  localStorage.setItem(userEmail,JSON.stringify(temp));

  libraryLogIn()
}



//Log Out
function logOut() {
  document.querySelector('.profile-menu_button').innerHTML="<img   src='../library/img/icon_profile.svg' alt='icon-profile' class='icon__user'>";
  document.querySelector('.profile-menu_button img').style.display="block";
  profileMenu.querySelector('li:first-of-type').innerHTML="<a onclick='openLoginWindow()'>Log In</a>";
  profileMenu.querySelector('li:last-of-type').innerHTML="<a onclick='openRegistrationWindow()'>Register</a>";
  profileMenu.style.display="none";
  userActive={};

  let libraryCardButtons=document.querySelector('.library-cards__reader-card__buttons');
  libraryCardButtons.innerHTML="<button type='button' onclick='openRegistrationWindow()'>Sign Up</button>  <button type='button' onclick='openLoginWindow()'>Log In</button>";

  let libraryCard=document.querySelector('.library-cards');
  libraryCard.querySelector('h4').innerHTML="Find your Library card";
  libraryCard.querySelector('input:first-of-type').placeholder="Reader's name";
  libraryCard.querySelector('input:last-of-type').placeholder="Card number";
}


//Modal Window My Profile
let modalWindowProfile=document.querySelector('.modal__window_profile');

function openProfileWindow(){
  console.log(userEmail);
  let user = getDataFromStorage(userEmail);
  modalWindowProfile.style.display="flex";
  profileMenu.style.display="none";
  let icon=user.FirstName[0]+user.LastName[0];
  let name=user.FirstName + " " + user.LastName;
  modalWindowProfile.querySelector('.profile__avatar div p:first-child').innerHTML=icon;
  modalWindowProfile.querySelector('.profile__avatar p:nth-child(2)').innerHTML=name;
  modalWindowProfile.querySelector('.profile__card_info .profile__card_info-item:nth-of-type(1) p:last-of-type').innerHTML=user.Visits;
}

function closeProfileWindow(){
  modalWindowProfile.style.display="none";
}

//Digital Library Cards
function libraryLogIn() {
  let user = getDataFromStorage(userEmail);
  console.log(user)
  let libraryCard=document.querySelector('.library-cards');
  libraryCard.querySelector('h4').innerHTML="Your Library card";
  libraryCard.querySelector('input:first-of-type').placeholder=user.FirstName + " " + user.LastName;
  libraryCard.querySelector('input:last-of-type').placeholder=user.Number;

  let libraryCardButtons=document.querySelector('.library-cards__reader-card__buttons');
  libraryCardButtons.innerHTML="<button onclick='openProfileWindow()' type='button'>Profile</button>";
}

//Check the card

function checkCard() {
  let user = getDataFromStorage(userEmail);

  let libraryCard=document.querySelector('.library-cards__digital-card_form').children;

  libraryCard[2].querySelector('.profile__card_info .profile__card_info-item:nth-of-type(1) p:last-of-type').innerHTML=user.Visits;

  libraryCard[1].style.display="none";
  libraryCard[2].style.display="flex";
  setTimeout(()=> {
  libraryCard[1].style.display="block";
  libraryCard[2].style.display="none";
  },10000)
  console.log(libraryCard)
}




//Block About: realization slider-menu 
let blockImages = document.querySelector('.container__images');//Get collection container__images

let arrElementsblockImages = blockImages.children;//Get children .container__images

let arrGalleryPointsChildren = document.querySelector('.gallery-points').children; //Created a collection of points without text nodes

let galleryPoints = document.querySelector('.gallery-points');


let points = document.getElementsByClassName('point');

let indexPoint = 0;

let wind = matchMedia("(max-width: 768px)");

function windowTablet(wind){//Check midia-query 768px
  if(wind.matches){
 
    for(let index = 0; index < arrElementsblockImages.length; index++){ //Hidden image exept arrElementsblockImages[0]
      if(index > 0){
        arrElementsblockImages[index].classList.add('gallery-container_none');
      }
    }

    let newPoint = arrGalleryPointsChildren[0].cloneNode(true);//Create newPoint

    galleryPoints.appendChild(newPoint);

    let newPoint2 = arrGalleryPointsChildren[0].cloneNode(true);//Create newPoint

    galleryPoints.insertBefore(newPoint2, galleryPoints[arrGalleryPointsChildren.length]);
  }
}

windowTablet(wind)

let flipCount = 0;

function flipImage(){
  
  galleryPoints.addEventListener('click', event => {//Find index click element
  indexPoint = Array.from(points).indexOf(event.target);
 

    for(let i=0; i < points.length; i++){
      points[i].style.backgroundColor="black";
    }

  if (Array.from(points).length === 5){
    if(indexPoint === 0){
      for(let j = 0; j < arrElementsblockImages.length; j++){
        flipCount = 0;
        childrenCarretBlockRight.querySelector('img').style.display = 'block'; 
        childrenCarretBlockLeft.querySelector('img').style.display = 'none'; 
        arrElementsblockImages[0].classList.remove('gallery-container_none');
        arrElementsblockImages[0].classList.add('gallery-container_block');
        arrElementsblockImages[1].classList.remove('gallery-container_block');
        arrElementsblockImages[1].classList.add('gallery-container_none');
        arrElementsblockImages[2].classList.remove('gallery-container_block');
        arrElementsblockImages[2].classList.add('gallery-container_none');
        // arrElementsblockImages[3].classList.remove('gallery-container_block');
        arrElementsblockImages[3].classList.add('gallery-container_none');
        arrElementsblockImages[4].classList.remove('gallery-container_block');
        arrElementsblockImages[4].classList.add('gallery-container_none');
        points[0].style.backgroundColor="#BB945F";

        arrElementsblockImages[flipCount].classList.add('gallery-container_animation');
         setTimeout(()=> {arrElementsblockImages[flipCount].classList.remove('gallery-container_animation')},1000);

      }
    } else if(indexPoint === 1){
      for(let j = 0; j < arrElementsblockImages.length; j++){
        flipCount = 1;
        
        childrenCarretBlockRight.querySelector('img').style.display = 'block'; 
        childrenCarretBlockLeft.querySelector('img').style.display = 'block'; 
        arrElementsblockImages[0].classList.remove('gallery-container_block');
        arrElementsblockImages[0].classList.add('gallery-container_none');
        arrElementsblockImages[1].classList.remove('gallery-container_none');
        arrElementsblockImages[1].classList.add('gallery-container_block');
        arrElementsblockImages[2].classList.remove('gallery-container_block');
        arrElementsblockImages[2].classList.add('gallery-container_none');
        arrElementsblockImages[3].classList.remove('gallery-container_block');
        arrElementsblockImages[3].classList.add('gallery-container_none');
        arrElementsblockImages[4].classList.remove('gallery-container_block');
        arrElementsblockImages[4].classList.add('gallery-container_none');
        points[1].style.backgroundColor="#BB945F";

        arrElementsblockImages[flipCount].classList.add('gallery-container_animation');
         setTimeout(()=> {arrElementsblockImages[flipCount].classList.remove('gallery-container_animation')},1000);
      }
    } else if(indexPoint === 2){
      flipCount = 2;
      childrenCarretBlockRight.querySelector('img').style.display = 'block'; 
        childrenCarretBlockLeft.querySelector('img').style.display = 'block'; 
      for(let j = 0; j < arrElementsblockImages.length; j++){

        arrElementsblockImages[0].classList.remove('gallery-container_block');
        arrElementsblockImages[0].classList.add('gallery-container_none');
        arrElementsblockImages[1].classList.remove('gallery-container_block');
        arrElementsblockImages[1].classList.add('gallery-container_none');
        arrElementsblockImages[2].classList.remove('gallery-container_none');
        arrElementsblockImages[2].classList.add('gallery-container_block');
        arrElementsblockImages[2].classList.add('gallery-container_block');
        arrElementsblockImages[3].classList.remove('gallery-container_block');
        arrElementsblockImages[3].classList.add('gallery-container_none');
        arrElementsblockImages[4].classList.remove('gallery-container_block');
        arrElementsblockImages[4].classList.add('gallery-container_none');
        points[2].style.backgroundColor="#BB945F";

        arrElementsblockImages[flipCount].classList.add('gallery-container_animation');
         setTimeout(()=> {arrElementsblockImages[flipCount].classList.remove('gallery-container_animation')},1000);
      }
    } else if(indexPoint === 3){
        flipCount = 3
        childrenCarretBlockRight.querySelector('img').style.display = 'block'; 
        childrenCarretBlockLeft.querySelector('img').style.display = 'block'; 
      for(let j = 0; j < arrElementsblockImages.length; j++){

        arrElementsblockImages[0].classList.remove('gallery-container_block');
        arrElementsblockImages[0].classList.add('gallery-container_none');  
        arrElementsblockImages[1].classList.remove('gallery-container_block');
        arrElementsblockImages[1].classList.add('gallery-container_none');  
        arrElementsblockImages[2].classList.remove('gallery-container_block');
        arrElementsblockImages[2].classList.add('gallery-container_none');
        arrElementsblockImages[3].classList.remove('gallery-container_none');
        arrElementsblockImages[3].classList.add('gallery-container_block');
        arrElementsblockImages[4].classList.remove('gallery-container_block');
        arrElementsblockImages[4].classList.add('gallery-container_none');     
        points[3].style.backgroundColor="#BB945F";   

        arrElementsblockImages[flipCount].classList.add('gallery-container_animation');
         setTimeout(()=> {arrElementsblockImages[flipCount].classList.remove('gallery-container_animation')},1000);
      }
    } else if(indexPoint === 4){
        flipCount = 4;
        childrenCarretBlockRight.querySelector('img').style.display = 'none'; 
        childrenCarretBlockLeft.querySelector('img').style.display = 'block'; 
      for(let j = 0; j < arrElementsblockImages.length; j++){
        
        arrElementsblockImages[1].classList.remove('gallery-container_block');
        arrElementsblockImages[1].classList.add('gallery-container_none');
        arrElementsblockImages[2].classList.remove('gallery-container_block');
        arrElementsblockImages[2].classList.add('gallery-container_none');
        arrElementsblockImages[3].classList.remove('gallery-container_block');
        arrElementsblockImages[3].classList.add('gallery-container_none');
        arrElementsblockImages[4].classList.remove('gallery-container_none');
        arrElementsblockImages[4].classList.add('gallery-container_block');
        arrElementsblockImages[0].classList.remove('gallery-container_block');
        arrElementsblockImages[0].classList.add('gallery-container_none');
        points[4].style.backgroundColor="#BB945F";

        arrElementsblockImages[flipCount].classList.add('gallery-container_animation');
         setTimeout(()=> {arrElementsblockImages[flipCount].classList.remove('gallery-container_animation')},1000);
            
      }
    }
  } else if(Array.from(points).length === 3){
    // blockImages.classList.add('gallery-container_animation')
    if(indexPoint === 0){
    
      for(let j = 0; j < arrElementsblockImages.length; j++){
     

        arrElementsblockImages[0].classList.remove('gallery-container_none');
        arrElementsblockImages[0].classList.add('gallery-container_block');
        arrElementsblockImages[1].classList.remove('gallery-container_none');
        arrElementsblockImages[1].classList.add('gallery-container_block');
        arrElementsblockImages[2].classList.add('gallery-container_block');
        arrElementsblockImages[3].classList.remove('gallery-container_block');
        arrElementsblockImages[3].classList.add('gallery-container_none');
        arrElementsblockImages[4].classList.remove('gallery-container_block');
        arrElementsblockImages[4].classList.add('gallery-container_none');
        
        for(let i=0; i<3; i++){
        arrElementsblockImages[i].classList.add('gallery-container_animation');
        setTimeout(()=> {arrElementsblockImages[i].classList.remove('gallery-container_animation')},1000);
        }
      }
    } else if(indexPoint === 1){
      
      for(let j = 0; j < arrElementsblockImages.length; j++){
      


        
        arrElementsblockImages[0].classList.remove('gallery-container_block');
        arrElementsblockImages[0].classList.add('gallery-container_none');
        arrElementsblockImages[1].classList.remove('gallery-container_none');
        arrElementsblockImages[1].classList.add('gallery-container_block');
        arrElementsblockImages[2].classList.add('gallery-container_block');
        arrElementsblockImages[3].classList.remove('gallery-container_none');
        arrElementsblockImages[3].classList.add('gallery-container_block');
        arrElementsblockImages[4].classList.add('gallery-container_none');
        
        for(let i=1; i<4; i++){
          arrElementsblockImages[i].classList.add('gallery-container_animation');
          setTimeout(()=> {arrElementsblockImages[i].classList.remove('gallery-container_animation')},1000);
          }

      }
    } else if(indexPoint === 2){
      for(let j = 0; j < arrElementsblockImages.length; j++){
      

        arrElementsblockImages[0].classList.remove('gallery-container_block');
        arrElementsblockImages[0].classList.add('gallery-container_none');
        arrElementsblockImages[1].classList.remove('gallery-container_block');
        arrElementsblockImages[1].classList.add('gallery-container_none');
        arrElementsblockImages[2].classList.add('gallery-container_block');
        arrElementsblockImages[3].classList.remove('gallery-container_none');
        arrElementsblockImages[3].classList.add('gallery-container_block');
        arrElementsblockImages[4].classList.remove('gallery-container_none');
        arrElementsblockImages[4].classList.add('gallery-container_block');
        
        for(let i=2; i<5; i++){
          arrElementsblockImages[i].classList.add('gallery-container_animation');
          setTimeout(()=> {arrElementsblockImages[i].classList.remove('gallery-container_animation')},1000);
          }
      }
    }
  }
  })
}




let childrenCarretBlockRight = document.querySelector(".carret__block_right");

let childrenCarretBlockLeft = document.querySelector(".carret__block_left");

function flipImageCarretRight(){

  for(let i=0; i < points.length; i++){
    points[i].style.backgroundColor="black";
  }

  if(flipCount === 0 || flipCount < arrElementsblockImages.length){
     
    flipCount += 1;
   
   
  } else if(flipCount === arrElementsblockImages.length){
    childrenCarretBlockRight.children.disabled  = "disabled"
      
  } else if (flipCount > arrElementsblockImages.length){
    flipCount = arrElementsblockImages.length - 1
  } 

  if( flipCount === 0){
    for(let j = 0; j < arrElementsblockImages.length; j++){
      arrElementsblockImages[0].classList.remove('gallery-container_none');
      arrElementsblockImages[0].classList.add('gallery-container_block');
      arrElementsblockImages[1].classList.remove('gallery-container_block');
      arrElementsblockImages[1].classList.add('gallery-container_none');
      arrElementsblockImages[2].classList.remove('gallery-container_block');
      arrElementsblockImages[2].classList.add('gallery-container_none');
      // arrElementsblockImages[3].classList.remove('gallery-container_block');
      arrElementsblockImages[3].classList.add('gallery-container_none');
      arrElementsblockImages[4].classList.remove('gallery-container_block');
      arrElementsblockImages[4].classList.add('gallery-container_none');
      points[0].style.backgroundColor="#BB945F";
      

    }
  } else if(flipCount === 1){
    for(let j = 0; j < arrElementsblockImages.length; j++){
      childrenCarretBlockLeft.querySelector('img').style.display = 'block'; 
      arrElementsblockImages[0].classList.remove('gallery-container_block');
      arrElementsblockImages[0].classList.add('gallery-container_none');
      arrElementsblockImages[1].classList.remove('gallery-container_none');
      arrElementsblockImages[1].classList.add('gallery-container_block');
      arrElementsblockImages[2].classList.remove('gallery-container_block');
      arrElementsblockImages[2].classList.add('gallery-container_none');
      arrElementsblockImages[3].classList.remove('gallery-container_block');
      arrElementsblockImages[3].classList.add('gallery-container_none');
      arrElementsblockImages[4].classList.remove('gallery-container_block');
      arrElementsblockImages[4].classList.add('gallery-container_none');
      points[1].style.backgroundColor="#BB945F";
     
    }
  } else if(flipCount === 2){
    for(let j = 0; j < arrElementsblockImages.length; j++){
      
      arrElementsblockImages[0].classList.remove('gallery-container_block');
      arrElementsblockImages[0].classList.add('gallery-container_none');
      arrElementsblockImages[1].classList.remove('gallery-container_block');
      arrElementsblockImages[1].classList.add('gallery-container_none');
      arrElementsblockImages[2].classList.remove('gallery-container_none');
      arrElementsblockImages[2].classList.add('gallery-container_block');
      arrElementsblockImages[2].classList.add('gallery-container_block');
      arrElementsblockImages[3].classList.remove('gallery-container_block');
      arrElementsblockImages[3].classList.add('gallery-container_none');
      arrElementsblockImages[4].classList.remove('gallery-container_block');
      arrElementsblockImages[4].classList.add('gallery-container_none');
      points[2].style.backgroundColor="#BB945F";
    }
  } else if(flipCount === 3){
    for(let j = 0; j < arrElementsblockImages.length; j++){
      
      arrElementsblockImages[0].classList.remove('gallery-container_block');
      arrElementsblockImages[0].classList.add('gallery-container_none');  
      arrElementsblockImages[1].classList.remove('gallery-container_block');
      arrElementsblockImages[1].classList.add('gallery-container_none');  
      arrElementsblockImages[2].classList.remove('gallery-container_block');
      arrElementsblockImages[2].classList.add('gallery-container_none');
      arrElementsblockImages[3].classList.remove('gallery-container_none');
      arrElementsblockImages[3].classList.add('gallery-container_block');
      arrElementsblockImages[4].classList.remove('gallery-container_block');
      arrElementsblockImages[4].classList.add('gallery-container_none');        
      points[3].style.backgroundColor="#BB945F";
    }
  } else if(flipCount === 4){
    for(let j = 0; j < arrElementsblockImages.length; j++){
      
      arrElementsblockImages[1].classList.remove('gallery-container_block');
      arrElementsblockImages[1].classList.add('gallery-container_none');
      arrElementsblockImages[2].classList.remove('gallery-container_block');
      arrElementsblockImages[2].classList.add('gallery-container_none');
      arrElementsblockImages[3].classList.remove('gallery-container_block');
      arrElementsblockImages[3].classList.add('gallery-container_none');
      arrElementsblockImages[4].classList.remove('gallery-container_none');
      arrElementsblockImages[4].classList.add('gallery-container_block');
      arrElementsblockImages[0].classList.remove('gallery-container_block');
      arrElementsblockImages[0].classList.add('gallery-container_none');   
      childrenCarretBlockRight.querySelector('img').style.display = 'none'; 
      points[4].style.backgroundColor="#BB945F";
    }
  }
}

function flipImageCarretleft(){

  for(let i=0; i < points.length; i++){
    points[i].style.backgroundColor="black";
  }

  if(flipCount === 0 ){
    childrenCarretBlockLeft.querySelector('img').style.display = 'none';    
  } else if (flipCount <= arrElementsblockImages.length - 1 || flipCount === arrElementsblockImages.length){
    childrenCarretBlockRight.style.backgroundColor = 'white';
    flipCount -= 1;
   
  } 

  if( flipCount === 0){
    for(let j = 0; j < arrElementsblockImages.length; j++){
      arrElementsblockImages[0].classList.remove('gallery-container_none');
      arrElementsblockImages[0].classList.add('gallery-container_block');
      arrElementsblockImages[1].classList.remove('gallery-container_block');
      arrElementsblockImages[1].classList.add('gallery-container_none');
      arrElementsblockImages[2].classList.remove('gallery-container_block');
      arrElementsblockImages[2].classList.add('gallery-container_none');
      arrElementsblockImages[3].classList.add('gallery-container_none');
      arrElementsblockImages[4].classList.remove('gallery-container_block');
      arrElementsblockImages[4].classList.add('gallery-container_none');
      childrenCarretBlockLeft.querySelector('img').style.display = 'none';
      points[0].style.backgroundColor="#BB945F"; 
    }
  } else if(flipCount === 1){
    for(let j = 0; j < arrElementsblockImages.length; j++){

     
      arrElementsblockImages[0].classList.remove('gallery-container_block');
      arrElementsblockImages[0].classList.add('gallery-container_none');
      arrElementsblockImages[1].classList.remove('gallery-container_none');
      arrElementsblockImages[1].classList.add('gallery-container_block');
      arrElementsblockImages[2].classList.remove('gallery-container_block');
      arrElementsblockImages[2].classList.add('gallery-container_none');
      arrElementsblockImages[3].classList.remove('gallery-container_block');
      arrElementsblockImages[3].classList.add('gallery-container_none');
      arrElementsblockImages[4].classList.remove('gallery-container_block');
      arrElementsblockImages[4].classList.add('gallery-container_none');
      points[1].style.backgroundColor="#BB945F";
    }
  } else if(flipCount === 2){
    for(let j = 0; j < arrElementsblockImages.length; j++){
     
      arrElementsblockImages[0].classList.remove('gallery-container_block');
      arrElementsblockImages[0].classList.add('gallery-container_none');
      arrElementsblockImages[1].classList.remove('gallery-container_block');
      arrElementsblockImages[1].classList.add('gallery-container_none');
      arrElementsblockImages[2].classList.remove('gallery-container_none');
      arrElementsblockImages[2].classList.add('gallery-container_block');
      arrElementsblockImages[2].classList.add('gallery-container_block');
      arrElementsblockImages[3].classList.remove('gallery-container_block');
      arrElementsblockImages[3].classList.add('gallery-container_none');
      arrElementsblockImages[4].classList.remove('gallery-container_block');
      arrElementsblockImages[4].classList.add('gallery-container_none');
      points[2].style.backgroundColor="#BB945F";
    }
  } else if(flipCount === 3){
    for(let j = 0; j < arrElementsblockImages.length; j++){
      
      arrElementsblockImages[0].classList.remove('gallery-container_block');
      arrElementsblockImages[0].classList.add('gallery-container_none');  
      arrElementsblockImages[1].classList.remove('gallery-container_block');
      arrElementsblockImages[1].classList.add('gallery-container_none');  
      arrElementsblockImages[2].classList.remove('gallery-container_block');
      arrElementsblockImages[2].classList.add('gallery-container_none');
      arrElementsblockImages[3].classList.remove('gallery-container_none');
      arrElementsblockImages[3].classList.add('gallery-container_block');
      arrElementsblockImages[4].classList.remove('gallery-container_block');
      arrElementsblockImages[4].classList.add('gallery-container_none'); 
      childrenCarretBlockRight.querySelector('img').style.display = 'block';     
      points[3].style.backgroundColor="#BB945F";  
    }
  } else if(flipCount === 4){
    for(let j = 0; j < arrElementsblockImages.length; j++){
      
      arrElementsblockImages[1].classList.remove('gallery-container_block');
      arrElementsblockImages[1].classList.add('gallery-container_none');
      arrElementsblockImages[2].classList.remove('gallery-container_block');
      arrElementsblockImages[2].classList.add('gallery-container_none');
      arrElementsblockImages[3].classList.remove('gallery-container_block');
      arrElementsblockImages[3].classList.add('gallery-container_none');
      arrElementsblockImages[4].classList.remove('gallery-container_none');
      arrElementsblockImages[4].classList.add('gallery-container_block');
      arrElementsblockImages[0].classList.remove('gallery-container_block');
      arrElementsblockImages[0].classList.add('gallery-container_none');  
      points[4].style.backgroundColor="#BB945F";
    }
  }
}


//Block Favorites
let childrenFavoritesItems = document.querySelector('.favorites__items').children;


let childrenCheckbox = document.querySelector('.favorites__checkbox').children;

let seasonIndex = 0;

function fadeIn() {
  for (let i=0; i < childrenFavoritesItems.length; i++){
      childrenFavoritesItems[i].classList.add('favorites__item_animation');
  }
}

function fadeOut() {
  for (let i=0; i < childrenFavoritesItems.length; i++){
      childrenFavoritesItems[i].classList.remove('favorites__item_animation');
  }
}

let favItem1 = [
  {title: "The Book Eaters" , author:"By Sunyi Dean",description: "An unusual sci-fi story about a book eater woman who tries desperately to save her dangerous mind-eater son from tradition and certain death. Complete with dysfunctional family values, light Sapphic romance, and a strong, complex protagonist. Not for the faint of heart.",image: "../library/img/book1_1.png" },
  {title: "The Body" , author:"By Stephen King",description: "Powerful novel that takes you back to a nostalgic time, exploring both the beauty and danger and loss of innocence that is youth.",image: "../library/img/book1_2.png" },
  {title: "Crude: A Memoir" , author:"By Pablo Fajardo & ​​Sophie Tardy-Joubert",description: "Drawing and color by Damien Roudeau | This book illustrates the struggles of a group of indigenous Ecuadoreans as they try to sue the ChevronTexaco company for damage their oil fields did to the Amazon and her people",image: "../library/img/book1_3.png" },
  {title: "Casual Conversation" , author:"By Renia White",description: "White's impressive debut collection takes readers through and beyond the concepts of conversation and the casual - both what we say to each other and what we don't, examining the possibilities around how we construct and communicate identity. ",image: "../library/img/book1_4.png" }
];

let favItem2 = [
  {title: "Cackle" , author:"By Rachel Harrison",description: "Are your Halloween movies of choice The Witches of Eastwick and Practical Magic? Look no further than here - where a woman recovering from a breakup moves to a quaint town in upstate New York and befriends a beautiful witch.",image: "../library/img/book2_1.png" },
  {title: "Carry: A Memoir of Survival on Stolen Land" , author: "By Toni Jenson",description: "This memoir about the author's relationship with gun violence feels both expansive and intimate, resulting in a lyrical indictment of the way things are.",image: "../library/img/book2_2.png" },
  {title: "Let My People Go Surfing" , author:"By Yvon Chouinard",description: "Chouinard—climber, businessman, environmentalist—shares tales of courage and persistence from his experience of founding and leading Patagonia, Inc. Full title: Let My People Go Surfing: The Education of a Reluctant Businessman, Including 10 More Years of Business Unusual.",image: "../library/img/book2_3.png" },
  {title: "The Great Fire" , author:"By Lou Ureneck",description: "The harrowing story of an ordinary American and a principled Naval officer who, horrified by the burning of Smyrna, led an extraordinary rescue effort that saved a quarter of a million refugees from the Armenian Genocide",image: "../library/img/book2_4.png" }];

let favItem3 = [
  {title: "Dante: Poet of the Secular World" , author:"By Erich Auerbach",description: "Auerbach's engaging book places the 'Comedy' within the tradition of epic, tragedy, and philosophy in general, arguing for Dante's uniqueness as one who raised the individual and his drama of soul into something of divine significance—an inspired introduction to Dante's main themes.",image: "../library/img/book3_1.png" },
  {title: "Days of Distraction" , author:"By Alexandra Chang",description: "A sardonic view of Silicon Valley culture, a meditation on race, and a journal of displacement and belonging, all in one form-defying package of spare prose.",image: "../library/img/book3_2.png" },
  {title: "The Octopus Museum: Poems" , author:"By Brenda Shaughnessy",description: "This collection of bold and scathingly beautiful feminist poems imagines what comes after our current age of environmental destruction, racism, sexism, and divisive politics.",image: "../library/img/book3_3.png" },
  {title: "Rickey: The Life and Legend" , author:"By Howard Bryant",description: "With the fall rolling around, one can't help but think of baseball's postseason coming up! And what better way to prepare for it than reading the biography of one of the game's all-time greatest performers, the Man of Steal, Rickey Henderson?",image: "../library/img/book3_4.png" }];

let favItem4 = [
    {title: "The Last Queen" , author:"By Clive Irving",description: "A timely and revelatory new biography of Queen Elizabeth (and her family) exploring how the Windsors have evolved and thrived as the modern world has changed around them.",image: "../library/img/book4_1.png" },
    {title: "Dominicana" , author:"By Angie Cruz",description: "A fascinating story of a teenage girl who marries a man twice her age with the promise to bring her to America. Her marriage is an opportunity for her family to eventually immigrate. For fans of Isabel Allende and Julia Alvarez.",image: "../library/img/book4_2.png" },
    {title: "Shark Dialogues: A Novel" , author:"By Kiana Davenport",description: "An epic saga of seven generations of one family encompasses the tumultuous history of Hawaii as a Hawaiian woman gathers her four granddaughters together in an erotic tale of villains and dreamers, queens and revolutionaries, lepers and healers.",image: "../library/img/book4_3.png" },
    {title: "Slug: And Other Stories" , author:"By Megan Milks",description: "Exes Tegan and Sara find themselves chained together by hairballs of codependency. A father and child experience the shared trauma of giving birth to gods from their wounds.",image: "../library/img/book4_4.png" }];


let favItems=[favItem1, favItem2, favItem3, favItem4];

function replaceCard (newSeason){
  for(let i=0; i<childrenFavoritesItems.length; i++){
  childrenFavoritesItems[i].querySelector('h4').innerHTML="<span>" + favItems[i][newSeason].title + "</span><br>" + favItems[i][newSeason].author;
  childrenFavoritesItems[i].querySelector('p').innerHTML=favItems[i][newSeason].description;
  childrenFavoritesItems[i].querySelector('img').src=favItems[i][newSeason].image;
  }
}

let input = document.querySelector('.favorites__checkbox').querySelector("input");

addEventListener('input', (event) => {
  seasonIndex = event.target.value;
  if (seasonIndex == 0) {
    fadeIn();
    setTimeout(()=> {fadeOut()},1000)
    replaceCard(0);
  }
  else if (seasonIndex == 1) {
    fadeIn();
    setTimeout(()=> {fadeOut()},1000)
    replaceCard(1);
  }
  else if (seasonIndex == 2) {
    fadeIn();
    setTimeout(()=> {fadeOut()},1000)
    replaceCard(2);
  }
  else if (seasonIndex == 3) {
    fadeIn();
    setTimeout(()=> {fadeOut()},1000)
    replaceCard(3);
  }
});








