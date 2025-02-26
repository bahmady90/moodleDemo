import Question from "./Question";
import SelectType from "./SelectType";
import SelectQuestionType from "./SelectQuestionType";
import Answers from "./Answers";
import RightAnswers from "./RightAnswers";
import DivideLine from "./DivideLine";
import SubHeader from "../../SubHeader";
import SelectLF from "./SelectLF";
import SelectAPOne from "./SelectAPOne";
import SelectThema from "./SelectThema";

import { useFormContext } from "../../context/form-context";
import { Toaster } from 'react-hot-toast';
import { useForm } from "./hooks/useForm";





export const basicInputStyles = "text-[0.7rem] px-2 py-2 rounded-lg outline-none dark:text-white dark:bg-gray-800 border-[1px] border-gray-300 focus:border-gray-verydark dark:focus:border-gray-light";

export const basicButtonStyles = "max-w-[11rem] px-3 py-2 rounded-full bg-gray-dark text-gray-light hover:bg-gray-light hover:ring-1 hover:ring-gray-verydark cursor-warning hover:text-black"

export default function FormQuestionPage(){


    const {id} = useFormContext()

    
    const {handleSubmit, handleUpdate,  } = useForm();


    return (
        <>
        <Toaster position="top-center"/>
        <SubHeader/>
        <div className="w-full min-h-full flex flex-col bg-gray-50 dark:bg-dark-very-dark-grey pb-10 mt-[4%]">
            <form 
                className="w-full h-full flex flex-col items-center gap-y-[3rem] font-sans"
                onSubmit={id ? handleUpdate : handleSubmit}
            >
                <div className="w-[70%] flex gap-x-8 justify-center">
                    <SelectType
                        label="Fragentyp "
                    />
                    <SelectQuestionType
                        label="Fragentyp (die Frage selbst)"
                    />
                    {id && <SelectLF/>}
                </div>
                <DivideLine/>
                <div className="w-[70%] flex gap-x-8 justify-center">
                    <SelectAPOne
                        label="AP1-wichtig?"
                    />
                    <SelectThema
                        label="Thema"
                    />
                </div>
                <DivideLine/>
                <Question />
                <DivideLine/>
                <Answers />
                <DivideLine/>
                <RightAnswers/>   
            </form>
        </div>

    </>
             
    )
    
}