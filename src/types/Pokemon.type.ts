type PokemonList = {
    count : number;
    results: PokemonResults
}

type PokemonResults = {
    name: string;
    url: string;
}

type Pokemon = {
    id : number;
    name : string;
    sprites : PokemonSprites
}

type PokemonSprites = {
    other : {
        showdown : {
            front_default : string
        }
    }
}