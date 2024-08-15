import { useEffect, useRef } from "react";
import { Howl } from "howler";

export const ChordView = ({ handleNotePlayed, rope, name, chord }) => {

    // Referencia a Howl
    const audioRef = useRef(null);

    // Dirección del archivo de sonido
    const audioPath = `/sounds/guitar1/${name}.mp3`;


    useEffect(() => {
        audioRef.current = new Howl({
            src: [audioPath],
            // MENSAJES DE CONSOLA FUNCIONALES
            // onload: () => console.log(`${name} loaded`),
            // onplay: () => console.log(`${name} playing`),
            // onend: () => console.log(`${name} ended`),
            // onloaderror: (id, error) => console.error(`Error loading ${name}:`, error),
            // onplayerror: (id, error) => console.error(`Error playing ${name}:`, error),
        });
    }, [audioPath]);

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.play();
            console.log(name + " " + chord + " " + chord);
            handleNotePlayed({ rope, chord }, audioRef);
        }
    };


    // CHATGPT AYUDAME CON ESTE PROBLEMA DEL ERROR:
    // https://www.w3schools.com/tags/av_prop_readystate.asp

    // const playSound = () => {
    //     if (audioRef.current.readyState >= 2) {
    //         // El audio ya está cargado, reproducir directamente
    //         playAudio();
    //     } else {
    //         // Cargar y reproducir el audio si no está listo
    //         fetchAudioAndPlay();
    //     }
    //     console.log("REPRODUCIENDO EL ARCHIVO " + name + " CON EL ID " + id + " Y FILA " + chord);

    //     handleNotePlayed({ id, chord }, audioRef);
    // };
    // const playAudio = async () => {
    //     try {
    //         await audioRef.current.play();
    //     } catch (error) {
    //         console.log("Error al reproducir el audio: ", error);
    //     }
    // };

    // const fetchAudioAndPlay = () => {
    //     // https://developer.chrome.com/blog/play-request-was-interrupted?hl=es-419

    //     fetch(audioPath)
    //         .then(response => response.blob())
    //         .then(blob => {
    //             audioRef.current.src = URL.createObjectURL(blob);
    //             audioRef.current.oncanplaythrough = () => {
    //                 playAudio();
    //             };
    //         })
    //         .catch(e => console.log(e));
    // };
    // // useEffect(() => {

    // // })

    return (<>
        <button
            type="button"
            onClick={playSound}>
            {"tocar " + chord}
        </button>
    </>)
}