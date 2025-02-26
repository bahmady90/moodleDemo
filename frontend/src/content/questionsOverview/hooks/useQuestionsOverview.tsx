import { useParams } from "react-router-dom";
import { useFormContext } from "../../../context/form-context";
import { BASE_URL } from "../../../context/quiz-context";


export default function useQuestionsOverview(){

    const {dispatch} = useFormContext();

    const { lf } = useParams(); 

    const lfNumber = lf ? Number(lf[1]) : 1;

    async function getQuestions() {
        dispatch({ type: "SET_LOADING_TRUE", payload: "Lade fragen..."});
        try {
            const res = await fetch(`${BASE_URL}/${lfNumber}/allQuestions`);
            if (!res.ok) {
                dispatch({type: "SET_FETCHERROR", payload: "Network response was not ok"});
                return; // stop execution
            }
            const data = await res.json();
            dispatch({ type: "GET_QUESTIONS", payload: data });
        } catch (error) {
            if (error instanceof Error) {
                // Use error.message only if error is an instance of Error
                dispatch({type: "SET_FETCHERROR", payload: error.message});
            } else {
                // Fallback for unknown error shapes
                dispatch({type: "SET_FETCHERROR", payload: "Ein nicht identifizierter fehler ist aufgetreten"});
            }
        } finally {
            dispatch({ type: "SET_LOADING_FALSE" });
        }
    }

    


    return {
        getQuestions
    }
}