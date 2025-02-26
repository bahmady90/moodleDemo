import OptionsComponent from "./OptionsComponent";
import ErrorMessage from "./ErrorMessage";
import useStoreFile from "./hooks/useStoreFile";

import { basicInputStyles } from "./FormQuestionPage";
import { useFormContext } from "../../context/form-context";
import { ChangeEvent, useState  } from "react"
import Button from "../../Button";




export default function Question(){

    const [imageFile, setImageFile] = useState<File | null>(null);

    const {uploadImageToStorage} = useStoreFile();

    const {errors, checkErros, questionText, questionType, imageURL, dispatch} = useFormContext();

    const index = errors.findIndex((err) => err.type === "question")

    const errorStyle = errors[index].message === "Die Frage fehlt" ? "border-red-500 focus:border-gray-600": "border-gray-300 dark:border-gray-700"

    

    function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0];
        if(file){
            setImageFile(file)
        }
    }




    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        dispatch({type: "SET_QUESTIONTEXT", payload: value})
        if(questionText.length === 0 && checkErros){
            dispatch({type: "SET_ERROR_QUESTION"})
        } else {
            dispatch({type: "REMOVE_ERROR_QUESTION"})
        } 
    }

    function handleImageURL(e : ChangeEvent<HTMLInputElement>){
        const value = e.target.value;
        dispatch({type: "SET_IMAGEURL", payload: value})
        if(imageURL.length === 0 && checkErros){
            dispatch({type: "SET_ERROR_IMAGEURL"});
        } else {
            dispatch({type: "REMOVE_ERROR_IMAGEURL"})
        }

    }

    return (
        
        <div className="grid w-fit min-w-[50%] h-fit">
            <div className="flex flex-col">
            <label className="text-sm  ml-2 w-fit dark:text-white">Frage:</label>
            <input  
                value={questionText} 
                onChange={handleInputChange} 
                className={`${basicInputStyles} ${errorStyle}`}
            ></input>
            </div>
            {errors[index].message && <ErrorMessage>{errors[index].message}</ErrorMessage>}
            {questionType === "list" && 
                <div className="flex flex-col justify-center min-w-full">
                    <label className="text-sm my-3 dark:text-white">Bitte gebe Optionen ein</label>
                    <OptionsComponent/>
                </div>
            }
            {questionType === "image" &&
                <div className="w-full flex flex-col gap-y-4 mt-4">
                    <div className="flex gap-x-3 items-center w-full">
                        <label className="dark:text-white">Bild:</label>
                        <input
                            type="text"
                            value={imageURL}
                            onChange={handleImageURL}
                            className={`${basicInputStyles} w-full`}
                        />
                    </div>
                    <div className="flex gap-x-4">
                        <label className="dark:text-white">Upload an image:</label>
                        <input type="file" onChange={handleFileUpload} accept="image/*" className={``}/>
                    </div>
                    <div className="flex items-center justify-start">
                        <Button px="px-5" py="py-3" type="button" rounded="rounded-full" handleClick={() => uploadImageToStorage(imageFile as File)}>Save Image</Button>
                    </div>
                    
                </div>
            }
        </div>
        
    )
}


{/* <div className="flex flex-col dark:text-white">
                    <label>Lade hier das Bild hoch (implementiere ich später):</label>
                    <input type="text" value={imageURL} onChange={handleImageURL} className={`${basicInputStyles}`}></input>
                </div> */}