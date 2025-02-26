import { useQuizContext } from "../../context/quiz-context";


export default function RowHeader(){

    const {data, questionNumber} = useQuizContext();

    const row = data![questionNumber];

    const {question} = row;

    const list = question?.list ? question?.list : "";

    const img = question?.image ? question?.image : "";

    const len = question.question.length;

    const questionStyle = `${len > 50 ? "text-[0.7rem] sm:text-[0.9rem] lg:text-[1rem]" : "text-[0.8rem] sm:text-[1rem] lg:text-[1.2rem]"}`

    const questionListElementStyle = `grid grid-cols-2 gap-x-2 ml-4 text-[0.9rem]`


    return (
        <div className="flex justify-center items-center flex-col gap-y-4 mb-5">
            <p className={`${questionStyle} w-[90%] sm:w-[80%] text-center text-gray-700 dark:text-gray-light `}>{question.question}</p>
            {list && 
                <ul className={questionListElementStyle}>
                    {list.map((el, index) => 
                        <li 
                            key={index}
                            className="text-gray-700 dark:text-gray-light text-[0.8rem] sm:text-[0.9rem] lg:text-[1rem]"
                            >{index + 1}: {el}</li>)}
                </ul>
            }
            {img && 
                <img
                    className="w-[70%] h-[70%] sm:w-[50%] lg:w-[30%] sm:h-[50%] lg:h-[30%] bg-none" 
                    src={img} 
                    alt={img}></img>
            }  
        </div>
    )

    
}