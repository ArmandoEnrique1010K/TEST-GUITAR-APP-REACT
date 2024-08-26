import { useRef, useState } from "react"
import { NeckView } from "../components/NeckView"
import { useEffect } from "react";
import { getNeck } from "../services/getNeck";
import { ControlsView } from "../components/ControlsView";

export const GuitarPage = () => {

    // Estado para el mástil de la guitarra
    const [neck, setNeck] = useState([]);

    // Estado para almacenar la última nota reproducida
    const [previousNote, setpreviousNote] = useState({
        rope: null,
        chord: null,
    })

    // Referencia al elemento de audio de la nota previamente reproducida
    const previousAudioRef = useRef(null);

    // Cargar los datos del mástil de la guitarra cuando la página se monta
    useEffect(() => {
        setNeck(getNeck)
    }, [])

    // Función para manejar la reproducción de una nota y detener la anterior si es necesario
    const handleNotePlayed = (currentNote, currentAudioRef) => {
        // Si la cuerda de la nota anterior es la misma que la de la nota actual, detener la reproducción de la anterior
        if (previousNote.rope === currentNote.rope && previousAudioRef.current) {
            previousAudioRef.current.stop();
            previousAudioRef.current.seek(0);
        }

        // Si la cuerda y el acorde de la nota anterior son los mismos que los de la nota actual, reiniciar la reproducción de la nota actual
        if (previousNote.rope === currentNote.rope && previousNote.chord === currentNote.chord) {
            previousAudioRef.current.seek(0);
            previousAudioRef.current.start()
        }

        setpreviousNote(currentNote);

        previousAudioRef.current = currentAudioRef.current;

        // Imprimir la información sobre la nota anterior y la actual
        console.log(`La nota anterior fue ${previousNote.rope} : ${previousNote.chord}`);
        console.log(`La nota actual es: ${currentNote.rope} : ${currentNote.chord}`);
    }





    return (
        <>
            <NeckView neck={neck} handleNotePlayed={handleNotePlayed} />
            <ControlsView />
        </>
    )
}

