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
        if (data.id < 650) {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        } else {
            pokemonImage.src = data['sprites']['other']['official-artwork']['front_default'];
        }
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        inputSearch.value = '';
        searchPokemon = data.id;
        errorScreen.style.display = 'none';
        //Se houver 'data' na request, vai retornar o 
        //pokémon e armazenar data.id em searchPokemon
    } else {
        pokemonName.innerHTML = "Not Found :c";
        pokemonNumber.innerHTML = "";
        inputSearch.value = '';
        errorScreen.style.display = 'initial';
        errorScreen.innerHTML = "It wasn't possible to found this pokémon, please try searching for another one.";
        searchPokemon = 99999;
        //Se não houver 'data' na request, vai retornar o erro
        //e setar searchPokemon em 99999 para facilitar o
        //reset.
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
