import { FormEvent } from "react"

type ButtonProps = {
    px: string,
    py: string,
    rounded: string,
    handleClick?: () => void,
    children: string,
    optionalStyling?: string
    handleSubmit?:  (e: FormEvent<HTMLFormElement>) => void,
    type: "submit" | "reset" | "button" | undefined,
    disabled?: boolean
}

export default function Button({px, py, rounded, handleClick, children, optionalStyling, type, disabled}: ButtonProps){

    const buttonStyles = `${px} ${py} ${rounded}`

    return (
        <button
            disabled={disabled}
            type={type}
            className={` ${buttonStyles} ${optionalStyling} bg-gray-dark dark:bg-blue-900 text-gray-light hover:bg-gray-light dark:hover:bg-gray-light hover:ring-1 hover:ring-gray-verydark cursor-warning hover:text-black disabled:cursor-not-allowed disabled:opacity-20`}
            onClick={handleClick}
        >{children}</button>
    )
}