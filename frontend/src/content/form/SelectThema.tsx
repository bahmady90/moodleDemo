import { useParams } from "react-router-dom";
import { useFormContext } from "../../context/form-context"
import themen from "../../themen";

type SelectComponentProps = {
    label: string,
}

export default function SelectAPOne({label}: SelectComponentProps){

    const {lf} = useParams();

    const index = Number(lf) - 1

    const themenLernfeld = themen[index]

    const {thema, dispatch} = useFormContext();

    console.log(thema)


    return (
        <div className="flex gap-x-1 items-center justify-self-center self-start">
            <label className="dark:text-white">
                {label}
            </label>
            <select 
                value={thema as string} 
                onChange={(e) => dispatch({type: "SET_THEMA", payload: e.target.value})}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:ring-gray-verydark focus:border-gray-verydark block p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                {
                    themenLernfeld.map((thema, index) => 
                        <option value={thema} key={index}>{thema}</option>
                    
                )}
            </select>
        </div>
    )
}