import React from 'react';

export default function Saver({ unSavedChanges, onListSave }) {
    const text = unSavedChanges ? 'Muutoksia ei ole tallennettu' : 'Muutokset tallennettu'
    return (
        <div>
            <span>
                {text}
            </span>
            {unSavedChanges && <button onClick={onListSave}>Tallenna</button>}
        </div>
    );
}