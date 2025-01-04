import { Skeleton } from '@mantine/core';
import { KafkaConfiguration } from 'kafka/index';
import {
    useCallback,
    useEffect,
    useMemo,
    useReducer,
    useState,
    useTransition,
} from 'react';
import CommonTabs, { CommonTabsItemProps } from '../tabs/CommonTabs';
import ConfigurationsTab from './ConfigurationsTab';

interface ConfigurationsTabsProps {
    configurations: KafkaConfiguration[];
    configurationValues: Map<string, any>;
    setConfigurationValues: (values: Map<string, any>) => void;
    isLoading?: boolean;
}

function filterConfigurations(configurations): {
    highConfigurations: KafkaConfiguration[];
    mediumConfigurations: KafkaConfiguration[];
    lowConfigurations: KafkaConfiguration[];
} {
    const computedConfigurations = {
        highConfigurations: [],
        mediumConfigurations: [],
        lowConfigurations: [],
    };
    configurations.forEach(config => {
        if (config.importance === 'HIGH') {
            computedConfigurations.highConfigurations.push(config);
        } else if (config.importance === 'MEDIUM') {
            computedConfigurations.mediumConfigurations.push(config);
        } else {
            computedConfigurations.lowConfigurations.push(config);
        }
    });
    return computedConfigurations;
}

const ConfigurationsTabs = ({
    configurations,
    configurationValues,
    setConfigurationValues,
    isLoading,
}: ConfigurationsTabsProps) => {
    const [state, dispatch] = useReducer(reducer, new Map(configurationValues));

    const [
        transisionnedConfigurationValues,
        setTransisionnedConfigurationValues,
    ] = useState(null);

    const [transisionnedConfigurations, setTransisionnedConfigurations] =
        useState(null);

    const [isTransionning, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            setTransisionnedConfigurationValues(configurationValues);
            setTransisionnedConfigurations(configurations);
        });
    }, []);

    function reducer(state, action): any {
        switch (action.type) {
            case 'SET_CONFIGURATION_VALUE': {
                setConfigurationValues(
                    new Map(
                        configurationValues.set(
                            action.payload.name,
                            action.payload.value,
                        ),
                    ),
                );
                return state;
            }
            default:
                throw state;
        }
    }
    const setConfigurationValue = useCallback((name, value) => {
        dispatch({ type: 'SET_CONFIGURATION_VALUE', payload: { name, value } });
    }, []);

    // Memoize configurations
    const memoizedConfigurations = useMemo(
        () => filterConfigurations(configurations),
        [configurations],
    );

    function renderConfigurationsTab(
        computedConfigurations,
        computedConfigurationValues,
    ) {
        return (
            configurations.length > 0 && (
                <ConfigurationsTab
                    configurations={computedConfigurations}
                    setConfigurationValue={setConfigurationValue}
                    configurationValues={computedConfigurationValues}
                />
            )
        );
    }

    function getDefaultImportance() {
        if (memoizedConfigurations.highConfigurations.length > 0) {
            return 'HIGH';
        }
        if (memoizedConfigurations.mediumConfigurations.length > 0) {
            return 'MEDIUM';
        }
        return 'LOW';
    }

    const items: CommonTabsItemProps[] = [];
    if (memoizedConfigurations.highConfigurations.length > 0) {
        items.push({
            label: 'Important',
            value: 'HIGH',
            children: renderConfigurationsTab(
                memoizedConfigurations.highConfigurations,
                configurationValues,
            ),
        });
    }
    if (memoizedConfigurations.mediumConfigurations.length > 0) {
        items.push({
            label: 'Medium',
            value: 'MEDIUM',
            children: renderConfigurationsTab(
                memoizedConfigurations.mediumConfigurations,
                configurationValues,
            ),
        });
    }
    if (memoizedConfigurations.lowConfigurations.length > 0) {
        items.push({
            label: 'Low',
            value: 'LOW',
            children: renderConfigurationsTab(
                memoizedConfigurations.lowConfigurations,
                configurationValues,
            ),
        });
    }

    if (
        transisionnedConfigurationValues === null ||
        transisionnedConfigurations === null ||
        isTransionning ||
        isLoading
    ) {
        return (
            <>
                <Skeleton height="2.2rem" mt={6} radius="sm" />
                <Skeleton height="2.2rem" mt={6} radius="sm" />
                <Skeleton height="2.2rem" mt={6} radius="sm" />
                <Skeleton height="2.2rem" mt={6} radius="sm" />
                <Skeleton height="2.2rem" mt={6} radius="sm" />
            </>
        );
    }

    return (
        <CommonTabs
            container={{
                defaultValue: getDefaultImportance(),
                variant: 'pills',
            }}
            items={items}
        />
    );
};

export default ConfigurationsTabs;
