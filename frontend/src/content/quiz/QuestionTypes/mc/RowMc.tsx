import { useQuizContext } from "../../../../context/quiz-context"
import AnswerMc from "./AnswerOption";

export default function RowMc(){

    const {data, questionNumber} = useQuizContext();
    

    const row = data![questionNumber];

    const {answers} = row;


    return (
        
            <ul className="flex flex-col gap-y-2 w-[90%] lg:w-[70%] ">
                {answers.map((answer, index) => 
                <AnswerMc 
                    key={index}
                    index={index}
                    checked={answer.checked}
                >{answer.answer}</AnswerMc> 
                )}
            </ul>
        
    )
}