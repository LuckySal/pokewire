// El & ID list
let gameListDropdownID = $('#game-list-dropdown')

// get searched for pokemon's data from local storage and convert back into an object
let currentPokemonData = localStorage.getItem('currentPokemonData');
currentPokemonData = JSON.parse(currentPokemonData);

// Get user's choice of pokemon and display games that pokemon is found in
const handleGameList = () => {
    console.log(currentPokemonData);

        $(currentPokemonData.game_indices).each(function(i){
            let button = $('<button></button>').text(`${currentPokemonData.game_indices[i].version.name.toUpperCase()}`)

            button.addClass('button dropdown-item dropdown-border pkmn-yellow-background pkmn-black-text is-size-6 mb-2')

            gameListDropdownID.append(button);
    });

}


handleGameList();