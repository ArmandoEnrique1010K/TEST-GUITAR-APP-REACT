import { useEffect, useRef, useState } from "react"
import { GuitarView } from "../components/GuitarView"
import { getRopes } from "../services/GuitarServices";

export const InstrumentPage = () => {
    // Definir un estado para las cuerdas
    const [ropes, setRopes] = useState([]);

    // Referencia al audio actualmente reproduciéndose
    const currentAudioRef = useRef(null);

    // Cargar las cuerdas al cargar la pagina
    useEffect(() => {
        setRopes(getRopes);
    }, [])

    // Estado para la nota actual reproduciendose
    const [currentNote, setCurrentNote] = useState({
        row: 0,
        chord: 0,
    });

    // INVESTIGAR !!!!
    const handleNotePlayed = (note, audioRef) => {
        if (currentNote) {
            if (currentNote.id === note.id && currentAudioRef.current) {
                currentAudioRef.current.pause();
                currentAudioRef.currentTime = 0;
            }

        }

        setCurrentNote(note);
        currentAudioRef.current = audioRef.current;

    }

    return (<>
        <h1>GUITARRA</h1>
        <GuitarView handleNotePlayed={handleNotePlayed} ropes={ropes} />

    </>)
}