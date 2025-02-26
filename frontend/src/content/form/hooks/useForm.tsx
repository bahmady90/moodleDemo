import useQuestionsOverview from "../../questionsOverview/hooks/useQuestionsOverview";
import toast from 'react-hot-toast';


import { useParams } from "react-router-dom";
import { useFormContext } from "../../../context/form-context";
import { BASE_URL } from "../../../context/quiz-context";
import { Question, Row } from "../../../types";
import { FormEvent, useState } from "react";


export function useForm(){

    const {getQuestions} = useQuestionsOverview();

    const {imageURL, answerText, questionType, questionText, type, options, answersMC, answersMatching, answerNumber, rightAnswers, id, lf: lernFeld, thema, apOne, dispatch} = useFormContext();

    const { lf } = useParams(); 

    const lfNumber = Number(lf![1]);

    const [valueMC, setValueMC] = useState(rightAnswers? rightAnswers.toString() : "");
    const [valueMatching, setValueMatching] = useState(rightAnswers? rightAnswers.toString(): "");
    const [valueNumber, setValueNumber] = useState(rightAnswers? rightAnswers.toString(): "");

    

    function resetLocalState(){
        setValueMC("");
        setValueMatching("");
        setValueNumber("");
    }

    

    function checkErrors(){

        let isError = false;

        if(questionText.length === 0){
            isError = true;
            dispatch({type: "SET_ERROR_QUESTION"})
        }
        if(questionType === "image"){
            if(imageURL.length === 0){
                isError = true;
                dispatch({type: "SET_ERROR_IMAGEURL"});
            }
        } else if(questionType === "list"){
            options.forEach((option) => {
                if(option.length === 0){
                    isError = true;
                    dispatch({type: "SET_ERROR_OPTIONS"})
                }
            })
        }
        if(type === "mc"){
            answersMC.forEach((answer) => {
                if(answer.answer.length === 0){
                    isError = true;
                    dispatch({type: "SET_ERROR_OPTIONS_MC"})
                }
            })
        } else if(type === "matching"){
            answersMatching.forEach((answer) => {
                if(answer.answer.length === 0){
                    isError = true;
                    dispatch({type: "SET_ERROR_OPTIONS_MATCHING"})
                }
            })
            if(answersMatching.length !== rightAnswers.length){
                isError = true;
                dispatch({type: "SET_ERROR_MATCHINGERROR"})
            }
        } else if(type === "number"){
            if(answerNumber.answer.length === 0){
                isError = true;
                dispatch({type: "SET_ERROR_NUMBER"})
            }
        } else if(type === "text"){
            if(answerText.answer.length === 0){
                isError = true;
                dispatch({type: "SET_ERROR_TEXT"})
            }
        }
        if(type !== "text"){
            if((Array.isArray(rightAnswers) && rightAnswers.length === 0)){
                isError = true;
                dispatch({type: "SET_ERROR_RIGHTANSWER"})
            }
        }
        
        return isError
    
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        dispatch({type: "SET_CHECKERRORS_TRUE"})
        const isError = checkErrors();
        if(!isError){
            submitQuestion()
        }
        
    }

    function handleUpdate(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        dispatch({type: "SET_CHECKERRORS_TRUE"})
        const isError = checkErrors();
        if(!isError){
            updateQuestion()
        }
    }

    async function submitQuestion(){

        const question: Question =
        questionType === "list"
        ? { type: questionType, question: questionText, list: options }
        : questionType === "image"
        ? { type: questionType, question: questionText, image: imageURL }
        : questionType === "text"
        ? { type: questionType, question: questionText }
        : { type: "", question: "" }; 


        const fullQuestion : Row  = type === "mc" ? { lf: lfNumber, type,  question, answers: answersMC, rightAnswers, thema: thema, apOne: apOne} :
                                    type === "matching" ?  {lf: lfNumber, type,  question, answers: answersMatching, rightAnswers, thema: thema, apOne: apOne} :
                                    type === "text" ? {lf: lfNumber, type, question, answers: answerText, rightAnswers: [0], thema: thema, apOne: apOne } :
                                    type === "number" ? {lf: lfNumber, type, question, answers: answerNumber, rightAnswers, thema: thema, apOne: apOne} : {
                                        lf: lfNumber, question, type: "", rightAnswers: rightAnswers, thema: thema, apOne: apOne
                                    }
        dispatch({type: "SET_LOADING_TRUE", payload: "Frage wird hinzugefügt..."})
        try{
            const res = await fetch(`${BASE_URL}/questions`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', 
                },
                body:JSON.stringify(fullQuestion)
            })
            const data = await res.json(); 
            if (!res.ok) {
                console.error("Error:", data.message);
                dispatch({
                  type: "SET_FETCHERROR",
                  payload: data.message || "Unknown error occurred",
                });
                toast.error("Ein Fehler ist aufgetreten: " + (data.message || "Unknown error"));
                return; 
              }
              toast.success("Frage wurde erfolgreich hinzugefügt!");
        } catch(error){
            console.log(error)
        } finally{
            dispatch({type: "SET_LOADING_FALSE"})
            dispatch({type: "RESET_FORMSTATE"})
        }
        
    }

    async function updateQuestion(){

        const question: Question =
        questionType === "list"
        ? { type: questionType, question: questionText, list: options }
        : questionType === "image"
        ? { type: questionType, question: questionText, image: imageURL }
        : questionType === "text"
        ? { type: questionType, question: questionText }
        : { type: "", question: "" }; 


        const fullQuestion : Row  = type === "mc" ? { id: id as number , lf: lernFeld as number, type,  question, answers: answersMC, rightAnswers, thema: thema, apOne: apOne} :
                                    type === "matching" ?  {id: id as number, lf: lernFeld as number, type,  question, answers: answersMatching, rightAnswers, thema: thema, apOne: apOne} :
                                    type === "text" ? {id: id as number , lf: lernFeld as number, type, question, answers: answerText, rightAnswers: [0], thema: thema, apOne: apOne } :
                                    type === "number" ? {id: id as number , lf: lernFeld as number, type, question, answers: answerNumber, rightAnswers, thema: thema, apOne: apOne} : {
                                        id: id as number , lf: lernFeld as number, question, type: "", rightAnswers: rightAnswers, thema: thema, apOne: apOne
                                    }
        
        dispatch({type: "SET_LOADING_TRUE", payload: "Frage wird geändert..."})
        try{
            const res = await fetch(`${BASE_URL}/questions`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json', 
                },
                body:JSON.stringify(fullQuestion)
            })
            const data = await res.json(); 
            if (!res.ok) {
                console.error("Error:", data.message);
                dispatch({
                  type: "SET_FETCHERROR",
                  payload: data.message || "Unknown error occurred",
                });
                toast.error("Ein Fehler ist aufgetreten: " + (data.message || "Unknown error"));
                return; 
              }
              toast.success("Frage wurde erfolgreich geändert!");
        } catch(error){
            console.log(error)
        } finally{
            dispatch({type: "SET_LOADING_FALSE"})
            dispatch({type: "RESET_FORMSTATE"})
        }

    }

    async function handleDelete(id: number){
        try{
            const result = await fetch(`${BASE_URL}/${id}/questions`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json', 
                },
            })
            const data = await result.json();
            if (!result.ok) {
                console.error("Error:", data.message);
                toast.error("Ein Fehler ist aufgetreten: " + (data.message || "Unknown error"));
                return; 
              }
            let test = false;
            await getQuestions();
            test = true;
            if(test){
                toast.success("Frage wurde erfolgreich gelöscht!");
            }
               
        }
        
         catch(error){
            console.log(error)
            toast.error("Ein Fehler ist aufgetreten: " + (error || "Unknown error"));
        } 
    }
   





    return {
        checkErrors, submitQuestion, handleSubmit, handleUpdate, handleDelete, valueMC, setValueMC, valueMatching, setValueMatching, valueNumber, setValueNumber, resetLocalState
    }

    
}