import { Alert, Divider, Grid, Text } from '@mantine/core';
import { ConsumerUtils } from 'common/utils/ConsumerUtils';
import { TbAlertCircle } from 'react-icons/tb';
import CommonCode from 'scenes/common/code/CommonCode';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonSelect from 'scenes/common/select/CommonSelect';
import { TextSearchFilter } from '../../blazing_consumer_filter/BlazingConsumerFilterComponent';

interface BlazingConsumerTextSearchFilterProps {
    textSearchFilter: TextSearchFilter;
    setTextSearchFilter: (textSearchFilter: TextSearchFilter) => void;
}

function BlazingConsumerTextSearchFilter({
    textSearchFilter,
    setTextSearchFilter,
}: BlazingConsumerTextSearchFilterProps) {
    const {
        key,
        value,
        headers,
        metadata,
        keyType,
        valueType,
        headersType,
        metadataType,
    } = textSearchFilter;

    return (
        <>
            <Divider label="Key" labelPosition="center" className="pb-2" />
            <Grid>
                <Grid.Col span={12} sm={6}>
                    <CommonSelect
                        label="Key Search Type"
                        value={keyType}
                        onChange={value => {
                            setTextSearchFilter({
                                ...textSearchFilter,
                                keyType: value,
                            });
                        }}
                        data={ConsumerUtils.TextSearchFilterTypeOptions}
                        clearable={false}
                        creatable={false}
                    />
                </Grid.Col>
                <Grid.Col span={12} sm={6}>
                    <CommonTextInput
                        disabled={keyType === 'DISABLED'}
                        placeholder="Key"
                        label="Key"
                        value={key}
                        onChange={value => {
                            setTextSearchFilter({
                                ...textSearchFilter,
                                key: value,
                            });
                        }}
                    />
                </Grid.Col>
            </Grid>

            <Divider label="Value" labelPosition="center" className="py-2" />
            <Grid>
                <Grid.Col span={12} sm={6}>
                    <CommonSelect
                        label="Value Search Type"
                        value={valueType}
                        onChange={value => {
                            setTextSearchFilter({
                                ...textSearchFilter,
                                valueType: value,
                            });
                        }}
                        data={ConsumerUtils.TextSearchFilterTypeOptions}
                        clearable={false}
                        creatable={false}
                    />
                </Grid.Col>
                <Grid.Col span={12} sm={6}>
                    <CommonTextInput
                        disabled={valueType === 'DISABLED'}
                        placeholder="Value"
                        label="Value"
                        value={value}
                        onChange={value => {
                            setTextSearchFilter({
                                ...textSearchFilter,
                                value: value,
                            });
                        }}
                    />
                </Grid.Col>
            </Grid>

            <Divider label="Headers" labelPosition="center" className="py-2" />
            <Grid>
                <Grid.Col span={12} sm={6}>
                    <CommonSelect
                        label="Headers Search Type"
                        value={headersType}
                        onChange={value => {
                            setTextSearchFilter({
                                ...textSearchFilter,
                                headersType: value,
                            });
                        }}
                        data={ConsumerUtils.TextSearchFilterTypeOptions}
                        clearable={false}
                        creatable={false}
                    />
                </Grid.Col>
                <Grid.Col span={12} sm={6}>
                    <CommonTextInput
                        disabled={headersType === 'DISABLED'}
                        placeholder="Headers"
                        label="Headers"
                        value={headers}
                        onChange={value => {
                            setTextSearchFilter({
                                ...textSearchFilter,
                                headers: value,
                            });
                        }}
                    />
                </Grid.Col>
            </Grid>

            <Divider label="Metadata" labelPosition="center" className="py-2" />
            <Grid>
                <Grid.Col span={12} sm={6}>
                    <CommonSelect
                        label="Metadata Search Type"
                        value={metadataType}
                        onChange={value => {
                            setTextSearchFilter({
                                ...textSearchFilter,
                                metadataType: value,
                            });
                        }}
                        data={ConsumerUtils.TextSearchFilterTypeOptions}
                        clearable={false}
                        creatable={false}
                    />
                </Grid.Col>
                <Grid.Col span={12} sm={6}>
                    <CommonTextInput
                        disabled={metadataType === 'DISABLED'}
                        placeholder="Metadata"
                        label="Metadata"
                        value={metadata}
                        onChange={value => {
                            setTextSearchFilter({
                                ...textSearchFilter,
                                metadata: value,
                            });
                        }}
                    />
                </Grid.Col>
            </Grid>
            <Alert
                icon={<TbAlertCircle size={20} />}
                title="Info"
                color="blue"
                className="mt-2"
            >
                <Text>
                    * Text Search filter gives you the possibility to execute a
                    quick search on the stringified value of the
                    <CommonCode>key, value, headers, metadata.</CommonCode>
                </Text>
                <Text>
                    * If the specified search filter type is not Disabled and
                    the corresponding value is null then the filter will return
                    false.
                </Text>
            </Alert>
        </>
    );
}

export default BlazingConsumerTextSearchFilter;
