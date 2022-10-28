const form = document.querySelector("#new-task-form")
const input = document.querySelector("#new-task-input")
const tasks = document.querySelector("#tasks")


form.addEventListener("submit", e => {
    e.preventDefault()
    let arr = JSON.parse(localStorage.getItem("tasks")) ? JSON.parse(localStorage.getItem("tasks")) : []
    let obj = {
        id: arr.length > 0 ? arr[arr.length - 1].id + 1 : 0,
        task: input.value
    }
    let res = Object.keys(arr) 
    let javob = res.filter(num => num != obj.id) 
    arr.push(obj)
    localStorage.setItem("tasks", JSON.stringify(arr))
    render()
    // console.log(res);
})

function render() {
    let arr = JSON.parse(localStorage.getItem("tasks")) || []

    arr.forEach(text => {
        // console.log(text);
        const task = document.createElement("div")
        task.classList.add("task")

        const content = document.createElement("div")
        content.classList.add("content")

        const innerInput = document.createElement("input")
        innerInput.value = text.task
        innerInput.setAttribute("readonly", "readonly")
        innerInput.type = "text"
        innerInput.classList.add("text")

        const actions = document.createElement("div")
        actions.classList.add("actions")

        const edit = document.createElement("button")
        edit.classList.add("edit")
        edit.innerHTML = "Edit"

        const deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = "Delete"
        deleteBtn.setAttribute("data-task-id", text.id)
        deleteBtn.classList.add("delete")

        content.append(innerInput)
        actions.append(edit, deleteBtn)
        task.append(content, actions)
        tasks.append(task)

        input.value = ""

        edit.addEventListener("click", e => {
            if (edit.innerHTML.toLocaleLowerCase() == "edit") {
                innerInput.removeAttribute("readonly")
                innerInput.focus()
                edit.innerHTML = "Save"
            } else {
                innerInput.setAttribute("readonly", "readonly")
                edit.innerHTML = "Edit"
            }
        })

        deleteBtn.addEventListener("click", e => {
            tasks.removeChild(task)
            let arr = JSON.parse(localStorage.getItem("tasks"))
            let findIndex = arr.findIndex(data => data.id == e.target.dataset.taskId)
            console.log(findIndex);
            arr.splice(findIndex, 1)
            localStorage.setItem("tasks", JSON.stringify(arr))
        })
    })
}
render()


