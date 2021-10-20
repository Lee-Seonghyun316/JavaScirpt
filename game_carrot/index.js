const MAX_ITEM = 3;
const MAX_TIME = 10;
const gameField = document.querySelector(`.game_field`);
const start = document.querySelector(`#start`);
const stop = document.querySelector(`#stop`);
const count = document.querySelector(`.count`);
const popUp = document.querySelector(`.pop_up`);
const popUpMessage = document.querySelector(`.pop_up_message`);
const refresh = document.querySelector(`.refresh`);
const timer = document.querySelector(`.timer`);
const itemField = gameField.getBoundingClientRect();
let nowTime = 0;

const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const makeItem = (name) => {
    /*
    피드백 : 0~640, 0~170 범위 정할 때 유추대신 rect 활용해서 범위 정하기
    피드백 : translate 대신 position : absolute, top, left 활용
    피드백 : addEventListen, appendChild 까지 할 수 있도록 일반적 함수 형성
    */
    let height = rand(0, itemField.height - 80);
    let width = rand(0, itemField.width - 80);
    let item = document.createElement('div');
    item.className = `${name}`;
    item.style.top = `${height}px`;
    item.style.left = `${width}px`;
    if (name === 'carrot') {
        item.addEventListener('click', onCarrot);
    } else if (name === 'bug') {
        item.addEventListener('click', onBug);
    } else {
        console.log(`error`);
    }
    gameField.appendChild(item);
}
const init = () => {
    if (nowTime === 0) {
        deleteAllItem();
        start.className = `game_button game_button_hide`;
        stop.className = `game_button`;
        for (let i = 0; i < MAX_ITEM; i++) {
            makeItem('carrot');
            makeItem('bug');
        }
        nowTime = onTimer(MAX_TIME);
    } else {
        popUp.className = 'pop_up pop_up_hide';
        start.className = `game_button game_button_hide`;
        stop.className = `game_button`;
    }
}

const onTimer = (time) => {
    /*  피드백 : clearTimeout 사용해서 setInterval 끝내기
        피드백 : 정지 버튼 둘렀을 때 타이머 정지 -> 재생 시 다시시작
        방안 1 : 버튼이 현재 재생인지 정지인지 받아와서 확인 후, 타이머 재개 */
    // ? 피드백 : 분(minutes)도 계산해서 나타낼 수 있도록 함수 구현
    let timeRepeat = setInterval(() => {
        let carrots = document.querySelectorAll(`.carrot`);
        if (stop.className === `game_button`) {
            time -= 1;
            timer.textContent = `0:${time}`;
            if (time <= 0) {
                clearTimeout(timeRepeat);
                popUp.className = 'pop_up';
                popUpMessage.textContent = `TIME OVER`;
                return;
            } else if (carrots.length === 0) {
                clearTimeout(timeRepeat);
            }
        }
    }, 1000);
}

const onStop = () => {
    start.className = `game_button`;
    stop.className = `game_button game_button_hide`;
    popUp.className = 'pop_up';
    popUpMessage.textContent = `RePlay?`;
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

const onCarrot = (event) => {
    let target = event.target;
    gameField.removeChild(target);
    let carrots = document.querySelectorAll(`.carrot`);
    console.log(carrots.length);
    count.textContent = `${carrots.length}`;
    if (carrots.length === 0) {
        win();
    }
}

const win = () => {
    popUp.className = 'pop_up';
    console.log(popUp.className);
    popUpMessage.textContent = `YOU WON`;
    stop.style.visibility = `hidden`;
}

const onBug = () => {
    popUp.className = 'pop_up';
    console.log(popUp.className);
    popUpMessage.textContent = `YOU LOST`;
};

const onRefresh = () => {
    location.reload();
}

start.addEventListener('click', init);
refresh.addEventListener('click', onRefresh);
stop.addEventListener('click', onStop);
