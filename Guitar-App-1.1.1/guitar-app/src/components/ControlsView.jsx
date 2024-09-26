import PropType from "prop-types";

export const ControlsView = ({ typeAssignKeys, onTypeAssignKeys }) => {

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
        </>
    )
}
ControlsView.propTypes = {
    typeAssignKeys: PropType.string,
    onTypeAssignKeys: PropType.func,
}