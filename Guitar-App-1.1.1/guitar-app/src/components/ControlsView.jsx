import PropType from "prop-types";

export const ControlsView = ({ typeAssignKeys, onTypeAssignKeys, onFirstRow, firstRow }) => {

    return (
        <>
            <p>Aqui estan los controles</p>
            <div>
                <h3>Assign Keys {typeAssignKeys}</h3>
                <button onClick={() => onTypeAssignKeys("first")}>FIRST</button>
                <button onClick={() => onTypeAssignKeys("last")}>LAST</button>
                <button onClick={() => onTypeAssignKeys("middle")}>MIDDLE</button>
                <button onClick={() => onTypeAssignKeys("alternate")}>ALTERNATE</button>
            </div>
            <div>
                <h3>Empezar por la fila {firstRow}</h3>
                <input type="range" min={0} max={12} step={1} onChange={onFirstRow} value={firstRow}></input>
            </div>
            <div>
                <h3>Reproducir continuamente una nota</h3>
                TEMPO:
                <input type="number" min={30} max={300}></input>
                <br></br>
                VELOCIDAD:
                <input type="number" min={1} max={10}></input>
            </div>
        </>
    )
}
ControlsView.propTypes = {
    typeAssignKeys: PropType.string,
    onTypeAssignKeys: PropType.func,
}