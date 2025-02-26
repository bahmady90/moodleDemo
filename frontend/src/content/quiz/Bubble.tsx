import { ReactNode } from "react"

type BubbleProps = {
    children: ReactNode
}

export default function Bubble({children} : BubbleProps){

    return (
        <div className="bubble">
            {children}
        </div>

    )
}