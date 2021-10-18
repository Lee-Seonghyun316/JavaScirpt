// form 이용하기
const list = document.querySelector('.list');
const newText = document.querySelector('.new_text');
const addBtn = document.querySelector('.add_btn');
const addForm = document.querySelector('.add_form');
let id = 0;
const onAdd = (event) => {
    event.preventDefault();
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
list.addEventListener('click', onDelete);
addForm.addEventListener('submit', onAdd);

