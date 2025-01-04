import React from 'react';
import './index.css';

const CommonBody = ({ children }: { children: React.ReactNode }) => {
    // const [scroll, scrollTo] = useWindowScroll();
    return (
        <div className="common-body-outer">
            <div className="common-body-inner">
                <div className="w-full h-full">{children}</div>
            </div>
        </div>
    );
};

{
    /* <Affix position={{ bottom: 20, right: 20 }}>
<Transition
    transition="slide-up"
    mounted={scroll.y > 20}
>
    {transitionStyles => (
        <Tooltip label="Scroll to top">
            <ActionIcon
                variant="outline"
                style={transitionStyles}
                onClick={() => scrollTo({ y: 0 })}
            >
                <TbArrowUp size={18} />
            </ActionIcon>
        </Tooltip>
    )}
</Transition>
</Affix> */
}

export default CommonBody;
