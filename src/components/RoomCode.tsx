type RoomCodeProps = {
    code: string
}

export function RoomCode(props: RoomCodeProps) {

    return (
        <div>
            {props.code}
        </div>
    )
}