import PropType from "prop-types";

import { RopeView } from "./RopeView"

export const NeckView = ({ neck, handleNotePlayed, keyboard, onPanelChange, getDynamicFretboardSimulation }) => {
    return (
        <>
            <p>Este es el mastil de la guitarra</p>
            <div>
                {
                    neck.map(({ rope, frets }) => (
                        <RopeView
                            key={rope}
                            rope={rope}
                            frets={frets}
                            handleNotePlayed={handleNotePlayed}
                            onPanelChange={onPanelChange}
                        />
                    ))
                }
            </div >
        </>
    )
}

NeckView.propTypes = {
    neck: PropType.array,
    handleNotePlayed: PropType.func,
}