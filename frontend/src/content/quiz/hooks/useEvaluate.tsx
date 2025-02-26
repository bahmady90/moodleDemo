import { useQuizContext } from "../../../context/quiz-context";


export function useEvaluate(){

    const {data, questionNumber, scoredArray, dispatch} = useQuizContext();

        // function that returns a boolean if the question is already evaluated or not
        function getIsAlreadyEvaluated(){
            
            let alreadyEvaluated = false;
            scoredArray.forEach((el) => {
                if(el.key === questionNumber){
                    alreadyEvaluated = true; 
                } 
            })
            return alreadyEvaluated;       
        }

        // this function returns rightAnswer 1 of 3 values: true (if checked and right), false (if !checked and right) 
        // and null(!checked and false) AND returns the boolean evaluate the check if the score should increase or decrease given that the answer is wrong/false
        function getIsRightAnswerMC(index: number){
            const checked = data![questionNumber].answers[index].checked;
            const rightAnswers = data![questionNumber].rightAnswers;
            let isRightAnswer = null;
            let evaluate = false;
            if(Array.isArray(rightAnswers)){
            for(let i = 0; i < rightAnswers.length; i++){
                if(rightAnswers[i] - 1 === index){
                    if(checked){
                        isRightAnswer = true;
                        evaluate = true;
                    }
                    else {
                        isRightAnswer = false;
                        // evaluate stays false because otherwise the score would not increase if you checked one rightAnswer 
                        // and did not check the other rightAnswer wich would result in the same score if you didnt check anything wich kinda doesnt make sense
                    }
                    break;
                }
                else {
                    if(checked){
                        isRightAnswer = false;
                        evaluate = true;
                    }
                }
                
            }
           }
            return {isRightAnswer, evaluate}
            
        }

        // function that returns a boolean if answer is right or wrong for type number
        function getIsRightAnswerNumber(){
            // @ts-expect-error: TypeScript is complaining about type mismatch, but this is intended
            const result = data![questionNumber].answers.number;
            const rightAnswer  = data![questionNumber].rightAnswers[0];
            let isRightAnswer = false;
            if(result === rightAnswer){
                isRightAnswer = true
            }
            return isRightAnswer;

        }

        // function that evaluates the points for the question
        function evaluate(){
            const type = data![questionNumber].type;
            if(type === "mc"){
                const answers = data![questionNumber].answers;
                const rightAnswersLength = (data![questionNumber].rightAnswers as number[]).length;
                let localPoints = 0;
                answers.forEach((answer, index) => {
                    console.log(answer)
                    const {isRightAnswer, evaluate} = getIsRightAnswerMC(index);                                        
                    if(isRightAnswer && evaluate){
                        localPoints = localPoints + (4 / rightAnswersLength)
                    }
                    if(isRightAnswer === false && evaluate === true) {
                        localPoints = localPoints - (4 / rightAnswersLength)
                    }

                })
                const alreadyEvaluated = getIsAlreadyEvaluated();
                if(alreadyEvaluated) {
                    dispatch({type: "UPDATE_SCOREARRAY", payload: {score: localPoints > 0 ? localPoints : 0, key: questionNumber}})
                } else {
                    dispatch({type: "PUSH_SCOREARRAY", payload: {score: localPoints > 0 ? localPoints : 0, key: questionNumber}})
                }
            }
            else if(type === "matching"){
                const answers = data![questionNumber].answers;
                const rightAnswersLength = (data![questionNumber].rightAnswers as number[]).length;
                let localPoints = 0;
                answers.forEach((answer, index) => {
                    console.log(answer)
                    const isRightAnswer = getIsRightAnswerMatching(index);                                         
                    if(isRightAnswer){
                        localPoints = localPoints + (4 / rightAnswersLength)
                    }
                })
                const alreadyEvaluated = getIsAlreadyEvaluated();
                if(alreadyEvaluated) {
                    dispatch({type: "UPDATE_SCOREARRAY", payload: {score: localPoints, key: questionNumber}})
                } else {
                    dispatch({type: "PUSH_SCOREARRAY", payload: {score: localPoints, key: questionNumber}})
                }
            } 
            else {
                const isRightAnswer = getIsRightAnswerNumber();
                const alreadyEvaluated = getIsAlreadyEvaluated();
                if(alreadyEvaluated) {
                    dispatch({type: "UPDATE_SCOREARRAY", payload: {score: isRightAnswer ? 4 : 0, key: questionNumber}})
                } else {
                    dispatch({type: "PUSH_SCOREARRAY", payload: {score: isRightAnswer ? 4 : 0, key: questionNumber}})
                }    
                
            }
            
        }

        // function that returns a boolean if answer is right or wrong for type matching
        
        function getIsRightAnswerMatching(index: number){
            const answerNumber = data![questionNumber].answers[index].number;
            const rightAnswers = data![questionNumber].rightAnswers;
            let isRightAnswer = false;
            if(Array.isArray(rightAnswers)){
            if(rightAnswers[index] === answerNumber){
                isRightAnswer = true;
            }}
            return isRightAnswer
        }

        function getGrade() {
            const pointsScored = scoredArray.reduce((acc, cum) => acc + cum.score, 0);
            const totalScore = data!.length * 4;
            const percentage = `${Math.round((pointsScored / totalScore!) * 100)}%`;
            return percentage;
        }


    return {getIsRightAnswerMC, getIsRightAnswerNumber, 
        getIsRightAnswerMatching, getIsAlreadyEvaluated, evaluate, getGrade}
}