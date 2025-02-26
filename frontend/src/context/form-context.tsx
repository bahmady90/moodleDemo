import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";
import { AnswerNumber, AnswersMatching, AnswersMC, AnswerText, ErrorType, RightAnswers, Row } from "../types";



export type Action = 

    {type: "SET_ERROR_QUESTION"} |
    {type: "REMOVE_ERROR_QUESTION"} |
    {type: "SET_ERROR_IMAGEURL"} |
    {type: "REMOVE_ERROR_IMAGEURL"} |
    {type: "SET_ERROR_OPTIONS"} |
    {type: "REMOVE_ERROR_OPTIONS"} |
    {type: "SET_ERROR_OPTIONS_MC"} |
    {type: "REMOVE_ERROR_OPTIONS_MC"} |
    {type: "SET_ERROR_OPTIONS_MATCHING"} |
    {type: "REMOVE_ERROR_OPTIONS_MATCHING"} |
    {type: "SET_ERROR_NUMBER"} |
    {type: "REMOVE_ERROR_NUMBER"} |
    {type: "SET_ERROR_TEXT"} |
    {type: "REMOVE_ERROR_TEXT"} |
    {type: "SET_ERROR_RIGHTANSWER"} |
    {type: "REMOVE_ERROR_RIGHTANSWER"} |
    {type: "SET_ERROR_MATCHINGERROR"} |
    {type: "REMOVE_ERROR_MATCHINGERROR"} |
    {type: "SET_CHECKERRORS_TRUE"} |
    {type: "SET_CHECKERRORS_FALSE"} |
    {type: "SET_FETCHERROR", payload: string} |
    {type: "SET_LOADING_TRUE", payload: string} |
    {type: "SET_LOADING_FALSE"} |


    {type: "GET_QUESTIONS", payload: Array<Row>} |
    {type: "SET_QUESTION", payload: Row} |
    {type: "CHANGE_INITIALVALUE_FORM", payload: Row} |
    {type: "SET_OPENMODALADMINLOGIN"} |
    {type: "SET_ADMINKEY", payload: string} |
    {type: "SET_ISADMIN", payload: boolean} |
    
    





    {type: "SET_TYPE", payload: string} |
    {type: "SET_QUESTIONTYPE", payload: string} |
    {type: "SET_QUESTIONTEXT", payload: string} |
    {type: "SET_IMAGEURL", payload: string} |
    {type: "SET_QUESTIONOPTIONS", payload: {value: string, index: number}} |
    {type: "DELETE_OPTION", payload: number} |
    {type: "ADD_OPTION"} |
    {type: "SET_ANSWERMC", payload: {value: string, index: number}} |
    {type: "SET_ANSWERMATCHING", payload: {value: string, index: number}} |
    {type: "DELETE_MC_OPTION", payload: number} |
    {type: "DELETE_MATCHING_OPTION", payload: number} |
    {type: "ADD_OPTION_MC"} |
    {type: "ADD_OPTION_MATCHING"} |
    {type: "SET_ANSWER_NUMBER", payload: string} |
    {type: "SET_RIGHTANSWER_TEXT", payload: string} |
    {type: "SET_RIGHTANSWER", payload: Array<number>} |
    {type: "SET_LF", payload: string} |
    {type: "RESET_FORMSTATE"} |
    {type: "SET_APIONE", payload: string} |
    {type: "SET_THEMA", payload: string}



    
    

export type FormState = {
    fetchError: null | false | string,
    loading: null | false | string,
    questions: Array<Row>,
    question: Row | null,
    errors: Array<ErrorType>,
    checkErros: boolean
    type: string,
    questionType: string,
    questionText: string
    options: Array<string>
    imageURL: string,
    answersMC: AnswersMC,
    answersMatching: AnswersMatching,
    answerNumber: AnswerNumber,
    answerText: AnswerText,
    rightAnswers: RightAnswers,
    id: number | null,
    lf: number | null,
    openModalAdminLogin: boolean,
    adminKey: string,
    isAdmin: boolean,
    apOne: boolean,
    thema: string

    


}

export type FormContextProviderProps = {
    children: ReactNode
}

export type FormContextValue = FormState & {dispatch: Dispatch<Action>}


const initialState : FormState= {
    fetchError: null,
    loading: null,
    questions: [],
    question: null,
    errors: [
        { message: "", type: "question" },
        { message: "", type: "list" },
        { message: "", type: "url" },
        { message: "", type: "optionsMc" },
        { message: "", type: "optionsMatching" },
        { message: "", type: "answerNumber" },
        { message: "", type: "answerText" },
        { message: "", type: "rightAnswer" },
        { message: "", type: "matchingError"},
    ],
    type: "mc",
    questionType: "text",
    questionText: "",
    options: ["", "", ""],
    imageURL: "",
    answersMC:   [{answer: "", checked: false}, {answer: "", checked: false}, {answer: "", checked: false}, {answer: "", checked: false}],
    answersMatching: [{answer: "", number: null}, {answer: "", number: null}, {answer: "", number: null}, {answer: "", number: null}],
    answerNumber: {answer: "", number: null},
    answerText: {answer: "", text: ""},
    rightAnswers: [],
    checkErros: false,
    id: null,
    lf: null,
    openModalAdminLogin: localStorage.getItem("isAdmin") === "true" ? false : true ,
    adminKey: "",
    isAdmin: localStorage.getItem("isAdmin") === "true" ? true : false,
    apOne: false,
    thema: "" 
    


}



