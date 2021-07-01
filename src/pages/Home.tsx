import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleImg from "../assets/images/google-icon.svg"
import "../styles/homepage.scss"
import { Button } from "../components/Button"

export function Home(){
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
                    <button className="create-room">
                        <img src={googleImg} alt="icone google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form>
                        <input type="text" placeholder="Digite o código da sala" />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}