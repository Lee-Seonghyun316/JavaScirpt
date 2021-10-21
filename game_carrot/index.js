const MAX_ITEM = 3;
const MAX_TIME = 5;
const CARROT_SIZE = 50;
const gameField = document.querySelector(`.game_field`);
const start = document.querySelector(`#start`);
const stop = document.querySelector(`#stop`);
const count = document.querySelector(`.count`);
const popUp = document.querySelector(`.pop_up`);
const popUpMessage = document.querySelector(`.pop_up_message`);
const refresh = document.querySelector(`.refresh`);
const timer = document.querySelector(`.timer`);
const itemField = gameField.getBoundingClientRect();

let remainTime = MAX_TIME;
let timeRepeat = undefined;

const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*
    피드백 : 0~640, 0~170 범위 정할 때 유추대신 rect 활용해서 범위 정하기
    피드백 : translate 대신 position : absolute, top, left 활용
    피드백 : addEventListen, appendChild 까지 할 수 있도록 일반적 함수 형성
    피드백 : img path 도 받아, img 태그 만든 후 src 속성에 추가
*/
const makeItem2 = (className, imgPath) => {
    const height = rand(0, itemField.height - CARROT_SIZE - 100);
    const width = rand(0, itemField.width - CARROT_SIZE);
    const item = document.createElement('img');
    item.style.top = `${height}px`;
    item.style.left = `${width}px`;
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.addEventListener('click', onItem);
    gameField.appendChild(item);
}
const togglePopUp = (text) => {
    if(text){
        popUp.className = 'pop_up';
        popUpMessage.textContent = `${text}`;
    }
    else popUp.className = 'pop_up pop_up_hide';
}
const changeButton = () => {
    if(start.className === `game_button`){
        start.className = `game_button game_button_hide`;
        stop.className = `game_button`;
    }
    else{
        start.className = `game_button`;
        stop.className = `game_button game_button_hide`;
    }
}
const init = () => {
    if (remainTime === MAX_TIME) {
        count.textContent = `${MAX_ITEM}`;
        timer.style.display = `block`;
        count.style.display = `block`
        onTimer();
        deleteAllItem();
        changeButton();
        for (let i = 0; i < MAX_ITEM; i++) {
            makeItem2('carrot', './img/carrot.png')
            makeItem2('bug', './img/bug.png')
        }
    } else {
        togglePopUp();
        changeButton();
    }
}
const changeTime = () => {
    let minutes = Math.floor(remainTime / 60);
    let seconds = Math.floor(remainTime % 60);
    timer.textContent = `${minutes}:${seconds}`;
}
const onTimer = () => {
    /*  피드백 : clearTimeout 사용해서 setInterval 끝내기
        피드백 : 정지 버튼 둘렀을 때 타이머 정지 -> 재생 시 다시시작
        방안 1 : 버튼이 현재 재생인지 정지인지 받아와서 확인 후, 타이머 재개
        피드백 : 분(minutes)도 계산해서 나타낼 수 있도록 함수 구현
        타이머는 전역으로 선언
    */
    timeRepeat = setInterval(() => {
        if (stop.className === `game_button`) {
            remainTime -= 1;
            changeTime();
            if (remainTime <= 0) {
                clearTimeout(timeRepeat);
                togglePopUp(`TIME OVER`);
                stop.style.visibility = 'hidden';
                return;
            }
        }
    }, 1000);
}

const onStop = () => {
    changeButton();
    togglePopUp(`RePlay?`);
}
const deleteAllItem = () => {
    //? 피드백 : innerHTML = ''로 바꾸기? -> innerHTML 로 하는 것보다 좋지 않나 ?
    /*
    while (gameField.hasChildNodes()) {
        gameField.removeChild(
            gameField.firstChild
        );
    }
    */
    gameField.innerHTML = ``;
}
const gameEnd = (text) => {
    togglePopUp(`${text}`);
    stop.style.visibility = `hidden`;
    clearTimeout(timeRepeat);
}
const onItem = (event) => {
    let target = event.target;
    if(target.className === 'carrot'){
        gameField.removeChild(target);
        let carrots = document.querySelectorAll(`.carrot`);
        count.textContent = `${carrots.length}`;
        if (carrots.length === 0) {
            gameEnd(`YOU WON`);
        }
    }
    else {
        gameEnd(`YOU LOST`);
    }
}
const onRefresh = () => {
    location.reload();
}
start.addEventListener('click', init);
refresh.addEventListener('click', onRefresh);
stop.addEventListener('click', onStop);
