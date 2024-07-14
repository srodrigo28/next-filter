import Link from "next/link";
import { ElementType } from "react";
import { FaPrescription, FaFirstOrder, FaRegArrowAltCircleDown } from "react-icons/fa"

interface ItemMenuProps{
    icone: ElementType
    label: string
    url: string
}

function ItemMenu( props: ItemMenuProps){
    return(
        <Link href={props.url} className="flex gap-3 px-3 py-3 hover:bg-zinc-900 text-2xl">
            <props.icone className="text-zinc-200" size={25} />
            <span className="text-zinc-200">{props.label}</span>
        </Link>
    )
}

export default function Menu(){
    return(
        <div className="flex gap-10">
            <ItemMenu icone={FaFirstOrder} label="Pedidos" url="#" />
            <ItemMenu icone={FaPrescription} label="Cadastros" url="#" />
            <ItemMenu icone={FaRegArrowAltCircleDown} label="Voltar" url="#" />
        </div>
    )
}