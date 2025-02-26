
type ApOneProps = {
    filterByApOne: string,
    setFilterByApOne: (e: string) => void
}



export default function ApOne({filterByApOne, setFilterByApOne}: ApOneProps){

    
    return (
        <div 
            className=" text-center font-semibold text-[1.2rem] flex items-center justify-center gap-x-2">  
        <label>
            AP1?
        </label>
        <select  
            value={filterByApOne}
            onChange={e => setFilterByApOne(e.target.value)}
            className={`text-[1rem] p-1 rounded-lg outline-none border-[1px] text-center font-normal focus:border-2 focus:border-gray-verydark dark:focus:border-gray-medium  dark:bg-dark-very-dark-grey`}
        >   
            <option value="">*</option>
            <option value={"false"}>false</option>
            <option value={"true"}>true</option>
            
        </select>
    </div>
    )
}