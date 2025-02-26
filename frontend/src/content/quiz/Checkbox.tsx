import { useQuizContext } from "../../context/quiz-context"


type CheckboxProps = {
    checked: boolean | undefined,
    handleCheckboxChange: () => void
}


export default function Checkbox({checked, handleCheckboxChange} : CheckboxProps){

    const {isSubmitted} = useQuizContext();


    return (
        <input
            disabled={isSubmitted} 
            type="checkbox" 
            checked={checked} 
            className="w-4 sm:w-5 h-4 sm:h-5 rounded-lg accent-gray-verydark disabled:cursor-not-allowed"
            onChange={handleCheckboxChange}
        >
        
        </input>
    )
}