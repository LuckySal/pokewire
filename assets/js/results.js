// declare any ID's || Elements
let gameImageID = $("#game-img");
let gameNameID = $('#game-name')
let gameDetailsID = $('#game-details');

// API Data:
let gameName = "pokemon-y";
const gamesAPI = "https://api.rawg.io/api/games/" + gameName + "?key=986d608da5c14059809c05240f4ae2e9&dates=2019-09-01,2019-09-30&platforms=18,1,7"

fetch(gamesAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
        console.log(response);

        //Game name
        let gameNameHTML = $(`<h4 class="title is-2 pkmn-yellow-text">${response.name}</h4>`);
        gameNameID.append(gameNameHTML);

        //Game img
        gameImageID.html(`<img src="${response.developers[0].image_background}">`);
                   
        //description of game
        let summaryHTML = $(`<p><strong class="pkmn-yellow-text is-size-4">Summary:</strong> <span class="pkmn-white-text">${response.description_raw}</span></p>`);
        gameDetailsID.append(summaryHTML);
        
        //platform
        let platformHTML = $(`<p><strong class="pkmn-yellow-text is-size-4">Platform: </strong><span class="pkmn-white-text">${response.platforms[0].platform.name}</span></p>`);
        summaryHTML.append(platformHTML);


        //released
        let releaseDateHTML = $(`<p><strong class="pkmn-yellow-text is-size-4">Release Date: </strong><span class="pkmn-white-text">${response.released}</span></p>`);
        platformHTML.append(releaseDateHTML);

        //developer
        let developerHTML = $(`<p><strong class="pkmn-yellow-text is-size-4">Developer: </strong><span class="pkmn-white-text">${response.developers[0].name}</span></p>`);
        releaseDateHTML.append(developerHTML);
    
      }
    );