const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImage = document.querySelector('.pokemonImage');
const errorScreen = document.querySelector('.errorScreen');
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.inputSearch');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonReset = document.querySelector('.btn-reset');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        inputSearch.value = '';
        searchPokemon = data.id;
        errorScreen.style.display = 'none';
    } else {
        pokemonName.innerHTML = "Not Found :c";
        pokemonNumber.innerHTML = "";
        inputSearch.value = '';
        errorScreen.style.display = 'initial';
        errorScreen.innerHTML = "It wasn't possible to found your pokemon, please try searching for another one.";
        searchPokemon = 0;
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
});

buttonReset.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon = 1;
        renderPokemon(searchPokemon)
    }
})

renderPokemon(searchPokemon)
