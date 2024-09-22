import PropType from "prop-types";

import { ChordView } from "./ChordView"
import { useState } from "react";

export const RopeView = ({ rope, frets, handleNotePlayed, onPanelChange }) => {

    // Estado para el volumen amplificado de la nota (EFECTO DE SONIDO)
    const [volumenRope, setVolumenRope] = useState(1);

    // Estado para el modo de cuerda: Normal o Silenciar al cambiar de cuerda
    // NORMAL (OFF)
    // SIGUIENTE (NEXT)
    // ANTERIOR (PREV)
    const [modRope, setModRope] = useState("ON");

    // Función para el manejo del volumen amplificado
    const onVolumenRopeChange = ({ target: { value } }) => {
        // Operador unario + convierte a tipo number
        setVolumenRope(+value);
        onPanelChange(`El volumen para la cuerda ${rope} se ha establecido en ${(value * 100).toFixed(0)}`)
    }

    // Función para cambiar el modo de cuerda
    const onModRope = () => {
        switch (modRope) {
            case "OFF":
                setModRope("ON");
                onPanelChange(`Se ha habilitado para la cuerda ${rope}`)
                break;
            case "ON":
                setModRope("OFF");
                onPanelChange(`Se ha deshabilitado para la cuerda ${rope}`);
                break;
        }
    }

    return (
        <>
            <div
                // Eliminar este estilo, solamente es para visualizar
                style={{ display: "flex", flexDirection: "row" }}
            >
                {/* DEFINIR BOTONES: Volumen de cuerda */}
                <div>
                    <input type="range" min={0} max={2} step={0.1} value={volumenRope} onChange={onVolumenRopeChange}></input>
                </div>
                <div>
                    <button type="button" onClick={onModRope}>{modRope}</button>
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
                                modRope={modRope}
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