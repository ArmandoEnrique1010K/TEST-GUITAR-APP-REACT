import PropType from "prop-types";
import { useEffect, useRef } from "react";
import * as Tone from "tone";

export const ChordView = ({ id, chord, file, handleNotePlayed, rope, volumenRope, modRope,
    keyfromkeyboard,
    // handleKeyDownPlaySound
}) => {


    // UTILICE CHATGPT PARA INVESTIGAR ESO
    // Referenciar a un elemento HTML
    const audioRef = useRef(null);
    const gainNodeRef = useRef(null);

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
            //     // console.log("reproduciendo el archivo " + file)
        }

        // AL PULSAR UNA TECLA
        // if (event.keyfromkeyboard){

        // }
        // setCurrentNote({ rope, chord });

        const modRopeNote = { r: null, c: null };
        handleNotePlayed(modRope, { rope, chord }, modRopeNote, audioRef);
    }


    // INVESTIGAR ESO DEL CODIGO PARA PULSAR UNA TECLA Y REPRODUCIR LA NOTA
    // const handleKeyDownPlaySound = (event) => {
    //     if (event.key == keyfromkeyboard) {
    //         console.log(`Tecla ${keyfromkeyboard} presionada`);
    //         playSound()
    //         // audioRef.current.start();
    //     }
    // }
    useEffect(() => {
        const handleKeyDownPlaySound = (event) => {
            if (event.key === keyfromkeyboard) {
                console.log(`Tecla ${keyfromkeyboard} presionada`);
                playSound();
            }
        };

        // CHATGPT AYUDAME
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