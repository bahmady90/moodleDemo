import { useParams } from "react-router-dom";



export default function SubHeader(){

    const {lf} = useParams();

    return (
        <header className=" grid sm:grid-rows-0 sm:flex justify-self-center sm:gap-x-4 mb-4 sm:mb-6 ">
            <h2 className="text-[1.2rem] sm:text-[1.5rem] lg:text-[1.8rem] text-gray-verydark dark:text-blue-300 font-semibold justify-self-center">LF-{lf}:</h2>
        </header>
    )
}