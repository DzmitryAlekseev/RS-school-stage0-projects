const screenWidth = document.querySelector('.screen').offsetWidth;
const screenHeight = document.querySelector('.screen').offsetHeight;

let container = document.querySelector('.container')

let containerContent = document.querySelector('.container__content');

let cardsBlock = document.querySelector('.cards__block');
cardsBlock.style = 'display: none';

let containerGameOver = document.querySelector('.gameOver');
containerGameOver.style.display = 'none';

//Users
let input = document.getElementById('userName');
input.autocomplete = "off"
let userName = input.value;
let users = [];
let activeUser = '';

//Score and scoreCounter
let scoreCol = document.getElementsByClassName('score');
let score = 0;
scoreCol.innerText = 'Score: ' + score;

//Level and levelCounter
let levelCol = document.getElementsByClassName('level');
let level = 1;
levelCol.innerText = 'level: ' + level;

//bananaFirst
let bananaFirst = document.getElementsByClassName('fruit');
let banana = bananaFirst[0];
let startValuePositionFruit = -0.08*screenHeight;
banana.style.top = startValuePositionFruit + 'px';
let yCoolFruit = startValuePositionFruit;
// let xCoorFruit = 0;

//bananaSecond
let bananaSecond = document.getElementsByClassName('fruit2');
let banana2 = bananaSecond[0];
let startValuePositionFruit2 = -0.14*screenHeight;
banana2.style.top = startValuePositionFruit + 'px';
let yCoolFruit2 = startValuePositionFruit2;

//gorilla
let gorillaCol = document.getElementsByClassName('gorilla');
let gorilla = gorillaCol[0];
let xCoorGorilla = 0;
gorilla.style.left = xCoorGorilla;
let yCoolGorilla = screenHeight - 90;

//BGMisic
let backgrounMusic = document.createElement('audio');
let muteVolumeButtonBlock = document.querySelector('.MuteVolume');
let muteVolumeButtonFirstPage = document.querySelector('.MuteVolume').children[0];
let muteVolumeButtonBlockLastPage = document.querySelector('.MuteVolumeLastPage');
let muteVolumeButtonLastPage = document.querySelector('.MuteVolumeLastPage').children[0];


//sound get banana
let soundGetBanana = document.createElement('audio');

//Size xStep
let sizeXcoord = 20;
let arrXcoords = [] ;

for (let i=0; i < parseInt(screenWidth/20) - 1; i++) {
    arrXcoords.push(sizeXcoord*i);
}

let keys = [];

for (let i=0; i < localStorage.length; i++) {
    keys.push(localStorage.key(i))
}

//START APPLICATION
//Function launching application
function start(){
    
    containerGameOver.style.display = 'none';
    cardsBlock.style = 'display: none';
    containerContent.style.display = 'grid';
    input.placeholder = 'Enter your name';
    input.value = ''
    input.focus();
    addStartBackgroundMusic();

    score = 0;
    scoreCol[0].innerText = 'Score: ' + score;
    min = 0;
    sec = 0;
    time.innerText = 'Time : ' + '0'  + min + ':' + '0' + sec ;
    level = 1;
    levelCol[0].innerText = 'Level: ' + level;

    window.addEventListener('keypress', function(e){
        if(e.key === 'Enter'){
            complite()
        }
    })    
}

let rules = document.getElementsByClassName('rules')[0];
rules.style.display = 'none'

//RULES
function openRules(){
    rules.style.display = 'grid'
}

function closeRules(){
    rules.style.display = 'none'
}

//MUSIC
//Function addBGMusic
function addStartBackgroundMusic(){
    backgrounMusic.src ='./audio/afrika-tanec-duha-barabany.mp3';
    backgrounMusic.autoplay = true;
    backgrounMusic.loop = true;
    container.appendChild(backgrounMusic)
}

//Function mute/play music FirstPage
function muteAudioFirstPage(){
    backgrounMusic.pause();
    muteVolumeButtonBlock.setAttribute('onclick', 'playAudioFirstPage()');
    muteVolumeButtonFirstPage.setAttribute('src','./img/Mute.svg')
}

function playAudioFirstPage(){
    backgrounMusic.play();
    muteVolumeButtonBlock.setAttribute('onclick', 'muteAudioFirstPage()');
    muteVolumeButtonFirstPage.setAttribute('src','./img/UnMute.svg');    
}

//Function mute/play music LastPage
function addStartBackgroundMusicTheGameIsOn(){
    backgrounMusic.src ='./audio/calm-music.mp3';
    backgrounMusic.autoplay = true;
    backgrounMusic.loop = true;
    container.appendChild(backgrounMusic)
}

