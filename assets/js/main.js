// Go to https://api.rawg.io/docs/#tag/games for parameters
const RAWGurl = 'https://api.rawg.io/api/';
const RAWGkey = "key=986d608da5c14059809c05240f4ae2e9"
const Pokeurl = "https://pokeapi.co/api/v2/"

const formEl = $("#form");



function handleSearch(event) {
    event.preventDefault();
    let formInput = $(this).children("input");
    if (!formInput.val() || formInput.val() === "") {
        console.log("Empty input")
        return;
    }
    fetch(Pokeurl + `pokemon/${formInput.val().trim().toLowerCase()}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        else {
            return response.json();
        }
    })
    .then(data => {
        console.log(data);
    })
        .catch(error => {
        // TODO: replace alert with modal
        alert(error.name + "\n" + error.message);
    })
}

formEl.on("submit", handleSearch);