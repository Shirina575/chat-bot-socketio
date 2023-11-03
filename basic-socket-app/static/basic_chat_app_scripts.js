const socket = io();
let messageContainer = document.querySelector(".chat-log");
const messageInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

socket.on("connect", () => {
    console.log('You are connected')
    sendButton.addEventListener("click", sendMessage);

    messageInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

function appendUserMessage(message) {
    let messageElement = document.createElement("div");
    messageElement.classList.add("user-message");
    messageElement.classList.add("user-bubble");
    messageElement.innerHTML = `<div>${message}</div>`;
    messageContainer.appendChild(messageElement);
}

function appendBotMessage(message) {
    let messageElement = document.createElement("div");
    messageElement.classList.add("bot-message");
    messageElement.classList.add("bot-bubble");
    messageElement.innerHTML = `<div>${message}</div>`;
    messageContainer.appendChild(messageElement);
}

function appendLoadingSpinner() {
    let spinnerElement = document.createElement("div");
    spinnerElement.classList.add("loading-spinner");
    messageContainer.appendChild(spinnerElement);
}

function removeLoadingSpinner() {
    const spinner = messageContainer.querySelector(".loading-spinner");
    if (spinner) {
        spinner.remove();
    }
}

function sendMessage(){
    const userMessage = messageInput.value;
    if (userMessage) {
        appendUserMessage(userMessage);
        messageInput.value = "";
        // Show loading spinner
        appendLoadingSpinner();
        // Simulate a delay before sending the final response
        setTimeout(() => {
            // Hide loading spinner
            removeLoadingSpinner();
            // Send an initial response
            appendBotMessage("Message received: " + userMessage);
            sendRequestToServer(userMessage);
        }, 1000);
    }
}

function sendRequestToServer(userMessage) {
    $.ajax({
        type: "POST",
        url: "/process_message",
        data: JSON.stringify({ message: userMessage }),
        contentType: "application/json;charset=UTF-8",
        success: function (response) {
            // Hide loading spinner
            removeLoadingSpinner();

            // Simulate a delay before sending the final response
            setTimeout(() => {
                // Send the final response
                appendBotMessage(response.finalResponse);
            }, 5000);
        },
    });
}