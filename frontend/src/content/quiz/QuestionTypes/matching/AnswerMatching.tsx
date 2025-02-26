import { ReactNode } from "react";
import { useQuizContext } from "../../../../context/quiz-context";
import InputBoxMatching from "./InputBoxMatching";
import { useEvaluate } from "../../hooks/useEvaluate";


type AnswerMcProps = {
    children: ReactNode;
    index: number;
  };

export default function AnswerMatching({ children, index}: AnswerMcProps){

    const { data, questionNumber, isSubmitted} = useQuizContext();

    const {getIsRightAnswerMatching} = useEvaluate();

    const options = data![questionNumber].answers

    const rightAnswer = getIsRightAnswerMatching(index);

    const optionMatchingStyling = options.length > 5 ? "h-[3rem] sm:h-[4rem]" : "h-[3.5rem] sm:h-[4.5rem]"
    
    const answerStyle = rightAnswer
      ? "bg-gradient-to-r from-green-400/70 to-emerald-300/70"
      : "bg-gradient-to-r from-red-400/70 to-rose-300/70";


      const buttonStyling = isSubmitted
      ? answerStyle
      : "bg-slate-100/70 dark:bg-dark-dark-grey/50";


  	const paragraphStyle = typeof children === "string" && children?.length >= 50 ? (children.length >= 100 ? "text-[0.4rem] sm:text-[0.5rem] lg:text-[0.6rem]" : "text-[0.5rem] sm:text-[0.6rem] lg:text-[0.7rem]") : "text-[0.5rem] sm:text-[0.6rem] lg:text-[0.7rem]"

  return (
    <div className={`flex items-center gap-x-2  lg:gap-x-4 sm:gap-x-3 w-full justify-self-center` }>
      <button className={`${buttonStyling} rounded-full w-[90%]  border-gray-700 dark:border-dark-grey-border dark:text-gray-light border-[1px] self-center px-2 py-1  sm:px-3 sm:py-2 lg:px-5 lg:py-3 ${optionMatchingStyling}`}>
        <p className={`${paragraphStyle} max-w-[90%]`}>{children}</p>
      </button>
      <InputBoxMatching
        index={index}
      /> 
    </div>
    )
    
}