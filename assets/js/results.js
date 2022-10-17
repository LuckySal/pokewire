
gameName = "pokemon-y";
gamesAPI = "https://api.rawg.io/api/games/" + gameName + "?key=986d608da5c14059809c05240f4ae2e9&dates=2019-09-01,2019-09-30&platforms=18,1,7"



fetch(gamesAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
        console.log(response);

        //Game name
        $("#game-name").text(response.name)

        //Game img
        $("#game-img").html("<img src=" + response.developers[0].image_background + ">");
                   
        //description of game
        $("#summary").text("Summary: " + response.description_raw);
        
        //plataform
        $("#platform").text("Plataform: " + response.platforms[0].platform.name);

        //developer
        $("#developers").text("Developer: " + response.developers[0].name);

        //released
        $("#released-date").text("Released Date: " + response.released);
    
      }
    );


//function to update the PKMN avatar with the newest search 
pkmnAvatar = JSON.parse(localStorage.getItem("wireDexData"));
newPkmnAvatar = pkmnAvatar.slice(0,1);
// console.log(newPkmnAvatar);

const Pokeurl = "https://pokeapi.co/api/v2/pokemon/" + newPkmnAvatar + "/";

fetch(Pokeurl)
    .then(function (response) {
      return response.json();
    })
    .then (function (response){
    $("#pkmn-avatar").html("<img src=" + response.sprites.front_default + ">");
    })