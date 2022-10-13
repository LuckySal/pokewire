// Go to https://api.rawg.io/docs/#tag/games for parameters
let url = 'https://api.rawg.io/api/games?&search=pokemon&key=986d608da5c14059809c05240f4ae2e9';

fetch(url)
.then(response => {
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    else {
        return response.json();
    }
})
.then(data => {
    // results will be in data.results[i].platforms
    // i.e. this console log returns the first pokemon game and its platforms
    // will want to make this work with the other api, meaning that when a user searches for a pokemon, 
    console.log(data.results[0].platforms);
})
.catch(error => {
    alert(error);
})