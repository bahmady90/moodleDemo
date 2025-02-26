import { useQuizContext } from "../../../../context/quiz-context";

type InputBoxNumberProps = {
    index: number,
}


export default function InputBoxMatching({index} : InputBoxNumberProps){

    const { dispatch, data, questionNumber, isSubmitted} = useQuizContext();

    let value = data![questionNumber].answers[index].number;

    if(value === null){
        value = "";
    }

    function handleInputboxChange(e : React.ChangeEvent<HTMLInputElement>){
        const target = e.target.value;
        if(Number(target) || target === ""){
            if(target.length <= 2){
                dispatch({type: "SET_ANSWER_MATCH", payload: {number: Number(target) ? Number(target) : "", indexPayload: index}})
            }
        }
        
        
        
    }


    return (
        <input
            disabled={isSubmitted} 
            type="text" 
            value={value} 
            className="text-center w-6 sm:w-8 h-5 sm:h-6 border-black dark:bg-dark-dark-grey dark:text-white  dark:border-gray-light border-[1px] rounded-lg focus:ring-1 focus:ring-slate-400 outline-none text-[0.6rem] disabled:cursor-not-allowed"
            onChange={handleInputboxChange}
        >
        
        </input>
    )
}