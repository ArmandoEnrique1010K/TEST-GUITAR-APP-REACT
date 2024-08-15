import { RopesView } from "./RopesView";

export const GuitarView = ({ handleNotePlayed, ropes }) => {

    return (<>

        <div>
            {
                // Desestructurar los atributos de un elemento ropes
                ropes.map(({ rope, frets }) => {
                    return (
                        <RopesView
                            key={rope}
                            rope={rope}
                            frets={frets}
                            handleNotePlayed={handleNotePlayed}
                        />
                    )
                })
            }
        </div>
    </>)
}

