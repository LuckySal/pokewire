// declare any ID's || Elements
let gameImageID = $("#game-img");
let gameNameID = $("#game-name");
let gameDetailsID = $("#game-details");

const historyEl = $("#search-history");
let searchHistory = JSON.parse(localStorage.getItem("wireDexData"));

const homeEl = $("#home");
// -------------------- //
const params = new URLSearchParams(location.search);
const pokeUrl = "https://pokeapi.co/api/v2/pokemon/" + params.get("name") + "/";

// API Data:
let gameName = params.get("game");
const gamesAPI =
    "https://api.rawg.io/api/games/" +
    gameName +
    "?key=986d608da5c14059809c05240f4ae2e9&dates=2019-09-01,2019-09-30&platforms=18,1,7";

fetch(gamesAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response);

        //Game name
        let gameNameHTML = $(
            `<h4 class="title is-2 pkmn-yellow-text">${response.name}</h4>`
        );
        gameNameID.append(gameNameHTML);

        //Game img
        gameImageID.html(
            `<img id="game-img-border" src="${response.developers[0].image_background}">`
        );

        //description of game
        let summaryHTML = $(
            `<p><strong class="pkmn-yellow-text is-size-4">Summary:</strong> <span class="pkmn-white-text">${response.description_raw}</span></p>`
        );
        gameDetailsID.append(summaryHTML);

        //platform and release date
        if (
            response.platforms[0] &&
            response.platforms[1] &&
            response.platforms[2] &&
            response.platforms[3] !== undefined
        ) {
            let platformHTML = $(
                `<p><strong class="pkmn-yellow-text is-size-4">Platform: </strong><span class="pkmn-white-text">${response.platforms[0].platform.name} (released: ${response.platforms[0].released_at}), ${response.platforms[1].platform.name} (released: ${response.platforms[1].released_at}), ${response.platforms[2].platform.name} (released: ${response.platforms[2].released_at}), ${response.platforms[3].platform.name} (released: ${response.platforms[3].released_at})</span></p>`
            );
            gameDetailsID.append(platformHTML);
        } else if (
            response.platforms[0] &&
            response.platforms[1] &&
            response.platforms[2] !== undefined
        ) {
            let platformHTML = $(
                `<p><strong class="pkmn-yellow-text is-size-4">Platform: </strong><span class="pkmn-white-text">${response.platforms[0].platform.name} (released: ${response.platforms[0].released_at}), ${response.platforms[1].platform.name} (released: ${response.platforms[1].released_at}), ${response.platforms[2].platform.name} (released: ${response.platforms[2].released_at})</span></p>`
            );
            gameDetailsID.append(platformHTML);
        } else if (
            response.platforms[0] &&
            response.platforms[1] !== undefined
        ) {
            let platformHTML = $(
                `<p><strong class="pkmn-yellow-text is-size-4">Platform: </strong><span class="pkmn-white-text">${response.platforms[0].platform.name} (released: ${response.platforms[0].released_at}), ${response.platforms[1].platform.name} (released: ${response.platforms[1].released_at})</span></p>`
            );
            gameDetailsID.append(platformHTML);
        } else if (response.platforms[0] !== undefined) {
            let platformHTML = $(
                `<p><strong class="pkmn-yellow-text is-size-4">Platform: </strong><span class="pkmn-white-text">${response.platforms[0].platform.name} (released: ${response.platforms[0].released_at})</span></p>`
            );
            gameDetailsID.append(platformHTML);
        }
        // if no data exists:
        else {
            let platformHTML = $(
                `<p><strong class="pkmn-yellow-text is-size-4">Platform: </strong><span class="pkmn-white-text">I'm sorry, we are having trouble getting that information for you right now.</span></p>`
            );
            gameDetailsID.append(platformHTML);
        }

        //developer
        let developerHTML = $(
            `<p><strong class="pkmn-yellow-text is-size-4">Developer: </strong><span class="pkmn-white-text">${response.developers[0].name}</span></p>`
        );
        gameDetailsID.append(developerHTML);
    });

function initHistory() {
    if (!searchHistory) return;
    console.log(searchHistory);
    for (let i = 0; i < searchHistory.length && i < 4; i++) {
        let btn = $("<button></button>");
        btn.attr("type", "submit");
        btn.attr("style", "display:flex");
        btn.attr(
            "class",
            "search-history-button button pkmn-yellow-background dark-blue-text mb-6"
        );
        console.log(searchHistory[i]);
        let element = searchHistory[i];
        btn.text(capitalizeFirstLetter(element));
        historyEl.append(btn);
    }
}

fetch(pokeUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        $("#pkmn-avatar").html(
            "<img src=" + response.sprites.front_default + ">"
        );
    });

homeEl.on("click", () => {
    location.href = "./index.html";
});
