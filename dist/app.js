"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchPokemon() {
    return __awaiter(this, void 0, void 0, function* () {
        const list = [];
        try {
            const response = yield fetch("https://pokeapi.co/api/v2/pokemon?limit=251&offset=0");
            if (!response.ok) {
                throw new Error("Could not find pokemon data from fetchPokemon");
            }
            const data = yield response.json();
            yield Promise.all(data.results.map((p) => fetchPokemonData(p, list)));
            yield renderPokemonList(list);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function fetchPokemonData(pokemonData, list) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = pokemonData;
            const response = yield fetch(results.url);
            if (!response.ok) {
                throw new Error("Could not fetch pokemon data from fetchPokemonData ");
            }
            const data = (yield response.json());
            list.push(data);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function renderPokemonList(list) {
    return __awaiter(this, void 0, void 0, function* () {
        const listElement = document.getElementById("divList");
        if (!listElement) {
            throw new Error("Could not find parentList element");
        }
        list
            .sort((a, b) => (a.id < b.id ? -1 : 1))
            .forEach((pokemon) => {
            const template = renderPokemon(pokemon);
            listElement.innerHTML += template;
        });
    });
}
function renderPokemon(pokemon) {
    return `
    <ul>
      <li>name: ${pokemon.name}</li>
      <ul>
        <li>id: ${pokemon.id}</li>
        <img src="${pokemon.sprites.other.showdown.front_default}">
       </ul>
    </ul>
    `;
}
fetchPokemon();
