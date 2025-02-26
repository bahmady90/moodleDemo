import { FormEvent } from "react";


type FormfilterIdProps = {
    filterById: string,
    setFilterById: (e: string) => void,
    handleFilterId: (e: FormEvent<HTMLFormElement>) => void
}


export default function FormfilterId({filterById, setFilterById, handleFilterId} : FormfilterIdProps){

    
    return(
        <form 
            className="w-[7%] text-start font-semibold text-[1.2rem] flex gap-x-1 items-center justify-center"
            onSubmit={handleFilterId}>  
            <label>
                ID:
            </label>
            <input  
                type="number"
                value={(filterById)}
                onChange={e => setFilterById(e.target.value)}
                className={`text-[1rem] px-1 py-[2px] rounded-lg outline-none border-[1px] w-[50%] font-normal focus:border-2 focus:border-gray-verydark dark:focus:border-gray-medium  dark:bg-dark-very-dark-grey`}
            ></input>
        </form>
    )

}