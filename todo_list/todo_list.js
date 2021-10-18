// const onDelete = (event) => {
//     console.log(event.target.parentElement.parentElement);
//     event.target.parentElement.parentElement.remove();
// // 어떻게 dom을 삭제하지.. && 부모부모 노드를 저렇게 써도 될까?
// // 피드백 : onAdd 안에서 delete를 만들면.. 조금 더 지정을 정확하게 할 수 있을 듯
// }
const list = document.querySelector('.list');
const newText = document.querySelector('.new_text');
const addBtn = document.querySelector('.add_btn');

const onAdd = () => {
    const item = document.createElement('li');
    const text = document.createElement('span');
    const deleteButton = document.createElement('button');
    const line = document.createElement('div');
    const onDelete = () => {
        list.removeChild(item);
        list.removeChild(line)
        newText.focus();
    }
    item.className = 'item';
    text.className = 'text';
    line.className = 'item_line';
    deleteButton.className = 'delete_btn';
    text.textContent = newText.value;
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteButton.addEventListener('click', onDelete);
    item.appendChild(text);
    item.appendChild(deleteButton);
    list.appendChild(item);
    list.appendChild(line);
    newText.value = ''
    newText.focus();
}

addBtn.addEventListener('click', onAdd);
newText.addEventListener('keypress', (event) => {
    console.log(event);
    if (event.key === 'Enter') {
        onAdd();
    }
});
//피드백 : input 에 keypress 이벤트 추가해야 정상 작동

