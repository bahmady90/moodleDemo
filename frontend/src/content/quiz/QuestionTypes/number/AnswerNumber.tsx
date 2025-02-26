import { useQuizContext } from "../../../../context/quiz-context"






export default function AnswerNumber(){

    const {data, questionNumber} = useQuizContext();
    // @ts-expect-error: TypeScript is complaining about type mismatch, but this is intended
    const answer = data![questionNumber].answers.answer
    
    return (
        
        <p className="text-[0.875rem] sm:text-[1rem] lg:text-[1.2rem]">{answer}</p>
       
    )

}