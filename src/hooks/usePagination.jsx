import { useEffect, useState } from "react";
import { VariablesConsumer } from "../contexts/variablesContext";
import { MAX_NUMBERS_PAGES, ACTIONS_VARIABLES } from "../utils/Constants";

export const usePagination = ({pagination}) => {
    const [numbers, setNumbers] = useState([])
    const {setVariables} = VariablesConsumer();
    useEffect( () => {
      if( typeof pagination.totalPages === 'number')
        setNumbers(Array.from({length: (pagination.totalPages < MAX_NUMBERS_PAGES) ? pagination.totalPages : MAX_NUMBERS_PAGES}, (_, i) => i + 1))
    },[pagination.totalPages])
    const changeCurrentPage = (page) => {
        setVariables({type: ACTIONS_VARIABLES.UPDATE_PAGE, payload: page});
    }
    const nextNumbers = () => setNumbers( preValues => preValues.map(value => value + 1));
    
    const prevNumbers = () => setNumbers( preValues => preValues.map(value => value - 1));
    

    return { numbers, changeCurrentPage, nextNumbers, prevNumbers }
}