import Answers from "./Answers";
import useQuestionsOverview from "./hooks/useQuestionsOverview";
import FormfilterId from "./FormfilterId";
import FilterType from "./FilterType";
import SubHeader from "../../SubHeader";
import Thema from "./Thema";
import ApOne from "./ApOne";

import { useFormContext } from "../../context/form-context";
import { formatString } from "../../functions";
import {FormEvent, useEffect, useState} from "react";
import { Toaster } from 'react-hot-toast';
import { Row } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useForm } from "../form/hooks/useForm";
import { OrbitProgress } from "react-loading-indicators";





export default function QuestionsOverviewPage(){


    const {handleDelete}= useForm();

    const {getQuestions} = useQuestionsOverview();

    const navigate = useNavigate();

    const {questions, loading, dispatch} = useFormContext();
    

    const {lf} = useParams();

    useEffect(() => {
        getQuestions();   
    }, [])

    const [filterById, setFilterById] = useState("");
    const [filterByType, setFilterByType] = useState("");
    const [filterByThema, setFilterByThema] = useState("");
    const [filterByApOne, setFilterByApOne] = useState("");


    const [filteredQuestions, setFilteredQuestions] = useState<Row[]>([]);

    console.log(questions)

    const isBeingFiltered = filterById || filterByType || filterByThema || filterByApOne


    useEffect(() => {
        const filtered = questions.filter((question) => {
            const matchesId = !filterById || Number(question.id) === Number(filterById);
            const matchesType = !filterByType || filterByType === "*" || question.type === filterByType;
            const matchesThema = !filterByThema || question.thema === filterByThema;
            const matchesApOne = !filterByApOne || question.apOne === (filterByApOne === "true" ? true : false);
    
            return matchesId && matchesType && matchesThema && matchesApOne;
        });
    
        setFilteredQuestions(filtered);
    }, [filterById, filterByType, filterByThema, filterByApOne, questions]);
    

    const arrayToMap = isBeingFiltered ? filteredQuestions : questions
    const sortedArrayToMap = arrayToMap.sort((a,b) => (a.id as number) - (b.id as number))


    
    console.log(filterByType)

    function handleUpdate(question: Row){
        dispatch({type: "CHANGE_INITIALVALUE_FORM", payload: question})
        navigate(`/${lf}/Frage-hinzufügen`);
    }

    function handleFilterId(e: FormEvent<HTMLFormElement>){
        console.log("Function is fired off!!!")
        e.preventDefault();
        if(filterById){
            if(filterByType !== "" && filterByType !== "*"){
                setFilteredQuestions(questions.filter((question) => question.type === filterByType && Number(question.id) === Number(filterById)))
            } else {
                setFilteredQuestions(
                    questions.filter((question) => Number(question.id) === Number(filterById))
                  );
            }
            
        }       
    }


    if(loading === "Lade fragen..."){

        return (
            <div className="w-full h-full flex justify-center items-center">
                <OrbitProgress color="#1e40af" size="large" text="" textColor="" />
            </div>
        )
    }

    else if(loading === false) {

        return(
        <>
        <Toaster position="top-center" />
        <SubHeader/>
        <main className="w-[95%] justify-self-center flex flex-col bg-slate-200 dark:text-white dark:bg-gray-900 rounded-lg font-sans shadow-[-1px_-1px_13px_-6px_rgba(0,_0,_0,_0.1)] mt-[4%]">
            <div className={`flex w-full min-h-[3rem] items-center justify-between gap-x-4`}>
                    <FormfilterId filterById={filterById} setFilterById={setFilterById} handleFilterId={handleFilterId} />
                    <FilterType filterByType={filterByType} setFilterByType={setFilterByType}/>
                    <div className="w-[15%] text-start font-semibold text-[1.2rem]">Frage</div>
                    <div className="w-[15%] text-start font-semibold text-[1.2rem]">Antwort</div>
                    <Thema filterByThema={filterByThema} setFilterByThema={setFilterByThema}/>
                    {/* <div className="w-[7%] text-start font-semibold text-[1.2rem]">AP1?</div> */}
                    <ApOne filterByApOne={filterByApOne} setFilterByApOne={setFilterByApOne}/>
                    <div className="w-[15%] text-start font-semibold text-[1.2rem]">Richtige Antwort/en</div>
            </div>
            {(filteredQuestions.length === 0 && isBeingFiltered ) ?
            
                <h1 className="py-12 self-center font-semibold text-[1.2rem] text-red-600 ">Keine Ergebnisse zu den Filtern gefunden. Bitte passe deine Filter an!</h1> :
            
            
            <ul className="rounded-lg mb-8 text-slate-700 w-full">
            {sortedArrayToMap.map(((question, index) =>{

                const bgStyle = (index + 1) % 2 === 0 ? "bg-white dark:bg-dark-very-dark-grey" : "bg-gray-100 dark:bg-dark-dark-grey "
                
                return (

                    <li className={`flex w-full h-[3rem] items-center justify-between gap-x-4 dark:text-white ${bgStyle}`} key={index}>
                        <p className="w-[7%] h-full flex items-center justify-center">{question.id}</p>
                        <p className="w-[7%] h-full flex items-center justify-center">{question.type}</p>
                        <p className="w-[15%] h-full flex items-center justify-start">{formatString(question.question.question)}</p>
                        <Answers question={question}/>
                        <div className="w-[18%] text-center">{question.thema ? question.thema : "LEER"}</div>
                        <div className="w-[7%] text-end">{question.apOne === true ? "true" : "false"}</div>
                        <div className="w-[10%] h-full flex items-center justify-center">{question.rightAnswers.toString()}</div>
                        <div className="flex ml-[5%] gap-x-3">
                            <MdDelete className="text-slate-500 dark:text-gray-medium hover:text-gray-verydark dark:hover:text-gray-light cursor-pointer w-7 h-7" onClick={(() => handleDelete(question.id as number))}/>
                            <CiEdit className="text-slate-500 dark:text-gray-medium hover:text-gray-verydark dark:hover:text-gray-light cursor-pointer w-7 h-7" onClick={() => handleUpdate(question as Row)}/>
                        </div>
                    </li>
                )
            } 
                
            ))}
            </ul>
    }
        </main>
    </>
    )
    }   
}

