import PropType from "prop-types";

import { RopeView } from "./RopeView"

export const NeckView = ({ neck, handleNotePlayed, onPanelChange, }) => {
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
    onPanelChange: PropType.func
}