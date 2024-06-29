import { useEffect, useRef, useState } from "react";
import { getGuitar } from "../services/getGuitar"
import AudioPlayerView from "./AudioPlayerView";
import { groupByX } from "../services/groupByX";
// Estado inicial para las notas
const guitarInitial = [
    {
        id: 0,
        position: {
            x: 0,
            y: 0,
        },
    }
];


export default function GuitarView() {


    // Estado para la guitarra
    const [guitar, setGuitar] = useState(guitarInitial);
    const [currentNote, setCurrentNote] = useState({});
    const [isMuted, setIsMuted] = useState(false);

    // Referencia al audio actualmente reproduciéndose
    const currentAudioRef = useRef(null);


    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    // Efecto secundario
    useEffect(() => {
        // Cargar los datos una vez cargada la pagina web
        setGuitar(getGuitar());
    }, [])

    const handleNotePlayed = (note, audioRef) => {
        if (currentNote) {
            if (currentNote.y === note.y && currentNote.x !== note.x && currentAudioRef.current) {
                // Si la nota anterior está en el mismo eje x pero diferente eje y, pausar el audio
                currentAudioRef.current.pause();
                currentAudioRef.current.currentTime = 0;
            } else if (currentNote.x === note.x && currentNote.y === note.y) {
                // Si la misma nota se está reproduciendo, reiniciarla
                currentAudioRef.current.currentTime = 0;
                currentAudioRef.current.play();
                return; // No es necesario continuar
            }
        }

        setCurrentNote(note)
        currentAudioRef.current = audioRef.current;
    };

    // Función para agrupar notas por el valor de x
    const groupedNotes = groupByX();

    return (

        <>
            <div>Instrumento</div>

            {Object.keys(groupedNotes).map((x) => (
                <div key={x}>
                    <h5>cuerda {x}</h5>
                    {groupedNotes[x].map((note) => (
                        <div key={note.id}>
                            <AudioPlayerView
                                x={note.position.x}
                                y={note.position.y}
                                onNotePlayed={handleNotePlayed}
                                isMuted={isMuted}
                            />
                        </div>
                    ))}
                </div>
            ))}

            <button onMouseDown={toggleMute} onMouseUp={toggleMute}>
                SILENCIO
            </button>

            {currentNote && (
                <div>
                    Reproduciendo la nota: {currentNote.x}-{currentNote.y}
                </div>
            )}

        </>
    )
}
