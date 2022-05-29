import React, {useContext} from "react";
import { useVariables } from "../hooks/useVariables";

const variablesContext = React.createContext();

export function VariablesProvider({children}){
    const variables = useVariables();
    return (
        <variablesContext.Provider value={variables}>{children}</variablesContext.Provider>
    )
}

export function VariablesConsumer(){
    const context = useContext(variablesContext);
    if(!context){
        throw new Error('useVariable debe estar dentro del proveedor VariablesProvider');
    }
    return context;
}