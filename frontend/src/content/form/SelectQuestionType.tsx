import { useFormContext } from "../../context/form-context"

type SelectComponentProps = {
    label: string
}

export default function SelectQuestionType({label}: SelectComponentProps){

    const {questionType, dispatch} = useFormContext();

    return (
        <div className="flex gap-x-4 items-center">
            <label className="dark:text-white">
                {label}
            </label>
            <select 
                value={questionType} 
                onChange={(e) => dispatch({type: "SET_QUESTIONTYPE", payload: e.target.value})}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:ring-gray-verydark focus:border-gray-verydark block  p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                <option value="text" >text</option>
                <option value="list" >list</option>
                <option value="image" >image</option>
                
            </select>
        </div>
    )
}