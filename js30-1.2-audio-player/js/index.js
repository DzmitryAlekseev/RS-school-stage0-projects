// Track access
let trackAudio = document.getElementById('myAudio');



//Button play and pause access
let buttonPlay = document.getElementById('play');

//All children controls__track block
let controlsElements = document.querySelector('.controls__track').children;

let image = document.getElementsByTagName('img');


let singer = document.querySelector('.track__author');


let song = document.querySelector('.track__name');




//Collection music 
let libraryMusic = [
    {'Author': 'The Music Travel', 'musicName' : 'Flowers', 'music' : '../js30-1.2-audio-player/audio/Music Travel Love - Flowers.mp3', 'albumImage':'../js30-1.2-audio-player/img/image1.png', 'duration': '193.018776'},
    {'Author': 'The Beatles', 'musicName' : 'Here comes the sun', 'music':'../js30-1.2-audio-player/audio/Beatles - Here comes the sun.mp3', 'albumImage':'../js30-1.2-audio-player/img/image2.png', 'duration':''},
    {'Author': 'Ed Sheeran', 'musicName' : 'Perfect', 'music' : '../js30-1.2-audio-player/audio/Ed Sheeran – Perfect.mp3', 'albumImage':'../js30-1.2-audio-player/img/image3.png', 'duration':''},
];


//Duration First track
let durationAudio = libraryMusic[0].duration;
console.log(durationAudio);

let timeFrac = durationAudio / 100;
// console.log(timeFrac);

let currentAudioTime = 0;

let pointLocation = document.querySelector('.progress-area__point');
pointLocation.style.left="0%";
// console.log(pointLocation.style.left);

let musicBar = document.querySelector('.progress-area__bar');

let temp = 0;

let isPaused = true;

 //Fixed value duration first track
libraryMusic[0].duration = durationAudio;

let evt = 0;

let mouseX = 0;

let lostTimeText = document.querySelector('.lost-time');

let lastTimeText = document.querySelector('.last-time');

lostTimeText.innerText = '0' + Math.floor(durationAudio / 60) + ' : ' + ((durationAudio % 60)).toFixed(0);



let widthWindow = window.innerWidth;
console.log(widthWindow);

let widthPlayer = document.querySelector('.container__player');
console.log(widthPlayer);

//Get choords mouse
function showCoords(e) {
    mouseX =  Math.floor(e.pageX - widthPlayer.offsetLeft - ((widthPlayer.offsetWidth - musicBar.offsetWidth)/2)); 
    AreaPoint();
}

//Change position music bar point
function AreaPoint(){
    let progress = 100 *( mouseX / (musicBar.offsetWidth));
    trackAudio.currentTime = trackAudio.duration * (progress / 100);
    playTrack(trackAudio)

}

function stop(interval) {
    clearInterval(interval)
    pointLocation.style.left="0%"; 
    musicBar.value = 0;
    console.log(temp);
    buttonPlay.style.backgroundImage = 'url(img/play.svg)'; 
    temp = 100 * (trackAudio.currentTime/durationAudio);
 
    trackAudio.pause();
    isPaused = true;
    controlsElements[0].setAttribute('onclick', 'playTrack(trackAudio)');
    nextTrack();
}   

//Function play track
function playTrack(trackAudio) { 


    durationAudio = trackAudio.duration
    isPaused = false;

    if ( musicBar.value === 0) {
        trackAudio.currentTime = 0; 
        temp = 0;
    }

    let interval = setInterval(() => {
        
        if(!isPaused){
            if (temp < 100){
                
            temp = 100 * (trackAudio.currentTime/durationAudio);                   
            pointLocation.style.left = temp + "%";

            musicBar.value = temp.toFixed(2);  
            let lostTimeMunute = Math.floor((durationAudio - trackAudio.currentTime) / 60 );

            
            //Get lost Time audio
            let lostTimeSecund = ((durationAudio - trackAudio.currentTime) % 60).toFixed(0);

            if(lostTimeMunute < 10){
                lostTimeMunute = '0' + lostTimeMunute;
            }

            if(lostTimeSecund < 10){
                lostTimeSecund = '0' + lostTimeSecund;
               
            }

            let lostTime = lostTimeMunute + ' : ' + lostTimeSecund;
            console.log(lostTime);

            lostTimeText.innerText = lostTime;

            //Get last Time audio
            let lastTimeMinute = Math.floor(trackAudio.currentTime / 60);

            let lastTimeSecund = (trackAudio.currentTime % 60).toFixed(0);

            if(lastTimeMinute < 10){
                lastTimeMinute = '0' + lastTimeMinute;
            }

            if(lastTimeSecund < 10){
                lastTimeSecund = '0' + lastTimeSecund;
            }

            let lastTime = lastTimeMinute + ' : ' + lastTimeSecund;
            console.log(lastTime);

            lastTimeText.innerText = lastTime;

            } else if (temp == 100){  
                stop(interval); 
            }    
        }
    }, 1000);

    trackAudio.play();
  
    //Return music time played
    currentAudioTime = trackAudio.currentTime;

    controlsElements[0].setAttribute('onclick', 'pauseTrack(trackAudio)');
    buttonPlay.style.backgroundImage = 'url(img/pause.svg)';
   
   
}



