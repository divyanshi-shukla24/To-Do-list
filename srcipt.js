document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskTime = document.getElementById('task-time');
    const timeUnit = document.getElementById('time-unit');
    const taskType = document.getElementById('task-type');
    const taskList = document.getElementById('task-list');
    const deleteAllBtn = document.getElementById('delete-all-btn');

    function convertToMilliseconds(timeValue, unitValue) {
        switch (unitValue) {
            case 'minutes': return timeValue * 60000;
            case 'hours': return timeValue * 3600000;
            case 'days': return timeValue * 86400000;
            case 'weeks': return timeValue * 604800000;
            case 'months': return timeValue * 2628000000;
            default: return 0;
        }
    }

    function createTaskElement(taskValue, timeValue, unitValue, typeValue) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span class="task">${taskValue} (${timeValue} ${unitValue}) - ${typeValue}</span>
            <div class="task-buttons">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                <button class="complete-btn">Complete</button>
            </div>
        `;
        return li;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskValue = taskInput.value;
        const timeValue = parseInt(taskTime.value);
        const unitValue = timeUnit.value;
        const typeValue = taskType.value;

        if (taskValue && timeValue) {
            const taskElement = createTaskElement(taskValue, timeValue, unitValue, typeValue);
            taskList.appendChild(taskElement);

            const timeInMs = convertToMilliseconds(timeValue, unitValue);

            setTimeout(() => {
                if (!taskElement.classList.contains('completed')) {
                    taskElement.classList.add('completed');
                    setTimeout(() => taskElement.remove(), 1000);
                }
            }, timeInMs);

            taskElement.querySelector('.complete-btn').addEventListener('click', () => {
                taskElement.classList.add('completed');
                setTimeout(() => taskElement.remove(), 1000);
            });

            taskElement.querySelector('.delete-btn').addEventListener('click', () => {
                taskElement.remove();
            });

            taskElement.querySelector('.edit-btn').addEventListener('click', () => {
                const newTaskValue = prompt('Edit task:', taskValue);
                const newTimeValue = prompt('Edit time:', timeValue);
                const newUnitValue = prompt('Edit time unit:', unitValue);

                if (newTaskValue && newTimeValue && newUnitValue) {
                    taskElement.querySelector('.task').innerHTML = `${newTaskValue} (${newTimeValue} ${newUnitValue}) - ${typeValue}`;
                }
            });

            taskInput.value = '';
            taskTime.value = '';
        }
    });

    deleteAllBtn.addEventListener('click', () => {
        taskList.innerHTML = '';
    });
});
