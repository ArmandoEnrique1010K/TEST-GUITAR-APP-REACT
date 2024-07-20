import { ChordView } from "./ChordView"

export const RopesView = ({ handleNotePlayed, id, row, frets = [] }) => {
    return (<>
        <div>
            {
                frets.map(({ id, name, chord }) => (
                    <div key={id}>
                        <ChordView
                            row={row}
                            id={id}
                            name={name}
                            chord={chord}
                            handleNotePlayed={handleNotePlayed}
                        />
                    </div>
                ))
            }
        </div>
    </>)
}