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

type QuestionsListProps = {
    questions: Array<Question>
}

export function QuestionsList(props: QuestionsListProps) {

    let questions: any = []
    props.questions.forEach((question) => {
        questions.push(
        <div>
            {question.content}
        </div>)
    })


    return questions
}