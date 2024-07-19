import { useEffect, useRef } from "react";

export const ChordView = ({ row, handleNotePlayed, id, name, chord }) => {


    // Referenciar al elemento audio

    const audioRef = useRef(null);

    // Función para reproducir sonido
    const playSound = () => {
        // Dirección del archivo de sonido
        const audioPath = `/sounds/guitar1/${name}.mp3`;
        audioRef.current.src = audioPath;
        // Reproducir audio
        audioRef.current.play();
        console.log(name);
        handleNotePlayed({ row, chord }, audioRef)
    }

    useEffect(() => {

    })

    return (<>
        {/* Elemento audio para hacer una referencia */}
        <audio ref={audioRef} />
        <button
            type="button"
            onClick={playSound}>
            {"tocar " + id}
        </button>
    </>)
}