const MAX_ITEM = 10;
const MAX_TIME = 10;
const gameField = document.querySelector(`.game_field`);
const start = document.querySelector(`#start`);
const stop = document.querySelector(`#stop`);
const count = document.querySelector(`.count`);
const popUp = document.querySelector(`.pop_up`);
const popUpMessage = document.querySelector(`.pop_up_message`);
const refresh = document.querySelector(`.refresh`);
const timer = document.querySelector(`.timer`);

const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const makeItem = (name) => {
    //피드백 : 0~640, 0~170 범위 정할 때 유추대신 rect 활용해서 범위 정하기 -> 반영
    //피드백 : translate 대신 position : absolute, top, left 활용 -> 왜?
    //피드백 : addEventListen, appendChild 까지 할 수 있도록 일반적 함수 형성

    let height = rand(0, 640);
    let width = rand(0, 170);
    let item = document.createElement('div');
    item.className = `${name}`;
    item.style.transform = `translate(${height}px, ${width}px)`;
    return item;
}
const init = () => {
    deleteAllItem();
    start.className = `game_button game_button_hide`;
    stop.className = `game_button`;
    for (let i = 0; i < MAX_ITEM; i++) {
        let carrot = makeItem('carrot');
        carrot.addEventListener('click', onCarrot);
        let bug = makeItem('bug');
        bug.addEventListener('click', onBug);
        gameField.appendChild(carrot);
        gameField.appendChild(bug);
    }
    onTimer();
}

const onTimer = () => {
    //피드백 : clearTimeout 사용해서 setInterval 끝내기
    // 정지 버튼 둘렀을 때 타이머 정지 -> 재생 시 다시시작
    // 분(minutes)도 계산해서 나타낼 수 있도록 함수 구현
    let time = 10;
    let timeRepeat = setInterval(() => {
        time -= 1;
        timer.textContent = `0:${time}`;
        if(time <= 0){
            clearTimeout(timeRepeat);
            popUp.className = 'pop_up';
            popUpMessage.textContent = `TIME OVER`;
            return;
        }
    }, 1000);
}

const onStop = () => {
    stop.style.visibility = 'hidden';
    popUp.className = 'pop_up';
    popUpMessage.textContent = `RePlay?`;
}

const deleteAllItem = () => {
    //피드백 : innerHTML = ''로 바꾸기?
    while (gameField.hasChildNodes()) {
        gameField.removeChild(
            gameField.firstChild
        );
    }
}

const onCarrot = (event) => {
    let target = event.target;
    gameField.removeChild(target);
    let carrots = document.querySelectorAll(`.carrot`);
    console.log(carrots.length);
    count.textContent = `${carrots.length}`;
    if (carrots.length === 0) {
        popUp.className = 'pop_up';
        console.log(popUp.className);
        popUpMessage.textContent = `YOU WON`;
    }
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
