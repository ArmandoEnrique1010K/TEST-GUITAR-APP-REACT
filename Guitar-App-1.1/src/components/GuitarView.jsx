import { RopesView } from "./RopesView";

export const GuitarView = ({ handleNotePlayed, ropes }) => {

    return (<>

        <div>
            {
                // Desestructurar los atributos de un elemento ropes
                ropes.map(({ id, frets }) => {
                    return (
                        <RopesView
                            key={id}
                            id={id}
                            frets={frets}
                            handleNotePlayed={handleNotePlayed}
                        />
                    )
                })
            }
        </div>
    </>)
}