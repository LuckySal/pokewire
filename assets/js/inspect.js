// (kaileb) I am assuming that for locations we were meaning routes that this pokemon can be encountered on so that is what I am putting here.

// El & ID list
let gameListDropdownID = $('#game-list-dropdown')

// get searched for pokemon's data from local storage and convert back into an object
let currentPokemonData = localStorage.getItem('currentPokemonData');
currentPokemonData = JSON.parse(currentPokemonData);

// create an arrow function to handle data for Game List | This is called just like a normal function would be
const handleGameList = () => {
    console.log(currentPokemonData.game_indices[0].version.name);
    // change html for dropdown and for find out what games "this pokemon" appears in to match name of searched for pokemon
        $(currentPokemonData.game_indices).each(function(i){
            let button = document.createElement('button');
            button.textContent =`${currentPokemonData.game_indices[i].version.name.toUpperCase()}`
            button.classList.add('button', 'dropdown-item', 'dropdown-border', 'pkmn-yellow-background', 'pkmn-black-text', 'is-size-6', 'has-text-center')
            gameListDropdownID[0].appendChild(button);
    });

}


handleGameList();

let html = `<button class="button dropdown-item dropdown-border pkmn-yellow-background pkmn-black-text is-size-6">Pokemon Yellow</button>`