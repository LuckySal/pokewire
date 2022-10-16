// El & ID list
let gameListDropdownID = $('#game-list-dropdown');
let routeContentID = $('#route-content');

// get currentPokemon data from loc storage (from main.js) and place in var

let currentPokemonData = localStorage.getItem('currentPokemonData');
currentPokemonData = JSON.parse(currentPokemonData);

// Get user's choice of pokemon and display games that pokemon is found in
const handleGameList = () => {
    console.log(currentPokemonData);

    $(currentPokemonData.game_indices).each(function (i) {
        let button = $('<button></button>').text(`${currentPokemonData.game_indices[i].version.name.toUpperCase()}`)

        button.addClass('button dropdown-item dropdown-border pkmn-yellow-background pkmn-black-text is-size-6 mb-2')

        gameListDropdownID.append(button);
    });
}

const handleLocationsList = () => {
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

            let versionDetails = []

            for (var i = 0; i < encounterData.length; i++) {
                let locationInfo = $('<h2></h2>').text(`Location: ${encounterData[i].location_area.name}`);
                routeContentID.append(locationInfo);
                
                let gamesInfo = $('<p></p>').text(`Games:`);
                locationInfo.append(gamesInfo);

                versionDetails.push(encounterData[i].version_details)
            }
            // got through version details and get just the name and max chance for each corresponding name //
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