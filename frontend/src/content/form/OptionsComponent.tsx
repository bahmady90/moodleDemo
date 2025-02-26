import ErrorMessage from "./ErrorMessage";
import Button from "../../Button";

import { basicInputStyles } from "./FormQuestionPage"
import { useFormContext } from "../../context/form-context";
import { ChangeEvent } from "react";



export default function OptionsComponent() {

    const {errors, options, checkErros, dispatch} = useFormContext();

    const index = errors.findIndex((err) => err.type === "list")

    const errorStyle = (errors[index]?.message !== "" && checkErros) ? "border-red-500 focus:border-gray-600": "border-gray-600"

    function handleOptionsChange(e: ChangeEvent<HTMLInputElement>, index: number){
        const value = e.target.value;
        dispatch({type: "SET_QUESTIONOPTIONS", payload: {value, index}});
        const updatedOptions = options.map((option, i) => {
            if(i === index){
                return value
            }
            else {
                return option
            }
        })
        const isEmpty = updatedOptions.some((option) => option.length === 0)
        if(isEmpty){
            dispatch({type: "SET_ERROR_OPTIONS"})
        } else {
            dispatch({type: "REMOVE_ERROR_OPTIONS"})
        }
        
    } 
    

    return (

        <div className="grid gap-y-4 min-w-full">
            <ul className="flex flex-col gap-y-4 min-w-full">
            {options.map((option, index)  =>
                <div className="flex gap-x-3 min-w-full" key={index}>
                    <label className="text-sm dark:text-white">Option {index + 1}: </label>
                    <input  value={option} onChange={(e) => handleOptionsChange(e, index)} className={`${basicInputStyles} ${errorStyle} flex-1`}></input>   
                  <Button
                    type="button" 
                    px="px-3" 
                    py="py-1" 
                    rounded="rounded-full"
                    handleClick={() => dispatch({type: "DELETE_OPTION", payload: index})}
                    >&times;</Button>
                </div>
            )}
            </ul>
            {errors[index].message && <ErrorMessage>{errors[index].message}</ErrorMessage>}
            <Button type="button" px="px-3" py="py-2" rounded="rounded-full" optionalStyling="justify-self-center max-w-[11rem] " handleClick={() => dispatch({type: "ADD_OPTION"})}>+ Option Einfügen</Button>
        </div>  
    )
}