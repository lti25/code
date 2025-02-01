# 27.3.1 (form submit) Create a simple HTML5 and JavaScript application

# index.html

```jsx
<!-- //todo complete missing code.. -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script type="text/javascript" src="./index.js"></script>
</head>
<body>
    <form>
        <label for="inpTxt" >Name:</label>
            <input type="text" name="name" id="name" placeholder="Enter your name" required>
            <button type="button" onclick="showName()" >Show</button>
    </form>

    <p id="alertbox"></p>

</body>
</html>
```

# index.js

```jsx
//todo complete missing code..

function showName(){    
    let name = document.getElementById("name").value;
    let alertbox = document.getElementById("alertbox");
    
    alertbox.innerHTML = name;
}

module.exports = showName;
```