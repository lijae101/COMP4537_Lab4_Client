document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("searchTitle").innerText = messages.searchText;
    document.getElementById("searchlab").innerText = messages.wordLabel;
    document.getElementById("searchWord").setAttribute("placeholder", messages.searchPlaceholder);
    document.querySelector("button").innerText = messages.buttonText;
    document.getElementById("searchForm").addEventListener("submit", (event) => {
        event.preventDefault();

        //Grab the word
        const word = document.getElementById("searchWord").value.trim();
        const msgElement = document.getElementById("searchMessage");

        //Validate that a valid word was entered:
        if(!word) {
            msgElement.innerText = messages.errorEmpty;
            return;
        }

        if(!/^[a-zA-Z]+$/.test(word)) {
            msgElement.innerText = messages.errorInvalid;
            return;
        }

        //Send AJAX call:
        const xmlHttp = new XMLHttpRequest();
        const url = `https://octopus-app-28ybo.ondigitalocean.app/api/definitions?word=${encodeURIComponent(word)}`;
        xmlHttp.open("GET", url, true);
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState === 4) {
                try {
                    const response = JSON.parse(xmlHttp.responseText);

                    if (xmlHttp.status === 200) {
                        msgElement.innerText = `Request # ${response.reqNum}\n ${response.word}: ${response.definition}`;
                    } else {
                        msgElement.innerText = response.message;
                    }
                } catch (error) {
                    msgElement.innerText = messages.serverError;
                }
            }
        };
        xmlHttp.send();
    });
});