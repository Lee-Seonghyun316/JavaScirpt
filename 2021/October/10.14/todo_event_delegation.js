//이벤트 위임 이용하기
const list = document.querySelector('.list');
const newText = document.querySelector('.new_text');
const addBtn = document.querySelector('.add_btn');
let id = 0;
const onAdd = () => {
    //피드백 : 빈 input 값이면 입력 안받음.
    if(newText.value === '') {
        newText.focus();
        return;
    }
    const item = document.createElement('li');
    const text = document.createElement('span');
    const deleteButton = document.createElement('button');
    const line = document.createElement('div');
    item.className = `item id_${id}`;
    text.className = 'text';
    line.className = `item_line id_${id}`;
    deleteButton.className = 'delete_btn';
    text.textContent = newText.value;
    deleteButton.innerHTML = `<i class="fas fa-trash" id=${id}></i>`;
    item.appendChild(text);
    item.appendChild(deleteButton);
    list.appendChild(item);
    list.appendChild(line);
    newText.value = ''
    newText.focus();
    id += 1;
}
const onDelete = (event) => {
    if (event.target.tagName === 'I'){
        console.log(event.target.id);
        const deleteTarget = document.querySelectorAll(`.id_${event.target.id}`);
        console.log(deleteTarget)
        list.removeChild(deleteTarget[0]);
        list.removeChild(deleteTarget[1]);
    }
};
addBtn.addEventListener('click', onAdd);
list.addEventListener('click', onDelete);
newText.addEventListener('keydown', (event) => {
    //피드백  : 글자가 만들어지는 중이라면 처리하지 않고 넘어감
    if (event.isComposing){
        return;
    }
    if (event.key === 'Enter') {
        onAdd();
    }
});
//피드백 : Keypress 는 이제 지원하지 않는 이벤트 -> keydown 사용