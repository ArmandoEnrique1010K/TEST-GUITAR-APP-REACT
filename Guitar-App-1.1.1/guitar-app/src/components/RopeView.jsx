import PropType from "prop-types";

import { ChordView } from "./ChordView"
import { useState } from "react";

export const RopeView = ({ rope, frets, handleNotePlayed, onPanelChange,
    // handleKeyDownPlaySound, keyfromkeyboard 
}) => {

    // Estado para el volumen amplificado de la fila de notas (EFECTO DE SONIDO AMPLIFICADOR)
    const [volumenRope, setVolumenRope] = useState(1);

    // Estado para el modo de cuerda: Silenciar al tocar una nota de una cuerda diferente o no silenciar
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
                        frets.map(({ id, chord, file,
                            // Utilizar dos puntos para cambiar el nombre de la propiedad para que no haga conflicto con key
                            key: keyfromkeyboard }) => (
                            <ChordView
                                id={id}
                                key={id}
                                chord={chord}
                                file={file}
                                rope={rope}
                                handleNotePlayed={handleNotePlayed}
                                volumenRope={volumenRope}
                                modRope={modRope}
                                keyfromkeyboard={keyfromkeyboard}
                            // handleKeyDownPlaySound={handleKeyDownPlaySound}
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
    onPanelChange: PropType.func
}