function muteAudioLastPage(){
    backgrounMusic.pause();
    muteVolumeButtonBlockLastPage.setAttribute('onclick', 'playAudioLastPage()');
    muteVolumeButtonLastPage.setAttribute('src','./img/Mute.svg')
}

function playAudioLastPage(){
    backgrounMusic.play();
    muteVolumeButtonBlockLastPage.setAttribute('onclick', 'muteAudioLastPage()');
    muteVolumeButtonLastPage.setAttribute('src','./img/UnMute.svg');
}

function addStartBackgroundMusicGetBanana(){
    soundGetBanana.src ='./audio/get-banana.mp3';
    soundGetBanana.autoplay = true;
    container.appendChild(soundGetBanana)
}

//Function Create new User
function User(){
    this.name = input.value;
    this.level = 1;
    this.score = score;
}

//Function add new user to LocalStorage ang start game
function complite(){
    
    containerGameOver.style.display = 'none'
   
    let user = new User();

    //Проверка на пустое поле и числа
    if(user.name === ''){
        input.placeholder = 'Enter your name';
        input.focus();
    } else {

        if (keys.length < 10) {
        localStorage.setItem(user.name,JSON.stringify(user));
        keys.push(user.name);  
        } else {
            localStorage.removeItem(keys[0]);
            keys.shift();
            keys.push(user.name);  
            localStorage.setItem(user.name,JSON.stringify(user));              
        }      
        
        containerContent.style.display = "none"
        startGame()
    }

    activeUser = user.name;
}

//place among last 10 players
function getPlace(userName){
    let players =[];

    for (let elem of keys) {
        players.push(JSON.parse(localStorage.getItem(elem)));
    }
    players.sort((a,b) =>b.score-a.score);
   
    let place = players.findIndex(x => x.name === userName) + 1;

    return place;
}

//Function  starts the game; starts timer; listen buttons
function startGame(){

    speedFruit = 500;
    speedFruit2 = 700;

    state = 'start';
    timerCount();
    addStartBackgroundMusicTheGameIsOn()
    cardsBlock.removeAttribute('style');

    fallFruit()
    
    //Функция нажатия на правую стрелку для движения гориллы
    window.addEventListener("keydown", function(e) {
        if (e.key == "ArrowRight") {    
            gorilla.click();
            if(xCoorGorilla < screenWidth - 90){
                moveGorillaRight(xCoorGorilla)
            } 
        } 
    });

    //Функция нажатия на левую стрелку для движения гориллы
    window.addEventListener("keydown", function(e) {
        if (e.key == "ArrowLeft") {    
            gorilla.click();
            if(xCoorGorilla >= 0 ){
                moveGorillaLeft(xCoorGorilla)
            } 
        } 
    });
}

//function timer
let time = document.getElementsByClassName('time')[0];
let sec = 0;
let min = 0;

let state ='';
let gameState='';

function timerCount(){

    let timerGame = setInterval(function CountTime(){
        if (state === 'start'){
          
            sec += 1;
        
            if(sec >= 0 && sec < 10){
                time.innerText = 'Time : ' + '0' + min + ':' + '0' + sec;
            } else if(sec >= 10 && sec <= 59){
                time.innerText = 'Time : ' + '0' + min + ':' + sec;
            } else if(sec === 60){
                sec = 0;
                min += 1;
                time.innerText = 'Time : ' + '0' + min + ':' + '0' + sec;
                sec += 1;
            }
            
        } else if (state === "stop") {
            stopTimeGame(timerGame); 
        } 
    }, 1000)
}

