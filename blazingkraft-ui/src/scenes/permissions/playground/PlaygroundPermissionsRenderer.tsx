import React from 'react';
import PlaygroundPermissionsRendererComponent from './PlaygroundPermissionsRendererComponent';

interface PlaygroundPermissionsRendererInterface {
    playgroundPermissions: string[];
    setPlaygroundPermissions: (playgroundPermissions: string[]) => void;
    disabled?: boolean;
    basePermissions?: string[];
}

const PlaygroundPermissionsRenderer = (
    props: PlaygroundPermissionsRendererInterface,
) => {
    // Map State To Props

    // Map Dispatch To Props

    return <PlaygroundPermissionsRendererComponent {...props} />;
};

export default React.memo(PlaygroundPermissionsRenderer);
