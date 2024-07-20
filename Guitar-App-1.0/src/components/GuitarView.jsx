import { RopesView } from "./RopesView";

export const GuitarView = ({ handleNotePlayed, ropes }) => {

    return (<>

        <div>
            {
                // Desestructurar los atributos de un elemento ropes
                ropes.map(({ id, row, frets }) => {
                    return (
                        <RopesView
                            key={id}
                            id={id}
                            row={row}
                            frets={frets}
                            handleNotePlayed={handleNotePlayed}
                        />

                        // <div key={r.id}>
                        //     {r.frets.map((f) => {
                        //         return (
                        //             <div key={f.id}>
                        //                 {f.name}
                        //                 <audio 
                        //                 ref={audioRef}
                        //                 ></audio>
                        //             </div>
                        //         )
                        //     })}
                        // </div>
                    )
                })
            }
        </div>
    </>)
}