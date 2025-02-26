import { useParams } from "react-router-dom";
import { useQuizContext } from "../../context/quiz-context";
import { getQuestions } from "../../functions";
import { useEvaluate } from "./hooks/useEvaluate";
import useHandleText from "./hooks/useHandleText";

export default function QuizBottom(){

    const {isSubmitted, dispatch, questionNumber, data} = useQuizContext();


    const {evaluate, getGrade} = useEvaluate();

    const {switchQuestionText} = useHandleText();

    const type = data![questionNumber].type;

    /* const score = scoredArray.reduce((acc, cum) => acc + cum.score, 0); */

    const { lf } = useParams(); 

    async function resetQuiz(){
      dispatch({type: "RESET_QUIZ"})
      await getQuestions(dispatch, lf as string)

    }


    function handleIncrement(){
      if(type === "text"){
        switchQuestionText();
      } else {
        evaluate();
      }
        dispatch({type: "INCREMENT_QUESTIONNUMBER"});
      }
  
      function handleDecrement(){
        if(type === "text"){
          switchQuestionText();
        } else {
          evaluate();
        }
        dispatch({type: "DECREMENT_QUESTIONNUMBER"})
      }
  
      function handleSubmitQuiz(){
        if(type === "text"){
          switchQuestionText();
        } else {
          evaluate();
        }
        dispatch({type: "SUBMIT_QUIZ"});
      }
  
      const endOfQuiz = questionNumber === data!.length - 1;
  
      const startOfQuiz = questionNumber === 0;
  
      const displayBeendenButton = isSubmitted ? "hidden pointer-events-none" : (endOfQuiz ? "flex" : "hidden pointer-events-none")
  
      const displayGrade = isSubmitted ? "block" : "hidden"
  
      const percentageGrade = getGrade();


    return (
        <div className="flex flex-col items-center w-full gap-y-8 justify-self-center pb-8 mt-4 sm:mt-8">
            <div className="flex gap-x-4 justify-self-center items-center">
              {/* <p className="mr-8">Score:{score}</p> */}
                <button
                  disabled={startOfQuiz}  
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-gray-dark dark:bg-dark-gray-medium text-gray-light hover:bg-gray-light dark:hover:bg-gray-light hover:ring-1 hover:ring-gray-verydark cursor-warning hover:text-black"
                  onClick={handleDecrement}
                  >{'<'}</button>
                <button
                  disabled={endOfQuiz}
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14  rounded-full bg-gray-dark dark:bg-dark-gray-medium text-gray-light hover:bg-gray-light dark:hover:bg-gray-light hover:ring-1 hover:ring-gray-verydark cursor-warning hover:text-black"
                  onClick={handleIncrement}
                  >{'>'}</button>
            </div>
            <div className="flex w-[80%] justify-around items-center mt-4 sm:mt-8">
              <div className={`${displayGrade} flex gap-x-20 items-center`}>
                <p className={`${displayGrade} text-[1.5rem] text-gray-verydark dark:text-gray-light font-semibold`}>Ergebnis: {percentageGrade}</p>
                <button 
                  className={`${displayGrade} animate-bounce animate-infinite lg:text-[1.5rem] rounded-full px-5 py-3 bg-gray-dark dark:bg-dark-gray-medium text-gray-light hover:bg-gray-light dark:hover:bg-gray-light hover:text-gray-verydark hover:border-[2px] hover:border-gray-verydark`}
                  onClick={resetQuiz}
                  >Neustarten</button>
              </div>
              <button
                onClick={handleSubmitQuiz}
                className={`${displayBeendenButton} sm:text-[1rem] px-4 sm:px-5 lg:px-7 py-2 sm:py-4 lg:py-5 rounded-full bg-rose-500 hover:bg-rose-100 text-gray-50 hover:ring-1 hover:ring-rose-700 hover:text-red-900`}
              >Beenden
              </button>
            </div> 
        </div>
    )
}

/* animate-bounce animate-infinite */