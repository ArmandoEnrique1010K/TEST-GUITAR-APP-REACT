import { ChordView } from "./ChordView"

export const RopesView = ({ handleNotePlayed, id, row, frets = [] }) => {
    return (<>
        <div>
            {
                frets.map(f => (
                    <div key={f.id}>
                        <ChordView
                            row={f.row}
                            id={f.id}
                            name={f.name}
                            chord={f.chord}
                            handleNotePlayed={handleNotePlayed}
                        />
                    </div>
                ))
            }
        </div>
    </>)
}