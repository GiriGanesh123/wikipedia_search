let searchInputEl = document.getElementById('searchInput');
let SearchResultEl = document.getElementById('searchResult');
let spinnerEl = document.getElementById('spinner');

function CreateandAppend(result) {
    let {
        title,
        link,
        description
    } = result;

    let myResult = document.createElement('div');
    myResult.classList.add('my-result');
    SearchResultEl.appendChild(myResult);

    let AnchorEl = document.createElement('a');
    AnchorEl.classList.add('result-title');
    AnchorEl.textContent = title;
    AnchorEl.href = link;
    AnchorEl.target = "_blank";
    myResult.appendChild(AnchorEl);

    let brakeEl = document.createElement('br');
    myResult.appendChild(brakeEl);

    let UrlEl = document.createElement('a');
    UrlEl.classList.add('url-links');
    UrlEl.href = link;
    UrlEl.target = '_blank';
    UrlEl.textContent = link;
    myResult.appendChild(UrlEl);

    let brakeEle = document.createElement('br');
    myResult.appendChild(brakeEle);

    let DescriptionEl = document.createElement('p');
    DescriptionEl.classList.add('my-description');
    DescriptionEl.textContent = description;
    myResult.appendChild(DescriptionEl);
}

function displayMyResult(myresult) {
    spinnerEl.classList.toggle('d-none');
    for (let item of myresult) {
        CreateandAppend(item);
    }

}

function onsearchevents(Event) {
    if (Event.key === 'Enter') {
        spinnerEl.classList.toggle('d-none');
        SearchResultEl.textContent = "";
        let UserInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + UserInput;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayMyResult(search_results);
            });
    }

}
searchInputEl.addEventListener('keydown', onsearchevents);