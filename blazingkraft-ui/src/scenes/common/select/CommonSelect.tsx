import { Loader, Select } from '@mantine/core';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { Ref, forwardRef, useEffect, useState } from 'react';

interface CommonSelectProps {
    data: { label: string; value: any; group?: string; [key: string]: any }[];
    value: any;
    onChange?: any;
    id?: string;
    placeholder?: string;
    error?: boolean;
    searchable?: boolean;
    labelRenderer?: any;
    icon?: any;
    creatable?: any;
    defaultValue?: any;
    disabled: boolean;
    loading: boolean;
    maxDropdownHeight?: number;
    label?: string;
    className?: string;
    clearable?: boolean;
    selectRef?: Ref<any>;
    initiallyOpened?: boolean;
    limit?: number;
}

const SelectItem = labelRenderer =>
    forwardRef((props, ref) => (
        <div {...props} ref={ref}>
            {labelRenderer(props)}
        </div>
    ));

function CommonSelect({
    data,
    error,
    id,
    onChange,
    placeholder,
    value,
    searchable,
    labelRenderer,
    icon,
    creatable,
    defaultValue,
    disabled,
    loading,
    maxDropdownHeight,
    label,
    className,
    clearable,
    selectRef,
    initiallyOpened,
    limit,
}: CommonSelectProps) {
    const [computedData, setComputedData] = useState(data);

    // useEffect(() => {
    //     if (
    //         computedData &&
    //         !computedData.some(item => item.value === value) &&
    //         CommonValidationUtils.isTruthyString(value)
    //     ) {
    //         setComputedData([...computedData, { value, label: value }]);
    //     }
    //     if (CommonValidationUtils.isFalsyArray(computedData)) {
    //         setComputedData([
    //             {
    //                 value: 'No Data',
    //                 label: 'No data',
    //                 disabled: true,
    //             },
    //         ]);
    //     }
    // }, [computedData]);

    useEffect(() => {
        // if (
        //     CommonValidationUtils.isTruthyString(value) &&
        //     computedData &&
        //     !computedData.some(item => item.value === value)
        // ) {
        //     setComputedData([...data, { value, label: value }]);
        // } else
        if (CommonValidationUtils.isFalsyArray(data)) {
            setComputedData([
                {
                    value: 'No Data',
                    label: 'No data',
                    disabled: true,
                },
            ]);
        } else {
            setComputedData(data);
        }
    }, [data]);

    return (
        <Select
            ref={selectRef}
            className={className}
            // styles={{
            //     dropdown: {
            //         position: 'fixed',
            //     },
            // }}
            initiallyOpened={initiallyOpened}
            withinPortal
            label={label}
            id={id}
            placeholder={placeholder}
            itemComponent={
                labelRenderer ? SelectItem(labelRenderer) : undefined
            }
            data={computedData}
            searchable={searchable}
            error={error}
            onChange={newValue => {
                if (!onChange) {
                    return;
                }
                if (newValue === value) {
                    return;
                }
                onChange(newValue);
            }}
            maxDropdownHeight={maxDropdownHeight}
            value={value}
            rightSection={loading && <Loader size="sm" />}
            icon={icon}
            creatable={creatable}
            getCreateLabel={query => `+ Create ${query}`}
            onCreate={query => {
                const item = { value: query, label: query };
                setComputedData(current => [...current, item]);
                return item;
            }}
            defaultValue={defaultValue}
            disabled={disabled}
            clearable={clearable}
            limit={limit}
        />
    );
}

CommonSelect.defaultProps = {
    disabled: false,
    loading: false,
    searchable: true,
    maxDropdownHeight: 200,
    clearable: true,
    initiallyOpened: false,
    limit: 150,
};

export default CommonSelect;
