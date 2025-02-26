import RowMc from "./QuestionTypes/mc/RowMc"
import RowHeader from "./RowHeader";
import RowMatching from "./QuestionTypes/matching/RowMatching"
import RowNumber from "./QuestionTypes/number/RowNumber";
import QuestionOverwiev from "./QuestionsOverwiev";
import QuizBottom from "./QuizBottom";
import RowText from "./QuestionTypes/text/RowText";
import SubHeader from "../../SubHeader";

import {Row, useQuizContext } from "../../context/quiz-context"
import { getQuestions } from "../../functions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { OrbitProgress } from "react-loading-indicators";




function Quiz() {
  
  const {loading, data, questionNumber, scoredArray, dispatch} = useQuizContext();

  const {lf} = useParams();

  console.log(scoredArray)
  

  useEffect(() => {
      getQuestions(dispatch, lf as string);
  }, []); 
  


  if(loading === true){
    return    (<div className="w-full h-full flex justify-center items-center">
                <OrbitProgress color="#1e40af" size="large" text="" textColor="" />
              </div>) 
  }
  if(loading === false) {

    console.log(data);


    const row : Row = data![questionNumber];
    

    return (
      <main className="min-h-svh">
        <SubHeader/>
        <RowHeader/>
        <div className="w-[95%] grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-[1fr_1fr] h-fit mt-[3%] sm:ml-[5%] gap-x-[5%] mb-2 gap-y-6">
          <div className="flex justify-center lg:justify-end items-center min-h-full"> 
              {row.type === "mc" && 
                <RowMc/>
                } 
              {row.type === "matching" &&
                <RowMatching/>
                }
              {row.type === "number" && 
                <RowNumber/>
                }
              {row.type === "text" && 
                <RowText/>
              }
          </div>
          <QuestionOverwiev/> 
        </div>
        <QuizBottom/> 
    </main>
    )
  }
  
}

export default Quiz
