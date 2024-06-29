import { useEffect, useState } from "react";
import { getGuitar } from "../services/getGuitar"
import AudioPlayerView from "./AudioPlayerView";

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
    // const [currentNote, setCurrentNote] = useState(null);
    const [currentNote, setCurrentNote] = useState({});

    const [isMuted, setIsMuted] = useState(false);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    // Efecto secundario
    useEffect(() => {
        // Cargar los datos una vez cargada la pagina web
        setGuitar(getGuitar());
    }, [])

    const handleNotePlayed = (note) => {
        // Aquí puedes realizar cualquier acción adicional con la nota reproducida
        console.log("Nota reproducida:", note);
        setCurrentNote(note)
    };

    // const pauseAudio = () => {
    //     audioRef.current.pause();
    // };

    // Función para agrupar notas por el valor de x
    const groupByX = () => {
        return guitar.reduce((groups, note) => {
            const x = note.position.x;
            if (!groups[x]) {
                groups[x] = [];
            }
            groups[x].push(note);
            return groups;
        }, {});
    };
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
                            >
                            </AudioPlayerView>
                        </div>
                    ))}
                </div>
            ))}


            {/* <div>
                {guitar.map((note) => (
                    <div key={note.id}>
                        {note.position.x} - {note.position.y}
                        <AudioPlayerView
                            x={note.position.x}
                            y={note.position.y}
                            onNotePlayed={handleNotePlayed}
                            isMuted={isMuted}
                        />
                    </div>
                ))}
            </div> */}
            <button onClick={toggleMute}>
                SILENCIO
            </button>
            {
            // NO SIRVE ESTO
            /* <div>
                Reproduciendo la nota con el ID:
            </div> */}
            {currentNote && (
                <div>
                    Reproduciendo la nota: {currentNote.x}-{currentNote.y}
                </div>
            )}

        </>
    )
}
