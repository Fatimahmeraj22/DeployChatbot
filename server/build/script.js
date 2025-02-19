const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const API_KEY = "";


// function to add messages to the chat box
function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// function to get AI response from OpenAI API
async function getAIResponse(userMessage) {
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
    };

    const body = JSON.stringify({
        model: "gpt-4", // correct model ID for GPT-4
        messages: [
            { role: "system", content: "You are a helpful AI assistant." },
            { role: "user", content: userMessage }
        ]
    });

    try {
        const response = await axios.post(apiUrl, body, { headers });
        console.log(response.data);
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching AI Response", error);
        return "Sorry, couldn't connect to the AI.";
    }
}

// event listener for send button
sendBtn.addEventListener("click", async () => {
    const userMessage = userInput.value.trim();
    if (userMessage === "") return;

    addMessage(userMessage, "user");
    userInput.value = "";

    const aiResponse = await getAIResponse(userMessage);
    console.log(aiResponse);
    addMessage(aiResponse, "bot");
});

// Allow enter key to send message
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendBtn.click();
    }
});