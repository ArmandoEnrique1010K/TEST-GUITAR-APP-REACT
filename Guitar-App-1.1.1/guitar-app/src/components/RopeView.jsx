import PropType from "prop-types";

import { ChordView } from "./ChordView"
import { useState } from "react";

export const RopeView = ({ rope, frets, handleNotePlayed }) => {

    // Estado para el volumen amplificado de la nota
    const [volumenRope, setVolumenRope] = useState(1);

    // Función para el manejo del volumen amplificado
    const onVolumenRopeChange = ({ target: { value } }) => {
        // Operador unario + convierte a tipo number
        setVolumenRope(+value);
    }


    return (
        <>
            <div
                // Eliminar este estilo, solamente es para visualizar
                style={{ display: "flex", flexDirection: "row" }}
            >
                {/* DEFINIR BOTONES: Volumen de cuerda */}
                <div>
                    <input type="range" min={0.1} max={2} step={0.1} value={volumenRope} onChange={onVolumenRopeChange}></input>
                </div>
                <div
                    // Eliminar este estilo, solamente es para visualizar
                    style={{ display: "flex", flexDirection: "row" }}
                >
                    {
                        frets.map(({ id, chord, file }) => (
                            <ChordView
                                id={id}
                                key={id}
                                chord={chord}
                                file={file}
                                rope={rope}
                                handleNotePlayed={handleNotePlayed}
                                volumenRope={volumenRope}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

RopeView.propTypes = {
    rope: PropType.number,
    frets: PropType.array,
    handleNotePlayed: PropType.func,
}