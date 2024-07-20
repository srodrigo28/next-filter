import Link from "next/link";
import { ElementType } from "react";
import { FaPersonBooth, FaAndroid, FaVideo, FaHome } from "react-icons/fa"

interface ItemMenuProps{
    icone: ElementType
    label: string
    url: string
}

function ItemMenu( props: ItemMenuProps){
    return(
        <Link href={props.url} className="flex gap-3 px-3 py-3 hover:bg-zinc-900 rounded-md text-2xl">
            <props.icone className="text-zinc-200" size={25} />
            <span className="text-zinc-200">{props.label}</span>
        </Link>
    )
}

export default function Menu(){
    return(
        // sm:hidden w-48 aparece so mobile devices

        <div className="hidden md:block w-62 bg-blue-700 h-screen p-3 ">
            <ItemMenu icone={FaAndroid} label="Pedidos" url="/pedido" />
            <ItemMenu icone={FaVideo} label="Aulas" url="#" />
            <ItemMenu icone={FaPersonBooth} label="Cadastros" url="/cadastro" />
            <ItemMenu icone={FaHome} label="Login" url="/" />
        </div>
    )
}