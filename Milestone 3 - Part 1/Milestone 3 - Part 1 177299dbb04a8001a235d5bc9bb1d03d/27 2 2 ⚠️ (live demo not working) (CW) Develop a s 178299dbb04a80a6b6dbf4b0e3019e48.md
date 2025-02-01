# 27.2.2 ⚠️ (live demo not working) (CW) Develop a simple HTML5 and JavaScript application for tracking tasks

all case passed but live demo no working

# index.html

```jsx
<!-- //todo: complete missing code -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Tracker</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    
    <div class="container">
        <form id="taskForm">
            <input type="text" class="taskInput" placeholder="Enter a task" required> 
            <button type="button" id="addTaskButton" >Add Task</button>
        </div>

        <p id="taskDisplay" ></p>

    </div>

    <script src="index.js"></script>
</body>
</html>

```

# .js

```jsx
//todo: complete missing code

document.getElementById('addTaskButton').addEventListener("click", function(){

    const task  = document.getElementById("taskInput").value;

    if(task){
        document.getElementById('taskDisplay').textContent = task;
        document.getElementById("taskInput").value = '';
    }

})

```

# .class

```jsx
body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f0f0f0;
}

.container {
    text-align: center;
}

#taskForm {
    margin-bottom: 20px;
}

#taskInput {
    padding: 10px;
    font-size: 16px;
    width: 200px;
    margin-right: 10px;
}

#addTaskButton {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

#addTaskButton:hover {
    background-color: #0056b3;
}

#taskDisplay {
    font-size: 18px;
    color: #333;
}

```