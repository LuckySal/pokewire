// Go to https://api.rawg.io/docs/#tag/games for parameters
const RAWGurl = 'https://api.rawg.io/api/';
const RAWGkey = "key=986d608da5c14059809c05240f4ae2e9"
const Pokeurl = "https://pokeapi.co/api/v2/"

const formEl = $("#form");

// re-usable functions to open/close modal && See error section for handleSearch to review how each of these are called.
function openModal($el) {
    $el.addClass('is-active');
}
function closeModal($el) {
    $el.classList.remove('is-active');
}
function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
    });
}

function handleSearch(event) {
    event.preventDefault();
    let formInput = $(this).children("input");
    if (!formInput.val() || formInput.val() === "") {
        console.log("Empty input")
        return;
    }
    if (formInput.val().trim().toLowerCase() === "missingno") {
        location.href = "./secret.html";
    }
    var nameFinal = formInput.val().trim().toLowerCase();
    if (nameFinal === "nidoran♀" || nameFinal === "nidoran") {
        nameFinal = "nidoran-f";
    } else if (nameFinal === "nidoran♂"){
        nameFinal = "nidoran-m";
    } else if (nameFinal === "farfetch’d") {
        nameFinal = "farfetchd";
    }
    fetch(Pokeurl + `pokemon/${nameFinal}`, {
        cache: "reload",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status)
            }
            else {
                return response.json();
            }
        })
        .then(data => {
            console.log(data);
            location.href = './inspect.html?name=' + nameFinal;
        })
        .catch(error => {
            // added modal for error msg
            openModal($('#error-msg-modal'));
            let errorContent = $('.error-content');
            let errorMsg = `${error}`;
            let errorNote = `NOTE: Please check the spelling of the pokemon that you are searching for`

            errorContent[0].textContent = `${errorMsg}`;
            errorContent[1].textContent = `${errorNote}`;

            (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
                const $target = $close.closest('.modal');

                $close.addEventListener('click', () => {
                    closeModal($target);
                });
            });
            document.addEventListener('keydown', (event) => {
                const e = event || window.event;

                if (e.keyCode === 27) { // Escape key
                    closeAllModals();
                }
            });
        })
}

formEl.on("submit", handleSearch);

$( "#pokemon-search-field" ).autocomplete({
    source: pokeList
  });