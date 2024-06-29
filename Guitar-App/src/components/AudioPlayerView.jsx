import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';

const AudioPlayerView = ({ x, y, onNotePlayed, isMuted }) => {

    // Estado para la nota actual
    // const [currentNote, setCurrentNote] = useState({ x: 99, y: 99 });

    const audioRef = useRef(null);

    // SILENCIAR TODO
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [isMuted]);



    const playAudio = () => {
        const audioPath = `/sounds/guitar1/${x}-${y}.mp3`;
        audioRef.current.src = audioPath;
        audioRef.current.play();
        console.log(audioPath)

        // setCurrentNote({ x, y })
        // Llamar a la función de devolución de llamada
        onNotePlayed({ x, y });
        // handlerCurrentNote(x, y);

    };

    // // LA NOTA ACTUAL
    // const handlerCurrentNote = () => {
    //     console.log("NOTA: " + currentNote);
    // }

    return (
        <div>
            <audio ref={audioRef} />
            <button onClick={playAudio}>
                Reproducir
            </button>
        </div>
    );
};

export default AudioPlayerView;

/*
AudioPlayer.propTypes = {
    x: PropTypes.integer,
    y: PropTypes.integer,
    currentNote: PropTypes.integer,
}*/