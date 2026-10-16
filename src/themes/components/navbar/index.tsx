import Image from "next/image"
import Logo from "../../../../public/icon/pokeball.png"
import { User } from "lucide-react"

export default function navbar() {

    // const items = [
    //     {
    //         key: "explore",
    //         item: "Explore",
    //         href: "/"
    //     },
    //     {
    //         key:"favroites",
    //         item:"favroites",
    //         href:""
    //     }

    // ]
    return (
        <div className="flex items-center justify-between bg-slate-950 p-3 border-t border-white/10  shadow">


            <div className="flex items-center gap-2 text-white text-sm">
                <Image src={Logo} alt={"lgoo"} className="h-5 w-5" />
                <span className="text-gradient">
                    PokéVerse
                </span>
            </div>

            {/* <div className="flex  gap-3 ">
                {items?.map((item) => {
                    return <div className="rounded-full bg-primary text-black flex  p-1  text-xs px-3 cursor-pointer" key={item.key}>{item.key.toUpperCase()}</div>
                })}
            </div> */}



            <div className="bg-blue-300 p-1 rounded-full">
                <User className="h-4 w-4 text-blue-700 " />
            </div>
        </div>
    )
}