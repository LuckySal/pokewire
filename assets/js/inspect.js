// (kaileb) I am assuming that for locations we were meaning routes that this pokemon can be encountered on so that is what I am putting here.

// get searched for pokemon's data from local storage and convert back into an object
let currentPokemonData = localStorage.getItem('currentPokemonData');
currentPokemonData = JSON.parse(currentPokemonData);

// create an arrow function to handle data for Game List | This is called just like a normal function would be
const handleGameList = () => {
    console.log(currentPokemonData.game_indices);

    for (var i = 0; i < currentPokemonData.game_indices.length; i++) {
        
    }

}


handleGameList();