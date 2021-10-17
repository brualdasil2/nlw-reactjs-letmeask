import logoImg from "../assets/images/logo.svg"
import { Button } from "../components/Button"
import { RoomCode } from "../components/RoomCode"

import { useAuth } from "../hooks/useAuth"
import { useParams } from "react-router"

import "../styles/room.scss"
import { FormEvent, useEffect, useState } from "react"
import { database } from "../services/firebase"
import internal from "stream"
import { QuestionsList } from "../components/QuestionsList"

//{JSON.stringify(questions)}

type RoomParams = {
    id: string
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string
    }
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean
}>

type Question = {
    id: string,
    author: {
        name: string,
        avatar: string
    }
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean
}

export function Room() {
    //possibilita utilizar as informações do user compartilhadas no contexto
    const { user } = useAuth()
    //State pra armazenar texto da pergunta
    const [ newQuestion, setNewQuestion ] = useState("")

    const [ questions, setQuestions ] = useState<Question[]>([])
    //parametros do router pra ter acesso à string da rota (codigo da sala)
    const params = useParams<RoomParams>()
    const roomId = params.id

    useEffect(() => {
        //o que acontece quando o que tá no array muda (arr vazio -> só executa uma vez qd componente é montado)
        //pega do firebase uma referência a essa sala
        const roomRef = database.ref(`rooms/${roomId}`)

        //ou .once pra rodar uma vez só // .on fica ouvindo
        roomRef.on("value", room => {
            //room.val() retorna um objeto com o conteúdo da sala
            const databaseRoom = room.val()

            //perguntas vêm do firebase como um objeto (databaseRoom.questions), Object.entries(obj) transforma em um array nesse formato: [["Prop1", val], ["Prop2", val]]
            //função .map() executa uma função pra cada item do array (queremos transformar um array de arrays em um array de objetos)
            const parsedQuestions = Object.entries((databaseRoom.questions as FirebaseQuestions) ?? {}).map(([ key, value ]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
            })

            setQuestions(parsedQuestions)

        })
        /*
        limpeza opcional, que roda quando o componente é desmontado
        return () => {
            cleanup
        }
        */
    }, [roomId]) //Monitora o estado de roomId pra rodar o useEffect mesmo se mudar de uma sala pra outra (mudar rota) estando no mesmo componente ainda

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()

        if (newQuestion.trim() === ""){
            return
        }

        if (!user){
            throw new Error("You must be logged in")
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false,
        }

        await database.ref(`rooms/${roomId}/questions`).push(question)

        setNewQuestion("")
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeaskLogo" />
                    <RoomCode code={roomId}/>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala React</h1>
                    <div>{questions.length} perguntas</div>
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea placeholder="O que você quer perguntar?" onChange={event => setNewQuestion(event.target.value)} value={newQuestion}/>

                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} />
                                {user.name}
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
                <div className="questions-list">
                    <QuestionsList questions={questions}/>
               </div>
            </main>
        </div>
    )
}