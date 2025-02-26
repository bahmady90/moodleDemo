import { useFormContext } from "../../context/form-context"



export default function SelectLF(){

    const {lf, dispatch} = useFormContext();

    return (
        <div className="flex gap-x-1 items-center justify-self-center self-start">
            <label className="dark:text-white">
                Lernfeld
            </label>
            <select 
                value={lf?.toString()} 
                onChange={(e) => dispatch({type: "SET_LF", payload: e.target.value})}
                
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:ring-gray-verydark focus:border-gray-verydark block p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                <option value="1">1</option>
                <option value="2" >2</option>
                <option value="3" >3</option>
                <option value="4" >4</option>
                <option value="5" >5</option>
                <option value="6" >6</option>
                <option value="7" >7</option>
                <option value="8" >8</option>
                <option value="9" >9</option>

            </select>
        </div>
    )
}