// El & ID list
let gameListDropdownID = $('#game-list-dropdown');
let routeContentID = $('#route-content');

// get currentPokemon data from loc storage (from main.js) and place in var

let currentPokemonData = localStorage.getItem('currentPokemonData');
currentPokemonData = JSON.parse(currentPokemonData);

// Get user's choice of pokemon and display games that pokemon is found in
const handleGameList = () => {
    console.log(currentPokemonData);

    $(currentPokemonData.game_indices).each(i => {
        let button = $('<button></button>').text(`${currentPokemonData.game_indices[i].version.name.toUpperCase()}`)

        button.addClass('button dropdown-item dropdown-border pkmn-yellow-background pkmn-black-text is-size-6 mb-2')

        gameListDropdownID.append(button);
    });
}

const handleLocationsList = () => {
    // takes the id value from the previous api pull and passes it into this for encounter details
    const encounters = `https://pokeapi.co/api/v2/pokemon/${currentPokemonData.id}/encounters`;
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
            console.log(encounterData);
            // set to loc storage for now - but will populate modal with live data
            localStorage.setItem('currentPokemonEncounterData', JSON.stringify(encounterData));

            // store version_details in empty array - all this has been tested and compared to encounterData.version_details to ensure data is populating correctly...
            let versionData = [];

            $(encounterData).each(i => {

                versionData.push(encounterData[i].version_details);

                for (details in versionData[i]) {

                    console.log(versionData[i][details].version.name);
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

            console.log(versionData);

        })
        .catch(error => {
            // add error modal - should just copy what is already in main.js and index.html
            console.log(error);
        });
}

// call functions here:
handleGameList();
handleLocationsList();

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