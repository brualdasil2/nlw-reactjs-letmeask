import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"

import "../styles/homepage.scss"

import { Button } from "../components/Button"

import { Link } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"

export function NewRoom(){
    //const { user } = useAuth()

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
                    <h2>Crie uma nova sala</h2>
                    <form>
                        <input type="text" placeholder="Nome da sala" />
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