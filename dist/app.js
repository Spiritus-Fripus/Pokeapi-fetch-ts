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
fetchPokemon();
function fetchPokemon() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://pokeapi.co/api/v2/pokemon?limit=251&offset=0");
            if (!response.ok) {
                throw new Error("Could not find pokemon data from fetchPokemon");
            }
            const data = yield response.json();
            data.results.forEach((pokemon) => {
                fetchPokemonData(pokemon);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
function fetchPokemonData(pokemonData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = pokemonData;
            const url = results.url;
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error("Could not fetch pokemon data from fetchPokemonData ");
            }
            const data = yield response.json();
            yield renderPokemonList(data);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function renderPokemonList(pokemonData) {
    return __awaiter(this, void 0, void 0, function* () {
        const parentList = document.getElementById("divList");
        const firstUl = document.createElement("ul");
        const secondUl = document.createElement("ul");
        const pokemonName = document.createElement("li");
        const pokemonId = document.createElement("li");
        const pokemonImg = document.createElement("img");
        pokemonName.innerText = pokemonData.name + " : ";
        pokemonId.innerText = "id : " + pokemonData.id;
        pokemonImg.src = pokemonData.sprites.other.showdown.front_default;
        parentList === null || parentList === void 0 ? void 0 : parentList.appendChild(firstUl);
        firstUl === null || firstUl === void 0 ? void 0 : firstUl.appendChild(pokemonName);
        firstUl === null || firstUl === void 0 ? void 0 : firstUl.appendChild(secondUl);
        secondUl === null || secondUl === void 0 ? void 0 : secondUl.appendChild(pokemonId);
        firstUl === null || firstUl === void 0 ? void 0 : firstUl.appendChild(pokemonImg);
    });
}
