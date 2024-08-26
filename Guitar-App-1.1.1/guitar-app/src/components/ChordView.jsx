import PropType from "prop-types";
import { useEffect, useRef } from "react";
import * as Tone from "tone";

export const ChordView = ({ id, chord, file, handleNotePlayed, rope, notSameRope }) => {

    // Referenciar a un elemento HTML
    const audioRef = useRef(null);
    const gainNodeRef = useRef(null);

    // Dirección del archivo de sonido
    const audioPath = `/sounds/guitar_1/${file}.mp3`;


    // Cargar el archivo de sonido
    // useEffect(() => {
    //     audioRef.current = new Howl({
    //         // Establece la dirección
    //         src: [audioPath]
    //     });
    // }, [audioPath]);

    // Cargar el archivo de sonido
    useEffect(() => {

        // Crear un nodo de ganancia para amplificar el volumen
        gainNodeRef.current = new Tone.Gain(1).toDestination();
        audioRef.current = new Tone.Player(audioPath).connect(gainNodeRef.current).toDestination();

    }, [audioPath]);


    // Función para reproducir sonido
    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.start();
            // console.log("reproduciendo el archivo " + file)

        }
        handleNotePlayed({ rope, chord }, audioRef, notSameRope)
    }

    useEffect(() => {
        // Activar el modo silenciar al tocar un acorde de una cuerda diferente
    }, [notSameRope])

    return (
        <>
            <button
                type="button"
                onClick={playSound}>
                Play {chord}
            </button>
        </>
    )
}

ChordView.propTypes = {
    chord: PropType.number,
    file: PropType.string
}