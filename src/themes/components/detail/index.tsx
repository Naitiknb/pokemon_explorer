import { getPokemon, getPokemonSpecies } from "@/lib/pokemon";
import { pokemonColors } from "@/lib/pokemonColors";
import { ArrowLeft, Weight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Detail({ id }: { id: string }) {
    let pokemon;
    let species;

    try {
        [pokemon, species] = await Promise.all([
            getPokemon(id),
            getPokemonSpecies(id),
        ]);
    } catch {
        notFound();
    }

    const description =
        species.flavor_text_entries.find(
            (entry: { language: { name: string } }) =>
                entry.language.name === "en"
        )?.flavor_text.replace(/[\n\f]/g, " ") ??
        "No description available.";

    const summary =
        species.genera.find(
            (item: { language: { name: string } }) =>
                item.language.name === "en"
        )?.genus ?? "Unknown species";


    const height = pokemon.height / 10; // meters
    const weight = pokemon.weight / 10; // kg
    const baseExp = pokemon.base_experience ?? "Unknown";

    const catchRate = species.capture_rate;
    const baseHappiness = species.base_happiness;


    const genderRate = species.gender_rate;
    const femaleRatio =
        genderRate === -1 ? null : (genderRate / 8) * 100;
    const maleRatio =
        genderRate === -1 ? null : 100 - femaleRatio!;



    return (

        <div>

            <div className="px-6 pt-6">
                <nav className="flex items-center gap-2 text-sm text-gray-400">
                    <Link href="/" className="flex items-center gap-1 hover:text-white">
                        <ArrowLeft size={16} />
                        Explorer
                    </Link>
                    <span>/</span>
                    <Link
                        href={`/?type=${pokemon.types[0].type.name}`}
                        className="capitalize hover:text-white"
                    >
                        {pokemon.types[0].type.name} types
                    </Link>
                    <span>/</span>
                    <span className="capitalize text-white">
                        #{String(pokemon.id).padStart(4, "0")} {pokemon.name}
                    </span>
                </nav>
            </div>


            <div className="p-6">






                <div className="flex flex-col items-center justify-around bg-slate-800/80 rounded-xl my-5  gap-6 md:flex-row">
                    <div>
                        <h1 className="text-3xl font-bold capitalize">
                            {pokemon.name} #{pokemon.id}
                        </h1>

                        <div className="my-3 flex flex-wrap gap-2">
                            {pokemon.types.map(
                                (item: { type: { name: string } }) => (
                                    <span
                                        key={item.type.name}
                                        className={`rounded-full ${pokemonColors[item.type.name] ?? "bg-gray-500"
                                            } px-3 py-1 text-sm capitalize`}
                                    >
                                        {item.type.name}
                                    </span>
                                )
                            )}
                        </div>

                        <p className="mb-2 text-lg font-semibold">{summary}</p>

                        <p className="max-w-xl leading-7 text-slate-300">
                            {description}
                        </p>
                    </div>

                    {pokemon.sprites.other["official-artwork"].front_default && (
                        <Image
                            src={pokemon.sprites.other["official-artwork"].front_default}
                            alt={pokemon.name}
                            width={300}
                            height={300}
                        />
                    )}
                </div>


                {/* Top Stats Cards */}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
                    {[
                        {
                            label: "Height",
                            value: `${height} m`,
                            sub: `${(height * 3.28084).toFixed(2)} ft`,
                            color: "text-white",
                        },
                        {
                            label: "Weight",
                            value: `${weight} kg`,
                            sub: `${(weight * 2.20462).toFixed(1)} lbs`,
                            color: "text-white",
                        },
                        {
                            label: "Base Exp",
                            value: `${baseExp} XP`,
                            sub: "Experience points",
                            color: "text-emerald-400",
                        },
                        {
                            label: "Catch Rate",
                            value: `${catchRate}`,
                            sub: "Capture difficulty",
                            color: "text-white",
                        },
                        {
                            label: "Base Happiness",
                            value: `${baseHappiness}`,
                            sub: "Friendship baseline",
                            color: "text-white",
                        },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-xl border border-white/5 bg-slate-800/80 p-3"
                        >
                            <p className="text-xs text-slate-400">{stat.label}</p>
                            <p className={`mt-1 text-sm font-bold ${stat.color}`}>
                                {stat.value}
                            </p>
                            <p className="mt-1 text-[10px] text-slate-500">{stat.sub}</p>
                        </div>
                    ))}

                    {/* Gender Ratio */}
                    <div className="rounded-xl border border-white/5 bg-slate-800/80 p-3">
                        <p className="text-xs text-slate-400">Gender Ratio</p>

                        {genderRate === -1 ? (
                            <p className="mt-2 text-sm font-bold text-slate-300">Genderless</p>
                        ) : (
                            <>
                                <div className="mt-2 flex justify-between text-[10px]">
                                    <span className="text-blue-400">♂ {maleRatio}%</span>
                                    <span className="text-pink-400">♀ {femaleRatio}%</span>
                                </div>

                                <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-slate-700">
                                    <div
                                        className="bg-blue-400"
                                        style={{ width: `${maleRatio}%` }}
                                    />
                                    <div
                                        className="bg-pink-400"
                                        style={{ width: `${femaleRatio}%` }}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Main Dashboard */}
                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {/* Combat Stats */}
                    <div className="rounded-xl border border-white/5 bg-slate-800/80 p-5 lg:col-span-2">
                        <h2 className="mb-5 text-lg font-bold text-slate-200">
                            ⚔ Base Combat Stats
                        </h2>

                        {pokemon.stats.map(
                            (item: {
                                base_stat: number;
                                stat: { name: string };
                            }) => {
                                const statColors: Record<string, string> = {
                                    hp: "bg-emerald-400",
                                    attack: "bg-orange-400",
                                    defense: "bg-yellow-400",
                                    "special-attack": "bg-red-400",
                                    "special-defense": "bg-cyan-400",
                                    speed: "bg-violet-400",
                                };

                                return (
                                    <div key={item.stat.name} className="mb-4">
                                        <div className="mb-1 flex justify-between text-xs">
                                            <span className="capitalize text-slate-300">
                                                {item.stat.name.replace("-", " ")}
                                            </span>
                                            <span className="font-bold text-white">
                                                {item.base_stat}
                                            </span>
                                        </div>

                                        <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                                            <div
                                                className={`h-full rounded-full ${statColors[item.stat.name] ?? "bg-blue-400"
                                                    }`}
                                                style={{
                                                    width: `${Math.min(
                                                        (item.base_stat / 255) * 100,
                                                        100
                                                    )}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            }
                        )}

                        <div className="mt-5 border-t border-white/10 pt-4">
                            <p className="text-xs text-slate-400">
                                Base Stat Total
                            </p>
                            <p className="text-xl font-bold text-blue-400">
                                {pokemon.stats.reduce(
                                    (total: number, item: { base_stat: number }) =>
                                        total + item.base_stat,
                                    0
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Abilities */}
                    <div className="rounded-xl border border-white/5 bg-slate-800/80 p-5">
                        <h2 className="mb-4 text-lg font-bold text-slate-200">
                            ✦ Abilities & Traits
                        </h2>

                        <div className="space-y-3">
                            {pokemon.abilities.map(
                                (item: {
                                    ability: { name: string };
                                    is_hidden: boolean;
                                }) => (
                                    <div
                                        key={item.ability.name}
                                        className="rounded-lg bg-slate-700/50 p-3"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <p className="text-sm font-semibold capitalize text-amber-300">
                                                {item.ability.name.replace("-", " ")}
                                            </p>

                                            <span className="rounded bg-slate-600 px-2 py-1 text-[9px] text-slate-300">
                                                {item.is_hidden ? "HIDDEN ABILITY" : "ABILITY"}
                                            </span>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>



                    </div>




                </div>


                {/* Move Pool */}
                <div className="mt-4 rounded-2xl border border-white/5 bg-slate-800/80 p-6 ">
                    <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-slate-200">
                        ⚔ Move Pool & Learned Attacks
                    </h2>

                    <div className="grid gap-4 md:grid-cols-4">
                        {pokemon.moves.slice(0, 8).map((item:any) => (
                            <div
                                key={item.move.name}
                                className="rounded-xl bg-slate-700/40 p-4"
                            >
                                <p className="mb-2 text-xs text-emerald-400">
                                    Learnable Move
                                </p>

                                <h3 className="text-lg font-bold capitalize text-slate-100">
                                    {item.move.name.replace("-", " ")}
                                </h3>

                                <p className="mt-2 text-sm text-slate-400">
                                    This Pokémon can learn this move.
                                </p>
                            
                            </div>
                        ))}
                    </div>
                </div>


            </div>

        </div>
    );
}