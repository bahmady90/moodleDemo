import { useFormContext } from "../../context/form-context"

type SelectComponentProps = {
    label: string,
}

export default function SelectType({label}: SelectComponentProps){

    const {type, dispatch} = useFormContext();

    return (
        <div className="flex gap-x-1 items-center justify-self-center self-start">
            <label className="dark:text-white">
                {label}
            </label>
            <select 
                value={type} 
                onChange={(e) => dispatch({type: "SET_TYPE", payload: e.target.value})}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:ring-gray-verydark focus:border-gray-verydark block p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                <option value="mc">mc</option>
                <option value="matching" >matching</option>
                <option value="number" >number</option>
                <option value="text" >text</option>
            </select>
        </div>
    )
}