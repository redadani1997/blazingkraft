import {
    MantineColor,
    MantineNumberSize,
    Tabs,
    TabsOrientation,
    TabsValue,
} from '@mantine/core';
import { TabsPlacement, TabsVariant } from '@mantine/core/lib/Tabs/Tabs.types';
import classNames from 'classnames';
import LoadingSpinner from '../loading/LoadingSpinner';

interface CommonTabsContainerProps {
    /** Default value for uncontrolled component */
    defaultValue?: TabsValue;
    /** Value for controlled component */
    value?: TabsValue;
    /** Callback for controlled component */
    onTabChange?(value: TabsValue): void;
    /** Tabs orientation, vertical or horizontal */
    orientation?: TabsOrientation;
    /** Tabs.List placement relative to Tabs.Panel, applicable only for orientation="vertical", left by default */
    placement?: TabsPlacement;
    /** Base id, used to generate ids that connect labels with controls, by default generated randomly */
    id?: string;
    /** Determines whether arrow key presses should loop though items (first to last and last to first) */
    loop?: boolean;
    /** Determines whether tab should be activated with arrow key press, defaults to true */
    activateTabWithKeyboard?: boolean;
    /** Determines whether tab can be deactivated, defaults to false */
    allowTabDeactivation?: boolean;
    /** Tabs content */
    children?: React.ReactNode;
    /** Controls component visuals */
    variant?: TabsVariant;
    /** Key of theme.colors */
    color?: MantineColor;
    /** Tabs border-radius from theme.radius or number ti set value from theme, defaults to theme.defaultRadius */
    radius?: MantineNumberSize;
    /** Determines whether tabs should have inverted styles */
    inverted?: boolean;
    /** If set to false, Tabs.Panel content will not stay mounted when tab is not active */
    keepMounted?: boolean;
    /** Classname  */
    className?: string;
}

export interface CommonTabsItemProps {
    value: string;
    label: string | React.ReactNode;
    children: React.ReactNode;
    tabClassName?: string;
    isLoading?: boolean;
}

export interface CommonTabsProps {
    container: CommonTabsContainerProps;
    items: CommonTabsItemProps[];
    additionalActions?: React.ReactNode;
}

function CommonTabs({ container, items, additionalActions }: CommonTabsProps) {
    return (
        <Tabs
            variant={container.variant}
            defaultValue={container.defaultValue}
            onTabChange={container.onTabChange}
            color={container.color}
            loop
            keepMounted
            orientation={container.orientation}
            value={container.value}
            className={classNames('flex flex-col', container.className)}
        >
            {items.length > 0 && (
                <>
                    <Tabs.List>
                        {items.map(item => (
                            <Tabs.Tab
                                key={item.value}
                                value={item.value}
                                className={item.tabClassName}
                            >
                                {item.label}
                            </Tabs.Tab>
                        ))}
                        {additionalActions}
                    </Tabs.List>
                    {items.map(item => (
                        <Tabs.Panel
                            key={item.value}
                            value={item.value}
                            className="h-full relative"
                            pt="xs"
                        >
                            <LoadingSpinner isLoading={item.isLoading} />
                            {item.children}
                        </Tabs.Panel>
                    ))}
                </>
            )}
        </Tabs>
    );
}
export default CommonTabs;
