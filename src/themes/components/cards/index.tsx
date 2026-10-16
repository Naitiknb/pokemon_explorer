import { pokemonColors } from "@/lib/pokemonColors";
import { ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


type PokemonCardProps = {
    pokemon: {
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
};

export default function PokemonCard({ pokemon }: PokemonCardProps) {

    const image =
        pokemon.sprites.other["official-artwork"].front_default;



    const bst = pokemon.stats.reduce(
        (total, item) => total + item.base_stat,
        0
    );




    return (
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4 text-white transition duration-300 hover:-translate-y-1 hover:border-purple-500/50">

            {/* Top: Pokémon ID and favorite icon */}
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-400">
                    #{String(pokemon.id).padStart(4, "0")}
                </span>

                <button
                    type="button"
                    aria-label={`Favorite ${pokemon.name}`}
                    className="text-slate-400 transition hover:text-red-400"
                >
                    <Heart className="h-5 w-5" />
                </button>
            </div>

            {/* Pokémon image */}
            <div className="relative mx-auto my-4 flex h-40 w-full items-center justify-center rounded-xl bg-slate-800">
                {image ? (
                    <Image
                        src={image}
                        alt={pokemon.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 250px"
                        className="object-contain p-3"
                    />
                ) : (
                    <span className="text-sm text-slate-400">
                        Image unavailable
                    </span>
                )}
            </div>

            {/* Pokémon name */}
            <h2 className="text-xl font-bold capitalize">
                {pokemon.name}
            </h2>

            {/* Pokémon types */}
            <div className="mt-3 flex flex-wrap gap-2">
                {pokemon.types.map((item) => {
                    const color = pokemonColors[item.type.name] || "bg-gray-400";

                    return (
                        <span
                            key={item.type.name}
                            className={`rounded-full ${color} px-3 py-1 text-xs font-medium capitalize text-white`}
                        >
                            {item.type.name}
                        </span>
                    );
                })}
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-slate-700" />



            {/* Base stats */}
            <h3 className="mb-3 mt-5 text-sm font-semibold text-slate-300">
                Base Stats
            </h3>

            <div className="space-y-3">
                {pokemon.stats
                    .filter((item) =>
                        ["hp", "attack", "speed"].includes(item.stat.name)
                    )
                    .map((item) => (
                        <div key={item.stat.name}>
                            <div className="mb-1 flex justify-between text-xs">
                                <span className="capitalize text-slate-400">
                                    {item.stat.name.replace("-", " ")}
                                </span>

                                <span className="font-medium text-white">
                                    {item.base_stat}
                                </span>
                            </div>

                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-700">
                                <div
                                    className="h-full rounded-full bg-gradient"
                                    style={{
                                        width: `${Math.min((item.base_stat / 255) * 100, 100)}%`,
                                    }}
                                />
                            </div>

                        </div>


                    ))}
                <div className="flex  justify-between my-2">
                    <div className="text-xs text-slate-400">
                        BST: <span className="font-bold text-green-600">{bst}</span>
                    </div>
                    <div className="text-xs ">
                        <Link href={`/explore/${pokemon.id}`} className="font-bold text-blue-300 " > Telemetry

                            <ArrowRight className="h-4 w-4  inline-block mx-1 text-blue-300" /></Link>
                    </div>
                </div>


            </div>

        </div>
    );
}