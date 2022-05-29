import { useReducer } from "react"
import { reducer, RESET_VARIABLES} from "../utils/Constants"

export const useVariables = () => {
    const [variables, dispatch] = useReducer(reducer, RESET_VARIABLES)
    return {variables, setVariables: dispatch}
}