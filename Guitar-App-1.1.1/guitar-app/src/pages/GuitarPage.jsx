import { useRef, useState } from "react"
import { NeckView } from "../components/NeckView"
import { useEffect } from "react";
import { getNeck } from "../services/getNeck";
import { ControlsView } from "../components/ControlsView";
import { getKeyboard } from "../services/getKeyboard";

export const GuitarPage = () => {

    // ESTADO PARA EL PANEL DE LA GUITARRA (PANTALLA DE CONFIGURACION)
    const [panel, setPanel] = useState("Bienvenido a GuitarApp");
    // Estado para el mástil de la guitarra, 
    const [neck, setNeck] = useState([]);

    // ESTADO PARA LAS TECLAS
    const [keyboard, setKeyboard] = useState([]);

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
        setNeck(getNeck)
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
    useEffect(() => {
        setKeyboard(getKeyboard);
    }, [])

    return (
        <>
            <NeckView neck={neck} keyboard={keyboard} handleNotePlayed={handleNotePlayed} onPanelChange={onPanelChange} />
            <div>
                {panel}
            </div>
            <ControlsView />
        </>
    )
}

