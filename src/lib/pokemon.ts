export type PokemonListItem = {
    name: string;
    url: string;
};

export async function getPokemon(id: string | number) {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}`,
        {
            next: { revalidate: 3600 },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch Pokemon");
    }

    return response.json();
}

export async function getPokemonList(limit = 24) {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch Pokemon list");
    }

    const data = await response.json();

    const pokemon = await Promise.all(
        data.results.map((item: PokemonListItem) =>
            getPokemon(item.url.split("/").filter(Boolean).pop()!)
        )
    );

    return pokemon;
}



export async function getPokemonIndex() {
    const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon-species?limit=2000"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch Pokemon index");
    }

    const data = await response.json();

    return data.results.map((item: PokemonListItem) => ({
        name: item.name,
        id: Number(item.url.split("/").filter(Boolean).pop()),
    }));
}



export async function getPokemonSpecies(id: string | number) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon species");
  }

  return response.json();
}