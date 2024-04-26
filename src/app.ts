async function fetchPokemon(): Promise<void> {
  const list: Pokemon[] = [];

  try {
    const response: Response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=251&offset=0"
    );

    if (!response.ok) {
      throw new Error("Could not find pokemon data from fetchPokemon");
    }

    const data: { results: PokemonList[] } = await response.json();

    await Promise.all(data.results.map((p) => fetchPokemonData(p, list)));

    await renderPokemonList(list);
  } catch (error) {
    console.log(error);
  }
}

async function fetchPokemonData(pokemonData: PokemonList, list: Pokemon[]) {
  try {
    const results = pokemonData as unknown as PokemonResults;
    const response: Response = await fetch(results.url);

    if (!response.ok) {
      throw new Error("Could not fetch pokemon data from fetchPokemonData ");
    }

    const data = (await response.json()) as Pokemon;
    list.push(data);
  } catch (error) {
    console.log(error);
  }
}

async function renderPokemonList(list: Pokemon[]): Promise<void> {
  const listElement = document.getElementById("divList");

  if (!listElement) {
    throw new Error("Could not find parentList element");
  }

  list
    .sort((a, b) => a.id - b.id)
    .forEach((pokemon) => {
      const template = renderPokemon(pokemon);
      listElement.innerHTML += template;
    });
}

function renderPokemon(pokemon: Pokemon): string {
  return `
    <ul>
      <li>name: ${pokemon.name}</li>
      <ul>
        <li>id: ${pokemon.id}</li>
        <img src="${pokemon.sprites.other.showdown.front_default}" alt ="pokemon-img">
       </ul>
    </ul>
    `;
}

fetchPokemon();
