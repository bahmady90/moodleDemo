import { useQuizContext } from "../../../../context/quiz-context";
import Checkbox from "../../Checkbox";
import { useEvaluate } from "../../hooks/useEvaluate";


type AnswerMcProps = {
  children: string;
  index: number;
  checked: boolean | undefined;
};

export default function AnswerOption({ children, index, checked }: AnswerMcProps) {

  const { dispatch, data, questionNumber, isSubmitted} = useQuizContext();

  const {getIsRightAnswerMC} = useEvaluate();

  const handleCheckboxChange = () => {
    dispatch({
      type: "SET_ANSWER_CHECKED",
      payload: index,
    });
  };

    
    const {isRightAnswer} = getIsRightAnswerMC(index);

    
    const answerStyle = (isRightAnswer === true || isRightAnswer === null) ?  "bg-gradient-to-r from-green-400/70 to-emerald-300/70" : "bg-gradient-to-r from-red-400/70 to-rose-300/70";


    const buttonStyling = isSubmitted
      ? answerStyle
      : "bg-slate-100/70 dark:bg-dark-dark-grey/50";


  	const stylingChecked = checked? "ml-5" : ""

    const options = data![questionNumber].answers

    const optionMatchingStyling = options.length > 5 ? "h-[3rem] sm:h-[4rem]" : "h-[3.5rem] sm:h-[4.5rem]"

    const paragraphStyle = typeof children === "string" && children?.length >= 50 ? (children.length >= 100 ? "text-[0.4rem] sm:text-[0.5rem] lg:text-[0.6rem]" : "text-[0.5rem] sm:text-[0.6rem] lg:text-[0.7rem]") : "text-[0.5rem] sm:text-[0.6rem] lg:text-[0.7rem]"

  return (
    <div className={`flex items-center ${stylingChecked} lg:gap-x-4 sm:gap-x-3 gap-x-2 w-[100%]` }>
      <button className={` ${buttonStyling} rounded-full w-[90%] border-gray-700 border-[1px] dark:text-white self-center text-center px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 ${optionMatchingStyling} text-gray-900`}>
        <p className={` ${paragraphStyle} max-w-[90%]`}>{children}</p>
      </button>
      
      <Checkbox
        checked={checked}
        handleCheckboxChange={handleCheckboxChange}
      />
      
    </div>
  );
}
