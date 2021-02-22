const addInput = document.querySelector(".inp1");
const serachInput = document.querySelector(".inp2");
const addButton = document.querySelector("#addButton");
const matchingSpan = document.querySelector("#spn");
const main = document.querySelector("#main");
const ul = document.querySelector("ul");

let list = [];
let index = 0;
let counter = 0;
let newTask = "";

function refreshList() {
    ul.textContent = "";
    for (let i = 0; i < list.length; i++) {
        list[i].dataset.index = i;
        ul.appendChild(list[i]);
    }
}

let deleteflag = true;
let growFlag = false;
let temp;
function addTask() {
    let newTask = addInput.value;
    if (newTask.length != 0 && newTask.length < 36) {
        if (counter < 30) {
            counter++;

            const newItem = document.createElement("li");
            newItem.textContent = newTask;
            newItem.dataset.index = index;
            index++;
            list.push(newItem);

            const deleteButton = document.createElement("div");
            deleteButton.classList.add("delete");
            deleteButton.style.marginLeft = 5 + "px";
            deleteButton.addEventListener("click", deleteTask);

            refreshList();
            newItem.appendChild(deleteButton);
            addInput.value = "";
            if(counter>13){
                temp = 620 + ((counter - 13) * 30);
                main.style.height = temp + "px";
            }
        } else if (counter >= 30) {
            if (deleteflag) {
                const deleteAll = document.createElement('div');
                deleteAll.textContent = "usun wszystko";
                deleteAll.classList.toggle('deleteAll')
                ul.appendChild(deleteAll);
                deleteflag = !deleteflag;
                const deleteLsit = () => {
                    deleteAll.classList.toggle('noDisplay');
                    counter = 0;
                    main.style.height = 620 + "px";
                    deleteflag = !deleteflag;
                    list.length = 0;
                    refreshList();
                }
                deleteAll.addEventListener("click", deleteLsit);
            }
            addInput.value = "";
            return alert("Zbyt duża ilość zadań");
        }
    } else if (newTask.length >= 36) {
        addInput.value = "";
        return alert("zbyt długa nazwa zadania");
    }
}

const serachTask = (e) => {
    let search = e.target.value.toUpperCase();
    let serachList = document.querySelectorAll('li');
    serachList = Array.from(serachList);
    serachList = serachList.filter(item => item.textContent.toUpperCase().includes(search));
    ul.textContent = ""
    serachList.forEach(item => ul.appendChild(item));
    matchingSpan.textContent = serachList.length;
    if (serachList.length == 0 || search == "") {
        refreshList();
        matchingSpan.textContent = "0";
    }

}

function deleteTask(e) {
    const deleteIndex = e.target.parentNode.dataset.index;
    list.splice(deleteIndex, 1);
    deleteflag = !deleteflag;
    refreshList();
    serachInput.value = "";
    counter--;
    if (counter < 13) {
        let temp = 620 ;
        main.style.height = temp + "px";
    }
}

function enterTask(e) {
    if (e.keyCode == 13) {
        addTask();
    }
}


document.addEventListener("keydown", enterTask);
addButton.addEventListener("click", addTask);
serachInput.addEventListener("input", serachTask);