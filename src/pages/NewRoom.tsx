import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"

import "../styles/homepage.scss"

import { Button } from "../components/Button"

import { Link } from "react-router-dom"
import { FormEvent } from "react"

import { useAuth } from "../hooks/useAuth"
import { useState } from "react"
import { useHistory } from "react-router"

import { database } from "../services/firebase"

export function NewRoom(){
    const { user } = useAuth()
    //Armazena nome da sala
    const [ newRoom, setNewRoom ] = useState("")
    //pra mudar de rota
    const history = useHistory()

    async function handleCreateRoom(event: FormEvent) {
        //Evita que recarregue a página ao enviar form
        event.preventDefault() 

        if (newRoom.trim() === ""){
            return
        }
        //cria a categoria "rooms" no banco de dados
        const roomRef = database.ref("rooms")

        //cria uma nova sala com os dados dessa
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorID: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)
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
                    <h1>{user?.name}</h1>
                    <h2>Crie uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input type="text" placeholder="Nome da sala" onChange={event => setNewRoom(event.target.value)} />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}