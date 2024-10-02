import { useRef, useState } from "react"
import { NeckView } from "../components/NeckView"
import { useEffect } from "react";
import { ControlsView } from "../components/ControlsView";
import { getDynamicFretboardSimulation } from "../services/getDynamicFretboardSimulation";

export const GuitarPage = () => {

    // Estado para el panel de la guitarra (muestra las configuraciones aplicadas)
    const [panel, setPanel] = useState("Bienvenido a GuitarApp");

    // Estado para el mástil de la guitarra, 
    const [neck, setNeck] = useState([]);

    // Estado para almacenar la nota reproducida en una cuerda en modo OFF
    const [noteInRopeOff, setNoteInRopeOff] = useState({
        rope: null,
        chord: null,
    })

    // Estado para almacenar la nota reproducida en una cuerda en modo ON
    const [noteInRopeOn, setNoteInRopeOn] = useState({
        rope: null,
        chord: null,
    })
    // Referencia al elemento de audio de la nota previamente reproducida
    // const previousAudioRef = useRef(null);
    // const modRopePreviousAudioRef = useRef(null);
    const noteOffAudioRef = useRef(null);
    const noteOnAudioRef = useRef(null);

    // Estado para el tipo de asignación de teclas por cada nota de la guitarra
    const [typeAssignKeys, setTypeAssignKeys] = useState("first");


    // Estado para almacenar la primera fila de notas de la guitarra, al que se asignara los controles
    const [firstRow, setFirstRow] = useState(0);

    // Función para establecer las teclas por cada nota de la guitarra
    const onTypeAssignKeys = (typeAssignKeys) => {
        setTypeAssignKeys(typeAssignKeys);
        onPanelChange(`Se ha configurado las teclas en modo ${typeAssignKeys}, asegurate de desactivar la tecla MAYUS`)
        switch (typeAssignKeys) {
            // LOS PRIMEROS 6 ARGUMENTOS REPRESENTAN LAS CUERDAS DE LA GUITARRA (SE PUEDE ELIMINAR, PERO EN OTRA SITUACIÓN PUEDE QUE SEA NECESARIO)
            // LOS SIGUIENTES 6 REPRESENTAN EL ORDEN DE LAS FILAS DEL TECLADO, LOS VALORS 5 Y 6 SON FILAS NULAS, UNDEFINED
            // EL ULTIMO ARGUMENTO ES DONDE VA A COMENZAR A DEFINIR LAS TECLAS
            case "first":
                // COMPORTAMIENTO POR DEFECTO
                setNeck(getDynamicFretboardSimulation(1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, firstRow));
                break;
            case "last":
                setNeck(getDynamicFretboardSimulation(1, 2, 3, 4, 5, 6, 4, 5, 0, 1, 2, 3, firstRow));
                break
            case "middle":
                setNeck(getDynamicFretboardSimulation(1, 2, 3, 4, 5, 6, 4, 0, 1, 2, 3, 5, firstRow));
                break
            case "alternate":
                setNeck(getDynamicFretboardSimulation(1, 2, 3, 4, 5, 6, 0, 1, 4, 5, 2, 3, firstRow));
                break;
        }
    }

    // Función para establecer la fila de donde comenzara a asignarse las teclas
    const onFirstRow = ({ target: { value } }) => {
        setFirstRow(+value);
        onPanelChange(`Se ha asginado la fila de teclas a partir de la fila ${+value}`)
        if (typeAssignKeys === "first") {
            setNeck(getDynamicFretboardSimulation(1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, +value));
        } else if (typeAssignKeys === "last") {
            setNeck(getDynamicFretboardSimulation(1, 2, 3, 4, 5, 6, 4, 5, 0, 1, 2, 3, +value));
        } else if (typeAssignKeys === "middle") {
            setNeck(getDynamicFretboardSimulation(1, 2, 3, 4, 5, 6, 4, 5, 0, 1, 2, 3, +value));
        } else if (typeAssignKeys === "alternate") {
            setNeck(getDynamicFretboardSimulation(1, 2, 3, 4, 5, 6, 4, 5, 0, 1, 2, 3, +value));
        }
    }

    // Establecer un mensaje de configuracion en el panel
    const onPanelChange = (message) => {
        setPanel(message);
    };



    // Función para manejar la reproducción de una nota y detener la anterior si es necesario
    const handleRopeOffNotePlayed = async (currentNote, currentAudioRef) => {

        //await Tone.start();
        // if (statusModRope === "OFF") {
        // Si la cuerda de la nota anterior es la misma que la de la nota actual, detener la reproducción de la anterior
        if (noteInRopeOff.rope === currentNote.rope && noteOffAudioRef.current) {
            noteOffAudioRef.current.stop();
            noteOffAudioRef.current.seek(0);
        }

        // Si la cuerda y el acorde de la nota anterior son los mismos que los de la nota actual, reiniciar la reproducción de la nota actual
        if (noteInRopeOff.rope === currentNote.rope && noteInRopeOff.chord === currentNote.chord) {
            noteOffAudioRef.current.stop();
        }

        noteOffAudioRef.current = currentAudioRef.current;
        // previousNote.current = currentNote;  // Actualizar la referencia inmediata
        setNoteInRopeOff(currentNote);
        // console.log(`La nota en modo OFF fue ${noteInRopeOff.rope} : ${noteInRopeOff.chord}`);
        // console.log(`La nota reprocida fue: ${currentNote.rope} : ${currentNote.chord}`);
        if (currentNote.rope !== null && currentNote.chord !== null) {
            console.log(`La nota en modo OFF fue ${currentNote.rope} : ${currentNote.chord}`);
        } else {
            console.log("Error: nota en modo OFF fue null");
        }

    }

    // if (statusModRope === "ON") {
    //     // Si la cuerda y el acorde de la nota anterior son los mismos que los de la nota actual, reiniciar la reproducción de la nota actual
    //     if (noteInRopeOff.rope === currentNote.rope && noteInRopeOff.chord === currentNote.chord) {
    //         noteOffAudioRef.current.stop();
    //     }

    //     // Silenciar la nota anterior solo si está en una cuerda diferente
    //     if (noteInRopeOn.rope !== currentNote.rope && noteOnAudioRef.current) {
    //         noteOnAudioRef.current.stop();
    //         noteOnAudioRef.current.seek(0);
    //     }

    //     // Si la nota es la misma, reinicia la reproducción
    //     if (noteInRopeOn.rope === currentNote.rope && noteInRopeOn.chord === currentNote.chord) {
    //         noteOnAudioRef.current.stop();
    //     }

    //     noteOnAudioRef.current = currentAudioRef.current;
    //     // modRopePreviousNote.current = modRopeCurrentNote;  // Actualizar la referencia inmediata
    //     setNoteInRopeOn(currentNote);
    // }

    // Imprimir la información sobre la nota anterior y la actual

    const handleRopeOnNotePlayed = async (currentNote, currentAudioRef) => {
        //await Tone.start();
        // Si la cuerda y el acorde de la nota anterior son los mismos que los de la nota actual, reiniciar la reproducción de la nota actual
        if (noteInRopeOff.rope === currentNote.rope && noteInRopeOff.chord === currentNote.chord) {
            noteOffAudioRef.current.stop();
        }

        // Silenciar la nota anterior solo si está en una cuerda diferente
        if (noteInRopeOn.rope !== currentNote.rope && noteOnAudioRef.current) {
            noteOnAudioRef.current.stop();
            noteOnAudioRef.current.seek(0);
        }

        // Si la nota es la misma, reinicia la reproducción
        if (noteInRopeOn.rope === currentNote.rope && noteInRopeOn.chord === currentNote.chord) {
            noteOnAudioRef.current.stop();
        }

        noteOnAudioRef.current = currentAudioRef.current;
        // modRopePreviousNote.current = modRopeCurrentNote;  // Actualizar la referencia inmediata
        setNoteInRopeOn(currentNote);
        // console.log(`La nota en modo ON fue ${noteInRopeOn.rope} : ${noteInRopeOn.chord}`);
        // console.log(`La nota reprocida fue: ${currentNote.rope} : ${currentNote.chord}`);
        if (currentNote.rope !== null && currentNote.chord !== null) {
            console.log(`La nota en modo ON fue ${currentNote.rope} : ${currentNote.chord}`);
        } else {
            console.log("Error: nota en modo ON fue null");
        }

    }


    // Cargar los datos del mástil de la guitarra cuando la página se monta
    useEffect(() => {
        setNeck(getDynamicFretboardSimulation(1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, 0))
    }, [])


    return (
        <>
            <NeckView neck={neck}
                // handleNotePlayed={handleNotePlayed}
                handleRopeOffNotePlayed={handleRopeOffNotePlayed}
                handleRopeOnNotePlayed={handleRopeOnNotePlayed}
                onPanelChange={onPanelChange}
                typeAssignKeys={typeAssignKeys}

            />
            <div>
                {panel}
            </div>
            <ControlsView typeAssignKeys={typeAssignKeys} onTypeAssignKeys={onTypeAssignKeys} onFirstRow={onFirstRow} firstRow={firstRow} />
        </>
    )
}

