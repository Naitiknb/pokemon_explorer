import { GitBranchPlus } from "lucide-react";
import Link from "next/link";
import Github from "../../../../public/icon/github.png"
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-slate-950 px-6 py-8 text-slate-300   w-full">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">


                <div className="max-w-sm">
                    <h4 className="text-lg font-bold text-white">
                        PokéVerse <span className="text-purple-400">Explorer</span>
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                        Your ultimate Pokémon encyclopedia, powered by PokéAPI.
                    </p>
                </div>


                <div className="flex flex-wrap gap-3 text-sm">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                        Next.js
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                        Tailwind CSS
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                        PokéAPI v2
                    </span>
                </div>


                <div className="flex gap-2 items-center">

                    <Image src={Github} alt="Github" className="bg-white h-6 w-6 p-1 rounded-full" /> 
                    <Link
                        href="https://github.com/Naitiknb/pokemon_explorer"
                        target="_blank"
                        className="w-fit text-sm font-medium transition-colors hover:text-purple-400"
                    >
                         GitHub ↗
                    </Link>
                </div>

            </div>


        </footer>
    );
}