import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

//faz as duas importações e exporta uma função que torna mais fácil utilizar o contexto

export function useAuth(){
    const value = useContext(AuthContext)
    return value
}

