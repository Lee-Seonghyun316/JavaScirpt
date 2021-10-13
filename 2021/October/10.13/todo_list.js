// const onDelete = (event) => {
//     console.log(event.target.parentElement.parentElement);
//     event.target.parentElement.parentElement.remove();
// // 어떻게 dom을 삭제하지.. && 부모부모 노드를 저렇게 써도 될까?
// // 피드백 : onAdd 안에서 delete를 만들면.. 조금 더 지정을 정확하게 할 수 있을 듯
// }
const list = document.querySelector('.list');
const newText = document.querySelector('.new_text')

const onAdd = () => {
    const item = document.createElement('li');
    item.className = 'item';
    const text = document.createElement('span');
    text.className = 'text';
    text.textContent = newText.value;
    item.appendChild(text);
    newText.value = ''
    newText.focus();
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete_btn';
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    const line = document.createElement('div');
    line.className = 'item_line';
    const onDelete = () => {
        list.removeChild(item);
        list.removeChild(line)
        newText.focus();
    }
    deleteButton.addEventListener('click', onDelete);
    item.appendChild(deleteButton);
    list.appendChild(item);
    list.appendChild(line);
}
const addBtn = document.querySelector('.add_btn');
addBtn.addEventListener('click', onAdd);
newText.addEventListener('keypress', (event) => {
    console.log(event);
    if (event.key === 'Enter') {
        onAdd();
    }
});
//피드백 : input에 이벤트 추가해야 정상 작동

