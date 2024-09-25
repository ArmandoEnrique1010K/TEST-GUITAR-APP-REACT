import PropType from "prop-types";
import { useEffect, useRef } from "react";
import * as Tone from "tone";

export const ChordView = ({ id, chord, file, handleNotePlayed, rope, volumenRope, modRope, keyfromkeyboard, }) => {

    // UTILICE CHATGPT PARA INVESTIGAR ESO
    // Referenciar a un elemento HTML
    const audioRef = useRef(null);
    const gainNodeRef = useRef(null);

    // Almacenar si el sonido está en reproducción
    // const [isPlaying, setIsPlaying] = useState(false);

    // Dirección del archivo de sonido
    const audioPath = `/sounds/guitar_1/${file}.mp3`;

    // UTILICE CHATGPT PARA INVESTIGAR ESO
    useEffect(() => {
        gainNodeRef.current = new Tone.Gain(volumenRope).toDestination();
        audioRef.current = new Tone.Player(audioPath).connect(gainNodeRef.current);
    }), [audioPath, volumenRope];


    // Función para reproducir sonido
    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.start();
        }

        const modRopeNote = { r: rope, c: chord };
        handleNotePlayed(modRope, { rope, chord }, modRopeNote, audioRef);
    }
    // CHATGPT AYUDAME


    useEffect(() => {
        const handleKeyDownPlaySound = (event) => {
            if (event.key === keyfromkeyboard) {
                console.log(`Tecla ${keyfromkeyboard} presionada`);
                if (audioRef.current) {
                    audioRef.current.start();
                }
                const modRopeNote = { r: rope, c: chord };
                handleNotePlayed(modRope, { rope, chord }, modRopeNote, audioRef);
            }
        };

        window.addEventListener("keydown", handleKeyDownPlaySound);

        return () => {
            window.removeEventListener("keydown", handleKeyDownPlaySound);
        };
    }, [keyfromkeyboard]);



    return (
        <>
            <button
                type="button"
                onClick={playSound}
            >
                Play {rope} - {chord} / {id} / {keyfromkeyboard == undefined ? "" : `/ Tecla: ${keyfromkeyboard}`}
            </button>
        </>
    )
}

ChordView.propTypes = {
    id: PropType.number,
    chord: PropType.number,
    file: PropType.string,
    handleNotePlayed: PropType.func,
    rope: PropType.number,
    volumenRope: PropType.number,
    modRope: PropType.string,
    keyfromkeyboard: PropType.string
}