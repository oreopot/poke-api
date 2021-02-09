const APIURL = "https://pokeapi.co/api/v2/pokemon/";
const count = 250;

const getPokemon = async (id) => {
  try {
    let response = await fetch(APIURL + `${id}/`);
    let data = await response.json();
    return getPokemonCard(data);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

const getPokemonCard = (pokemon) => {
  let rank = pokemon.id;
  let pokeType = pokemon.types[0].type.name;

  return `<div class="card p-3 m-1">
    <div class="d-flex">
      <div class="image">
        <img
          src="https://pokeres.bastionbot.org/images/pokemon/${rank}.png"
          class="rounded"
          width="100"
        />
      </div>
      <div class="ml-3 w-100">
        <h4 class="mb-4 mt-0 badge badge-pill badge-warning">#${rank
          .toString()
          .padStart(2, "0")}</h4>
        <h4 class="mb-0 mt-0 text-capitalize">${pokemon.name}</h4>
        <span class="text-capitalize">${pokeType}</span>
      </div>
    </div>
  </div>`;
};

const getAllPokemon = async () => {
  let finalHtml = "";

  for (let i = 1; i <= count; i++) {
    let temp = await getPokemon(i);
    finalHtml += temp;
  }

  let pokemonContainerElement = document.getElementById("pokemon_container");
  pokemonContainerElement.innerHTML = finalHtml;
};

getAllPokemon();
// getAllPokemon().then((data) => {
//   console.log(typeof data);
//   let finalHtml = "";

//   for (let i = 0; i < data.results.length; i++) {
//     finalHtml = finalHtml + getPokemonCard(data.results[i]);
//   }

//   let pokemonContainerElement = document.getElementById("pokemon_container");
//   pokemonContainerElement.innerHTML = finalHtml;
// });
