
type SelectComponentProps = {
    value: string,
    setValue: (e : string) => void,
    label: string
}

export default function SelectAnswersType({value, setValue, label} : SelectComponentProps){

    return (
        <form className="flex gap-x-4 items-center">
            <label>
                {label}
            </label>
            <select 
                value={value} 
                onChange={(e) => setValue(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                <option value="mc" >mc</option>
                <option value="matching" >matching</option>
                <option value="number" >number</option>
                <option value="text" >text</option>
            </select>
        </form>
    )
}