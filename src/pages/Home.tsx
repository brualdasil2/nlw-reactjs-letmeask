import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleImg from "../assets/images/google-icon.svg"

import "../styles/homepage.scss"

import { Button } from "../components/Button"

import { useHistory } from "react-router"

import { auth, database, firebase } from "../services/firebase"


import { useAuth } from "../hooks/useAuth"
import { FormEvent, useState } from "react"


export function Home(){
    //pra mandar pra outras rotas
    const history = useHistory()
    //pega os dados do contexto Auth
    const { user, signInWithGoogle } = useAuth()

    const [ roomCode, setRoomCode ] = useState("")

    //chamada quando clica no botão
    async function handleCreateRoom(){
        if (!user){
            await signInWithGoogle()
        }
        history.push("/rooms/new")
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()

        if (roomCode.trim() === ""){
            return
        }

        //armazena a sala com o código específico
        const roomRef = database.ref(`rooms/${roomCode}`).get()

        if (!(await roomRef).exists()){
            alert("Room does not exist.")
            return
        }

        history.push(`/rooms/${roomCode}`)


    }

    return(
        <div id="home-container">
            <div id="logo-container">
                <img src={illustrationImg} alt="ilustração de pgt e resp" />
                <h1>Crie salas de Q&amp;A ao vivo</h1>
                <p>Tire as dúvidas de sua audiência em tempo real</p>
            </div>
            <main>
                <div id="auth-container">
                    <img src={logoImg} alt="logo"/>
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleImg} alt="icone google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input type="text" placeholder="Digite o código da sala" onChange={event => setRoomCode(event.target.value)} value={roomCode} />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}