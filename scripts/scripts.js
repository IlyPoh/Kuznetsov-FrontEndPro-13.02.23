let ul = document.querySelector('#ul');
let list = [...ul.children]
let menu = document.querySelector('#menu');
let toDoArr = ['Task 1','Task 2','Task 3','Task 4','Task 5','Task 6','Task 7','Task 8','Task 9','Task 10']

ul.addEventListener('mousedown', function (e) {
    e.preventDefault();
})
ul.addEventListener('click', function (e) {
    if (e.target == this) {
        return false;
    }
    
    if (!e.ctrlKey && !e.shiftKey) {
        clearSelected(this.children);
    }

    if (e.shiftKey) {
        let list = [...this.children]
        let startIndex = findFirstSelected(list);
        let endIndex = list.indexOf(e.target)
        groupSelected(list, startIndex, endIndex)
    }
    toggleSelected(e.target);
})
function clearSelected(elems) {
    for (let elem of elems) {
        elem.classList.remove('selected');
    }
}
function toggleSelected(target) {
    target.classList.toggle('selected');
}
function addSelected(target) {
    target.classList.add('selected');
}
function findFirstSelected(elems) {
    for (let elem of elems) {
        if (elem.classList.contains('selected')) {
            return elems.indexOf(elem)
        }
    }
    return 0
}
function groupSelected(elems, index, targetIndex) {
    for (let elem of elems) {
        if (elems.indexOf(elem) >= index && elems.indexOf(elem) < targetIndex) {
            addSelected(elem)
        } else if (elems.indexOf(elem) <= index && elems.indexOf(elem) > targetIndex) {
            addSelected(elem)
        }
    }
}
function addBeggining(element) {
    let elementTag = document.createElement('li');
    elementTag.textContent = element
    list.unshift(elementTag);
    emitList()
}
function addEnd(element) {
    let elementTag = document.createElement('li');
    elementTag.textContent = element
    list.push(elementTag);
    emitList()
}
function removeSelected(elems) {
    list = elems.filter(el => !el.classList.contains('selected'))
    emitList()
}
function sort(elems) {
    list = elems.sort(el => {
        return el.classList.contains('selected') ? -1 : 0
    })
    emitList()
}
menu.addEventListener('click', function(e) {
    if (e.target.dataset.action === 'addBeggining') {
        let randomTask = toDoArr[Math.floor(Math.random() * toDoArr.length)]
        addBeggining(randomTask)
    }
    if (e.target.dataset.action === 'addEnd') {
        let randomTask = toDoArr[Math.floor(Math.random() * toDoArr.length)]
        addEnd(randomTask)
    }
    if (e.target.dataset.action === 'removeSelected') {
        removeSelected([...ul.children])
    }
    if (e.target.dataset.action === 'sort') {
        sort([...ul.children])
    }
})
function emitList() {
    ul.innerHTML = list.map(e => `<li class="${e.className}">${e.innerHTML}</li>`).join('')
}