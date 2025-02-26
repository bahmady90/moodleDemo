import Button from "../../Button";
import ErrorMessage from "./ErrorMessage";

import { ChangeEvent } from "react"
import { basicInputStyles } from "./FormQuestionPage";
import { useFormContext } from "../../context/form-context";
import { useForm } from "./hooks/useForm";



export default function RightAnswers(){

    const {type, errors, checkErros, rightAnswers, id, answersMatching,  dispatch} = useFormContext();

    const {valueNumber, setValueNumber, valueMatching, setValueMatching, valueMC, setValueMC, resetLocalState} = useForm();

    const index = errors.findIndex((err) => err.type === "rightAnswer")
    const indexMatching = errors.findIndex((err) => err.type === "matchingError")


    const disabled = errors.reduce((acc, error) => {
        if(error.message){
            acc = true
        }
        return acc
    }, false)

    

    const errorStyle = (errors[index]?.message !== "" && checkErros) ? "border-red-500 focus:border-gray-600": "border-gray-600"

    function handleSetAnswer(e: ChangeEvent<HTMLInputElement>){
        const input = e.target.value;
        //that was kinda stupid because i need the state as the RightAnswer-type, ^
        // but the same time enable the user to use "," wich resultet in these computations
        if(type === "mc"){
            setValueMC(input);
            const numberArray = input.split(",").filter(item => item.trim() !== "").map(item => Number(item)).filter(item => !isNaN(item));
            dispatch({type: "SET_RIGHTANSWER", payload: numberArray });
            console.log(rightAnswers)
            if((numberArray.length === 0) && checkErros){
                dispatch({type: "SET_ERROR_RIGHTANSWER"})
            } else if(numberArray.length !== 0){
                dispatch({type: "REMOVE_ERROR_RIGHTANSWER"})
            } 
        }
        else if(type === "matching"){
            setValueMatching(input);
            const numberArray = input.split(",").filter(item => item.trim() !== "").map(item => Number(item)).filter(item => !isNaN(item));
            dispatch({type: "SET_RIGHTANSWER", payload: numberArray});
            if((numberArray.length === 0) && checkErros){
                dispatch({type: "SET_ERROR_RIGHTANSWER"})
            } else if(numberArray.length !== 0){
                dispatch({type: "REMOVE_ERROR_RIGHTANSWER"})
                if(numberArray.length !== answersMatching.length){
                    dispatch({type: "SET_ERROR_MATCHINGERROR"})
                } else if(numberArray.length === answersMatching.length){
                    dispatch({type: "REMOVE_ERROR_MATCHINGERROR"})
                }
            } 	
            
            
            
        } else if(type === "number"){
            setValueNumber(input)
            if(!isNaN(Number(input))){
                const numberArray = [];
                numberArray.push(Number(input))
                dispatch({type: "SET_RIGHTANSWER", payload: numberArray});
            }
            
            if(input.length === 0 && checkErros){
                dispatch({type: "SET_ERROR_RIGHTANSWER"});
            } else {
                dispatch({type: "REMOVE_ERROR_RIGHTANSWER"})
            }
            
        }  
    }


    if(type === "mc"){

        return (
            <div className="grid grid-cols-2 w-[50%] ml-[20%]">
                <div className="self-start flex flex-col w-full justify-center">
                    <label className="text-[0.7rem] dark:text-white">Bitte gebe die Nummer der zu ankreuzenden Option/en ein (z.B: 1,3)</label>
                    <input 
                        type="text"  
                        value={valueMC} 
                        onChange={handleSetAnswer}
                        className={`${basicInputStyles} ${errorStyle} flex-1`}
                        >

                    </input>
                    
                    <div className="ml-[10%]">{errors[index].message && <ErrorMessage >{errors[index].message}</ErrorMessage>}</div> 
                </div>
                <Button disabled={disabled} handleClick={resetLocalState} type="submit" px="px-6" py="py-4" rounded="rounded-full" optionalStyling="min-w-[15%] max-h-[4rem] self-start justify-self-center">{id ? "Frage ändern" : "+ Frage hinzufügen"}</Button>
                
            </div> 
        )
    }

    else if(type === "matching"){

        return(
            <div className="grid grid-cols-2  w-[50%] ml-[20%]">
                <div className="flex flex-col">
                    <label className="text-[0.7rem] dark:text-white">Bitte gebe die richtige Reihenfolge der Optionen ein (z.b 3,1,2,4 bei 4 Optionen)</label>
                    <div className="flex flex-col w-full">
                        <input 
                            type="text" 
                            value={valueMatching} 
                            onChange={handleSetAnswer}
                            className={`${basicInputStyles} ${errorStyle}`}
                            >

                        </input>
                        
                        
                    </div>
                    <div className="ml-[10%]">
                        {errors[index].message && <ErrorMessage>{errors[index].message}</ErrorMessage>} 
                        {errors[indexMatching].message && <ErrorMessage>{errors[indexMatching].message}</ErrorMessage>}
                    </div>
                </div>
                
                <Button disabled={disabled} handleClick={resetLocalState} type="submit" px="px-6" py="py-4" rounded="rounded-full" optionalStyling="min-w-[25%] max-h-[4rem] self-start justify-self-center">{id ? "Frage ändern" : "+ Frage hinzufügen"}</Button>
            </div>
        )
        
    } else if(type === "number"){
        
        return(
            <div className="grid grid-cols-2  w-[50%]">
                <div className="self-start flex flex-col gap-y-2">
                    <label className="text-sm dark:text-white">Bitte gebe die Lösung ein:</label>
                    <input 
                        type="number"
                        step="any" 
                        value={valueNumber} 
                        onChange={handleSetAnswer}
                        className={`${basicInputStyles} ${errorStyle}`} 
                        >
                    </input>
                    <div className="ml-[10%]">{errors[index].message && <ErrorMessage >{errors[index].message}</ErrorMessage>}</div> 
                </div>
                    <Button disabled={disabled} handleClick={resetLocalState} type="submit" px="px-4" py="py-2" rounded="rounded-full" optionalStyling="w-[8rem] h-[4rem] self-center justify-self-center">{id ? "Frage ändern" : "+ Frage hinzufügen"}</Button>
            </div>
        )
    } else {

        return (
            <div className="w-[50%] flex justify-center">
                <Button type="submit" px="px-4" py="py-2" rounded="rounded-full" handleClick={resetLocalState} optionalStyling="max-w-[15%] max-h-[4rem] self-start justify-self-center">{id ? "Frage ändern" : "+ Frage hinzufügen"}</Button>
            </div>
        )
        
    }
}