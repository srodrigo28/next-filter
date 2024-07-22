import { ElementType } from "react"

interface TitleProps{
    title: string
    subTitle: string
    icon: ElementType
}
export default function Title( props: TitleProps ){
    return(
        <div className="flex flex-col gap-3 bg-blue-500 p-5 text-white text-3xl rounded-md mb-8">
            <props.icon  className="text-white" />
            <div className="flex flex-col">
                <h1>{props.title}</h1>
                <h2 className="text-gray-400">{props.subTitle}</h2>
            </div>
        </div>
    )
}