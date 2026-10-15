"use client"
import { Search } from "lucide-react";
import { useEffect, useState } from "react";


type Pokemon = {
    name: string;
    url: string;
};



type PokemonResponse = {
    count: number;
    results: Pokemon[];
};



export default function Explore() {


    const [count, totalCount] = useState(0)


    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                "https://pokeapi.co/api/v2/pokemon"
            );

            const data = await response.json();
            if (!response.ok) {
                throw new Error("Failed to fetch Pokémon");
            }


            totalCount(data.count)

            console.log(data);
        }

        fetchData();
    }, []);




    return (

        <div>


            <div className="mx-auto my-10">


                <div className="inline-flex items-center rounded-full border border-neutral-800 bg-[#191C28] p-2">
                    <p className="flex items-center gap-2 rounded-full bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-300">
                        <span className="h-2 w-2 shrink-0 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                        <span>{count} Pokémon Indexed</span>
                    </p>
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
                        <input type="search" placeholder="Seach Pokemon by name or #ID..." className="px-6 w-full" />
                    </div>




                </div>
            </div>
        </div>
    )

}