import React from 'react';
import useTreble from '../../../hooks/use-treble';

export default function RenderComp() {

    const [{ trebleCoreData }, Store, Utils] = useTreble();


    React.useEffect(() => {
        Store.update('updateTrebleCoreData', {
            ...trebleCoreData,
            subscribeAPI: Store,
            moduleData: Utils.moduleData
        })
    }, []);

    return null
}