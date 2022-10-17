// El & ID list
let gameListDropdownID = $('#game-list-dropdown');
let routeContentID = $('#route-content');

const historyEl = $("#search-history");
let history = JSON.parse(localStorage.getItem("wireDexData"));

// declare array for wiredex search history
let searchHistory = [];

const imageEl = $("#pokemon-image");
const nameEl = $("#pokemon-name");
const numEl = $("#number");
const typeEl = $("#type");
const weakEl = $("#weak");
const strongEl = $("#strong");


// get currentPokemon data from loc storage (from main.js) and place in var
const Pokeurl = "https://pokeapi.co/api/v2/";
const params = new URLSearchParams(location.search);




var currentPokemonData;
fetch(Pokeurl + "pokemon/" + params.get("name"), { cache: "force-cache", })
    .then(result => {
        return result.json();
    })
    .then(data => {
        currentPokemonData = data;
        handleGameList();
        handleLocationsList();
        handleInfoCard();
        handleWireDex();
        initHistory();
    });

// Get user's choice of pokemon and display games that pokemon is found in
const handleGameList = () => {
    // console.log(currentPokemonData);

    $(currentPokemonData.game_indices).each(i => {
        let button = $('<button></button>').text(`${currentPokemonData.game_indices[i].version.name.toUpperCase()}`)

        button.addClass('button dropdown-item dropdown-border pkmn-yellow-background pkmn-black-text is-size-6 mb-2')

        gameListDropdownID.append(button);
    });
}

const handleLocationsList = () => {
    // takes the id value from the previous api pull and passes it into this for encounter details
    const encounters = `https://pokeapi.co/api/v2/pokemon/${params.get("name")}/encounters`;
    fetch(encounters)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status)
            }
            else {
                return response.json();
            }
        })
        .then(encounterData => {
            // console.log(encounterData);
            // set to loc storage for now - but will populate modal with live data
            localStorage.setItem('currentPokemonEncounterData', JSON.stringify(encounterData));

            // store version_details in empty array - all this has been tested and compared to encounterData.version_details to ensure data is populating correctly...
            let versionData = [];

            $(encounterData).each(i => {

                versionData.push(encounterData[i].version_details);

                for (details in versionData[i]) {

                    // console.log(versionData[i][details].version.name);
                    let games = versionData[i][details].version.name;
                    let chance = versionData[i][details].max_chance;

                    // can split('-') with a for loop and use substring to capitalize first letter of each word later on if we have time

                    let locationInfo = $(`<h2 class="is-size-4 pkmn-blue-text"><strong class="pkmn-red-text">Location: </strong>${encounterData[i].location_area.name.toUpperCase()}</h2>`);
                    routeContentID.append(locationInfo);

                    let gamesInfo = $(`<p class="is-size-6"><strong class="pkmn-red-text">Game: </strong>Pokémon ${games.toUpperCase()}</p>`);
                    locationInfo.append(gamesInfo);

                    let chanceInfo = $(`<p class="is-size-6 mb-6"><strong class="pkmn-red-text">Max chance of encounter: </strong>${chance}%</p>`)
                    gamesInfo.append(chanceInfo);

                }
            });

            // console.log(versionData);

        })
        .catch(error => {
            // add error modal - should just copy what is already in main.js and index.html
            console.log(error);
        });
}

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

    localStorage.setItem('wireDexData', JSON.stringify(searchHistory));
}

function wireDexInit() {
    if (localStorage.getItem('wireDexData')) {
        searchHistory = JSON.parse(localStorage.getItem('wireDexData'));
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
        types = types + " " + capitalizeFirstLetter(currentPokemonData.types[1].type.name);
    }
    return types;
}

// Initialize the search history
function initHistory() {
    if (!history) return;
    console.log(history);
    for (let i = 0; i < history.length; i++) {
        let btn = $("<button></button>")
        btn.attr("type", "submit");
        btn.attr("style", "display:flex");
        btn.attr("class", "search-history-button button pkmn-yellow-background dark-blue-text mb-6");
        console.log(history[i]);
        let element = history[i];
        btn.text(capitalizeFirstLetter(element));
        historyEl.append(btn);
    }
}

function handleHistoryClick(event) {
    if ($(this).is(":button") && params.get("name") !== $(this).text().toLowerCase()) {
        let newLoc = "./inspect.html?name=" + $(this).text().toLowerCase();
        location.href = newLoc;
    }
}

// event listener for route list modal
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        if (e.keyCode === 27) { // Escape key
            closeAllModals();
        }
    });
});

historyEl.on("click", "button", handleHistoryClick);

wireDexInit();

