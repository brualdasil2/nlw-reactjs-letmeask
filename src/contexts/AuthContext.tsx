import firebase from "firebase"
import { createContext, ReactNode, useEffect, useState } from "react"
import { auth } from "../services/firebase"

//tipos do typescript (ignorar)
type AuthContextType = {
    user: User | undefined
    signInWithGoogle: () => Promise<void>
  }
type User = {
    id: string
    name: string
    avatar: string
}
type AuthContextProviderProps = {
    children: ReactNode
}

//importar AuthContext pra poder usar useContext(AuthContext) pra pegar infos do contexto
export const AuthContext = createContext({} as AuthContextType)

//componente React pra encapsular as rotas que utilizarem esse contexto
export function AuthContextProvider(props: AuthContextProviderProps) {
    //State do objeto user, compartilhado no contexto
    const [ user, setUser ] = useState<User>()

    //função chamada sempre que o componente for montado (no caso, quando o App for montado)
    useEffect(() => {
      //função auth.onAuthStateChanged retorna uma função que termina o processo
      const unsubscribe = auth.onAuthStateChanged(user => {
        //se o user já existia (já tava logado), pega as info dele no state user
        if (user){
          const { displayName, photoURL, uid } = user
    
          if (!displayName || !photoURL){
            throw new Error("Missing information from Google Account.")
          }
    
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
      })
      return () => {
        //chama função de limpeza quando o componente é desmontado
        unsubscribe()
      }
    }, [])
  
    //função de login, compartilhada no contexto
    async function signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
  
      const result = await auth.signInWithPopup(provider)
  
      //se veio um user, salva as info dele no state user
      if (result.user){
        const { displayName, photoURL, uid } = result.user
  
        if (!displayName || !photoURL){
          throw new Error("Missing information from Google Account.")
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    }

    return(
        //value é a lista de itens compartilhados no context
        //props.children pra encapsular as rotas que botar dentro
        <AuthContext.Provider value={{ user, signInWithGoogle }} >
            {props.children}
        </AuthContext.Provider>
    )
}