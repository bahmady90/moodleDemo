import { ChangeEvent} from "react"
import { basicInputStyles } from "./FormQuestionPage"
import Button from "../../Button"
import { useFormContext } from "../../context/form-context"
import ErrorMessage from "./ErrorMessage";




export default function Answers(){

    const {errors, type, checkErros, answersMC, answersMatching, answerNumber,  answerText, dispatch} = useFormContext();

    const indexMC = errors.findIndex((err) => err.type === "optionsMc")
    const indexMatching = errors.findIndex((err) => err.type === "optionsMatching")
    const indexNumber = errors.findIndex((err) => err.type === "answerNumber")
    const indexText = errors.findIndex((err) => err.type === "answerText")
        
    const errorStyle = (type === "mc" && ((errors[indexMC]?.message !== "" && checkErros) ? "border-red-500 focus:border-red-600": "border-gray-300 focus:border-gray-light")) ||
                        (type === "matching" && ((errors[indexMatching]?.message !== "" && checkErros) ? "border-red-500 focus:border-red-600": "border-gray-300 focus:border-gray-light")) ||
                        (type === "number" && ((errors[indexNumber]?.message !== "" && checkErros) ? "border-red-500 focus:border-red-600": "border-gray-300 focus:border-gray-light")) ||
                        (type === "text" && ((errors[indexText]?.message !== "" && checkErros) ? "border-red-500 focus:border-red-600": "border-gray-300 focus:border-gray-light"))


    function setMcOrMatching(e : ChangeEvent<HTMLInputElement>, index: number){
        const value = e.target.value
        if(type === "mc"){
            dispatch({type: "SET_ANSWERMC", payload: {value, index}})
            const updatedAnswers = answersMC.map((answer, i) => {
                if(i === index){
                    return {...answer, answer : value}
                }
                else {
                    return answer
                }
            })
            const isEmpty = updatedAnswers.some((answer) => answer.answer.length === 0)
            if(isEmpty){
                dispatch({type: "SET_ERROR_OPTIONS_MC"})
            } else {
                dispatch({type: "REMOVE_ERROR_OPTIONS_MC"})
            } 
        }
        else {
        dispatch({type: "SET_ANSWERMATCHING", payload: {value, index}})
        const updatedAnswers = answersMatching.map((answer, i) => {
            if(i === index){
                return {...answer, answer : value}
            }
            else {
                return answer
            }
        })
        const isEmpty = updatedAnswers.some((answer) => answer.answer.length === 0)
        if(isEmpty){
            dispatch({type: "SET_ERROR_OPTIONS_MATCHING"})
        } else {
            dispatch({type: "REMOVE_ERROR_OPTIONS_MATCHING"})
        } 
    }
        
    }

    function handleDelete(index: number){
        if(type === "mc"){
            dispatch({type: "DELETE_MC_OPTION", payload: index})
        } else {
            dispatch({type: "DELETE_MATCHING_OPTION", payload: index})
        }

    }

    function handleAddOption(){
        if(type === "mc"){
            dispatch({type: "ADD_OPTION_MC"})
        } else {
            dispatch({type: "ADD_OPTION_MATCHING"})
        }
    }

    function setAnswerNumber(e : ChangeEvent<HTMLInputElement>){
        const value = e.target.value;
        dispatch({type: "SET_ANSWER_NUMBER", payload: value})
        if(answerNumber.answer.length === 0 && checkErros){
            dispatch({type: "SET_ERROR_NUMBER"})
        } else {
            dispatch({type: "REMOVE_ERROR_NUMBER"})
        }

    }

    function setAnswerText(e : ChangeEvent<HTMLInputElement>){
        const value = e.target.value;
        dispatch({type: "SET_RIGHTANSWER_TEXT", payload: value})
        if(answerText.answer.length === 0 && checkErros){
            dispatch({type: "SET_ERROR_TEXT"})
        } else {
            dispatch({type: "REMOVE_ERROR_TEXT"})
        }
    }

    const arrayToMap = type == "mc" ? answersMC : answersMatching



    if(type === "mc" || type === "matching"){

        return (
            <div className="grid gap-y-4 w-[50%]">
            <ul className="flex flex-col gap-y-4">
            {arrayToMap?.map((option, index)  =>
                <div className="flex gap-x-3" key={index}>
                    <label className="text-sm dark:text-white">Antwortsoption {index + 1}: </label>
                    <input  value={option.answer} onChange={(e) => setMcOrMatching(e, index)} className={`${basicInputStyles} ${errorStyle} flex-1`}></input>
                    <Button
                        type="button" 
                        px="px-3" 
                        py="py-1" 
                        rounded="rounded-full"
                        handleClick={() => handleDelete(index)}
                        >&times;</Button>
                </div>
            )}
            </ul>
            {type === "mc" ? ((errors[indexMC].message && checkErros) && <ErrorMessage>{errors[indexMC].message}</ErrorMessage>) : ((errors[indexMatching].message && checkErros) && <ErrorMessage>{errors[indexMatching].message}</ErrorMessage>) }
            <Button type="button" px="px-3" py="py-2" rounded="rounded-full" optionalStyling="max-w-[11rem] justify-self-center" handleClick={handleAddOption}>+ Option Einfügen</Button>
            </div>
        )
    }

    else if(type === "number"){
        return (
            <div className="grid w-[50%]">
                <div className="flex flex-col gap-y-4">
                <label className="text-sm dark:text-white">Bezeichnung des Ergebnisses</label>
                <input 
                    value={answerNumber?.answer} 
                    className={`${basicInputStyles} ${errorStyle}`}
                    onChange={(e) => setAnswerNumber(e)}
                    ></input>
                </div>
                {errors[indexNumber].message && <ErrorMessage>{errors[indexNumber].message}</ErrorMessage>} 
            </div>
        )
        
        
    }

    else{
        return (
            <div className="grid w-[50%]">
                <div className="flex flex-col">
                <label className="text-sm dark:text-white">Richtige Antwort:</label>
                <input 
                    value={answerText?.answer} 
                    className={`${basicInputStyles} ${errorStyle}`}
                    onChange={(e) => setAnswerText(e)}
                    ></input>
                </div>
                {errors[indexText].message && <ErrorMessage>{errors[indexText].message}</ErrorMessage>} 
            </div>
        )
        
        
    }
    

}