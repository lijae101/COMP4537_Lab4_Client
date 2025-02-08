document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("storeTitle").innerText = messages.storeText;
    document.getElementById("storeWordLab").innerText = messages.wordLabel;
    document.getElementById("storeDefLab").innerText = messages.definitionLabel;
    const storeForm = document.getElementById("storeForm");
    const storeMessage = document.getElementById("storeMessage");

    //Event Listener for submission
    storeForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const word = document.getElementById("word").value.trim();
        const definition = document.getElementById("definition").value.trim();

        //Input Validation
        if (!word || !definition) {
            storeMessage.innerText = messages.errorEmpty;
            return;
        }

        if (!/^[a-zA-Z]+$/.test(word)) {
            storeMessage.innerText = messages.errorInvalid;
            return;
        }

        //Convert data for POST request:
        const data = JSON.stringify({
            word: word,
            definition: definition
        });

        //Make POST request
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/api/definitions", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                try {
                    const response = JSON.parse(xhr.responseText);

                    if (xhr.status === 201) {
                        storeMessage.innerText = response.message;
                    } else {
                        storeMessage.innerText = response.message;
                    }
                } catch (error) {
                    storeMessage.innerText = messages.serverError;
                }

            }

        };
        xhr.send(data);
    });
});
