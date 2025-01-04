import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import useCommonLocalStorage from 'common/hooks/localstorage/useCommonLocalStorage';
import { useState } from 'react';
import { Provider } from 'react-redux';
import store from 'redux_config/store';

interface MainProviderComponentProps {
    children: React.ReactNode;
}

function getInitialColorScheme(getColorSchemeStorage): ColorScheme {
    const value = getColorSchemeStorage();

    return value === 'dark' ? 'dark' : 'light';
}

const MainProviderComponent = ({ children }: MainProviderComponentProps) => {
    const [getColorSchemeStorage, setColorSchemeStorage] =
        useCommonLocalStorage({
            key: 'blazingkraft-color-scheme',
            fallback: 'light',
        });
    const [colorScheme, setColorScheme] = useState<ColorScheme>(
        getInitialColorScheme(getColorSchemeStorage),
    );

    const toggleColorScheme = (value?: ColorScheme) => {
        const newValue = value || (colorScheme === 'dark' ? 'light' : 'dark');
        setColorSchemeStorage(newValue);
        setColorScheme(newValue);
    };

    useHotkeys([['mod+Q', () => toggleColorScheme()]]);

    return (
        <Provider store={store}>
            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <MantineProvider
                    theme={{
                        fontFamily: 'BlazingKRaftFont, monospace',
                        colorScheme,
                        cursorType: 'pointer',
                        breakpoints: {
                            xs: '31.25em', // 500px
                            sm: '48em', // 768px
                            md: '62em', // 992px
                            lg: '75em', // 1200px
                            xl: '87.5em', // 1400px
                        },
                    }}
                >
                    <Notifications limit={5} position="top-right" />
                    {children}
                </MantineProvider>
            </ColorSchemeProvider>
        </Provider>
    );
};

export default MainProviderComponent;
