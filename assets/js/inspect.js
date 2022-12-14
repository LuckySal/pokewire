// El & ID list
let gameListDropdownID = $("#game-list-dropdown");
let routeContentID = $("#route-content");

const historyEl = $("#search-history");
let history = JSON.parse(localStorage.getItem("wireDexData"));

// declare array for wiredex search history
let searchHistory = [];
let gameHistory = [];

const imageEl = $("#pokemon-image");
const nameEl = $("#pokemon-name");
const numEl = $("#number");
const typeEl = $("#type");
const weakEl = $("#weak");
const strongEl = $("#strong");

const homeEl = $("#home");

const Pokeurl = "https://pokeapi.co/api/v2/";
const params = new URLSearchParams(location.search);

document.title = `PokéWire - ${capitalizeFirstLetter(params.get("name"))}`;

var currentPokemonData;
fetch(Pokeurl + "pokemon/" + params.get("name"), { cache: "force-cache" })
    .then((result) => {
        return result.json();
    })
    .then((data) => {
        currentPokemonData = data;
        handleGameList();
        handleLocationsList();
        handleInfoCard();
        handleWireDex();
        initHistory();
    });

// Get user's choice of pokemon and display games that pokemon is found in
const handleGameList = () => {

    $(currentPokemonData.game_indices).each((i) => {
        let button = $("<button></button>").text(
            `${currentPokemonData.game_indices[i].version.name.toUpperCase()}`
        );

        button.addClass(
            "button is-flex is-flex-direction-column dropdown-border pkmn-yellow-background pkmn-black-text is-size-6 mb-2 game-button"
        );

        gameListDropdownID.append(button);

        $(button).click(function () {
            location.href =
                "./results.html?game=" +
                "pokemon-" +
                button.text().toLowerCase() +
                "&name=" +
                params.get("name");

            if (!gameHistory.includes(button.text())) {
                gameHistory.unshift(button.text());
            }

            if (gameHistory.length > 4) {
                gameHistory.pop();
            }

            localStorage.setItem("gameDexData", JSON.stringify(gameHistory));
        });
    });
};

function gameDexInit() {
    if (localStorage.getItem("gameDexData")) {
        gameHistory = JSON.parse(localStorage.getItem("gameDexData"));
    }
}

const handleLocationsList = () => {
    // takes the id value from the previous api pull and passes it into this for encounter details
    const encounters = `https://pokeapi.co/api/v2/pokemon/${params.get(
        "name"
    )}/encounters`;
    fetch(encounters)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.json();
            }
        })
        .then((encounterData) => {
            if (encounterData.length === 0) {
                let notFound = `<p class="is-size-6 mb-6"><strong class="pkmn-red-text">Oops!</strong> It looks like this pokemon can't be encountered in the wild!</p>`;
                routeContentID.append(notFound);
            }

            // store version_details in empty array - all this has been tested and compared to encounterData.version_details to ensure data is populating correctly...
            let versionData = [];

            $(encounterData).each((i) => {
                versionData.push(encounterData[i].version_details);

                for (details in versionData[i]) {
                    let games = versionData[i][details].version.name;
                    let chance = versionData[i][details].max_chance;

                    let locationInfo = $(
                        `<h2 class="is-size-4 pkmn-blue-text"><strong class="pkmn-red-text">Location: </strong>${encounterData[
                            i
                        ].location_area.name.toUpperCase()}</h2>`
                    );
                    routeContentID.append(locationInfo);

                    let gamesInfo = $(
                        `<p class="is-size-6"><strong class="pkmn-red-text">Game: </strong>Pokémon ${games.toUpperCase()}</p>`
                    );
                    locationInfo.append(gamesInfo);

                    let chanceInfo = $(
                        `<p class="is-size-6 mb-6"><strong class="pkmn-red-text">Max chance of encounter: </strong>${chance}%</p>`
                    );
                    gamesInfo.append(chanceInfo);
                }
            });

        })
        .catch((error) => {
           console.log(error);
        });
};

function handleInfoCard() {
    imageEl.attr("src", currentPokemonData.sprites.front_default);
    nameEl.text(capitalizeFirstLetter(currentPokemonData.name));
    numEl.text(currentPokemonData.id);
    typeEl.text(getTypes());
}

function handleWireDex() {
    if (!searchHistory.includes(currentPokemonData.name)) {
        searchHistory.unshift(currentPokemonData.name);
    }

    if (searchHistory.length > 8) {
        searchHistory.pop();
    }

    localStorage.setItem("wireDexData", JSON.stringify(searchHistory));
}

function wireDexInit() {
    if (localStorage.getItem("wireDexData")) {
        searchHistory = JSON.parse(localStorage.getItem("wireDexData"));
    }
}

// Helper functions
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTypes() {
    let types = "";
    types = capitalizeFirstLetter(currentPokemonData.types[0].type.name);
    if (currentPokemonData.types[1]) {
        types =
            types +
            " " +
            capitalizeFirstLetter(currentPokemonData.types[1].type.name);
    }
    return types;
}

// Initialize the search history
function initHistory() {
    if (!history) return;
    for (let i = 0; i < history.length; i++) {
        let btn = $("<button></button>");
        btn.attr("type", "submit");
        btn.attr("style", "display:flex");
        btn.attr(
            "class",
            "search-history-button button pkmn-yellow-background dark-blue-text mb-6 wireDex-button"
        );
        let element = history[i];
        btn.text(capitalizeFirstLetter(element));
        historyEl.append(btn);
    }
}

function handleHistoryClick(event) {
    if (
        $(this).is(":button") &&
        params.get("name") !== $(this).text().toLowerCase()
    ) {
        let newLoc = "./inspect.html?name=" + $(this).text().toLowerCase();
        location.href = newLoc;
    }
}

// event listener for route list modal
document.addEventListener("DOMContentLoaded", () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add("is-active");
    }

    function closeModal($el) {
        $el.classList.remove("is-active");
    }

    function closeAllModals() {
        (document.querySelectorAll(".modal") || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll(".js-modal-trigger") || []).forEach(
        ($trigger) => {
            const modal = $trigger.dataset.target;
            const $target = document.getElementById(modal);

            $trigger.addEventListener("click", () => {
                openModal($target);
            });
        }
    );

    // Add a click event on various child elements to close the parent modal
    (
        document.querySelectorAll(
            ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
        ) || []
    ).forEach(($close) => {
        const $target = $close.closest(".modal");

        $close.addEventListener("click", () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener("keydown", (event) => {
        const e = event || window.event;

        if (e.keyCode === 27) {
            // Escape key
            closeAllModals();
        }
    });
});

historyEl.on("click", "button", handleHistoryClick);

wireDexInit();
gameDexInit();

homeEl.on("click", () => {
    location.href = "./index.html";
});
