import { useRef, useState } from "react"
import { NeckView } from "../components/NeckView"
import { useEffect } from "react";
import { ControlsView } from "../components/ControlsView";
// import { getKeyboard } from "../services/getKeyboard";
import { getDynamicFretboardSimulation } from "../services/getDynamicFretboardSimulation";

export const GuitarPage = () => {

    // Estado para el panel de la guitarra (muestra las configuraciones aplicadas)
    const [panel, setPanel] = useState("Bienvenido a GuitarApp");

    // Estado para el mástil de la guitarra, 
    const [neck, setNeck] = useState([]);

    // Estado para el teclado
    // const [keyboard, setKeyboard] = useState([]);

    // Estado para almacenar la nota anterior reproducida
    const [previousNote, setpreviousNote] = useState({
        rope: null,
        chord: null,
    })

    // ESTADO PARA ALMACENAR LA NOTA ANTERIOR EN EL MODO DE CUERDA
    const [modRopePreviousNote, setModRopePreviousNote] = useState({
        rope: null,
        chord: null,
    })
    // Referencia al elemento de audio de la nota previamente reproducida
    const previousAudioRef = useRef(null);
    const modRopePreviousAudioRef = useRef(null);

    // Cargar los datos del mástil de la guitarra cuando la página se monta
    useEffect(() => {
        setNeck(getDynamicFretboardSimulation(1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, 0))
    }, [])

    // Función para manejar la reproducción de una nota y detener la anterior si es necesario
    const handleNotePlayed = (statusModRope, currentNote, modRopeCurrentNote, currentAudioRef) => {
        if (statusModRope == "OFF") {
            // Si la cuerda de la nota anterior es la misma que la de la nota actual, detener la reproducción de la anterior
            if (previousNote.rope === currentNote.rope && previousAudioRef.current) {
                previousAudioRef.current.stop();
                previousAudioRef.current.seek(0);
            }

            // Si la cuerda y el acorde de la nota anterior son los mismos que los de la nota actual, reiniciar la reproducción de la nota actual
            if (previousNote.rope === currentNote.rope && previousNote.chord === currentNote.chord) {
                previousAudioRef.current.stop();
            }

            previousAudioRef.current = currentAudioRef.current;
            setpreviousNote(currentNote);

        }

        if (statusModRope == "ON") {
            // Si la cuerda y el acorde de la nota anterior son los mismos que los de la nota actual, reiniciar la reproducción de la nota actual
            if (previousNote.rope === currentNote.rope && previousNote.chord === currentNote.chord) {
                previousAudioRef.current.stop();
            }

            // Silenciar la nota anterior en modo PREV solo si está en una cuerda diferente
            if (modRopePreviousNote.rope !== modRopeCurrentNote.rope && modRopePreviousAudioRef.current) {
                modRopePreviousAudioRef.current.stop();
                modRopePreviousAudioRef.current.seek(0);
            }

            // Si la nota es la misma, reinicia la reproducción
            if (modRopePreviousNote.rope === modRopeCurrentNote.rope && modRopePreviousNote.chord === modRopeCurrentNote.chord) {
                modRopePreviousAudioRef.current.stop();
            }

            modRopePreviousAudioRef.current = currentAudioRef.current;
            setModRopePreviousNote(modRopeCurrentNote);
        }

        // Imprimir la información sobre la nota anterior y la actual
        console.log(`La nota anterior fue ${previousNote.rope} : ${previousNote.chord}`);
        console.log(`La nota actual es: ${currentNote.rope} : ${currentNote.chord}`);
    }

    const onPanelChange = (message) => {
        setPanel(message);
    };
    // useEffect(() => {
    //     setTimeout(() => {
    //         setPanel("...")
    //     }, 5000)
    // }, [panel])

    useEffect(() => {

        console.log("Se modifico la nota anterior");

    }, [previousNote])

    // CARGAR LAS TECLAS ASIGNADAS
    // useEffect(() => {
    //     setKeyboard(getKeyboard);
    // }, [])


    const [typeAssignKeys, setTypeAssignKeys] = useState("first");

    const onTypeAssignKeys = (value) => {
        setTypeAssignKeys(value);
        onPanelChange(`Se ha configurado las teclas en modo ${value}`)
        switch (value) {
            // LOS PRIMEROS 6 ARGUMENTOS REPRESENTAN LAS CUERDAS DE LA GUITARRA
            // LOS SIGUIENTES 6 REPRESENTAN EL ORDEN DE LAS FILAS DEL TECLADO, LOS VALORS 5 Y 6 SON FILAS NULAS, UNDEFINED
            // EL ULTIMO ARGUMENTO ES DONDE VA A COMENZAR A DEFINIR LAS TECLAS
            case "first":
                // COMPORTAMIENTO POR DEFECTO
                //console.log(getDynamicFretboardSimulation(1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, 0))
                setNeck(getDynamicFretboardSimulation(1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, 0));
                break;
            case "last":
                //console.log(getDynamicFretboardSimulation(1, 2, 3, 4, 5, 6, 4, 5, 0, 1, 2, 3, 0));
                setNeck(getDynamicFretboardSimulation(1, 2, 3, 4, 5, 6, 4, 5, 0, 1, 2, 3, 0));
                break
            case "middle":
                //console.log(getDynamicFretboardSimulation(1, 2, 3, 4, 5, 6, 4, 0, 1, 2, 3, 5, 0));
                setNeck(getDynamicFretboardSimulation(1, 2, 3, 4, 5, 6, 4, 0, 1, 2, 3, 5, 0));
                break
            case "alternate":
                //console.log(getDynamicFretboardSimulation(1, 2, 3, 4, 5, 6, 0, 1, 4, 5, 2, 3, 0));
                setNeck(getDynamicFretboardSimulation(1, 2, 3, 4, 5, 6, 0, 1, 4, 5, 2, 3, 0));
                break;
        }
    }


    return (
        <>
            <NeckView neck={neck}
                // keyboard={keyboard} 
                handleNotePlayed={handleNotePlayed}
                onPanelChange={onPanelChange}
                getDynamicFretboardSimulation={getDynamicFretboardSimulation}
            // handleKeyDownPlaySound={handleKeyDownPlaySound}
            // keyfromkeyboard={keyfromkeyboard}
            />
            <div>
                {panel}
            </div>
            <ControlsView typeAssignKeys={typeAssignKeys} onTypeAssignKeys={onTypeAssignKeys} />
        </>
    )
}

