import { useQuizContext } from "../../context/quiz-context";
import { useEvaluate } from "./hooks/useEvaluate";
import useHandleText from "./hooks/useHandleText";

type QuestionOwerviewElementProps = {
    questionSeen : boolean,
    index: number
}

export default function QuestionOverviewElement({questionSeen, index} : QuestionOwerviewElementProps){

    const {scoredArray, isSubmitted, dispatch, questionNumber, data} = useQuizContext();

    const {evaluate} = useEvaluate();

    const {switchQuestionText} = useHandleText();

    const score = scoredArray[index]?.score

    const paragraphStyle = isSubmitted ? ((score === 0 && "text-red-700") || ((score > 0 && score < 4) && "text-orange-500") || (score === 4 && "text-green-500")) : "text-black"

    const questionDivStyle = questionSeen ? "bg-gray-verydark dark:bg-slate-500" : "bg-gray-50";

    const currentQuestionStyle = questionNumber === index ? "w-[2rem] sm:w-[2.5rem] lg:w-[3rem] h-[2.5rem] sm:h-[3.5rem] lg:h-[4rem] border-[2px]" : "w-[1.5rem] h-[2rem] sm:w-[2rem] sm:h-[3rem] border-[1px]";

    const type = data![questionNumber].type;


    function handleClick(){
        if(type === "text"){
            switchQuestionText();
          } else {
            evaluate();
          }
        dispatch({type: "SET_QUESTIONNUMBER", payload: index})
    }

    return (
        <div 
            className={`${currentQuestionStyle} bg-gray-light  self-center
                justify-self-center rounded-lg grid grid-rows-2  border-gray-verydark rounded-b-none cursor-warning hover:opacity-70`}
            onClick={handleClick}
            >
            <p className={`text-[0.7rem] sm:text-[1rem] self-center justify-self-center ${paragraphStyle} font-semibold opacity-100`}>{index + 1}</p>
            <div className={`w-full h-full self-center justify-self-center ${questionDivStyle}`}></div>
        </div>
    )
}