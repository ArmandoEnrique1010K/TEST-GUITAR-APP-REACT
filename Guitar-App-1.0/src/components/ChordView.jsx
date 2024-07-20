import { useEffect, useRef } from "react";

export const ChordView = ({ row, handleNotePlayed, id, name, chord }) => {

    // Referenciar al elemento audio
    const audioRef = useRef(null);
    // Dirección del archivo de sonido
    const audioPath = `/sounds/guitar1/${name}.mp3`;
    // audioRef.current.src = audioPath;

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = audioPath;
        }
    }, [audioPath]);

    // CHATGPT AYUDAME CON ESTE PROBLEMA DEL ERROR:
    // https://www.w3schools.com/tags/av_prop_readystate.asp

    const playSound = () => {
        if (audioRef.current.readyState >= 2) {
            // El audio ya está cargado, reproducir directamente
            playAudio();
        } else {
            // Cargar y reproducir el audio si no está listo
            fetchAudioAndPlay();
        }
        console.log(name + " " + row + " " + chord);

        handleNotePlayed({ row, chord }, audioRef);
    };
    const playAudio = async () => {
        try {
            await audioRef.current.play();
        } catch (error) {
            console.log("Error al reproducir el audio: ", error);
        }
    };

    const fetchAudioAndPlay = () => {
        // https://developer.chrome.com/blog/play-request-was-interrupted?hl=es-419

        fetch(audioPath)
            .then(response => response.blob())
            .then(blob => {
                audioRef.current.src = URL.createObjectURL(blob);
                audioRef.current.oncanplaythrough = () => {
                    playAudio();
                };
            })
            .catch(e => console.log(e));
    };
    // useEffect(() => {

    // })

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