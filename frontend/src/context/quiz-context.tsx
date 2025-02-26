import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";

/* {
    "rewrites": [
      { "source": "/(.*)", "destination": "/" }
    ]
} */


/* export const BASE_URL = "http://localhost:3000"; */

export const BASE_URL = "https://moodle-demo-backend.vercel.app";

export type Answer = {
    answer: string,
    checked?: boolean
    number?: null | number | string,
    text?: string
}

export type Answers = Array<Answer>;


export type Solution = string;



export type Question = {
    image?: string,
    question: string,
    type: string,
    list: Array<string>
}

export type RightAnswers = Array<number>;

export type Row = {
    answers: Answers,
    created_at: string,
    id: number,
    question: Question,
    rightAnswers: RightAnswers,
    type: string,
    lf: number
}

export type Rows = Array<Row>;

export type Action = 

    {type: "GET_DATA", payload: Rows} |
    {type: "SET_LOADING_TRUE"} |
    {type: "SET_LOADING_FALSE"} |
    {type: "SET_LOADING_AI_TRUE"} |
    {type: "SET_LOADING_AI_FALSE"} |
    {type: "SET_ERROR", payload: string} |
    {type: "INCREMENT_QUESTIONNUMBER"} |
    {type: "DECREMENT_QUESTIONNUMBER"} |
    {type: "SET_QUESTIONNUMBER", payload: number} |
    {type: "SET_ANSWER_CHECKED", payload: number} |
    {type: "SET_ANSWER_MATCH", payload: {number: number | string, indexPayload: number}} |
    {type: "SET_ANSWER_NUMBER", payload: number | string} |
    {type: "SET_ANSWER_TEXT", payload: string} |
    {type: "SET_MODAL_CLOSE"} |
    {type: "SET_MODAL_OPEN"} |
    {type: "PUSH_SCOREARRAY", payload: {score: number, key: number, explanation?: string }} |
    {type: "UPDATE_SCOREARRAY", payload: {score: number, key: number, explanation?: string }} |
    {type: "SUBMIT_QUIZ"} |
    {type: "RESET_QUIZ"} 
    
    
export type Score = {
    score: number,
    key: number,
    explanation?: string
}

export type Quizstate = {
    data: Rows | null,
    loading: null | boolean,
    loadingAi: null | boolean
    error: null | string,
    questionNumber: number,
    openModal: boolean,
    scoredArray: Array<Score>,
    isSubmitted: boolean,
}

export type QuizContextProviderProps = {
    children: ReactNode
}

export type QuizContextValue = Quizstate & {dispatch: Dispatch<Action>}


const initialState : Quizstate= {
    data: null,
    loading: null,
    loadingAi: null,
    error: null,
    questionNumber: 0,
    openModal: false,
    scoredArray: [],
    isSubmitted: false,
}

const QuizContext = createContext<QuizContextValue | null>(null);

function quizReducer(state: Quizstate, action: Action): Quizstate {

    switch(action.type){
        case "GET_DATA":
            return {
                ...state,
                data: action.payload
            }
        case "SET_LOADING_AI_FALSE":
            return {
                ...state,
                loadingAi: false
            }
        case "SET_LOADING_AI_TRUE":
            return {
                ...state,
                loadingAi: true
            }
        case "SET_LOADING_FALSE":
            return {
                ...state,
                loading: false
            }
        case "SET_LOADING_TRUE":
            return {
                ...state,
                loading: true
            }
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload
            }
        case "INCREMENT_QUESTIONNUMBER":
            return {
                ...state,
                questionNumber: state.questionNumber !== state.data!.length - 1 ? state.questionNumber + 1 : state.questionNumber
            }
        case "DECREMENT_QUESTIONNUMBER":
            return {
                ...state,
                questionNumber: state.questionNumber !== 0 ? state.questionNumber - 1 : state.questionNumber
            }
        case "SET_QUESTIONNUMBER":
            return {
                ...state,
                questionNumber: action.payload
            }
        case "SET_ANSWER_CHECKED":
            return {
                ...state,
                data: state.data!.map((row, index) => {
                    if(state.questionNumber === index){
                        return {
                            ...row,
                            answers: row.answers.map((answer, index) => {
                                if(index === action.payload){
                                    return {
                                        ...answer,
                                        checked: !answer.checked
                                    }
                                }
                                else {
                                    return answer;
                                }
                            })
                        }
                    }
                    else {
                        return row
                    }
                })  
            }
        case "SET_ANSWER_MATCH": {
            const {indexPayload, number} = action.payload;
            return {
                ...state,
                data: state.data!.map((row, rowIndex) => {
                    if(state.questionNumber === rowIndex){
                        return {
                            ...row,
                            answers: row.answers.map((answer, answerIndex) => {
                                if(indexPayload === answerIndex){
                                    return {
                                        ...answer,
                                        number: number
                                    }
                                } else {
                                    return answer
                                }
                            })
                        }
                    }
                    else {
                        return row;
                    }
                })
            }
            }
        case "SET_ANSWER_NUMBER":
            return {
                ...state,
                data: state.data!.map((row, rowIndex) => {
                    if(state.questionNumber === rowIndex){
                        return {
                            ...row,
                            answers: {...row.answers, number: action.payload}
                        }
                    } else {
                        return row
                    }
                })
            }
        case "SET_ANSWER_TEXT":
            return {
                ...state,
                data: state.data!.map((row, rowIndex) => {
                    if(state.questionNumber === rowIndex){
                        return {
                            ...row,
                            answers: {
                                ...row.answers,
                                text: action.payload
                            }    
                        }
                    } else {
                        return row
                    }
                })
            }
        
        case "SET_MODAL_CLOSE":
            return {
                ...state,
                openModal: false
            }
        case "SET_MODAL_OPEN":
            return {
                ...state,
                openModal: true
            }
        case "PUSH_SCOREARRAY":
            return {
                ...state,
                scoredArray: [...state.scoredArray, action.payload]
            }
        case "UPDATE_SCOREARRAY":{
            const {score, key, explanation} = action.payload;
            return {
                ...state,
                scoredArray: state.scoredArray.map((el) => {
                    if(el.key === key){
                        return {
                            ...el,
                            score: score,
                            key: key,
                            explanation: explanation
                        }
                    } else {
                        return el;
                    }
                })

            }
        }
        case "SUBMIT_QUIZ":
            return {
                ...state,
                isSubmitted: true

            }
        case "RESET_QUIZ":
            return initialState
        
        
            
        default: return state;
    }
}




export default function QuizContextProvider({children} : QuizContextProviderProps){

    const [{data, loading, error, questionNumber, openModal, scoredArray, isSubmitted, loadingAi}, dispatch] = useReducer(quizReducer, initialState);


    const context : QuizContextValue = {
        error,
        loading,
        loadingAi,
        data,
        questionNumber,
        openModal,
        scoredArray,
        isSubmitted,
        dispatch
    }
    

    return (
        <QuizContext.Provider value={context}>
            {children}
        </QuizContext.Provider>
    )

}

export function useQuizContext(){

    const context = useContext(QuizContext);
    if(context === undefined){
        throw new Error("QuizContext was outside the Quizprovider");
    }
    if(context === null){
        throw new Error("Something went wrong");
    }
    return context;
}
