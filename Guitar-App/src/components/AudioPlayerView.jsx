import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import "../styles/AudioPlayerStyles.css";

const AudioPlayerView = ({ x, y, onNotePlayed, isMuted }) => {

    // CONSTANTE GLOBAL??
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

        // SI LA NOTA QUE SE VA A REPRODUCIR A CONTINUACION SE ENCUENTRA EN EL MISMO EJE X, ENTONCES DEBE SILENCIAR LA NOTA ANTERIOR (ES LOGICO EN UNA GUITARRA)
        audioRef.current.play();
        console.log(audioPath)
        onNotePlayed({ x, y }, audioRef);
    };


    return (
        <div>
            <audio ref={audioRef} />
            <button className="button" onClick={playAudio}>
                Reproducir
            </button>
        </div>
    );
};

export default AudioPlayerView;

AudioPlayerView.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    onNotePlayed: PropTypes.func.isRequired,
    isMuted: PropTypes.bool.isRequired,
};
