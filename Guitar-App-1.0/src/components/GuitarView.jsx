import { RopesView } from "./RopesView";

export const GuitarView = ({ handleNotePlayed, ropes }) => {

    return (<>

        <div>
            {
                ropes.map((r) => {
                    return (
                        <RopesView
                            key={r.id}
                            id={r.id}
                            row={r.row}
                            frets={r.frets}
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