import Image from "next/image";
import Logo from "../../../../public/icon/pokeball.png";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0f111a]">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-28 w-28 animate-ping rounded-full bg-red-500/10" />

        <Image
          src={Logo}
          alt="Loading Pokémon"
          width={80}
          height={80}
          priority
          className="relative h-20 w-20 animate-spin"
        />
      </div>

      <p className="animate-pulse text-sm font-medium text-neutral-300">
        Catching Pokémon...
      </p>

      <div className="h-1.5 w-40 overflow-hidden rounded-full bg-neutral-800">
        <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-red-500" />
      </div>
    </div>
  );
}