import PropType from "prop-types";
import { useEffect, useRef } from "react";
import * as Tone from "tone";

export const ChordView = ({ id, chord, file, rope, handleRopeOffNotePlayed, handleRopeOnNotePlayed, volumenRope, modRope, keyfromkeyboard, typeAssignKeys }) => {

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


    // if (modRope === "ON") {
    //     setRopeStatus("ON")
    // } else if (modRope === "OFF") {
    //     setRopeStatus("OFF")
    // }
    // Función para reproducir sonido
    const playSoundNoteOn = () => {
        if (audioRef.current) {
            audioRef.current.start();
        }
        // Verificar valores antes de ejecutar la lógica de modo ON/OFF
        // console.log(`Rope: ${rope}, Chord: ${chord}, Mode: ${modRope}`);

        handleRopeOnNotePlayed({ rope, chord }, audioRef);
    }

    // Función para reproducir sonido 2
    const playSoundNoteOff = () => {
        if (audioRef.current) {
            audioRef.current.start();
        }
        // Verificar valores antes de ejecutar la lógica de modo ON/OFF
        // console.log(`Rope: ${rope}, Chord: ${chord}, Mode: ${modRope}`);

        // if (modRope === "ON") {
        //     handleRopeOnNotePlayed({ rope, chord }, audioRef);
        // } else {
        handleRopeOffNotePlayed({ rope, chord }, audioRef);

    }


    // CHATGPT AYUDAME

    useEffect(() => {
        const handleKeyDownPlaySound = (event) => {
            if (event.key === keyfromkeyboard) {
                console.log(`Tecla ${keyfromkeyboard} presionada`);
                if (modRope === "OFF") {
                    playSoundNoteOff();
                } else {
                    playSoundNoteOn();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDownPlaySound);

        return () => {
            window.removeEventListener("keydown", handleKeyDownPlaySound);
        };
    }, [keyfromkeyboard, modRope]);

    // Si coloco modRope reproduce la nota 2 veces y no funciona el modo OFF
    // Si coloco typeAssignKeys no reconoce la nota en modo OFF a menos de que cambie el modo de teclado y solamente lo aplica a las cuerdas que estaban en modo OFF antes de cambiar de modo de teclado, 

    return (
        <>
            <button
                type="button"
                onClick={modRope === "ON" ? playSoundNoteOn : playSoundNoteOff}
            // onKeyDown={handleKeyDownPlaySound}
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
    handleRopeOffNotePlayed: PropType.func,
    handleRopeOnNotePlayed: PropType.func,
    rope: PropType.number,
    volumenRope: PropType.number,
    modRope: PropType.string,
    keyfromkeyboard: PropType.string
}