import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useFormContext } from "../../context/form-context";
import { MdSecurity } from "react-icons/md";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

type DropDownMenuProps = {
    lf?: number,
    disabled?: boolean
}

function DropdownMenu({lf, disabled} : DropDownMenuProps) {


    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLUListElement | null>(null);
    const {isAdmin} = useFormContext();

    console.log("disabled: " + disabled)


    function handleClickoutSide(e : MouseEvent){
        if(dropdownRef.current && !dropdownRef.current.contains(e.target as Node)){
            setIsOpen(false);
        }
    }

    function handleKeyDown(e : KeyboardEvent){
        if(e.key === "Escape"){
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickoutSide) ;
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickoutSide);
            document.removeEventListener("keydown", handleKeyDown)
            }
        }, [])


    return (
        <>
        <Toaster/>
        <main className="relative flex justify-end">
            <div 
                className="w-[30%] flex justify-end items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <button
                    className="flex flex-col justify-end items-end mb-5 gap-y-[1px] mr-2 sm:mr-3 lg:mr-4 cursor-pointer"
                >
                    <span className="w-[2px] sm:w-[3px] md:w-[4px] lg:w-[5px] h-[2px] sm:h-[3px] md:h-[4px] lg:h-[5px] rounded-full bg-gray-500 dark:group-hover:bg-white"></span>
                    <span className="w-[2px] sm:w-[3px] md:w-[4px] lg:w-[5px] h-[2px] sm:h-[3px] md:h-[4px] lg:h-[5px] rounded-full bg-gray-500 dark:group-hover:bg-white"></span>
                    <span className="w-[2px] sm:w-[3px] md:w-[4px] lg:w-[5px] h-[2px] sm:h-[3px] md:h-[4px] lg:h-[5px] rounded-full bg-gray-500 dark:group-hover:bg-white"></span>
                </button>
            </div>
            {isOpen && (
                <ul className="overflow-hidden absolute bg-gray-50 dark:bg-dark-dark-grey border border-gray-200 dark:border-gray-500 rounded-lg shadow-lg z-1000absolute top-1 sm:top-7 sm:left-[50%] left-[30%] mt-2 w-[90%] sm:w-[50%] text-[0.5rem] sm:text-sm lg:text-[0.9rem] text-gray-700 dark:text-gray-light " ref={dropdownRef}>
                    <li className="hover:bg-gray-100 cursor-pointer px-2 py-2 hover:text-blue-dark">
                        {disabled ? 

                            <div    className="cursor-not-allowed" onClick={() => toast.error("Zu diesem Lernfeld gibt es noch keine Fragen. Aber kommt noch 🤞")}>Quiz</div> :
                            <Link to={`/0${lf}/Quiz`} className="block">Quiz</Link>  
                        }
                            
                    </li>
                    <li className="hover:bg-gray-100 cursor-pointer px-2 py-2 hover:text-blue-dark">
                        {isAdmin ? <Link to={`/0${lf}/Fragen-bearbeiten`} className="block">Fragen bearbeiten</Link> :
                            <div className="flex gap-x-1 cursor-not-allowed" onClick={() => toast.error("Dafür benötigst du den Admin-Zugang. Kontaktiere mich, wenn deine Intentionen reinen Herzens sind!")}>
                                <p className="block">Fragen bearbeiten</p> 
                                <MdSecurity className="text-gray-dark w-2 h-2 sm:w-5 sm:h-5"/>
                            </div>
                        }
                    </li>
                    <li className="hover:bg-gray-100 cursor-pointer px-2 py-2 hover:text-blue-dark">
                        {isAdmin ? <Link to={`/0${lf}/Frage-hinzufügen`} className="block">Frage hinzufügen</Link> :
                            <div className="flex gap-x-1 cursor-not-allowed" onClick={() => toast.error("Dafür benötigst du den Admin-Zugang. Kontaktiere mich, wenn deine Intentionen reinen Herzens sind!")}>
                                <p className="block">Frage hinzufügen</p> 
                                <MdSecurity className="text-gray-dark w-2 h-2 sm:w-5 sm:h-5"/>
                            </div>
                        }
                    </li>
                </ul> 
            )}
        </main>

    </>
    );
}

export default DropdownMenu;

