document.addEventListener("DOMContentLoaded", function() {
    // Function to add new task
    function addTask() {
        var input = document.getElementById("addTask");
        var taskText = input.value;

        if (taskText.trim() === '') {
            alert("Please enter a task!");
            return;
        }

        var taskList = document.querySelector(".content ul");
        var li = document.createElement("li");
        li.className = "taskList";

        var label = document.createElement("label");
        label.className = "list-item";

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "todoItem";

        var span = document.createElement("span");
        span.className = "text";
        span.textContent = taskText;

        label.appendChild(checkbox);
        label.appendChild(span);

        var removeSpan = document.createElement("span");
        removeSpan.className = "remove";
        removeSpan.textContent = "❌";
        removeSpan.onclick = function() {
            li.remove();
        };

        li.appendChild(label);
        li.appendChild(removeSpan);

        taskList.appendChild(li);
        input.value = '';

        updateItemsLeft();
    }

    // Event listener for adding task
    var addTaskBtn = document.getElementById("addTask");
    addTaskBtn.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Function to update items left
    function updateItemsLeft() {
        var totalTasks = document.querySelectorAll(".taskList").length;
        var completedTasks = document.querySelectorAll(".taskList input[type='checkbox']:checked").length;
        var itemsLeft = totalTasks - completedTasks;
        var itemsLeftSpan = document.querySelector(".items-left span");
        itemsLeftSpan.textContent = itemsLeft;
    }

    // Event listener for checkbox change
    var checkboxes = document.querySelectorAll(".taskList input[type='checkbox']");
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener("change", function() {
            updateItemsLeft();
        });
    });

    // Initial items left count
    updateItemsLeft();

    // Event listeners for filter buttons (All, Active, Completed)
    var filterButtons = document.querySelectorAll(".items-center span");
    filterButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            var filterValue = button.textContent.toLowerCase();
            var taskLists = document.querySelectorAll(".taskList");

            taskLists.forEach(function(taskList) {
                var checkbox = taskList.querySelector("input[type='checkbox']");
                var isChecked = checkbox.checked;

                switch (filterValue) {
                    case "all":
                        taskList.style.display = "flex";
                        break;
                    case "active":
                        if (!isChecked) {
                            taskList.style.display = "flex";
                        } else {
                            taskList.style.display = "none";
                        }
                        break;
                    case "completed":
                        if (isChecked) {
                            taskList.style.display = "flex";
                        } else {
                            taskList.style.display = "none";
                        }
                        break;
                }
            });
        });
    });

    // Event listener for "clear completed" button
    var clearCompletedBtn = document.querySelector(".items-right span");
    clearCompletedBtn.addEventListener("click", function() {
        var completedTasks = document.querySelectorAll(".taskList input[type='checkbox']:checked");
        completedTasks.forEach(function(task) {
            task.closest(".taskList").remove();
        });
    });
});