// Function pause track
function pauseTrack(trackAudio){
    
    trackAudio.pause();
    isPaused = true;

    controlsElements[0].setAttribute('onclick', 'playTrack(trackAudio)');
    buttonPlay.style.backgroundImage = 'url(img/play.svg)'; 
}

// Switching tracks
let countClicknext = 0;

function nextTrack(){
    musicBar.value = 0;
    temp = 0;
    if(countClicknext === libraryMusic.length - 1){

        trackAudio.src = libraryMusic[0].music;
       
        trackAudio.onloadedmetadata = function() {
            libraryMusic[0].duration = trackAudio.duration;
            durationAudio = libraryMusic[0].duration;

            for(let elem of image){
                elem.setAttribute('src', libraryMusic[0].albumImage) ;
                elem.setAttribute('alt', libraryMusic[0].albumImage) ; 
            }

            singer.innerHTML = libraryMusic[0].Author;
            song.innerHTML = libraryMusic[0].musicName;

            countClicknext = 0;
            playTrack(trackAudio);
        }
    } else {
        
        countClicknext += 1;
        
        for(let i = 0; i < libraryMusic.length; i++){
    
            if(countClicknext === i){
                pauseTrack(trackAudio);
                //Change audio track
                trackAudio.src = libraryMusic[i].music; 
                
            
                
                //Add duration value next element
                trackAudio.onloadedmetadata = function() {
                    libraryMusic[i].duration = trackAudio.duration;
                    durationAudio = libraryMusic[i].duration;
                    playTrack(trackAudio);   
                }
                
                //Change Images
                for(let elem of image){
                    elem.setAttribute('src', libraryMusic[i].albumImage) ;
                    elem.setAttribute('alt', libraryMusic[i].albumImage) ; 
                }
                
                //Change audio text
                singer.innerHTML = libraryMusic[i].Author;
                song.innerHTML = libraryMusic[i].musicName;                
            }     
        }   
    }
}

function lastTrack(){
    musicBar.value = 0;
    temp = 0;
    
    if(countClicknext === 0){
        pauseTrack(trackAudio);
        trackAudio.src = libraryMusic[libraryMusic.length-1].music;
       
        trackAudio.onloadedmetadata = function() {
            libraryMusic[libraryMusic.length-1].duration = trackAudio.duration;
            durationAudio=libraryMusic[libraryMusic.length-1];

            for(let elem of image){
                elem.setAttribute('src', libraryMusic[libraryMusic.length-1].albumImage) ;
                elem.setAttribute('alt', libraryMusic[libraryMusic.length-1].albumImage) ; 
            }

            singer.innerHTML = libraryMusic[libraryMusic.length-1].Author;
            song.innerHTML = libraryMusic[libraryMusic.length-1].musicName;

        countClicknext = libraryMusic.length-1;
        playTrack(trackAudio)
        }
    } else {
        
        countClicknext -= 1;
        for(let i = 0; i < libraryMusic.length; i++){

            if(countClicknext === i){
               
                trackAudio.src = libraryMusic[i].music; 
                pauseTrack(trackAudio);
                
                //Add duration value next element
                trackAudio.onloadedmetadata = function() {
                    libraryMusic[i].duration = trackAudio.duration;
                    durationAudio = libraryMusic[i].duration;
                }
                playTrack(trackAudio);

                for(let elem of image){
                    elem.setAttribute('src', libraryMusic[i].albumImage);
                    elem.setAttribute('alt', libraryMusic[i].albumImage) ; 
                }

                singer.innerHTML = libraryMusic[i].Author;
                song.innerHTML = libraryMusic[i].musicName;
            }   
        }
    }
}







