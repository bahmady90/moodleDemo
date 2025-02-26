import { Dispatch } from "react"
import { Action, BASE_URL } from "./context/quiz-context"

export function getQuizTitle(num: number){
    switch(num){
        case 1:
            return "Das Unternehmen und die eigene Rolle im Betrieb beschreiben"
        case 2:
            return "Arbeitsplätze nach Kundenwunsch ausstatten"
        case 3:
            return "Clients in Netzwerke einbinden"
        case 4:
            return "Schutzbedarfsanalyse im eigenen Arbeitsbereich durchführen"
        case 5:
            return "Software zur Verwaltung von Daten anpassen"
        case 6:
            return "Serviceanfragen bearbeiten"
        case 7:
            return "Cyber-physische Systeme ergänzen"
        case 8:
            return "Daten systemübergreifend bereitstellen"
        case 9:
            return "Netzwerke und Dienste bereitstellen"
    }
}

export function formatInput(value: string){
    const valueNumberArray = value.split(",") ;
    const result  = valueNumberArray.map((el: string) => {
    if(Number(el)){
        return Number(el)
    } 
    })
    if(!Number(result[result.length - 1])){
        result.pop();
    }
    return result;
}

export function formatString(value: string){
    const result = value.length > 30 ?  value.slice(0,30) + "..." : value;
    return result
}

export async function getQuestions(dispatch: Dispatch<Action>, lf : string) {

    const lfNumber = Number(lf[1]);
    console.log("lfNumberInsideFunktion" + lfNumber)
    dispatch({ type: "SET_LOADING_TRUE" });
    try {
        const res = await fetch(`${BASE_URL}/${lfNumber}/questions`, {
            method: 'GET',  
            headers: {
              'Content-Type': 'application/json'
            }});
        if (!res.ok) {
            dispatch({type: "SET_ERROR", payload: "Network response was not ok"});
            return; // stop execution
        }
        const data = await res.json();
        dispatch({ type: "GET_DATA", payload: data });
    } catch (error) {
        if (error instanceof Error) {
            // Use error.message only if error is an instance of Error
            dispatch({type: "SET_ERROR", payload: error.message});
        } else {
            // Fallback for unknown error shapes
            dispatch({type: "SET_ERROR", payload: "An unknown error occurred"});
        }
    } finally {
        dispatch({ type: "SET_LOADING_FALSE" });
    }
}

