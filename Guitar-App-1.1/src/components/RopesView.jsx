import { ChordView } from "./ChordView"

export const RopesView = ({ handleNotePlayed, rope, frets = [] }) => {


    return (<>
        <div>Fila: {rope}</div>
        <div>
            {
                frets.map(({ rope, name, chord }) => (
                    <div key={chord}>
                        <ChordView
                            id={chord}
                            name={name}
                            chord={chord}
                            rope={rope}
                            handleNotePlayed={handleNotePlayed}
                        />
                    </div>
                ))
            }
        </div>
    </>)
}