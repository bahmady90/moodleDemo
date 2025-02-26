import DarkModeTuggle from "./content/home/DarkModeToggle"
import StatsToggle from "./content/home/StatsToggle"


import { BsSunFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";

export default function Header(){

    const [openMenu, setOpenMenu] = useState(false);
    const dropdownRef = useRef<HTMLUListElement | null>(null);

    const [darkmode, setDarkmode] = useState(false);

    useEffect(() => {
        if(darkmode){
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkmode])

    function handleClickoutSide(e : MouseEvent){
            if(dropdownRef.current && !dropdownRef.current.contains(e.target as Node)){
                setOpenMenu(false);
            }
        }
    
        function handleKeyDown(e : KeyboardEvent){
            if(e.key === "Escape"){
                setOpenMenu(false);
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


        <header className=" bg-gray-100 dark:bg-dark-dark-grey grid grid-cols-[1fr_1fr_1fr] h-[3rem] sm:h-[4rem] lg:h-[5rem] items-center border-b border-gray-200 dark:border-gray-500 w-full">   
            <div className=" flex justify-center items-center w-[2rem] h-[2rem] lg:w-[4.5rem] lg:h-[4.5rem] 2xl:w-[50px] 2xl:h-[50px] relative  bg-white rounded-full justify-self-start self-center left-[10%]">
                <img src="/Logo.jpg"className=" h-full w-full  rounded-full"></img>      
            </div>
            <h1 className=" text-gray-verydark dark:text-gray-light text-[1rem]  sm:text-[1.2rem] lg:text-[1.5rem] italic justify-self-center font-semibold font-cursive font-sans">
                MyMoodle
            </h1>
            <div className="flex sm:hidden justify-end mr-4 gap-x-4">
                <button className="text-gray-verydark hover:text-gray-dark text-[0.9rem] sm:text-[1.1rem] px-3 py-1 rounded-full bg-gray-50 hover:bg-white border-[1px] border-gray-medium mr-1 sm:mr-0">Logout</button>
                <IoMenu className="cursor-pointer w-6 h-6 text-black dark:text-gray-light" onClick={() => setOpenMenu(true)}/>
                {openMenu && 
                    <ul className="absolute w-[20%] top-10 gap-x-4 right-[1%] px-2 py-1 border border-gray-200 text-[0.5rem] bg-gray-50 sm:text-sm text-gray-700 rounded-2xl gap-y-5" ref={dropdownRef}>
                        <li className="hover:bg-cyan-50 cursor-pointer  py-2 flex justify-center items-center rounded-t-2xl">
                            <StatsToggle/>
                        </li>
                        <li className="hover:bg-cyan-50 cursor-pointer  py-2 flex justify-center items-center">
                            {darkmode ? 
                                <DarkModeTuggle setDarkmode={setDarkmode} darkmode={darkmode}/> :
                                <BsSunFill  className="h-[1.5rem] w-[1.5rem] sm:w-[2rem] sm:h-[2rem] cursor-pointer text-yellow-300"onClick={() => setDarkmode(!darkmode)}/>
                            }
                            
                        </li>
                        <li className="hover:bg-cyan-50 cursor-pointer  py-2 flex justify-center items-center rounded-b-xl">
                            <div className=" cursor-pointer flex justify-center items-center ring-2 ring-gray-dark w-[1.5rem] h-[1.5rem] sm:w-[3rem] sm:h-[3rem] lg:w-[4rem] lg:h-[4rem] 2xl:w-[50px] 2xl:h-[50px] relative  bg-white rounded-full justify-self-end self-center">
                                <img src="/user-default.svg" className="h-[90%] w-[90%]  bg-none rounded-full"></img>      
                            </div>
                        </li>
                    </ul>
                } 
            </div>
            <div className="hidden sm:flex ml-10 sm:ml-15 lg:ml-20  gap-x-[1rem] sm:gap-x-[1.5rem]  lg:gap-x-[2rem] h-full items-center justify-center">
                <StatsToggle/>
                {!darkmode ? 
                    <DarkModeTuggle setDarkmode={setDarkmode} darkmode={darkmode}/> :
                    <BsSunFill onClick={() => setDarkmode(!darkmode)} className="h-[1.8rem] w-[1.8em] sm:w-[2.3rem] sm:h-[2.3rem] cursor-pointer text-yellow-300"/>
                }
                <div className=" cursor-pointer flex justify-center items-center ring-2 ring-gray-dark w-[2rem] h-[2rem] sm:w-[3rem] sm:h-[3rem] lg:w-[4rem] lg:h-[4rem] 2xl:w-[50px] 2xl:h-[50px] relative  bg-white rounded-full justify-self-end self-center">
                    <img src="/user-default.svg" className="h-[90%] w-[90%]  bg-none rounded-full"></img>      
                </div>
                <button className="text-gray-verydark hover:text-gray-dark text-[0.9rem] sm:text-[1.1rem] px-3 py-1 rounded-full bg-gray-50 hover:bg-white border-[1px] border-gray-medium mr-1 sm:mr-0">Logout</button>
            </div> 
        </header>

    )
}


