import PropType from "prop-types";

import { ChordView } from "./ChordView"
import { useState } from "react";

export const RopeView = ({ rope, frets, handleNotePlayed }) => {

    // Estado para activar el modo silenciar al tocar un acorde de una cuerda diferente
    const [notSameRope, setNotSameRope] = useState(false);

    // Funcion para activar el modo silenciar al tocar un acorde de una cuerda diferente
    const onActiveNotSameRope = () => {
        setNotSameRope(!notSameRope);
    }

    return (
        <>
            <div
                // Eliminar este estilo, solamente es para visualizar
                style={{ display: "flex", flexDirection: "row" }}
            >
                {/* DEFINIR BOTONES: Volumen de cuerda y Opcion para silenciar si toca una nota diferente a la de esta cuerda */}
                <div>
                    <button onClick={onActiveNotSameRope}>Silenciar cuerda</button>
                    <input type="range" min={0} max={2} step={0.1}></input>
                </div>
                <div
                    // Eliminar este estilo, solamente es para visualizar
                    style={{ display: "flex", flexDirection: "row" }}
                >
                    {
                        frets.map(({ chord, file }) => (
                            <div key={chord}>
                                <ChordView
                                    chord={chord}
                                    file={file}
                                    rope={rope}
                                    handleNotePlayed={handleNotePlayed}
                                    notSameRope={notSameRope}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

RopeView.propTypes = {
    rope: PropType.number,
    frets: PropType.array
}