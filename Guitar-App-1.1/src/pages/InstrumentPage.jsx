import { useEffect, useRef, useState } from "react"
import { GuitarView } from "../components/GuitarView"
import { getRopes } from "../services/GuitarServices";

export const InstrumentPage = () => {
    // Definir un estado para las cuerdas
    const [ropes, setRopes] = useState([]);

    // Desestructurar el objeto ropes
    const { id, frets } = ropes;

    // const { id: idchord, chord, name } = frets;
    // Estado para la nota actual reproduciendose
    const [currentNote, setCurrentNote] = useState({
        // ROW O FILA
        id: -1,
        // ACORDE O N
        chord: -1,
    });


    // Referencia al audio actualmente reproduciéndose
    const currentAudioRef = useRef(null);

    // Cargar las cuerdas al cargar la pagina
    useEffect(() => {
        setRopes(getRopes);
    }, [])

    // useEffect(() => {
    //     console.log("Ha cambiado");
    // }, [currentNote])
    // INVESTIGAR !!!!

    const handleNotePlayed = (note, audioRef) => {
        // SI LA SIGUIENTE NOTA ESTA EN LA MISMA FILA, ENTONCES SE SILENCIARA LA NOTA DE LA MISMA FILA
        if (currentNote.id === note.id && currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current.currentTime = 0;
        }
        // SI TOCA LA MISMA NOTA O ACORDE, ENTONCES SE SILENCIARA EL SONIDO ANTERIOR Y SE REPRODUCIRA DE NUEVO
        if (currentNote.id === note.id && currentNote.chord === note.chord) {
            currentAudioRef.current.currentTime = 0;
            currentAudioRef.current.play()

            // let audioPromise = currentAudioRef.current.play();

            // currentAudioRef.current.currentTime = 0;
            // if (audioPromise !== undefined) {
            //     audioPromise.then(() => {
            //         currentAudioRef.current.pause()
            //         console.log("HA TOCADO LA MISMA NOTA")
            //     }).catch(error => {
            //         console.log(error);
            //     })
            // }
            return;
        }



        setCurrentNote(note);
        currentAudioRef.current = audioRef.current;
        // NOTA ANTERIOR
        console.log(currentNote.id);
        console.log(currentNote.chord);
        // NOTA ACTUAL
        console.log(note);

    }

    return (<>
        <h1>GUITARRA</h1>
        <GuitarView handleNotePlayed={handleNotePlayed} ropes={ropes} />

    </>)
}

// https://developer.chrome.com/blog/play-request-was-interrupted?hl=es-419
