// declare any ID's || Elements
let gameImageID = $("#game-img");
let gameNameID = $("#game-name");
let gameDetailsID = $("#game-details");

const homeEl = $("#home");
// -------------------- //
const params = new URLSearchParams(location.search);
const pokeUrl = "https://pokeapi.co/api/v2/pokemon/" + params.get("name") + "/";

// API Data:
let gameName = params.get("game");
const gamesAPI = "https://api.rawg.io/api/games/" + gameName + "?key=986d608da5c14059809c05240f4ae2e9&dates=2019-09-01,2019-09-30&platforms=18,1,7";

fetch(gamesAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    console.log(response);

    if (response.redirect) {
      const newGamesAPI = "https://api.rawg.io/api/games/" + response.slug + "?key=986d608da5c14059809c05240f4ae2e9&dates=2019-09-01,2019-09-30&platforms=18,1,7";
      fetch(newGamesAPI)
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          createHTML(response);
        })
    }

    else if (gameName === 'pokemon-blue') {
      const newGamesAPI = "https://api.rawg.io/api/games/" + "pokemon-red" + "?key=986d608da5c14059809c05240f4ae2e9&dates=2019-09-01,2019-09-30&platforms=18,1,7";
      fetch(newGamesAPI)
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          createHTML(response);
        })
    }

    else if (gameName === 'pokemon-silver') {
      const newGamesAPI = "https://api.rawg.io/api/games/" + "pokemon-gold" + "?key=986d608da5c14059809c05240f4ae2e9&dates=2019-09-01,2019-09-30&platforms=18,1,7";
      fetch(newGamesAPI)
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          createHTML(response);
        })
    }

    else if (gameName === 'pokemon-sapphire') {
      const newGamesAPI = "https://api.rawg.io/api/games/" + "pokemon-ruby" + "?key=986d608da5c14059809c05240f4ae2e9&dates=2019-09-01,2019-09-30&platforms=18,1,7";
      fetch(newGamesAPI)
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          createHTML(response);
        })
    }

    else if (gameName === 'pokemon-leafgreen') {
      const newGamesAPI = "https://api.rawg.io/api/games/" + "pokemon-firered" + "?key=986d608da5c14059809c05240f4ae2e9&dates=2019-09-01,2019-09-30&platforms=18,1,7";
      fetch(newGamesAPI)
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          createHTML(response);
        })
    }

    else if (gameName === 'pokemon-heartgold'|| gameName === 'pokemon-soulsilver') {
      const newGamesAPI = "https://api.rawg.io/api/games/" + "pokemon-heartgold-version" + "?key=986d608da5c14059809c05240f4ae2e9&dates=2019-09-01,2019-09-30&platforms=18,1,7";
      fetch(newGamesAPI)
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          createHTML(response);
          let developerHTML = $(
            `<p><strong class="pkmn-yellow-text is-size-4">Developer: </strong><span class="pkmn-white-text">Game Freak</span></p>`
          );
          gameDetailsID.append(developerHTML);
        })
    }

    else if (gameName === 'pokemon-crystal') {
      const newGamesAPI = "https://api.rawg.io/api/games/" + "pokemon-crystal-version" + "?key=986d608da5c14059809c05240f4ae2e9&dates=2019-09-01,2019-09-30&platforms=18,1,7";
      fetch(newGamesAPI)
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          createHTML(response);
        })
    }

    else if (gameName === 'pokemon-black' || gameName === 'pokemon-white') {
      const newGamesAPI = "https://api.rawg.io/api/games/" + "pokemon-black-version" + "?key=986d608da5c14059809c05240f4ae2e9&dates=2019-09-01,2019-09-30&platforms=18,1,7";
      fetch(newGamesAPI)
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          createHTML(response);
        })
    }

    else {
      createHTML(response);
    }

    function createHTML(response) {
      //Game name
      let gameNameHTML = $(
        `<h4 class="title is-2 pkmn-yellow-text">${response.name}</h4>`
      );
      gameNameID.append(gameNameHTML);

      //Game img
      if (response.background_image !== null) {
        gameImageID.html(
          `<img id="game-img-border" src="${response.background_image}">`
        );
      }
      else {
        gameImageID.html(
          `<img id="game-img-border" src="${response.developers[0].image_background}">`
        );
      }
      

      //description of game
      let summaryHTML = $(
        `<p><strong class="pkmn-yellow-text is-size-4">Summary:</strong> <span class="pkmn-white-text">${response.description_raw}</span></p>`
      );
      gameDetailsID.append(summaryHTML);

      //platform and release date
      if (response.platforms[0] && response.platforms[1] && response.platforms[2] && response.platforms[3] !== undefined) {
        let platformHTML = $(
          `<p><strong class="pkmn-yellow-text is-size-4">Platform: </strong><span class="pkmn-white-text">${response.platforms[0].platform.name} (released: ${response.platforms[0].released_at}), ${response.platforms[1].platform.name} (released: ${response.platforms[1].released_at}), ${response.platforms[2].platform.name} (released: ${response.platforms[2].released_at}), ${response.platforms[3].platform.name} (released: ${response.platforms[3].released_at})</span></p>`
        );
        gameDetailsID.append(platformHTML);
      }
      else if (response.platforms[0] && response.platforms[1] && response.platforms[2] !== undefined) {
        let platformHTML = $(
          `<p><strong class="pkmn-yellow-text is-size-4">Platform: </strong><span class="pkmn-white-text">${response.platforms[0].platform.name} (released: ${response.platforms[0].released_at}), ${response.platforms[1].platform.name} (released: ${response.platforms[1].released_at}), ${response.platforms[2].platform.name} (released: ${response.platforms[2].released_at})</span></p>`
        );
        gameDetailsID.append(platformHTML);
      }
      else if (response.platforms[0] && response.platforms[1] !== undefined) {
        let platformHTML = $(
          `<p><strong class="pkmn-yellow-text is-size-4">Platform: </strong><span class="pkmn-white-text">${response.platforms[0].platform.name} (released: ${response.platforms[0].released_at}), ${response.platforms[1].platform.name} (released: ${response.platforms[1].released_at})</span></p>`
        );
        gameDetailsID.append(platformHTML);
      }
      else if (response.platforms[0] !== undefined) {
        let platformHTML = $(
          `<p><strong class="pkmn-yellow-text is-size-4">Platform: </strong><span class="pkmn-white-text">${response.platforms[0].platform.name} (released: ${response.platforms[0].released_at})</span></p>`
        );
        gameDetailsID.append(platformHTML);
      }
      // if no data exists:
      else {
        let platformHTML = $(
          `<p><strong class="pkmn-yellow-text is-size-4">Platform: </strong><span class="pkmn-white-text">I'm sorry, we are having trouble getting that information for you right now.</span></p>`
        );
        gameDetailsID.append(platformHTML);
      }

      //developer
      if (response.developers[0] !== undefined) {
        let developerHTML = $(
          `<p><strong class="pkmn-yellow-text is-size-4">Developer: </strong><span class="pkmn-white-text">${response.developers[0].name}</span></p>`
        );
        gameDetailsID.append(developerHTML);
      }
      else {
      //  do nothing -- will fill in else if redirect section
      }
    }
  });

fetch(pokeUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    $("#pkmn-avatar").html(
      "<img src=" + response.sprites.front_default + ">"
    );
  });

homeEl.on("click", () => {
  location.href = "./index.html";
});
