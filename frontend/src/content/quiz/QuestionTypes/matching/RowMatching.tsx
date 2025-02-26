import { useQuizContext } from "../../../../context/quiz-context";
import AnswerMatching from "./AnswerMatching";

export default function RowMatching(){

    const {data, questionNumber} = useQuizContext();

    const row = data![questionNumber];

    const {answers} = row;

    return (
        
            <ul className="flex flex-col gap-y-2 w-[90%] lg:w-[70%]">
                {answers.map((answer, index) => 
                <AnswerMatching 
                    key={index}
                    index={index}
                >{answer.answer}</AnswerMatching> 
                )}
                
            </ul>
        
    )
}