const FormContext = createContext<FormContextValue | null>(null);

function formReducer(state: FormState, action: Action): FormState {

    function errorDispatchFunction( errorType: string, errorMessage: string) : FormState{
        return {
            ...state,
            errors: state.errors.map((error: ErrorType ) => {
                if(error.type === errorType){
                    return {
                        ...error,
                        message: errorMessage
                    }
                } else {
                    return error
                }
            })
        }
    }

    switch(action.type){

        case "SET_ERROR_QUESTION":{
            const returnState = errorDispatchFunction("question", "Die Frage fehlt")
            return returnState    
        }
        case "REMOVE_ERROR_QUESTION":{
            const returnState = errorDispatchFunction("question", "")
            return returnState    
        }
            
        case "SET_ERROR_IMAGEURL":{
            const returnState = errorDispatchFunction("url", "Die URL zum Bild fehlt")
            return returnState    
        }
        case "REMOVE_ERROR_IMAGEURL":{
            const returnState = errorDispatchFunction("url", "")
            return returnState    
        }
        case "SET_ERROR_OPTIONS":{
            const returnState = errorDispatchFunction("list", "mindestens einer der Optionen beim Fragetyp list ist leer")
            return returnState    
        }
        case "REMOVE_ERROR_OPTIONS":{
            const returnState = errorDispatchFunction("list", "")
            return returnState    
        }
        
        case "SET_ERROR_OPTIONS_MC":{
            const returnState = errorDispatchFunction("optionsMc", "mindestens einer der Antwortoptionen ist leer")
            return returnState    
        }
        case "REMOVE_ERROR_OPTIONS_MC":{
            const returnState = errorDispatchFunction("optionsMc", "")
            return returnState    
        }
        case "SET_ERROR_OPTIONS_MATCHING":{
            const returnState = errorDispatchFunction("optionsMatching", "mindestens einer der Antwortoptionen ist leer")
            return returnState    
        }
        case "REMOVE_ERROR_OPTIONS_MATCHING":{
            const returnState = errorDispatchFunction("optionsMatching", "")
            return returnState    
        }
        case "SET_ERROR_NUMBER":{
            const returnState = errorDispatchFunction("answerNumber", "Die Antwort für den Fragentyp Nummer fehlt")
            return returnState    
        }
        case "REMOVE_ERROR_NUMBER":{
            const returnState = errorDispatchFunction("answerNumber", "")
            return returnState    
        }
        case "SET_ERROR_TEXT":{
            const returnState = errorDispatchFunction("answerText", "Die richtige Antwort beim Fragetyp Text fehlt")
            return returnState    
        }
        case "REMOVE_ERROR_TEXT":{
            const returnState = errorDispatchFunction("answerText", "")
            return returnState    
        }
        case "SET_ERROR_RIGHTANSWER":{
            const returnState = errorDispatchFunction("rightAnswer", "Bitte gebe die richtige Lösung/en ein")
            return returnState    
        }
        case "REMOVE_ERROR_RIGHTANSWER":{
            const returnState = errorDispatchFunction("rightAnswer", "")
            return returnState    
        }
        case "SET_ERROR_MATCHINGERROR":{
            const returnState = errorDispatchFunction("matchingError", "Anzahl der richtigen Antworten stimmt nicht mit der Anzahl der Antworten überein!")
            return returnState 
        }
        case "REMOVE_ERROR_MATCHINGERROR":{
            const returnState = errorDispatchFunction("matchingError", "")
            return returnState 
        }
        case "SET_CHECKERRORS_TRUE":
            return {
                ...state,
                checkErros: true
            }
        case "SET_CHECKERRORS_FALSE":
            return {
                ...state,
                checkErros: false
            }
        case "SET_LOADING_TRUE":
            return {
                ...state,
                loading: action.payload
            }
        case "SET_LOADING_FALSE":
            return {
                ...state,
                loading: false
            }
        case "SET_FETCHERROR":
            return {
                ...state,
                fetchError: action.payload
            }


        
        case "SET_TYPE":
            return {
                ...state,
                type: action.payload
            }
        case "SET_QUESTIONTYPE":
            return {
                ...state,
                questionType: action.payload
            }
        case "SET_QUESTIONTEXT":
            return {
                ...state,
                questionText: action.payload
            }
        case "SET_IMAGEURL":
            return {
                ...state,
                imageURL: action.payload
            }
        case "SET_QUESTIONOPTIONS":{
            const {value, index} = action.payload
            return {
                ...state,
                options: state.options.map((option, indexOption) => {
                    if(index === indexOption){
                        return value;
                    }
                    else {
                        return option
                    }
                })
            }
        }
        case "DELETE_OPTION":
            return {
                ...state,
                options: state.options.filter((option, index) => {
                    console.log(option)
                    return index !== action.payload
                })
            }
        case "ADD_OPTION": 
            return {
                ...state,
                options: [...state.options, ""]
            }
        case "SET_ANSWERMC":
            {
                const {value, index} = action.payload;
                return {
                    ...state,
                    answersMC: state.answersMC.map((option, indexOption) => {
                        if(index === indexOption){
                            return {
                                ...option,
                                answer: value
                            }
                        } else {
                            return option
                        }
                    })
                }
            }
        case "SET_ANSWERMATCHING":
            {
                const {value, index} = action.payload;
                return {
                    ...state,
                    answersMatching: state.answersMatching.map((option, indexOption) => {
                        if(index === indexOption){
                            return {
                                ...option,
                                answer: value
                            }
                        } else {
                            return option
                        }
                    })
                }
            }
        case "DELETE_MC_OPTION":
            return {
                ...state,
                answersMC: state.answersMC.filter((answer, index) => {
                    console.log(answer)
                    return index !== action.payload
                })
            }
        case "DELETE_MATCHING_OPTION":
            return {
                ...state,
                answersMatching: state.answersMatching.filter((answer, index) => {
                    console.log(answer)
                    return index !== action.payload
                })
            }
        case "ADD_OPTION_MC":
            return {
                ...state,
                answersMC: [...state.answersMC, {answer: "", checked: false}]
            }
        case "ADD_OPTION_MATCHING":
            return {
                ...state,
                answersMatching: [...state.answersMatching, {answer: "", number: null}]
            }  
        case "SET_ANSWER_NUMBER":
            return {
                ...state,
                answerNumber: {...state.answerNumber, answer: action.payload}
            }
        case "SET_RIGHTANSWER_TEXT":
            return {
                ...state,
                answerText: {...state.answerText, answer: action.payload}
            }
        case "SET_RIGHTANSWER":
            return {
                ...state,
                rightAnswers:  [...action.payload]
            }
            
        case "RESET_FORMSTATE":
            return initialState

        
        case "GET_QUESTIONS":
            return {
                ...state,
                questions: action.payload
            }
        
        case "SET_QUESTION":
            return {
                ...state,
                question: action.payload
            }
        
        case "SET_LF":
            return {
                ...state,
                lf: Number(action.payload)
            }
        
        case "CHANGE_INITIALVALUE_FORM":{
            const {lf, type, question, id, rightAnswers, answers, apOne, thema } = action.payload;
            return {
                ...state,
                type: type,
                questionType: question.type,
                questionText: question.question,
                options: question.list ? question.list : ["", "", ""],
                imageURL: question.image? question.image : "",
                answersMC:   type === "mc" ? answers as AnswersMC :  [{answer: "", checked: false}, {answer: "", checked: false}, {answer: "", checked: false}, {answer: "", checked: false}],
                answersMatching: type === "matching" ? answers as AnswersMatching :[{answer: "", number: null}, {answer: "", number: null}, {answer: "", number: null}, {answer: "", number: null}],
                answerNumber: type === "number" ? answers as AnswerNumber : {answer: "", number: null},
                answerText: type === "text" ? answers as AnswerText : {answer: "", text: ""},
                rightAnswers: rightAnswers ? rightAnswers : [],
                id: id ? id : null,
                lf: lf,
                apOne: apOne,
                thema: thema


            }
        }

        case "SET_OPENMODALADMINLOGIN":
            return {
                ...state,
                openModalAdminLogin: !state.openModalAdminLogin
            }
        case "SET_ADMINKEY":
            return {
                ...state,
                adminKey: action.payload
            }
        case "SET_ISADMIN":
            return {
                ...state,
                isAdmin: action.payload
            }
        case "SET_APIONE":
            {
                const boolean = action.payload === "true" ? true : false
                return {
                    ...state,
                    apOne: boolean
                }
            }
            
        case "SET_THEMA":
            return {
                ...state,
                thema: action.payload
            }
            
        
            
        default: {
            console.log("wrong actiontype");
            return state
        };
    }
}


export default function FormContextProvider({children} : FormContextProviderProps){

    const [{questions, question, errors, type, questionType, 
        questionText, options, imageURL, answersMC, answersMatching, answerNumber, answerText, 
        rightAnswers, checkErros, loading, fetchError, id, openModalAdminLogin, lf, adminKey, isAdmin, apOne, thema}, dispatch] = useReducer(formReducer, initialState);

    


    const context : FormContextValue = {
        fetchError,
        loading,
        questions,
        question,
        errors,
        type,
        questionType,
        questionText,
        options,
        imageURL,
        answersMC,
        answersMatching,
        answerNumber,
        answerText,
        rightAnswers,
        checkErros,
        id,
        lf,
        openModalAdminLogin,
        adminKey,
        isAdmin,
        apOne,
        thema,
        dispatch
    }

    
    

    return (
        <FormContext.Provider value={context}>
            {children}
        </FormContext.Provider>
    )

}

export function useFormContext(){

    const context = useContext(FormContext);
    if(context === undefined){
        throw new Error("FormContext was outside the Formcontextprovider");
    }
    if(context === null){
        throw new Error("Something went wrong");
    }
    return context;
}