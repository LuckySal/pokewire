
gameName = "pokemon-sun";
gamesAPI = "https://api.rawg.io/api/games/" + gameName + "?key=986d608da5c14059809c05240f4ae2e9&dates=2019-09-01,2019-09-30&platforms=18,1,7"



fetch(gamesAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
        console.log(response);
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