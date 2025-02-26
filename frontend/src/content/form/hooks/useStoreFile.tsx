import toast from "react-hot-toast";
import { useFormContext } from "../../../context/form-context";
import { BASE_URL } from "../../../context/quiz-context";


export default function useStoreFile(){

    const { dispatch} = useFormContext();

    async function uploadImageToStorage(imageFile: File){
        const formData = new FormData();
        formData.append("file", imageFile);           
        dispatch({type: "SET_LOADING_TRUE", payload: "Bild wird hochgeladen..."});

        try {
            const res = await fetch(`${BASE_URL}/uploadImage`, {
                method: "PATCH",
                body: formData, 
            });

            const data = await res.json();
            if (!res.ok) {
                console.error("Error:", data.message);
                dispatch({
                    type: "SET_FETCHERROR",
                    payload: data.message || "Unknown error occurred",
                });
                toast.error("Ein Fehler ist aufgetreten: " + (data.message || "Unknown error"));
                return; 
            }
            dispatch({type: "SET_IMAGEURL", payload: data.fileURL})
            
            toast.success("Bild wurde erfolgreich hochgeladen!");
        } catch (error) {
            console.log(error);
        } finally {
            dispatch({type: "SET_LOADING_FALSE"});
            
        }
    }


    return {
        uploadImageToStorage
    }
}