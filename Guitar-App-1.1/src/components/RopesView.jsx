import { ChordView } from "./ChordView"

export const RopesView = ({ handleNotePlayed, id, frets = [] }) => {
    return (<>
        <div>
            {
                frets.map(({ id, name, chord }) => (
                    <div key={id}>
                        <ChordView
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