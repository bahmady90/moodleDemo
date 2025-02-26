import Button from "../../Button";
import ErrorMessage from "../form/ErrorMessage";

import { useFormContext } from "../../context/form-context";
import { FormEvent, useState } from "react";


export default function AdminLogin(){

    const {adminKey, isAdmin, dispatch} = useFormContext();
    const [error, setError] = useState("")

    function handleSignInForm(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(adminKey === "Qt>SSF6XAz"){
            dispatch({type: "SET_ISADMIN", payload: true})
            dispatch({type : "SET_OPENMODALADMINLOGIN"})
            localStorage.setItem("isAdmin", "true");
        } else {
            setError("Falcher Key. Bitte versuche es nochmal oder überspringe!")
        }
    }

    console.log(isAdmin);

    return (
        <form className=" w-[20rem] sm:w-[30rem] h-[15rem] flex flex-col items-center gap-y-4 justify-center" onSubmit={handleSignInForm}>
            <h1 className="text-gray-verydark font-semibold text-[1.3rem] mt-2">Login als Admin</h1>
            <div className="w-full flex flex-col items-center justify-center">
                <input
                    placeholder="Admin-Schlüssel eingeben..."
                    value={adminKey}
                    type="password" 
                    onChange={(e) => dispatch({type: "SET_ADMINKEY", payload: e.target.value})}
                    className={`text-[0.8rem] px-2 py-2 rounded-lg outline-none border-[1px] w-[90%] border-gray-verydark focus:border-[2px] focus:border-gray-dark `}>
                    
                </input>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </div>
            <div className="flex gap-x-4">
                <Button px="px-3" py="py-2" rounded="rounded-2xl" type="submit">Eingeben</Button>
                <button 
                    type="button" 
                    className="bg-gray-light text-gray-verydark hover:bg-gray-light hover:ring-1 hover:ring-gray-verydark cursor-warning hover:text-black rounded-xl text-[0.9rem] px-3 py-2"
                    onClick={() => dispatch({type : "SET_OPENMODALADMINLOGIN"})}
                    >Überspringen</button>
            </div>
                


        </form>
    )

}