import { ChangeEvent, FormEvent, useState } from "react";
import { BASE_URL, useQuizContext } from "../../../context/quiz-context";
import { useEvaluate } from "./useEvaluate";

export default function useHandleText(){

    const [textError, setTextError] = useState("");

    const bewertungsKriterien = "Bewerte inwiefern die Frage richtig beantwortet wurde. Hierzu vergleiche die richtigeAntwort mit der userAntwort. Die Ausgabe muss strikt ein JSON-Objekt mit genau zwei Eigenschaften sein: { \"score\": <Zahl>, \"explanation\": <Text> }. Jegliche Abweichung von diesem Format ist inakzeptabel. Der score mit einem numerischen Wert von 0 bis 4 und die explanation kurz als String mit der Punktzahl. Sei strikt mit der Bewertung. Wenn die userAntwort nichts mit der richtigenAntwort zu tun hat, sollst du auch 0 Punkte zurückschicken. Schreibe die Bewertung in der Anrede als zweite Person Singular: Also du hast...weil deine...";

   

    const {data, questionNumber, scoredArray, dispatch} = useQuizContext();

    const {getIsAlreadyEvaluated} = useEvaluate();

    const row = data![questionNumber];

    const {answers, question} = row;

    // @ts-expect-error because the answers-type can consist of different types depending on the questiontype
    const text = row.answers.text;

    
    async function fetchQuestion(){
        dispatch({type: "SET_LOADING_AI_TRUE"});
        try{
            const res = await fetch(`${BASE_URL}/ai`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    frage: question.question,
                    // @ts-expect-error because the answers-type can consist of different types depending on the questiontype
                    richtigeAntwort: answers.answer,
                    userAntwort: text, 
                    bewertungskriterien:  bewertungsKriterien
                }),
            });
            const data = await res.json();
            const content = JSON.parse(data.content);
            console.log(content);
            return content;
        }
        catch(error){
            console.log(error);
        }
        finally{
            dispatch({type: "SET_LOADING_AI_FALSE"});
        }

    }

    

    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        const wordCount = checkInput(text);
        // setting errors
        if(wordCount < 5){
            setTextError("Schreibe mindestens 5 Wörter.");
        } else {
            const content = await fetchQuestion();
            const {explanation, score} = content;
            evaluateText(explanation, score);
            dispatch({type: "INCREMENT_QUESTIONNUMBER"});
           
        }
        
    }

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>){
        const value = e.target.value;
        dispatch({type: "SET_ANSWER_TEXT", payload: value})
        const wordCount = checkInput(text);
        if (wordCount >= 5) {   
            setTextError(""); // Clear any previous errors   
        }  
    }

    function checkInput(text: string) {
        const words = text.trim().split(/\s+/);
        const wordCount = words.length;
        if (wordCount >= 5) {
            setTextError(""); // Clear any previous errors
        }
        return wordCount;
    }
    

    function evaluateText(explanation: string, score : number){
        const alreadyEvaluated = getIsAlreadyEvaluated();
        if(alreadyEvaluated) {
            dispatch({type: "UPDATE_SCOREARRAY", payload: {score: score? score : 0 , explanation: explanation ? explanation : "Du hast die Frage nicht beantwortet...",  key: questionNumber}})
        } else {
            dispatch({type: "PUSH_SCOREARRAY", payload: {score: score? score : 0 , explanation: explanation ? explanation : "Du hast die Frage nicht beantwortet...",  key: questionNumber}})
        }
        setTextError(""); 
    }

    function switchQuestionText(){
        const score = scoredArray[questionNumber]?.score;
        const explanation = scoredArray[questionNumber]?.explanation;
        const alreadyEvaluated = getIsAlreadyEvaluated();
        if(alreadyEvaluated) {
            dispatch({type: "UPDATE_SCOREARRAY", payload: {score: score? score : 0 , explanation: explanation ? explanation : "Du hast die Frage nicht beantwortet...",  key: questionNumber}})
        } else {
            dispatch({type: "PUSH_SCOREARRAY", payload: {score: score? score : 0 , explanation: explanation ? explanation : "Du hast die Frage nicht beantwortet...",  key: questionNumber}})
        }
        
        setTextError("");
    }


    return {
        text, textError,
        setTextError, fetchQuestion, handleSubmit, handleChange, checkInput, switchQuestionText
    }
}