
type FormFilterTypProps = {
    filterByType: string,
    setFilterByType: (e: string) => void,
}


export default function FilterType({filterByType, setFilterByType} : FormFilterTypProps){

         
    return(
        <div 
            className=" text-center font-semibold text-[1.2rem] flex items-center justify-center">  
            <label>
                Typ:
            </label>
            <select  
                value={(filterByType)}
                onChange={e => setFilterByType(e.target.value)}
                className={`text-[0.8rem] p-1 rounded-lg outline-none border-[1px] text-center font-normal focus:border-2 focus:border-gray-verydark dark:focus:border-gray-medium  dark:bg-dark-very-dark-grey `}
            >   
                <option value={""}>*</option>
                <option value="mc">mc</option>
                <option value="matching" >matching</option>
                <option value="number" >number</option>
                <option value="text" >text</option>
            </select>
        </div>
    )

}