import { useParams } from "react-router-dom";
import themen from "../../themen";

type ThemaProps = {
    filterByThema: string,
    setFilterByThema: (e: string) => void
}



export default function Thema({filterByThema, setFilterByThema}: ThemaProps){

    const {lf} = useParams();

    const index = Number(lf) - 1

    const themenLernfeld = themen[index]

    return (
        <div 
            className=" text-center font-semibold text-[1.2rem] flex items-center justify-center gap-x-2">  
        <label>
            Thema:
        </label>
        <select  
            value={filterByThema}
            onChange={e => setFilterByThema(e.target.value)}
            className={`text-[0.8rem] p-1 rounded-lg outline-none border-[1px] text-center font-normal focus:border-2 focus:border-gray-verydark dark:focus:border-gray-medium  dark:bg-dark-very-dark-grey`}
        >   
            <option value={""}>*</option>
            {themenLernfeld.map((thema, index) => 

                <option value={thema} key={index}>{thema}</option>
            )}
        </select>
    </div>
    )
}