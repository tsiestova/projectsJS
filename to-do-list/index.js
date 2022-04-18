document.addEventListener("DOMContentLoaded", () => {
    (function () {
        const inputTask = document.getElementById("input-task");
        const addTaskButton = document.getElementById("add-task-button");
        const taskList = document.getElementById("task-list");

        // TODO: Create DOM element +
        // TODO: add event listeners to the created DOM element
        // TODO: add created DOM element to the list

        const getFromLocalStorage = () => {
            let taskArr;
            if (localStorage.getItem("tasks") === null) {
                taskArr = [];
            } else {
                taskArr = JSON.parse(localStorage.getItem("tasks"))
            }

            return taskArr;
        }

        const addToLocalStorage = (id, name) => {
            let taskArr;
            const storageList = getFromLocalStorage();

            const storageItem = {
                id: `${id}`,
                name: `${name}`,
            }

            storageList.push(storageItem);

            localStorage.setItem('tasks', JSON.stringify(storageList));
            taskArr = JSON.parse(localStorage.getItem("tasks"));

            return taskArr;
        }

        const deleteFromLocalStorage = (value) => {
            let taskArr = getFromLocalStorage();

            taskArr.forEach(el => {
                if (el.id === value) {
                    let i = taskArr.indexOf(el);
                    taskArr.splice(i, 1);
                }
            })

            return localStorage.setItem('tasks', JSON.stringify(taskArr));
        }

        const markInLocalStorage = (value) => {
            const taskArr = getFromLocalStorage();
            const itemIndex = taskArr.findIndex((el) => el.id === value);

            if (itemIndex === -1) {
                return;
            }

            if (taskArr[itemIndex].hasOwnProperty('completed')) {
                delete taskArr[itemIndex];
            } else {
                taskArr[itemIndex].completed = true;
            }

            localStorage.setItem('tasks', JSON.stringify(taskArr));
        }

        inputTask.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && inputTask.value) {
                const task = createItem(inputTask.value);
                addElementToList(task);

                addToLocalStorage(task.getAttribute('data-value'), inputTask.value);

                addRemoveEvent(task.querySelector('.delete-btn'));
                addCheckEvent(task.querySelector('.input-check-task'));
                inputTask.value = '';
            }
        })

        addTaskButton.addEventListener("click", () => {
            const task = createItem(inputTask.value);
            addElementToList(task);

            addToLocalStorage(task.getAttribute('data-value'), inputTask.value);

            addRemoveEvent(task.querySelector('.delete-btn'));
            addCheckEvent(task.querySelector('.input-check-task'));
            inputTask.value = '';
        })

        /**
         * Add element to the list
         *
         * @param {HTMLElement} element
         */
        const addElementToList = (element) => {
            taskList.appendChild(element)
            return taskList;
        }

        /**
         * Create a DOM element
         *
         * @param {String} value
         * @returns {HTMLElement}
         */
        const createItem = (value) => {

            const li = document.createElement("li");
            const randomNumber = (Math.random() * 1000).toFixed(4);

            li.classList.add("task-item");
            li.setAttribute("data-value", `${randomNumber}`);

            const html = `<label class="check-task_label">
                <input type="checkbox" class="input-check-task" data-value="${randomNumber}">
                <i class="fa
                s fa-check"></i>
                <span class="task" data-value="${randomNumber}">${value}</span>
            </label>
            <button class="delete-btn" data-value="${randomNumber}">
                <i class="fas fa-plus-circle"></i>
            </button>`

            li.innerHTML = html;

            return li;
        }

        const renderListFromLocal = () => {
            const data = getFromLocalStorage();

            if (data.length !== 0) {

                return data.map(el => {
                    const li = document.createElement("li")
                    li.classList.add("task-item");
                    li.setAttribute("data-value", `${el.id}`);
                    li.innerHTML = crateItemFromLocal(el.id, el.name);

                    if (el.completed) {
                        li.querySelector(".task").classList.toggle("decor-text");
                    }

                    addRemoveEvent(li.querySelector('.delete-btn'));
                    addCheckEvent(li.querySelector('.input-check-task'));
                    taskList.appendChild(li);
                })
            }

            return taskList;
        }

        const crateItemFromLocal = (id, value) => {
            return `<label class="check-task_label">
                    <input type="checkbox" class="input-check-task" data-value="${id}">
                <i class="fas fa-check"></i>
                <span class="task" data-value="${id}">${value}</span>
            </label>
            <button class="delete-btn" data-value="${id}">
                <i class="fas fa-plus-circle"></i>
            </button>`
        }

        /**
         * Add a remove event for the DOM element
         *
         * @param {HTMLElement} element
         */

        const addRemoveEvent = (element) => {
            element.addEventListener('click', (event) => {

                const value = event.target.parentNode.getAttribute('data-value');
                const currentTask = findElementByDataValue(value);

                deleteFromLocalStorage(value);

                removingItem(currentTask);
            })
        }

        /**
         * Add a remove event for the DOM element
         *
         * @param {HTMLElement} element
         */
        const addCheckEvent = (element) => {
            element.addEventListener("change", (event) => {
                const value = event.target.getAttribute('data-value');
                const currentTask = findElementByDataValue(value);
                markingItem(currentTask);
                markInLocalStorage(value);
            })
        }

        /**
         * Remove element from the list
         *
         * @param {String} value
         */
        const findElementByDataValue = (value) => {
            const list = Array.from(document.querySelectorAll('.task-item'));

            const task = list.find((item) => item.getAttribute("data-value") === value);

            return task;
        }

        const removingItem = (task) => {

            task.remove();
        }

        const markingItem = (task) => {
            task.querySelector(".task").classList.toggle("decor-text");
        }

        renderListFromLocal();
    }())
})