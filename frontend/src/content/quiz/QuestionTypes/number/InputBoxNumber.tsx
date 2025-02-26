import { useQuizContext } from "../../../../context/quiz-context";
import { useEvaluate } from "../../hooks/useEvaluate";




export default function InputBoxNumber(){


    const { dispatch, data, questionNumber, isSubmitted} = useQuizContext();

    // @ts-expect-error: TypeScript is complaining about type mismatch, but this is intended
    let value = data![questionNumber].answers.number;

    if(value === null){
        value = "";
    }

    function handleInputboxChange(e : React.ChangeEvent<HTMLInputElement>) {
        const target = e.target.value.replace(",", "."); // Replace comma with dot
        console.log(Number(target));
        if (!isNaN(Number(target)) || target === "") { 
            dispatch({
                type: "SET_ANSWER_NUMBER", 
                payload: target === "" ? "" : Number(target) 
            });
        }

        
    }

    const {getIsRightAnswerNumber} = useEvaluate();

    const isRightAnswer = getIsRightAnswerNumber();

    console.log(isRightAnswer)

    const inputBoxNumberStyles = value !== "" ? (isSubmitted && (isRightAnswer ? "border-green-500 border-[2px]" : "border-red-500 border-[2px]")) : "border-gray-700 border-[1px] focus:border-[2px] focus:border-gray-700" 


    return (
        <input
            disabled={isSubmitted}
            type="number" 
            value={value} 
            className={`text-center w-12 h-6 sm:w-14 sm:h-8 ${inputBoxNumberStyles} rounded-lg outline-none text-[0.6rem] disabled:cursor-not-allowed `}
            onChange={handleInputboxChange}
        >
        
        </input>
    )
}