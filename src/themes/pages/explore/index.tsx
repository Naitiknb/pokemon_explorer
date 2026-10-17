"use client"
import { getPokemon, getPokemonIndex, getPokemonList } from "@/lib/pokemon";
import { pokemonColors } from "@/lib/pokemonColors";
import PokemonCard from "@/themes/components/cards";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import PokemonLoader from "@/app/loading"


interface Pokemon {
    id: number;
    name: string;
    sprites: {
        other: {
            "official-artwork": {
                front_default: string | null;
            };
        };
    };
    types: {
        type: {
            name: string;
        };
    }[];
    abilities: {
        ability: {
            name: string;
        };
        is_hidden: boolean;
    }[];
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
};





export default function Explore() {


    const [count, totalCount] = useState(0)
    //  count fetch  total pokemon fetched

    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    //   Stores the list of Pokémon in an array pokemonList; initially, the array is empty.

    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("")
    const [pokemonIndex, setPokemonIndex] = useState<
        { id: number; name: string }[]
    >([]);

    // in this it only store  id and name of pokemon for seach 


    const [offset, setOffset] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);




    useEffect(() => {
        async function fetchData() {
            try {
                const [pokemon, index] = await Promise.all([
                    getPokemonList(24),
                    getPokemonIndex(),
                ]);
                setPokemonList(pokemon);
                setPokemonIndex(index)
                totalCount(index.length);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);



    useEffect(() => {
        async function searchPokemon() {
            const searchValue = search.trim().toLowerCase();

            if (!searchValue) return;

            const matches = pokemonIndex.filter(
                (pokemon) =>
                    pokemon.name.includes(searchValue) ||
                    pokemon.id.toString() === searchValue.replace("#", "")
            );
            // Filter the Pokémon index by name or ID based on the search input.

            const newPokemon = await Promise.all(
                matches.slice(0, 24).map((pokemon) => getPokemon(pokemon.id))
            );

            // Fetch the full details of matching Pokémon

            setPokemonList((current) => {
                const combined = [...current, ...newPokemon];

                //    combined here using spread operator

                return combined.filter(
                    (pokemon, index, self) =>
                        index === self.findIndex((item) => item.id === pokemon.id)
                );

                // remove duplicate with same name 
            });
        }

        searchPokemon().catch(console.error);
    }, [search, pokemonIndex]);


    async function handleViewMore() {
        setLoadingMore(true);

        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=24&offset=${offset + 24}`
            );

            const data = await response.json();

            const newPokemon = await Promise.all(
                data.results.map((pokemon: { name: string }) =>
                    getPokemon(pokemon.name)
                )
            );

            // getting  each pokemon details

            setPokemonList((prev) => [...prev, ...newPokemon]);
            // storing in array 
            setOffset((prev) => prev + 24);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingMore(false);
        }
    }






    const filterPokemon = pokemonList.filter((pokemon) => {
        const matchesType =
            filter.toLowerCase() === "all" ||
            pokemon.types.some(
                (item) => item.type.name === filter.toLowerCase()
            );




        const matchesSearch =
            pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
            pokemon.id.toString().includes(search.replace("#", "").trim());

        return matchesType && matchesSearch;
    });






    const types = [
        { name: "All", color: "bg-white" },
        ...Object.entries(pokemonColors).map(([name, color]) => ({
            name,
            color,
        })),
    ];




    return (

        <div>

            {/* banner */}
            <div className="mx-auto my-10">


                <div className="mx-auto my-10 flex justify-center">
                    <div className="inline-flex items-center rounded-full border border-neutral-800 bg-[#191C28] p-2">
                        <p className="flex items-center gap-2 rounded-full bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-300">
                            <span className="h-2 w-2 shrink-0 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                            <span>{count} Pokémon Indexed</span>
                        </p>
                    </div>
                </div>



                <div className="mx-auto mb-10 mt-10  px-4 text-center sm:mb-12 sm:mt-10">
                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-neutral-100 sm:text-5xl">
                        Explore the World of
                        <span className="text-gradient mx-2  text-5xl sm:text-7xl">
                            Pokémon
                        </span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-neutral-400 sm:text-base">
                        Discover combat stats, competitive movesets, elemental synergies, and
                        evolutionary paths for every Pokémon in the Pokédex.
                    </p>
                </div>



                <div className="p-4 bg-[#191C28] rounded-xl   max-w-4xl mx-auto ">
                    <div className="bg-neutral-950 p-4 rounded-xl">
                        <span className="absolute"><Search className="h-5 w-5" /></span>
                        <input type="search" placeholder="Seach Pokemon by name or #ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-6 w-full  outline-none ring-0 hover:ring-0 focus:ring-0 focus:outline-none" />
                    </div>




                </div>
            </div>

            {/* banner */}





            {/* filter */}

            <div className="px-4 ">
                <p>
                    <SlidersHorizontal className="h-5 w-5 text-blue-300 inline-block m-1" />
                    Filter by Elemental Affinity
                </p>

                <div className="flex flex-wrap gap-3">
                    {types.map((type) => (
                        <button
                            key={type.name}
                            onClick={() => setFilter(type.name)}
                            className={`inline-flex items-center gap-2 cursor-pointer rounded-full px-4 py-2 text-xs text-white transition hover:bg-blue-700 ${filter === type.name ? "bg-blue-600" : "bg-slate-800"
                                }`}
                        >
                            <span
                                className={`h-2 w-2 rounded-full ${type.color}`}
                            />

                            <span className="capitalize">{type.name}</span>


                        </button>
                    ))}
                </div>
            </div>



            {/* filter */}


            {/* cards */}

            {loading ? (
                <div className="">
                    <PokemonLoader />

                </div>
            ) : (
                <div>
                    <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filterPokemon.map((pokemon) => (
                            <PokemonCard
                                key={pokemon.id}
                                pokemon={pokemon}
                            />
                        ))}
                    </div>


                    <div className="my-5 flex justify-center">
                        <div className="w-fit">
                            <div className="flex justify-between gap-6 text-xs">
                                <p>
                                    Showing {pokemonList.length} of {count} Registered Pokémon
                                </p>

                                <p className="text-blue-300">
                                    {count > 0
                                        ? Math.min(100, Math.round((pokemonList.length / count) * 100))
                                        : 0}% Complete
                                </p>
                            </div>

                            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                                <div
                                    className="h-full rounded-full bg-gradient transition-all duration-300"
                                    style={{
                                        width: `${count > 0
                                            ? Math.min((pokemonList.length / count) * 100, 100)
                                            : 0
                                            }%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-center items-center my-3">


                        <button
                            onClick={handleViewMore}
                            disabled={loadingMore}
                            className="rounded-xl bg-gradient px-5 py-3 text-sm  w-auto font-bold text-green-950 transition duration-300 hover:bg-gradient hover:scale-105"
                        >
                            {loadingMore ? "Syncing..." : "Fetch Next 24 Pokemon"}
                            <ChevronDown className="ml-2 inline-block h-4 w-4" />
                        </button>

                    </div>
                </div>
            )}
            {/* cards */}







        </div>
    )

}