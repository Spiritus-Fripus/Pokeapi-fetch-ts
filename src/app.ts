fetchPokemon();

async function fetchPokemon() {
  try {
    const response: Response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=251&offset=0"
    );
    if (!response.ok) {
      throw new Error("Could not find pokemon data from fetchPokemon");
    }
    const data: {results : PokemonList[]} = await response.json();

    data.results.forEach((pokemon :PokemonList)=> {
      fetchPokemonData(pokemon);
    });
  } catch (error) {
    console.log(error);
  }
}

async function fetchPokemonData(pokemonData: PokemonList) {
  try {
    const results = (pokemonData as unknown as PokemonResults);
    const url : string= results.url;

    const response: Response = await fetch(url);

    if (!response.ok) {
      throw new Error("Could not fetch pokemon data from fetchPokemonData ");
    }
    const data: Pokemon= await response.json();

    await renderPokemonList(data);
  } catch (error) {
    console.log(error);
  }
}

async function renderPokemonList(pokemonData: Pokemon ) {
  const parentList: HTMLElement | null = document.getElementById("divList");
  const firstUl: HTMLElement | null = document.createElement("ul");
  const secondUl: HTMLElement | null = document.createElement("ul");
  const pokemonName: HTMLElement | null = document.createElement("li");
  const pokemonId: HTMLElement | null   = document.createElement("li");
  const pokemonImg: HTMLImageElement | null = document.createElement("img");

  pokemonName.innerText = pokemonData.name + " : ";
  pokemonId.innerText = "id : " + pokemonData.id;
  pokemonImg.src = pokemonData.sprites.other.showdown.front_default;

  parentList?.appendChild(firstUl);
  firstUl?.appendChild(pokemonName);
  firstUl?.appendChild(secondUl);
  secondUl?.appendChild(pokemonId);
  firstUl?.appendChild(pokemonImg);
}
