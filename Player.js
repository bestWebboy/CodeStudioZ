<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive HTML Page</title>
</head>
<body>
    <h1>Interactive HTML Page</h1>

    <div id="content">
        <!-- This is the default content of the website -->
        <p>This is the default content of the website.</p>
    </div>

    <form id="code-form">
        <label for="code">Enter the code:</label>
        <input type="text" id="code" placeholder="e.g., 34spt">
        <button type="submit">Apply Code</button>
    </form>

    <script>
        const content = document.getElementById('content');
        const codeForm = document.getElementById('code-form');
        const codeInput = document.getElementById('code');

        codeForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const enteredCode = codeInput.value;

            if (enteredCode === '34spt') {
                // Replace the content with a 3D block
                content.innerHTML = '<div style="width: 100px; height: 100px; background-color: blue; transform: rotateX(45deg);"></div>';
            } else {
                // Revert to default content
                content.innerHTML = '<p>This is the default content of the website.</p>';
            }
        });
    </script>
</body>
</html>
