import React, { useEffect, useRef, useState } from "react";
import { formatString } from "../../functions";
import { AnswerMatching, AnswerMC, Row } from "../../types";

type AnswersProps = {
    question: Row;
};

const Answers: React.FC<AnswersProps> = ({ question }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const svgButtonRef = useRef<SVGSVGElement | null>(null);
    

    const answersPreview = Array.isArray(question.answers) ? (question.answers[0] as AnswerMC | AnswerMatching).answer : (question.answers!.answer as string);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

   
    

    return (
        <div className="flex w-[20%] h-full pl-1 items-center gap-x-2">
            <p className="w-[90%]">{formatString(answersPreview)}</p>
            {(question.type === "mc" || question.type === "matching") && (
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 cursor-pointer hover:text-gray-dark" onClick={() => setIsOpen(true)} ref={svgButtonRef}>
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                            fill="currentColor"
                        />
                    </g>
                </svg>
            )}
            {isOpen && (
                <div
                    className={`absolute mt-[10%] w-fit bg-white rounded-lg border-black border-[1px] max-w-[40%]`}
                    ref={dropdownRef}
                >   
                    Alle Antworten:
                    <ul className="py-1 text-[0.8rem] text-gray-900 gap-y-4 divide-y-[1px] divide-gray-200 w-full">
                        {Array.isArray(question.answers) &&
                            question.answers.map((answer, index: number) => {
                                if ('answer' in answer) {
                                return (
                                    <li className="hover:bg-gray-100 cursor-pointer" key={index}>
                                    {answer.answer}
                                    </li>
                                );
                                }
                        return null; 
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Answers;
