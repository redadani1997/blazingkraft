import { useEffect } from 'react';

function useClickOutsideRef(outsideRef, insideRef, isSmall, opened, setOpened) {
    useEffect(() => {
        function handleClickOutside(event) {
            const clickedOusideRef =
                outsideRef.current &&
                !outsideRef.current.contains(event.target);
            const clickedInsideRef =
                insideRef.current && !insideRef.current.contains(event.target);
            const shouldClose = isSmall && opened;

            if (clickedOusideRef && clickedInsideRef && shouldClose) {
                setOpened(false);
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [outsideRef, insideRef, isSmall, opened, setOpened]);
}

export default useClickOutsideRef;
