const MAX_ITEM = 10;
const MAX_TIME = 10;
const gameField = document.querySelector(`.game_field`);
const start = document.querySelector(`#start`);
const stop = document.querySelector(`#stop`);
const count = document.querySelector(`.count`);
const popUp = document.querySelector(`.pop_up`);
const popUpMessage = document.querySelector(`.pop_up_message`);
const refresh = document.querySelector(`.refresh`);
const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const makeItem = (name) => {
    let height = rand(0, 640);
    let width = rand(0, 170);
    let item = document.createElement('div');
    item.className = `${name}`;
    item.style.transform = `translate(${height}px, ${width}px)`;

    return item;
}
const init = () => {
    deleteAllItem();
    start.className=`game_button game_button_hide`;
    stop.className=`game_button`;
    for (let i = 0; i < MAX; i++) {
        let carrot = makeItem('carrot');
        carrot.addEventListener('click', onCarrot);
        let bug = makeItem('bug');
        bug.addEventListener('click', onBug);
        gameField.appendChild(carrot);
        gameField.appendChild(bug);
    }
}

const onStop = () => {
    stop.style.visibility = 'hidden';
    popUp.className = 'pop_up';
    popUpMessage.textContent = `RePlay?`;
}

const deleteAllItem = () => {
    while (gameField.hasChildNodes()) {	// 부모노드가 자식이 있는지 여부를 알아낸다
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
