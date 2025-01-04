import { MantineTransition, Transition } from '@mantine/core';
import { useEffect, useState } from 'react';

interface CommonTransitionProps {
    children: React.ReactNode;
    transition: MantineTransition;
    mounted: boolean;
}

function CommonTransition({
    children,
    transition,
    mounted,
}: CommonTransitionProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (mounted !== undefined) {
            setIsMounted(mounted);
        } else {
            setIsMounted(true);
        }
    }, [mounted]);

    return (
        <Transition
            mounted={isMounted}
            transition={transition}
            duration={200}
            timingFunction="ease"
        >
            {styles => <div style={styles}>{children}</div>}
        </Transition>
    );
}

CommonTransition.defaultProps = {
    transition: 'slide-down',
    mounted: undefined,
};

export default CommonTransition;
