
gameName = "pokemon-sun";
gamesAPI = "https://api.rawg.io/api/games/" + gameName + "?key=986d608da5c14059809c05240f4ae2e9&dates=2019-09-01,2019-09-30&platforms=18,1,7"



fetch(gamesAPI, {
    method: "GET",
   
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
        console.log(response);
        //description of game
        $("#test").text(response.description_raw);

        //takes you game website
        $("#website").attr("href", response.website).text("link to game website");
        
        //takes you to the game store website
        $("#store").attr("href", "https://www." + response.stores[0].store.domain).text("link to store website");
        
      }
    );