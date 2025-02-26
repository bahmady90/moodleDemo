import useHandleText from "../../hooks/useHandleText";
import Bubble from "../../Bubble";
import Button from "../../../../Button";

import { Atom } from "react-loading-indicators";
import { useQuizContext } from "../../../../context/quiz-context";





export default function RowText(){

    const {loadingAi, isSubmitted, scoredArray, questionNumber} = useQuizContext();
    const {text, textError, handleSubmit, handleChange} = useHandleText();

    const errorStyle = textError ? "border-red-600": ""

    
    const disable = textError !== "" 

    const explanation = scoredArray[questionNumber]?.explanation;

    if(loadingAi === true){
        return (
            <div className="flex flex-col w-full h-full justify-center items-center gap-y-4">
                <div className="ml-[40%]">
                    <Atom color="#13bdcb" size="large" text="" textColor=""/>
                </div>
                <p className="text-[0.8rem] text-gray-verydark ml-[40%]">Bewertung mittels KI erfolgt...</p>
            </div>
        )
    }
    return (
        
        <form 
            className="rounded-sm grid min-w-[90%] sm:min-w-[100%]  min-h-[10rem] sm:min-h-[20rem] lg:min-h-[25rem] grid-rows-[1fr_6fr]"
            onSubmit={e => handleSubmit(e)}
            
            >
            <label htmlFor="message" className="block mb-2 text-[0.875rem] sm:text-[1rem] lg:text-[1.2rem]  text-gray-700 dark:text-white justify-self-center">Deine Antwort:</label>
            <textarea
                disabled={isSubmitted}
                value={text} 
                id="message"  
                className={`block p-2.5  text-[0.6rem] sm:text-[0.8rem] text-gray-700 dark:text-gray-light bg-gray-50 dark:bg-dark-dark-grey rounded-lg border border-gray-300 
                focus:border-gray-verydark outline-none  focus:dark:border-gray-light resize-none ${errorStyle}`} 
                placeholder="Schreibe deine Antwort hier..."
                onChange={handleChange}
                >
            </textarea>
            <p className="text-red-600 hover:bg-gray-100 w-fit justify-self-center mt-[1%] rounded-xl px-2 py-1">{textError}</p>
            <div className="justify-self-start lg:ml-[8%] lg:mt-[2%] flex items-center justify-center gap-x-2 w-full  h-[3.5rem] sm:h-[5rem]">
            {!isSubmitted && (
                <Button px="px-3 sm:px-6" py="py-2 sm:py-3" rounded="rounded-full" type="submit" disabled={disable}>Einreichen</Button>
                )}
            {isSubmitted && (
                <div className="flex justify-center items-center gap-x-3 mt-4 sm:mt-0">
                    <svg width="71" height="71" fill="currentColor" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" className="h-10 w-10 text-gray-900 dark:text-gray-light" viewBox="-0.17090198558635983 0.482230148717937 41.14235318283891 40.0339509076386"><path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18z" fill="currentColor"/></svg>
                    <Bubble>
                        <p className="text-[0.7rem] sm:text-[0.9rem] text-gray-verydark font-sans">{explanation}</p>
                    </Bubble>
                </div>  
                )}
            </div>
            
        </form>
        
    )
}