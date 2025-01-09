const tasks = []

function addTask(){
    let job = document.querySelector('input').value
    if (job === ""){ 
        alert("Enter value before adding a task")
        return
    }
    document.querySelector('input').value = ""
    const task = {
        task: job,
        state: false,
        editState: false,
    }
    tasks.push(task)
    render()
}

function deleteTask(taskNo){
    tasks.splice(taskNo, 1)
    render()
}

function checkTask(taskNo){
    tasks[taskNo].state = !tasks[taskNo].state
    render()
}


function createTaskComp(task, taskNo){
    const taskContainer = document.createElement('div')
    taskContainer.setAttribute('class', "task-container")

    let taskText
    const checkBox = document.createElement('input')
    const editbtn = document.createElement('button')
    const deletebtn = document.createElement('button')

    checkBox.setAttribute('type', "checkbox")
    if(task.editState === false){
        editbtn.innerText = "Edit"
        taskText = document.createElement('span')
        taskText.innerText = task.task
        editbtn.setAttribute('class', 'task-edit-btn')
        editbtn.addEventListener('click', function(){
            task.editState = true
            render()
        })
    }
    else{
        editbtn.innerText = "Save"
        taskText = document.createElement('input')
        editbtn.setAttribute('class', 'task-save-btn')
        editbtn.addEventListener('click', function(){
            if(taskText.value === ""){
                alert("Empty Task")
                return
            }
            task.task = taskText.value
            task.editState = false
            render()    
        })
    }
    if (task.state === false){
        taskText.setAttribute('class', 'task')
    }
    else{
        taskText.setAttribute('class', 'task-crossed')
    }
    
    deletebtn.setAttribute('class', 'task-delete-btn')
    deletebtn.innerText = "Delete"


    deletebtn.addEventListener('click', function (){
        deleteTask(taskNo)
    })
    checkBox.addEventListener('change', function(){
        checkTask(taskNo)
    })
    taskContainer.appendChild(checkBox)
    taskContainer.appendChild(taskText)
    taskContainer.appendChild(deletebtn)
    taskContainer.appendChild(editbtn)
    return taskContainer
}

function render(){
    let n = tasks.length;
    const allTaskContainer = document.querySelector('#all-task-container')
    allTaskContainer.innerHTML=""
    for(let i = 0; i < n; i++){
        const newTask = createTaskComp(tasks[i], i)
        allTaskContainer.appendChild(newTask)
    }
}