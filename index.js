let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner")

function createAndAppendwikipidea(result) {
    let {
        link,
        title,
        description
    } = result
    console.log(title)
    let miniContainer = document.createElement("div")
    miniContainer.classList.add("result-item")

    let anchorTittleEl = document.createElement("a")
    anchorTittleEl.href = link;
    anchorTittleEl.target = "_blank";
    anchorTittleEl.textContent = title;
    anchorTittleEl.classList.add("result-title");
    miniContainer.appendChild(anchorTittleEl)

    searchResults.appendChild(miniContainer)

    let breakEl = document.createElement("br")
    miniContainer.appendChild(breakEl)

    let anchorlinkEl = document.createElement("a")
    anchorlinkEl.href = link;
    anchorlinkEl.target = "_blank";
    anchorlinkEl.textContent = link;
    anchorlinkEl.classList.add("result-url");
    miniContainer.appendChild(anchorlinkEl)

    let break2El = document.createElement("br")
    miniContainer.appendChild(break2El)

    let anchordataEl = document.createElement("a")
    anchordataEl.href = link;
    anchordataEl.target = "_blank";
    anchordataEl.textContent = description;
    anchordataEl.classList.add("link-description");
    miniContainer.appendChild(anchordataEl)

}


function displayResults(search_results) {
    spinnerEl.classList.add("d-none")
    for (let eachresult of search_results) {
        createAndAppendwikipidea(eachresult)
    }
}

function searchDisplay(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none")
        searchResults.textContent = ""
        let searchValue = searchInput.value
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInput.addEventListener("keydown", searchDisplay);