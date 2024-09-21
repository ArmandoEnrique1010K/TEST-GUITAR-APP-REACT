import { useRef, useState } from "react"
import { NeckView } from "../components/NeckView"
import { useEffect } from "react";
import { getNeck } from "../services/getNeck";
import { ControlsView } from "../components/ControlsView";
import { getKeyboard } from "../services/getKeyboard";

export const GuitarPage = () => {

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
    const handleNotePlayed = (statusModRope, currentNote, currentAudioRef) => {
        // Si la cuerda de la nota anterior es la misma que la de la nota actual, detener la reproducción de la anterior
        if (previousNote.rope === currentNote.rope && previousAudioRef.current) {
            previousAudioRef.current.stop();
            previousAudioRef.current.seek(0);
        }

        // Si la cuerda y el acorde de la nota anterior son los mismos que los de la nota actual, reiniciar la reproducción de la nota actual
        if (previousNote.rope === currentNote.rope && previousNote.chord === currentNote.chord) {
            previousAudioRef.current.stop();
        }

        //..................................
        if (statusModRope == "PREV") {
            console.log("MODO PREV");
            // Si la cuerda de la nota anterior es diferente que la de la nota actual, detener la reproducción de la anterior
            if (previousNote.rope !== currentNote.rope && previousAudioRef.current) {
                previousAudioRef.current.stop();
                previousAudioRef.current.seek(0);
            }

            // previousAudioRef.current = currentAudioRef.current;
            // SI LA NOTA ANTERIOR REPRODUCIDA EN ESTE MODO DE CUERDA
            // if (modRopePreviousNote.rope === currentNote.rope && modRopePreviousAudioRef.current) {
            //     modRopePreviousAudioRef.current.stop();
            //     modRopePreviousAudioRef.current.seek(0);

            // }


            // Si la cuerda de la nota anterior es la misma que la de la nota actual, detener la reproducción de la anterior
            if (modRopePreviousNote.rope === currentNote.rope && previousAudioRef.current) {
                modRopePreviousAudioRef.current.stop();
                modRopePreviousAudioRef.current.seek(0);
            }

            // Si la cuerda y el acorde de la nota anterior son los mismos que los de la nota actual, reiniciar la reproducción de la nota actual
            if (modRopePreviousNote.rope === currentNote.rope && modRopePreviousNote.chord === currentNote.chord) {
                modRopePreviousAudioRef.current.stop();
            }

            setModRopePreviousNote(currentNote);

            modRopePreviousAudioRef.current = currentAudioRef.current;
        }

        if (statusModRope == "NEXT") {
            console.log("MODO NEXT");
            setModRopePreviousNote(currentNote);
        }
        //..................................


        setpreviousNote(currentNote);

        previousAudioRef.current = currentAudioRef.current;

        // Imprimir la información sobre la nota anterior y la actual
        console.log(`La nota anterior fue ${previousNote.rope} : ${previousNote.chord}`);
        console.log(`La nota actual es: ${currentNote.rope} : ${currentNote.chord}`);
    }



    // CARGAR LAS TECLAS ASIGNADAS
    useEffect(() => {
        setKeyboard(getKeyboard);
    }, [])

    return (
        <>
            <NeckView neck={neck} keyboard={keyboard} handleNotePlayed={handleNotePlayed} />
            <ControlsView />
        </>
    )
}

