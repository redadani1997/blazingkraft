import { Loader, MultiSelect } from '@mantine/core';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import React, { Ref, forwardRef, useMemo, useState } from 'react';

interface CommonSelectProps {
    data: {
        label: string;
        value: any;
        group?: string;
        [key: string]: any;
    }[];
    value: any[];
    onChange: any;
    id?: string;
    placeholder?: string;
    error?: boolean;
    searchable?: boolean;
    labelRenderer?: any;
    icon?: any;
    creatable?: any;
    defaultValue?: string[];
    disabled: boolean;
    loading: boolean;
    maxDropdownHeight?: number;
    clearable?: boolean;
    label?: React.ReactNode;
    className?: string;
    multiSelectRef?: Ref<any>;
    limit?: number;
}

const SelectItem = labelRenderer =>
    forwardRef((props, ref) => (
        <div {...props} ref={ref}>
            {labelRenderer(props)}
        </div>
    ));

function CommonMultiSelect({
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
    clearable,
    label,
    className,
    multiSelectRef,
    limit,
}: CommonSelectProps) {
    const [createdData, setCreatedData] = useState<any[]>([]);

    const computedData = useMemo(() => {
        const newData = [...data, ...createdData];
        if (CommonValidationUtils.isFalsyArray(newData)) {
            return [
                {
                    value: 'No Data',
                    label: 'No data',
                    disabled: true,
                },
            ];
        }
        return newData;
    }, [data, createdData]);

    return (
        <MultiSelect
            // styles={{
            //     dropdown: {
            //         position: 'fixed',
            //     },
            // }}
            ref={multiSelectRef}
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
            onChange={onChange}
            maxDropdownHeight={maxDropdownHeight}
            value={value}
            rightSection={loading && <Loader size="sm" />}
            icon={icon}
            creatable={creatable}
            getCreateLabel={query => `+ Create ${query}`}
            onCreate={query => {
                const item = { value: query, label: query };
                setCreatedData(current => [...current, item]);
                return item;
            }}
            defaultValue={defaultValue}
            disabled={disabled}
            clearable={clearable}
            className={className}
            limit={limit}
        />
    );
}

CommonMultiSelect.defaultProps = {
    disabled: false,
    loading: false,
    searchable: true,
    maxDropdownHeight: 200,
    clearable: false,
    limit: 150,
};

export default CommonMultiSelect;
