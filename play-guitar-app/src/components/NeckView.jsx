import PropType from "prop-types";

import { RopeView } from "./RopeView"

export const NeckView = ({ neck, /*handleNotePlayed, */onPanelChange, handleRopeOffNotePlayed, handleRopeOnNotePlayed, typeAssignKeys }) => {
    return (
        <>
            <div>
                {
                    // El mastil de la guitarra
                    neck.map(({ rope, frets }) => (
                        <RopeView
                            key={rope}
                            rope={rope}
                            frets={frets}
                            // handleNotePlayed={handleNotePlayed}
                            handleRopeOffNotePlayed={handleRopeOffNotePlayed}
                            handleRopeOnNotePlayed={handleRopeOnNotePlayed}
                            onPanelChange={onPanelChange}
                            typeAssignKeys={typeAssignKeys}
                        />
                    ))
                }
            </div >
        </>
    )
}

NeckView.propTypes = {
    neck: PropType.array,
    handleRopeOffNotePlayed: PropType.func,
    handleRopeOnNotePlayed: PropType.func,
    onPanelChange: PropType.func
}