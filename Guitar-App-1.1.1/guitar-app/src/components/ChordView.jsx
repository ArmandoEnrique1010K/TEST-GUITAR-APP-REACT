import PropType from "prop-types";
import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

export const ChordView = ({ id, chord, file, handleNotePlayed, rope, volumenRope, modRope, keyfromkeyboard }) => {
    // Estado para almacenar la nota actual reproducida

    // const [currentNote, setCurrentNote] = useState({
    //     rope: rope,
    //     chord: chord
    // })

    // UTILICE CHATGPT PARA INVESTIGAR ESO
    // Referenciar a un elemento HTML
    const audioRef = useRef(null);
    const gainNodeRef = useRef(null);

    // Dirección del archivo de sonido
    const audioPath = `/sounds/guitar_1/${file}.mp3`;


    // Cargar el archivo de sonido
    // useEffect(() => {

    //     // Crear un nodo de ganancia para amplificar el volumen
    //     gainNodeRef.current = new Tone.Gain(volumenRope).toDestination();
    //     audioRef.current = new Tone.Player(audioPath).connect(gainNodeRef.current).toDestination();

    // }, [audioPath]);

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
        // setCurrentNote({ rope, chord });

        const modRopeNote = { r: null, c: null };
        if (modRope === "PREV") {
            modRopeNote.r = rope;
            modRopeNote.c = chord;
        } else {
            modRopeNote.r = null;
            modRopeNote.c = null;
        }
        handleNotePlayed(modRope, { rope, chord }, modRopeNote, audioRef);
    }

    return (
        <>
            <button
                type="button"
                onClick={playSound}>
                Play {rope} - {chord} / Tecla: {keyfromkeyboard}
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
    volumenRope: PropType.number
}