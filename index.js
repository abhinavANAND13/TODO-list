window.addEventListener('load', () => {
    // store the element into variable
    const text = document.querySelector('#inptodo');
    const create = document.querySelector('#btnadd');
    const list = document.querySelector('#lists');
    // get the old stored list if any
    document.addEventListener('load', getLocal());
    // create a new todo list
    create.addEventListener('click', (e) => {
        e.preventDefault();
        // store the input todo list as a variable
        const input = text.value;
        // cheack the input todo list is empty or not
        if (input.trim() == '') {
            text.value = null;
            // if empty then show alert message
            let Invalid = document.querySelector('#alert')
            Invalid.classList.add('hover')
            return;
        }
        let Invalid = document.querySelector('#alert');
        Invalid.classList.remove('hover');
        // create the new todo elements 
        const tododiv = document.createElement('div');
        const newtodo = document.createElement('input');;
        const btnComplete = document.createElement('button');
        const btnedit = document.createElement('button');
        const btndel = document.createElement('button');
        const done = document.createElement('button');
        // call the newcreate function
        newcreate(tododiv, newtodo, btnComplete, btnedit, btndel, done)
        // set the todo list is completed or not completed
        const overval = done.innerText;
        storeLocal(input, overval)
        newtodo.value = input.trim();
        // new created element at the top of lists
        list.insertBefore(tododiv, list.firstChild);
        text.value = null;
        // call the click event function
        clickEvents(newtodo, btnComplete, btnedit, btndel, done)

    });
    function getLocal() {
        // cheack the todos is present at localStorage
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        // cheack the overs is present at localStorage
        let overs;
        if (localStorage.getItem('overs') === null) {
            overs = [];
        } else {
            overs = JSON.parse(localStorage.getItem('overs'));
        }
        // if elements of todo is present at the localStorage variable todos
        todos.forEach(todo => {

            const tododiv = document.createElement('div');
            const newtodo = document.createElement('input');;
            const btnComplete = document.createElement('button');
            const btnedit = document.createElement('button');
            const btndel = document.createElement('button');
            const done = document.createElement('button');

            done.innerText = overs[todos.indexOf(todo)];
            newcreate(tododiv, newtodo, btnComplete, btnedit, btndel, done)
            newtodo.value = todo;
            list.appendChild(tododiv);
            clickEvents(newtodo, btnComplete, btnedit, btndel, done)
        });
    }

    function newcreate(tododiv, newtodo, btnComplete, btnedit, btndel, done) {
        // add classes, child, attribute to each todo list
        tododiv.classList.add('list');
        newtodo.classList.add('output');
        newtodo.setAttribute('disabled', '');
        tododiv.appendChild(newtodo);
        btnComplete.classList.add('btnComplete');
        btnComplete.innerHTML = `<i class="fas fa-check"></i>`;
        tododiv.appendChild(btnComplete);
        btnedit.classList.add('btnedit');
        btnedit.innerHTML = `<i class="fas fa-pen"></i>`;
        tododiv.appendChild(btnedit);
        btndel.classList.add('btndel');
        btndel.innerHTML = `<i class="fas fa-trash-alt"></i>`;
        tododiv.appendChild(btndel);
        done.classList.add('over')
        tododiv.appendChild(done)
        // set the todo list is completed or not completed
        const todo = btnComplete.parentElement;
        const lchild = todo.children[3].firstChild;
        if (done.innerText == 'completed') {
            btndel.classList.add('remove');
            lchild.classList.add('display');
            done.classList.remove('notdone');
            done.classList.add('done');
        } else {
            done.innerText = 'not completed';
            btndel.classList.add('remove');
            lchild.classList.add('display');
            done.classList.remove('done');
            done.classList.add('notdone');
        }
    }

    function clickEvents(newtodo, btnComplete, btnedit, btndel, done) {
        btnComplete.addEventListener('click', (e) => {
            // done editing to todo list is completed or not completed on click
            newtodo.setAttribute('disabled', false);
            btndel.classList.add('remove');
            const todo = e.target.parentElement;
            const lchild = todo.children[3].firstChild;
            lchild.classList.add('display')
            const parent = Array.from(document.getElementById('lists').children)
            const pposition = parent.indexOf(todo);
            setLocal(todo, pposition)
        });
        done.addEventListener('click', (e) => {
            // set the todo list is completed or not completed on click
            const todo = e.target.parentElement;
            const lchild = todo.children[3].firstChild;
            if (done.innerText == 'not completed') {
                btndel.classList.add('remove');
                lchild.classList.add('display');
                done.innerText = 'completed';
                done.classList.remove('notdone');
                done.classList.add('done');
            } else {
                btndel.classList.add('remove');
                lchild.classList.add('display');
                done.innerText = 'not completed';
                done.classList.remove('done');
                done.classList.add('notdone');
            }
            // change the todo list is completed or not completed of their index
            const parent = Array.from(document.getElementById('lists').children)
            const pposition = parent.indexOf(todo);
            setOvers(todo, pposition)
        });
        btnedit.addEventListener('click', (e) => {
            // edit the todo list on click
            newtodo.removeAttribute('disabled', true);
            const todo = e.target.parentElement;
            const lchild = todo.children[3].firstChild;
            btndel.classList.remove('remove');
            lchild.classList.remove('display');
        });
        btndel.addEventListener('click', (e) => {
            // delete the todo list on click
            const todo = e.target.parentElement;
            todo.remove();
            deleteLocal(todo)
        });
    }
    function storeLocal(todo, over) {
        // store the todos is present at localStorage
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = []
        } else {
            todos = JSON.parse(localStorage.getItem('todos'))
        }

        todos.unshift(todo)
        localStorage.setItem('todos', JSON.stringify(todos));
        // store the overs is present at localStorage
        let overs;

        if (localStorage.getItem('overs') === null) {
            overs = []
        } else {
            overs = JSON.parse(localStorage.getItem('overs'))
        }

        overs.unshift(over)
        localStorage.setItem('overs', JSON.stringify(overs));
    }
    function deleteLocal(todo) {
        let overs;
        let todos;
        // delete the todo is present at localStorage

        if (localStorage.getItem('todos') === null) {
            todos = []
        } else {
            todos = JSON.parse(localStorage.getItem('todos'))
        }
        // delete the done is present at localStorage

        if (localStorage.getItem('overs') === null) {
            overs = []
        } else {
            overs = JSON.parse(localStorage.getItem('over'))
        }
        const todoindex = todo.children[0];
        todos.splice(todos.indexOf(todoindex), 1);
        localStorage.setItem('todos', JSON.stringify(todos));

        overs.splice(overs.indexOf(todoindex), 1);
        localStorage.setItem('overs', JSON.stringify(overs));

    }
    function setLocal(todo, position,) {
        // reset the todos at localStorage
        let todos = JSON.parse(localStorage.getItem('todos'))
        const todoindex = todo.children[0].value;
        if (todos[position] == todoindex) {
            return;
        } else {
            todos.splice(position, 1, todoindex);
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }
    function setOvers(over, position) {
        // reset the overs at localStorage
        let overs = JSON.parse(localStorage.getItem('overs'))
        const overindex = over.children[4].innerText;

        if (overs[position] == overindex) {
            return;
        } else {
            overs.splice(position, 1, overindex);
            localStorage.setItem('overs', JSON.stringify(overs));
        }
    }

})





