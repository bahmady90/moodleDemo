type ErrorMessageProps = {
    children: string
}

export default function ErrorMessage({children}: ErrorMessageProps){


    return (
        <p className="text-red-600 text-sm justify-self-center mt-1 font-semibold">{children}</p>
    )
}