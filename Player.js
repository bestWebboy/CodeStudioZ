npm init -y
npm install express openai
const express = require('express');
const { OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Configure your OpenAI API key
const openai = new OpenAIApi({
  key: 'your-openai-api-key',
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    // Generate HTML and JavaScript code based on the user's message
    const response = await openai.createCompletion({
      engine: 'text-davinci-002',
      prompt: `Generate HTML and JavaScript for: ${message}`,
      max_tokens: 100,
    });

    const generatedCode = response.choices[0].text;

    // Send the generated code as the response
    res.json({ code: generatedCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart HTML Chatbot</title>
</head>
<body>
    <h1>Smart HTML Chatbot</h1>
    <form id="chat-form">
        <input type="text" id="message" placeholder="Type your query">
        <button type="submit">Ask</button>
    </form>
    <div id="code-output">
        <!-- Generated code will be displayed here -->
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const chatForm = document.getElementById('chat-form');
            const messageInput = document.getElementById('message');
            const codeOutput = document.getElementById('code-output');

            chatForm.addEventListener('submit', async function (event) {
                event.preventDefault();
                const message = messageInput.value;

                // Send the user's message to the server
                const response = await fetch('/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message }),
                });

                if (response.ok) {
                    const { code } = await response.json();
                    codeOutput.innerHTML = code;
                } else {
                    codeOutput.innerHTML = 'Error: Unable to generate code';
                }
            });
        });
    </script>
</body>
</html>
node index.js
