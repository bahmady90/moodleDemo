import { useFormContext } from "../../context/form-context"

type SelectComponentProps = {
    label: string,
}

export default function SelectAPOne({label}: SelectComponentProps){

    const {apOne, dispatch} = useFormContext();

    const booleanString = apOne === true ? "true" : "false"

    return (
        <div className="flex gap-x-1 items-center justify-self-center self-start">
            <label className="dark:text-white">
                {label}
            </label>
            <select 
                value={booleanString} 
                onChange={(e) => dispatch({type: "SET_APIONE", payload: e.target.value})}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:ring-gray-verydark focus:border-gray-verydark block p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                <option value="false">false</option>
                <option value="true" >true</option>  
            </select>
        </div>
    )
}