import { useState } from "react";
import { getDynamicKeysAndChords } from "../services/getDynamicKeysAndChords"
import { useEffect } from "react";

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

    // Referencia al elemento de audio de la nota reproducida
    const noteOffAudioRef = useRef(null);
    const noteOnAudioRef = useRef(null);

    // Estado para el tipo de asignación de teclas por cada nota de la guitarra
    const [typeAssignKeys, setTypeAssignKeys] = useState("first");

    // CONTINUA AQUI
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
                setNeck(getDynamicKeysAndChords(1, 2, 3, 4, 5, 6, 0, false, firstRow));
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




    // Establecer un mensaje de configuracion en el panel
    const onPanelChange = (message) => {
        setPanel(message);
    };

    // Cargar los datos del mástil de la guitarra cuando la página se monta
    useEffect(() => {
        // 6 primeros argumentos: las filas del teclado
        // Empezar por la columna de notas
        // Bloquear la cuerda 0
        // Invertir las teclas
        setNeck(getDynamicKeysAndChords(1, 2, 3, 4, 5, 6, 0, false, false))
    }, [])


    useEffect(() => {
        const intervalPanel = setInterval(() => {
            setPanel("...")
        }, 5000)
        return () => clearInterval(intervalPanel);
    }, [panel])

    return (
        <>
        </>
    )
}