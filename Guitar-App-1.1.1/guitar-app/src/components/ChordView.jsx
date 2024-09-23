import PropType from "prop-types";
import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

export const ChordView = ({ id, chord, file, handleNotePlayed, rope, volumenRope, modRope, keyfromkeyboard, }) => {

    // UTILICE CHATGPT PARA INVESTIGAR ESO
    // Referenciar a un elemento HTML
    const audioRef = useRef(null);
    const gainNodeRef = useRef(null);

    // Almacenar si el sonido está en reproducción
    const [isPlaying, setIsPlaying] = useState(false);

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

            if (isPlaying === true) {
                // Si el sonido ya está reproduciéndose, primero detenlo si está en modo "ON"
                if (modRope === "ON") {
                    audioRef.current.stop();
                    setIsPlaying(false);
                }
            }
            audioRef.current.start();
            setIsPlaying(true);
            //     // console.log("reproduciendo el archivo " + file)
        }

        const modRopeNote = { r: null, c: null };
        handleNotePlayed(modRope, { rope, chord }, modRopeNote, audioRef);
    }

    useEffect(() => {
        const handleKeyDownPlaySound = (event) => {
            if (event.key === keyfromkeyboard) {
                console.log(`Tecla ${keyfromkeyboard} presionada`);

                // Verificar el estado del botón ON/OFF antes de reproducir
                if (modRope) {
                    console.log("Modo ON activo");
                } else {
                    console.log("Modo OFF activo");
                }

                playSound();
            }
        };

        // CHATGPT AYUDAME
        window.addEventListener("keydown", handleKeyDownPlaySound);

        return () => {
            window.removeEventListener("keydown", handleKeyDownPlaySound);
        };
    }, [keyfromkeyboard, modRope]);



    return (
        <>
            <button
                type="button"
                onClick={playSound}
            // onKeyDown={handleKeyDownPlaySound}
            >
                {/*Muestra la tecla asignada a la nota si esta definido*/}
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