//Function randomInteger
function randomInteger(min, max) {
    // random number from min to max
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

//Gorillas coordinate when moving to the right
function moveGorillaRight(){
    xCoorGorilla += 4
    gorilla.style.left =  xCoorGorilla + 'px';
}

//Gorillas coordinate when moving to the left
function moveGorillaLeft(){
    xCoorGorilla -= 4
    gorilla.style.left =  xCoorGorilla + 'px'
}

//starting speed of fruits in ms
let speedFruit = 500;
let speedFruit2 = 800;

//start banana fall
function fallFruit(){
    banana.style.zIndex = -1;
    gameState = "play";
    
    let randomElem = randomInteger(0, arrXcoords.length);
    //random x-coor of banana 
    let xCoorFruit = arrXcoords[randomElem];
    
    let fruitState = setInterval(function changeFruit(){
        
    banana.style.left = xCoorFruit + 'px';
    startValuePositionFruit += 10;
    yCoolFruit = startValuePositionFruit;

    if(startValuePositionFruit > -5){
        banana.style.zIndex = 0;
    }

    banana.style.top = startValuePositionFruit + 'px';
       
    //Если фрукт попадает на любую координату горилы
    if((xCoorGorilla < xCoorFruit + 20 && xCoorFruit + 20 < xCoorGorilla + 90) && (yCoolGorilla < startValuePositionFruit && yCoolGorilla + 90 > startValuePositionFruit)) {

        getBanana()

        if (score % 50 === 0) {
            speedFruit *= 0.75;
            speedFruit2 *= 0.75;
            nextLevel();
        }

        if (score === 50) {
            fallFruit2();
        }
        nextFruit(fruitState) 
        
    } else if(startValuePositionFruit >= screenHeight - 40 || gameState != 'play'){
        gameOver(fruitState);
        gameState = 'stop';
    } else if(score === 200){
        win(fruitState)
        gameState = 'stop';
    }
    }, speedFruit)   
}

function fallFruit2(){
    banana2.style.zIndex = -1;

    let yCoolFruit2 = startValuePositionFruit2;
    banana2.style.top = yCoolFruit2 + 'px';
    let randomElem = randomInteger(0, arrXcoords.length);
    let xCoorFruit2 = arrXcoords[randomElem];

    let fruitState2 = setInterval(function changeFruit2(){

    banana2.style.left = xCoorFruit2 + 'px';
    startValuePositionFruit2 += 10;
    yCoolFruit2 = startValuePositionFruit2;

    if(startValuePositionFruit2 > -5){
        banana2.style.zIndex = 0;
    }

    banana2.style.top = startValuePositionFruit2 + 'px';
       
    //Если фрукт попадает на любую координату горилы
    if((xCoorGorilla < xCoorFruit2 + 20 && xCoorFruit2 + 20 < xCoorGorilla + 90) && (yCoolGorilla < startValuePositionFruit2 && yCoolGorilla + 90 > startValuePositionFruit2)) {
        getBanana()
        
        if (score % 50 === 0) {
            speedFruit *= 0.75;
            speedFruit2 *= 0.75;
            nextLevel();
        }

        nextFruit2(fruitState2);

    } else if(startValuePositionFruit2 >=  screenHeight - 40 || gameState != 'play'){
        gameOver(fruitState2)
        gameState = 'stop';
    } else if(score === 200){
        win(fruitState2)
        gameState = 'stop';
    }
    }, speedFruit2)   
}

//Функция останавливает цикл движения bananaFirst
function nextFruit(interval){
    clearInterval(interval);
    startValuePositionFruit = -40; 
    banana.style.zIndex = -1;
    banana.style.top = startValuePositionFruit + 'px';
    fallFruit()
}
//Функция останавливает цикл движения bananaSecond
function nextFruit2(interval){
    clearInterval(interval);
    startValuePositionFruit2 = -70; 
    banana2.style.zIndex = -1;
    banana2.style.top = startValuePositionFruit2 + 'px';
    fallFruit2( )
}

let gameOverScore = document.querySelector('.gameOver__score');
let gameOverUserPosition = document.querySelector('.gameOver__userPosition');

let gameOverText = document.querySelector('.gameOver__text');

function win(interval){
   gameOverText.innerText = 'YOU WIN!!!'
   gameOver(interval);
}

function gameOver(interval){

   clearInterval(interval)

   startValuePositionFruit = -40;
   banana.style.top = startValuePositionFruit + 'px';
   banana.style.zIndex = -1;

   startValuePositionFruit2 = -70;
   banana2.style.top = startValuePositionFruit + 'px';
   banana2.style.zIndex = -1;

   containerGameOver.style.display = 'grid';

   gameOverScore.innerText = 'Score: ' + score;

   gameOverUserPosition.innerText = 'Your position in Lider Table: ' + getPlace(activeUser);

   //Update user data in local storage
   currentUser = JSON.parse(localStorage.getItem(activeUser))
   currentUser.level = level;
   currentUser.score = score;
   localStorage.setItem(activeUser,JSON.stringify(currentUser));

   state = 'stop'
}

function restart(){
    
    containerGameOver.style.display = 'none';
    
    score = 0;
    scoreCol[0].innerText = 'Score: ' + score;
    min = 0;
    sec = 0;
    time.innerText = 'Time : ' + '0'  + min + ':' + '0' + sec ;
    
    level = 1;
    levelCol[0].innerText = 'Level: ' + level;

    startGame()
}

function stopTimeGame(interval){
    clearInterval(interval);
}

function getBanana(){
    score += 10;
    addStartBackgroundMusicGetBanana()
    scoreCol[0].innerText = 'Score: ' + score;
}

function nextLevel(){
    level += 1;
    levelCol[0].innerText = 'Level: ' + level;
}








