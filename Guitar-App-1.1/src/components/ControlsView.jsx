import { useState } from "react";

export const ControlsView = () => {

    const [isMuted, setIsMuted] = useState(false);

    // Activar mute o silenciar todas las notas
    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (<>

        <div>
            <button onMouseDown={toggleMute} onMouseUp={toggleMute}>
                Silencio
            </button>
        </div>
    </>)
}