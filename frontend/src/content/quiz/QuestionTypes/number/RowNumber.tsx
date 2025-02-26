import AnswerNumber from "./AnswerNumber";
import InputBoxNumber from "./InputBoxNumber";


export default function RowNumber(){


    return (
        <div className="grid grid-rows-[2fr_1fr]">
            <p>Bitte achte ggf. auf die Einheit!</p>
            <div className="flex gap-x-2 sm:gap-x-3  justify-center items-center w-[90%]">
                <AnswerNumber/>
                <InputBoxNumber/>
            </div>
        </div>
        
    )
}