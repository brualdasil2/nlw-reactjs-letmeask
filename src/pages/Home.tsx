import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleImg from "../assets/images/google-icon.svg"

export function Home(){
    return(
        <div>
            <div>
                <img src={illustrationImg} alt="ilustração de pgt e resp" />
                <h1>Crie salas de Q&amp;A ao vivo</h1>
                <p>Tire as dúvidas de sua audiência em tempo real</p>
            </div>
            <main>
                <div>
                    <img src={logoImg} alt="logo"/>
                    <button>
                        <img src={googleImg} alt="icone google"/>
                        Crie sua sala com o Google
                    </button>
                    <div>
                        ou entre em uma sala
                    </div>
                    <form>
                        <input type="text" placeholder="Digite o código da sala" />
                        <button type="submit">
                            Entrar na sala
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}