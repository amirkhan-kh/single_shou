const $cards = document.querySelector(".cards");
const $result = document.querySelector(".result");

const renderMovies = (data) => {
    const $divFragment = document.createDocumentFragment(); 
    data.forEach(kino => {
        console.log(kino);
        const $a = document.createElement('a'); 
        $a.className = "a-container";
        $a.href = `../pages/info.html?movies-id=${kino.id}`;
        $a.innerHTML = `
            <img src="${kino.image.medium}" alt="${kino.name}"/>
            <div class="bio">
                <div class="left">
                <h4>${kino.name}</h4>
                <h4>${kino.type}</h4>
            </div>
            <div class="right">
                <h4>${kino.language}</h4>
                <h4>${kino.genres[1] ? kino.genres[1] : ''}</h4>
            </div>
            </div>
        `;
        $divFragment.appendChild($a); 
    });
    $cards.appendChild($divFragment); 
}

const URL = location.search;
const MOVIES_ID = new URLSearchParams(URL).get("movies-id");

const resultPage = async (id) => {
    if (!id) return;

    try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        const $imgResult = document.createElement("img");
        $imgResult.src = data.image.medium;
        $imgResult.alt = data.name;
        $result.appendChild($imgResult);

        $result.innerHTML += `
            <h2>${data.name}</h2>
            <p>${data.summary}</p>
        `;
    } catch (error) {
        console.log(error.message);
    }
};

const loadMovies = async () => {
    try {
        const response = await fetch(`https://api.tvmaze.com/shows`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        renderMovies(data);
    } catch (error) {
        console.log(error.message);
    }
};

loadMovies();
resultPage(MOVIES_ID);
